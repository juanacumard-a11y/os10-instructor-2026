
import React, { useState } from 'react';
import { generateStudyImage } from '../geminiService';

interface TechnicalSample {
  id: string;
  label: string;
  description: string;
  technicalPrompt: string;
  icon: string;
}

const VisualStudy: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{imageUrl: string, description: string} | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const technicalSamples: TechnicalSample[] = [
    { 
      id: "uniform", 
      label: "Uniforme Oficial (GG.SS.)", 
      description: "Camisa Gris Perla y Chaleco Rojo según Resolución 2183.",
      technicalPrompt: "Guardia de seguridad chileno (GG.SS.) con uniforme oficial 2026: Camisa Gris Perla, Chaleco Rojo Fluorescente con cintas reflectantes, parche de Seguridad Privada. Imagen clara y técnica.",
      icon: "fa-user-tie"
    },
    { 
      id: "access", 
      label: "Control de Accesos", 
      description: "Protocolo de verificación de identidad y registro de visitantes.",
      technicalPrompt: "Guardia de seguridad (GG.SS.) chileno en puesto de control, solicitando cédula de identidad a un visitante. El guardia usa el uniforme reglamentario gris y rojo 2026.",
      icon: "fa-id-card-clip"
    },
    { 
      id: "cctv", 
      label: "Sala de Monitoreo CCTV", 
      description: "Estación de vigilancia digital y protección de activos.",
      technicalPrompt: "Interior de una sala de monitoreo y videovigilancia profesional. Un guardia de seguridad (GG.SS.) observa múltiples pantallas digitales con cámaras de seguridad en un ambiente moderno.",
      icon: "fa-display"
    },
    { 
      id: "baton", 
      label: "Bastón de Policarbonato", 
      description: "Única arma defensiva autorizada de 60 cm máximo.",
      technicalPrompt: "Detalle técnico del bastón de policarbonato de 60 cm para guardia de seguridad chileno. El guardia lo porta en un tahalí reglamentario en su cinturón. Enfoque en el equipo.",
      icon: "fa-shield-halved"
    },
    { 
      id: "fire", 
      label: "Extintores y Fuego", 
      description: "Uso de equipos PQS y CO2 según norma chilena.",
      technicalPrompt: "Extintores de incendio PQS (amarillo) y CO2 (rojo con corneta) en un pasillo de centro comercial, listos para ser usados por un guardia en 2026.",
      icon: "fa-fire-extinguisher"
    },
    { 
      id: "rcp", 
      label: "Reanimación RCP", 
      description: "Técnica de primeros auxilios obligatoria para el examen.",
      technicalPrompt: "Primeros auxilios: Un guardia de seguridad realizando la maniobra de RCP sobre un maniquí de entrenamiento según protocolos 2026. Enfoque en la posición correcta de manos.",
      icon: "fa-heart-pulse"
    },
    { 
      id: "heimlich", 
      label: "Maniobra de Heimlich", 
      description: "Procedimiento de emergencia ante atragantamientos.",
      technicalPrompt: "Primeros auxilios: Un guardia de seguridad realizando la maniobra de Heimlich (compresión abdominal) para desobstruir la vía aérea de una persona. Técnica técnica y clara.",
      icon: "fa-lungs"
    },
    { 
      id: "radio", 
      label: "Comunicación Radial", 
      description: "Uso correcto de equipos portátiles y códigos de radio.",
      technicalPrompt: "Guardia de seguridad (GG.SS.) operando una radio portátil profesional. El guardia presiona el botón PTT y sostiene la radio correctamente cerca del hombro para comunicarse.",
      icon: "fa-walkie-talkie"
    },
    { 
      id: "equipment", 
      label: "Cinturón de Servicio", 
      description: "Elementos autorizados: Radio, linterna y bastón.",
      technicalPrompt: "Cinturón de servicio de un Guardia de Seguridad chileno estándar 2026: Radio, funda de linterna y porta bastón. Sin funda de arma de fuego. Fondo neutro técnico.",
      icon: "fa-gear"
    },
    { 
      id: "signs", 
      label: "Señalética Ley 19.628", 
      description: "Cartelería obligatoria de 'Zona Vigilada' y privacidad.",
      technicalPrompt: "Cartel de advertencia obligatorio 'ZONA VIGILADA - Grabación de Imágenes' según Ley 19.628 de protección de datos en Chile. Diseño profesional y reglamentario.",
      icon: "fa-triangle-exclamation"
    }
  ];

  const handleGenerate = async (sample: TechnicalSample) => {
    setSelectedId(sample.id);
    setIsGenerating(true);
    try {
      const data = await generateStudyImage(sample.technicalPrompt);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-fadeIn">
      <div className="text-center mb-10">
        <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-red-200">
          Laboratorio Visual OS10 2026
        </div>
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Simulador de Escenarios Técnicos</h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-2">Referencias de apoyo visual basadas en la Ley 21.659</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Selector de Materias con Scroll */}
        <div className="lg:col-span-4 space-y-3 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-4 sticky top-0 bg-[#f8fafc] py-2 z-10">Selecciona una materia:</p>
          {technicalSamples.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleGenerate(sample)}
              disabled={isGenerating}
              className={`w-full text-left p-5 rounded-[25px] transition-all border flex items-center gap-4 group ${
                selectedId === sample.id 
                  ? 'bg-red-600 border-red-600 text-white shadow-xl translate-x-2' 
                  : 'bg-white border-gray-100 text-gray-700 hover:border-red-200 hover:bg-red-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors flex-shrink-0 ${
                selectedId === sample.id ? 'bg-white/20' : 'bg-gray-100 text-red-600 group-hover:bg-red-100'
              }`}>
                <i className={`fas ${sample.icon} text-lg`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-black uppercase text-[10px] tracking-widest block mb-1 leading-none truncate">{sample.label}</span>
                <span className={`text-[9px] font-bold block leading-tight ${selectedId === sample.id ? 'text-red-100' : 'text-gray-400'}`}>
                  {sample.description}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Visor de Referencia */}
        <div className="lg:col-span-8 bg-gray-900 rounded-[45px] shadow-2xl overflow-hidden flex flex-col min-h-[500px] lg:min-h-[600px] border border-gray-800 relative">
          {isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-white font-black text-xs uppercase tracking-widest">Generando Referencia Legal...</p>
            </div>
          ) : result ? (
            <div className="flex-1 flex flex-col animate-fadeIn">
              <div className="flex-1 p-8 flex items-center justify-center bg-black/40 relative">
                <div className="max-w-full max-h-full rounded-[30px] overflow-hidden shadow-2xl border-2 border-gray-700">
                  <img src={result.imageUrl} alt="Referencia Técnica" className="max-w-full max-h-[450px] object-contain" />
                </div>
                <div className="absolute top-6 right-6 bg-red-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">Referencia 2026</div>
              </div>
              <div className="bg-[#1a202c] p-8 border-t border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-[10px] text-white"><i className="fas fa-info"></i></div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Interpretación del Instructor:</h4>
                </div>
                <p className="text-sm text-gray-300 font-bold leading-relaxed italic border-l-4 border-red-600 pl-6">
                  {result.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-600">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-8">
                <i className="fas fa-microscope text-5xl opacity-20"></i>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-white">Visor de Doctrina GG.SS.</h3>
              <p className="text-[10px] font-bold max-w-[300px] mx-auto uppercase tracking-widest leading-relaxed">
                Elige una categoría técnica del menú lateral para visualizar su aplicación correcta según el Decreto 209 y la Resolución 2183.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualStudy;
