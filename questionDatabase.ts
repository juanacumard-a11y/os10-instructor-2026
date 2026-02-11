
import { Question } from './types';

export const QUESTION_DATABASE: (Question & { category: string })[] = [
  // --- LEGISLACIÓN GG.SS. (L) ---
  { 
    id: "L001", 
    category: "Legal", 
    question: "¿Cuál es el plazo máximo para que un Guardia de Seguridad (GG.SS.) denuncie un delito?", 
    options: ["12 horas", "24 horas", "48 horas", "6 horas"], 
    correctAnswer: 1, 
    explanation: "Según el Artículo 4 de la Ley 21.659, el deber de denuncia debe cumplirse en un plazo máximo de 24 horas." 
  },

  // --- PRIVACIDAD Y DATOS (P) ---
  { 
    id: "P001", 
    category: "Privacidad", 
    question: "¿Qué significan las siglas ARCO en la Ley 19.628?", 
    options: ["Acceso, Rectificación, Cancelación y Oposición", "Alarma, Respuesta, Control y Operación", "Autorización, Registro, Cobro y Orden", "Archivo, Red, Comunicación y On-line"], 
    correctAnswer: 0, 
    explanation: "Los derechos ARCO son: Acceso, Rectificación, Cancelación y Oposición. Son las facultades que tiene el titular para controlar sus datos personales." 
  },
  { 
    id: "P002", 
    category: "Privacidad", 
    question: "¿Cuál es el principio que indica que los datos solo pueden usarse para el fin que fueron recolectados?", 
    options: ["Principio de Calidad", "Principio de Finalidad", "Principio de Seguridad", "Principio de Licitud"], 
    correctAnswer: 1, 
    explanation: "El Principio de Finalidad establece que el tratamiento de datos personales debe limitarse a los fines específicos autorizados por el titular." 
  },
  { 
    id: "P003", 
    category: "Privacidad", 
    question: "¿Qué tipo de datos requieren un mayor resguardo y no pueden tratarse sin autorización expresa?", 
    options: ["Datos Públicos", "Datos de Identificación", "Datos Sensibles", "Datos Estadísticos"], 
    correctAnswer: 2, 
    explanation: "Los Datos Sensibles (salud, ideología, vida privada) tienen una protección especial y su tratamiento está restringido por ley." 
  },

  // --- DERECHOS HUMANOS (H) ---
  { 
    id: "H001", 
    category: "DD.HH.", 
    question: "¿Qué artículo de la Constitución Política de Chile garantiza la 'Igualdad ante la Ley'?", 
    options: ["Artículo 1", "Artículo 19 N°2", "Artículo 19 N°7", "Artículo 5"], 
    correctAnswer: 1, 
    explanation: "El Artículo 19 N°2 establece que hombres y mujeres son iguales ante la ley y prohíbe diferencias arbitrarias." 
  },
  { 
    id: "H002", 
    category: "DD.HH.", 
    question: "¿Qué característica de los DD.HH. indica que no caducan ni se pierden con el tiempo?", 
    options: ["Universales", "Inalienables", "Imprescriptibles", "Indivisibles"], 
    correctAnswer: 2, 
    explanation: "La imprescriptibilidad significa que los derechos humanos no pierden su vigencia por el paso del tiempo." 
  },
  { 
    id: "H003", 
    category: "DD.HH.", 
    question: "¿A qué apunta la 'Convención Belém do Pará' reconocida en Chile?", 
    options: ["A la protección de datos", "A prevenir y erradicar la violencia contra la mujer", "A regular el contrato de trabajo", "A los derechos de autor"], 
    correctAnswer: 1, 
    explanation: "Es el tratado fundamental para la protección de la mujer frente a cualquier forma de violencia." 
  },

  // --- ÉTICA Y PROBIDAD (E) ---
  { 
    id: "E001", 
    category: "Ética", 
    question: "¿Qué principio ético exige privilegiar el interés general sobre el interés particular?", 
    options: ["Moralidad", "Probidad", "Eficiencia", "Cortesía"], 
    correctAnswer: 1, 
    explanation: "La Probidad exige una conducta honesta y leal, anteponiendo siempre el bien común al beneficio personal." 
  },
  { 
    id: "E002", 
    category: "Ética", 
    question: "¿Cuál es el plazo para denunciar una discriminación arbitraria según la Ley Zamudio?", 
    options: ["30 días", "60 días", "90 días", "180 días"], 
    correctAnswer: 2, 
    explanation: "La Ley 20.609 establece un plazo de 90 días corridos desde que ocurre el hecho para interponer la acción judicial." 
  },
  { 
    id: "E003", 
    category: "Ética", 
    question: "¿Qué busca la Ley 21.675 respecto a las mujeres?", 
    options: ["Aumentar sus impuestos", "Prevención, sanción y erradicación de la violencia de género", "Cambiar su uniforme de trabajo", "Regular su horario de colación"], 
    correctAnswer: 1, 
    explanation: "La Ley 21.675 es la ley integral contra la violencia hacia las mujeres en todos sus ámbitos." 
  },

  // --- UNIFORME (R) ---
  { 
    id: "R001", 
    category: "Res. 2183", 
    question: "¿De qué color debe ser la camisa oficial del GG.SS. según la normativa vigente en 2026?", 
    options: ["Azul", "Blanca", "Gris Perla", "Negra"], 
    correctAnswer: 2, 
    explanation: "La Res. 2183 exige camisa Gris Perla para diferenciar claramente al guardia de otras instituciones según el estándar 2026." 
  }
];
