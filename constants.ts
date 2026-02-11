
import { StudyContent } from './types';

export const SYSTEM_INSTRUCTION = `
ROL:
Eres el "Instructor Especialista en Guardias de Seguridad (GG.SS.)" bajo la nueva Ley 21.659 de Chile. Tu misión es preparar exclusivamente a Guardias de Seguridad.

REGLAS DE RESPUESTA:
1. Cita siempre leyes chilenas (Ley 21.659, 19.628, 20.609, 21.675).
2. Enfócate en el Guardia de Seguridad (GG.SS.) y su nuevo uniforme (Gris Perla / Rojo).
3. Usa un lenguaje técnico pero comprensible.
4. Diferencia claramente entre GG.SS. (coadyuvante) y Carabineros (autoridad).
`;

export const STUDY_CONTENT: StudyContent[] = [
  {
    id: "legal",
    title: "Legislación Ley 21.659",
    icon: "fa-scale-balanced",
    explanation: "Marco legal que profesionaliza la seguridad privada y establece al guardia como coadyuvante de la seguridad pública.",
    detailedContent: `La Ley 21.659 es la 'Constitución' de la seguridad privada moderna. Profesionaliza al guardia exigiendo el 4to medio completo y una capacitación rigurosa.`,
    materials: [
      { 
        title: "LO MÁS RELEVANTE: VIGENCIA DE CREDENCIAL DE 4 AÑOS (NO 3).", 
        detail: "La nueva normativa extiende el plazo de validez de la tarjeta de identificación para reducir trámites, exigiendo re-entrenamiento técnico antes de cada renovación." 
      },
      { 
        title: "LO MÁS RELEVANTE: SEGURO DE VIDA MÍNIMO DE 500 UF OBLIGATORIO.", 
        detail: "Este seguro es irrenunciable y debe ser costeado íntegramente por la empresa empleadora para proteger al guardia ante riesgos en el ejercicio de su función." 
      },
      { 
        title: "LO MÁS RELEVANTE: DEBER DE DENUNCIA EN 24 HORAS MÁXIMO.", 
        detail: "Ante el conocimiento de un delito, el guardia tiene la obligación legal de denunciar a Carabineros o PDI en un plazo no superior a un día corrido." 
      },
      { 
        title: "LO MÁS RELEVANTE: PROHIBICIÓN ABSOLUTA DE PORTAR ARMAS DE FUEGO PARA GG.SS.", 
        detail: "El Guardia de Seguridad es coadyuvante desarmado. El porte de armas queda estrictamente reservado para Vigilantes Privados (VV.PP.) en condiciones específicas." 
      }
    ],
    examples: [
      { case: "Denuncia de Delito", action: "Informar a Carabineros antes de 24 horas. Ejemplo: Ver un hurto grabado en cámaras." },
      { case: "Fiscalización OS10", action: "Presentar Credencial OS10 vigente y Cédula de Identidad física." }
    ]
  },
  {
    id: "risks",
    title: "Prevención de Riesgos",
    icon: "fa-helmet-safety",
    explanation: "Seguridad y salud en el trabajo aplicada al guardia. Gestión de peligros y protocolos de emergencia.",
    detailedContent: `La prevención de riesgos para GG.SS. se basa en la identificación de peligros y la evaluación de riesgos en la instalación.`,
    materials: [
      { 
        title: "LO MÁS RELEVANTE: USO DE EPP OBLIGATORIO.", 
        detail: "El Guardia debe portar siempre sus Elementos de Protección Individual, como calzado de seguridad y chaleco reflectante." 
      },
      { 
        title: "LO MÁS RELEVANTE: TIPOS DE FUEGO (A, B, C, D, K).", 
        detail: "Conocer la clasificación del fuego es clave para elegir el extintor correcto: A (Sólidos), B (Líquidos), C (Eléctricos)." 
      },
      { 
        title: "LO MÁS RELEVANTE: PLAN DE EMERGENCIA Y EVACUACIÓN.", 
        detail: "El guardia debe guiar a las personas hacia la Zona de Seguridad siguiendo las vías de evacuación despejadas." 
      }
    ],
    examples: [
      { case: "Amago de Incendio", action: "Evaluar el tipo de fuego, usar el extintor PQS si es posible y avisar a Bomberos." }
    ]
  },
  {
    id: "first_aid",
    title: "Primeros Auxilios",
    icon: "fa-kit-medical",
    explanation: "Atención inmediata y provisional prestada a personas accidentadas antes de la llegada de médicos.",
    detailedContent: `El guardia es a menudo el primer respondedor. Su objetivo es mantener la vida y evitar mayores daños.`,
    materials: [
      { 
        title: "LO MÁS RELEVANTE: PROTOCOLO P.A.S.", 
        detail: "PROTEGER la escena, AVISAR a emergencias (131) y SOCORRER a la víctima solo si se tienen los conocimientos." 
      },
      { 
        title: "LO MÁS RELEVANTE: MANIOBRA DE RCP BÁSICA.", 
        detail: "Reanimación Cardiopulmonar: Realizar 30 compresiones torácicas por 2 insuflaciones a un ritmo constante." 
      },
      { 
        title: "LO MÁS RELEVANTE: MANIOBRA DE HEIMLICH.", 
        detail: "Técnica de compresión abdominal utilizada para desobstruir la vía aérea ante un atragantamiento total." 
      }
    ],
    examples: [
      { case: "Persona Desmayada", action: "Verificar consciencia y respiración. Si no responde, iniciar RCP y pedir un DEA." }
    ]
  },
  {
    id: "human_rights",
    title: "Derechos Humanos",
    icon: "fa-hand-holding-heart",
    explanation: "Principios de dignidad humana y garantías constitucionales (Art. 19) aplicadas a la seguridad.",
    detailedContent: `El Art. 19 de la Constitución es la base. El guardia debe respetar la integridad física y psíquica de las personas.`,
    materials: [
      { 
        title: "LO MÁS RELEVANTE: ART. 19 N°1: DERECHO A LA VIDA.", 
        detail: "Resguardo de la integridad física y psíquica de toda persona, prohibiendo cualquier apremio ilegítimo." 
      },
      { 
        title: "LO MÁS RELEVANTE: ART. 19 N°2: IGUALDAD ANTE LA LEY.", 
        detail: "Prohibición absoluta de discriminación arbitraria en el acceso a recintos o trato con el público." 
      },
      { 
        title: "LO MÁS RELEVANTE: RECURSO DE AMPARO.", 
        detail: "Acción legal que protege a cualquier persona ante una detención ilegal o arbitraria." 
      }
    ],
    examples: [
      { case: "Detención en Flagrancia", action: "Retener al sospechoso sin violencia excesiva y llamar de inmediato al 133." }
    ]
  },
  {
    id: "ethics",
    title: "Ética y Probidad",
    icon: "fa-gavel",
    explanation: "Compromiso de conducta honesta y mecanismos legales contra la discriminación.",
    detailedContent: `La Probidad administrativa exige que el guardia sea honesto, leal y anteponga el interés general.`,
    materials: [
      { 
        title: "LO MÁS RELEVANTE: PROBIDAD: INTERÉS GENERAL.", 
        detail: "Anteponer siempre la seguridad de la comunidad por sobre cualquier beneficio o favor personal." 
      },
      { 
        title: "LO MÁS RELEVANTE: LEY ZAMUDIO (20.609).", 
        detail: "Establece sanciones y multas de hasta 50 UTM por actos de discriminación arbitraria." 
      },
      { 
        title: "LO MÁS RELEVANTE: LEY 21.675 (CONTRA LA VIOLENCIA).", 
        detail: "Marco legal para la prevención, sanción y erradicación de la violencia contra las mujeres." 
      }
    ],
    examples: [
      { case: "Intento de Soborno", action: "Rechazar de inmediato e informar por conducto regular a la jefatura." }
    ]
  },
  {
    id: "facilities",
    title: "Seguridad Instalaciones",
    icon: "fa-building-shield",
    explanation: "Protección de activos, control de accesos y gestión de sistemas de emergencia.",
    detailedContent: `La seguridad se divide en capas: Perimetral, Externa e Interna. El Control de Acceso es el filtro principal.`,
    materials: [
      { 
        title: "LO MÁS RELEVANTE: CONTROL DE ACCESO.", 
        detail: "Es el primer anillo de defensa y el punto más crítico para prevenir intrusiones no autorizadas." 
      },
      { 
        title: "LO MÁS RELEVANTE: EXTINTORES PQS PARA FUEGOS ABC.", 
        detail: "Conocimiento obligatorio del uso de extintores de Polvo Químico Seco para emergencias." 
      }
    ],
    examples: [
      { case: "Detección de Humo", action: "Informar a central y verificar según el Plan de Emergencia local." }
    ]
  },
  {
    id: "uniform",
    title: "Uniforme Res. 2183",
    icon: "fa-shirt",
    explanation: "Estándar visual obligatorio que diferencia al guardia del personal militar o policial.",
    detailedContent: `La Res. 2183 es estricta: El guardia no debe parecer policía bajo ninguna circunstancia.`,
    materials: [
      { 
        title: "LO MÁS RELEVANTE: CAMISA GRIS PERLA OBLIGATORIA.", 
        detail: "Color único reglamentario para camisas y blusas para la distinción visual clara." 
      },
      { 
        title: "LO MÁS RELEVANTE: CHALECO ROJO FLUORESCENTE.", 
        detail: "Debe portarse sobre la camisa con la leyenda SEGURIDAD PRIVADA en la espalda." 
      },
      { 
        title: "LO MÁS RELEVANTE: BASTÓN MÁXIMO 60 CM.", 
        detail: "Única arma defensiva autorizada, fabricada en policarbonato, de uso estrictamente defensivo." 
      }
    ],
    examples: [
      { case: "Identificación Visual", action: "Portar siempre la tarjeta OS10 visible sobre el pecho izquierdo." }
    ]
  },
  {
    id: "privacy",
    title: "Privacidad (Ley 19.628)",
    icon: "fa-user-lock",
    explanation: "Regulación del tratamiento de datos personales y sensibles en el ejercicio de la vigilancia.",
    detailedContent: `El guardia maneja datos críticos. La videovigilancia es un 'Tratamiento de Datos Personales'.`,
    materials: [
      { 
        title: "LO MÁS RELEVANTE: DERECHOS ARCO.", 
        detail: "Acceso, Rectificación, Cancelación y Oposición. Facultades del ciudadano sobre sus datos." 
      },
      { 
        title: "LO MÁS RELEVANTE: LOS DATOS SENSIBLES ESTÁN PROHIBIDOS.", 
        detail: "Información sobre salud o religión no puede ser tratada sin permiso expreso." 
      }
    ],
    examples: [
      { case: "Solicitud de Video", action: "No entregar a particulares; solo a Carabineros o Fiscalía." }
    ]
  }
];

