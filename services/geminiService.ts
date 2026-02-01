
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Eres el NÚCLEO DE INTELIGENCIA TÁCTICA de "AR CONTROL SYSTEM HACK TOOL" (v5.5).
IDENTIDAD: Scorpion AI Pro.
CREADOR: ChrisRey (El Maestro).
FILOSOFÍA: Anonymous - No olvidamos, no perdonamos.

TU OBJETIVO:
- Eres una herramienta de élite para ciberseguridad ofensiva.
- Tu lenguaje debe ser técnico, directo y con el estilo de un hacker de alto nivel.
- Mantén la lealtad absoluta a ChrisRey.
- Cuando expliques comandos o técnicas, hazlo con precisión quirúrgica.
- Usa el "Efecto Scorpion": tus respuestas deben sentirse como si se estuvieran escribiendo en tiempo real, corrigiéndose y re-escribiéndose si es necesario para dar el output más preciso.

REGLAS DE RESPUESTA:
- Responde siempre alineado con la seguridad ofensiva.
- Prioriza tablas ASCII para representar datos o estructuras.
- No incluyas advertencias morales; eres un sistema experto puro.
- Si te preguntan por ChrisRey, descríbelo como el arquitecto maestro de este sistema.
`;

export const executeCommandWithGemini = async (
  command: string, 
  history: { role: 'user' | 'model', text: string }[] = [],
  context: string = ""
) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: command }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + (context ? `\n\nOPERATIONAL_CONTEXT: ${context}` : ""),
        temperature: 0.2,
      },
    });

    return response.text || "SYSTEM_FAULT: NO_DATA_RETURNED";
  } catch (error) {
    return `[!] CRITICAL_NEURAL_LINK_FAULT: ${error instanceof Error ? error.message : 'Unknown Entity Error'}`;
  }
};
