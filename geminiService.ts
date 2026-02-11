
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "./constants";
import { Question, AppMode, Difficulty } from "./types";
import { QUESTION_DATABASE } from "./questionDatabase";

const navigateToFunctionDeclaration: FunctionDeclaration = {
  name: 'navigateTo',
  parameters: {
    type: Type.OBJECT,
    description: 'Cambia la pantalla o sección actual de la aplicación.',
    properties: {
      mode: {
        type: Type.STRING,
        description: 'La sección a la que navegar.',
        enum: ['DASHBOARD', 'STUDY', 'EXAM', 'VISUAL']
      },
    },
    required: ['mode'],
  },
};

const cleanAIResponse = (text: string): string => {
  if (!text) return "";
  let cleaned = text.replace(/%%/g, '');
  cleaned = cleaned.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  return cleaned;
};

export const getChatResponse = async (
  history: { role: 'user' | 'model', parts: { text: string }[] }[], 
  userMessage: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + "\nResponde siempre como instructor oficial de Guardias de Seguridad de Chile.",
      temperature: 0.7,
    }
  });

  return cleanAIResponse(response.text || "");
};

export const generateQuiz = async (
  topic: string, 
  excludeQuestions: string[] = [], 
  difficulty: Difficulty = Difficulty.MEDIUM
): Promise<Question[]> => {
  const isMiniExam = topic.toLowerCase().includes('módulo:');
  const TOTAL_EXAM_SIZE = isMiniExam ? 15 : 60;
  
  // Intentar filtrar la base de datos local por categoría si el tema coincide
  let pool = QUESTION_DATABASE.filter(q => !excludeQuestions.includes(q.question));
  
  if (isMiniExam) {
    const moduleName = topic.split(':')[1].trim().toLowerCase();
    // Filtro heurístico simple por categoría basada en el nombre del módulo
    pool = pool.filter(q => 
      q.category.toLowerCase().includes(moduleName) || 
      q.question.toLowerCase().includes(moduleName)
    );
  }

  if (difficulty === Difficulty.LOW) pool = pool.filter(q => q.category !== 'Dificultad');
  else if (difficulty === Difficulty.HIGH) pool = pool.filter(q => q.category === 'Dificultad' || q.category === 'Legal');

  pool.sort(() => Math.random() - 0.5);

  const MAX_AI_QUESTIONS = isMiniExam ? 8 : 5;
  const neededFromAI = Math.max(0, TOTAL_EXAM_SIZE - pool.length) + (isMiniExam ? 2 : 0);

  if (neededFromAI <= 0 && pool.length >= TOTAL_EXAM_SIZE) {
    return pool.slice(0, TOTAL_EXAM_SIZE);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Genera EXACTAMENTE ${neededFromAI} preguntas para Guardias de Seguridad (GG.SS.) de Chile sobre el TEMA: "${topic}". 
  Dificultad: ${difficulty.toUpperCase()}. 
  Asegúrate de incluir aspectos técnicos vigentes en 2026.
  IMPORTANTE: Formato JSON. Cada pregunta debe incluir una 'explanation' técnica citando la ley vigente.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });
    
    const aiQuestions = JSON.parse(cleanAIResponse(response.text || "[]"));
    const finalExam = [...pool, ...aiQuestions].slice(0, TOTAL_EXAM_SIZE);
    return finalExam.sort(() => Math.random() - 0.5);
  } catch (e) {
    // Si falla la IA y no hay suficientes en el pool específico, tomamos del pool general
    if (pool.length < TOTAL_EXAM_SIZE) {
      const fallback = QUESTION_DATABASE.filter(q => !excludeQuestions.includes(q.question)).sort(() => Math.random() - 0.5);
      return [...pool, ...fallback].slice(0, TOTAL_EXAM_SIZE);
    }
    return pool.slice(0, TOTAL_EXAM_SIZE);
  }
};

export const generateStudyImage = async (prompt: string): Promise<{imageUrl: string, description: string}> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const technicalPrompt = `Ilustración técnica para GUARDIA DE SEGURIDAD (GG.SS.) en Chile año 2026: ${prompt}. 
  Usa estrictamente uniforme de guardia actualizado: Camisa Gris Perla y Chaleco Rojo Fluorescente.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: technicalPrompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  let imageUrl = "";
  let description = "Referencia visual para Guardia de Seguridad 2026.";

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
    } else if (part.text) {
      description = part.text;
    }
  }

  return { imageUrl, description };
};

export const getChatWithNavigation = async (
  history: { role: 'user' | 'model', parts: { text: string }[] }[], 
  userMessage: string,
  onNavigate: (mode: AppMode) => void
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + "\nInstructor GG.SS. Experto 2026.",
      tools: [{ functionDeclarations: [navigateToFunctionDeclaration] }],
      temperature: 0.6,
    }
  });

  if (response.functionCalls) {
    for (const fc of response.functionCalls) {
      if (fc.name === 'navigateTo') {
        const mode = (fc.args as any).mode as AppMode;
        onNavigate(mode);
        return `Navegando a ${mode}.`;
      }
    }
  }

  return cleanAIResponse(response.text || "");
};