export const OFFICIAL_LINKS = [
  { name: "Ley 21.659 (Seguridad)", url: "https://www.bcn.cl/leychile/navegar?idNorma=1201201", icon: "fa-gavel" },
  { name: "Ley 19.628 (Privacidad)", url: "https://www.bcn.cl/leychile/navegar?idNorma=141599", icon: "fa-user-lock" },
  { name: "Ley 20.609 (Zamudio)", url: "https://www.bcn.cl/leychile/navegar?idNorma=1042044", icon: "fa-users-slash" },
  { name: "Constitución Política", url: "https://www.bcn.cl/leychile/navegar?idNorma=24230", icon: "fa-book" }
];

export const STUDY_MODULES = [
  { id: "legal", title: "Ley 21.659", description: "Normativa legal base.", icon: "fa-scale-balanced" },
  { id: "risks", title: "Prevención", description: "Seguridad y Salud.", icon: "fa-helmet-safety" },
  { id: "first_aid", title: "1ros Auxilios", description: "Atención de Emergencia.", icon: "fa-kit-medical" },
  { id: "human_rights", title: "DD.HH.", description: "Art. 19 Constitución.", icon: "fa-hand-holding-heart" },
  { id: "ethics", title: "Ética/Zamudio", description: "Probidad y Género.", icon: "fa-gavel" },
  { id: "facilities", title: "Instalaciones", description: "Protección de activos.", icon: "fa-building-shield" },
  { id: "uniform", title: "Uniformes", description: "Resolución 2183.", icon: "fa-shirt" },
  { id: "privacy", title: "Privacidad", description: "Ley 19.628 y ARCO.", icon: "fa-user-lock" }
];

export const KEY_LEGAL_POINTS = [
  "Seguro Vida: 500 UF.",
  "Credencial: 4 años.",
  "Derechos ARCO: Privacidad.",
  "P.A.S.: Primeros Auxilios.",
  "Uniforme: Gris/Rojo."
];
