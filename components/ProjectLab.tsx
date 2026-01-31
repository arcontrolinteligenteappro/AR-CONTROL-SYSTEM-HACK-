
import React, { useState } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';

const HARDWARE_PLATFORMS = [
  { id: 'arduino', name: 'Arduino (Uno/Mega/Nano)', icon: '♾️' },
  { id: 'esp32', name: 'ESP32 / ESP8266', icon: '📡' },
  { id: 'raspberry', name: 'Raspberry Pi', icon: '🍓' },
  { id: 'flipper', name: 'Flipper Zero / M5Stack', icon: '🐬' }
];

const TEMPLATES = [
  { title: 'Lector de Monedas', prompt: 'Deseo hacer un proyecto de lector de monedas con Arduino que muestre el resultado en un LCD. Dame materiales, procedimiento y código.' },
  { title: 'Pulsador de Botones', prompt: 'Deseo implementar una pulsadora de botones automática con un servomotor y Arduino. Materiales, conexiones y código.' },
  { title: 'Cerradura Electrónica', prompt: 'Deseo controlar una cerradura electrónica (solenoide) con Arduino mediante un teclado matricial o RFID.' },
  { title: 'Automatización Domótica', prompt: 'Deseo controlar las luces de una casa mediante un ESP32 y una aplicación web móvil.' }
];

const ProjectLab: React.FC = () => {
  const [platform, setPlatform] = useState(HARDWARE_PLATFORMS[0]);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateProject = async (customQuery?: string) => {
    const finalQuery = customQuery || query;
    if (!finalQuery.trim()) return;
    setLoading(true);
    setResult('');
    
    const prompt = `Actúa como Scorpion Hardware Expert. Genera un proyecto completo sobre: "${finalQuery}". 
    La plataforma elegida es: ${platform.name}. 
    Incluye:
    1. Lista de materiales.
    2. Diagrama de conexiones (descripción detallada).
    3. Procedimiento paso a paso.
    4. CÓDIGO FUENTE completo y comentado listo para compilar.`;
    
    const response = await executeCommandWithGemini(prompt, [], "HARDWARE_PROJECT_GENERATOR_MODE");
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] p-6 overflow-hidden animate-in fade-in duration-700 font-cyber">
      <div className="flex items-center gap-4 mb-8">
        <div className="text-5xl animate-pulse">🧪</div>
        <div>
          <h2 className="text-xl font-black text-[var(--neon-accent)] tracking-widest uppercase">Scorpion_Hardware_Lab</h2>
          <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase">Proyectos, Robótica & Automatización</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
        {/* Configuración */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar pr-2">
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4">
             <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-4 border-l-4 border-[var(--neon-accent)] pl-4">Seleccionar_Plataforma</h3>
             <div className="grid grid-cols-2 gap-3">
                {HARDWARE_PLATFORMS.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setPlatform(p)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${platform.id === p.id ? 'bg-[var(--neon-accent)]/20 border-[var(--neon-accent)] text-white' : 'bg-black/40 border-white/5 text-white/30'}`}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-[8px] font-black uppercase text-center">{p.name}</span>
                  </button>
                ))}
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4">
             <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-4 border-l-4 border-[var(--neon-accent)] pl-4">Proyectos_Sugeridos</h3>
             <div className="flex flex-wrap gap-2">
                {TEMPLATES.map((t, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setQuery(t.prompt); generateProject(t.prompt); }}
                    className="px-3 py-1.5 bg-white/5 hover:bg-[var(--neon-accent)]/20 border border-white/10 rounded-xl text-[9px] uppercase font-bold text-white/60 transition-all"
                  >
                    {t.title}
                  </button>
                ))}
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4">
             <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-4 border-l-4 border-[var(--neon-accent)] pl-4">Prompt_Personalizado</h3>
             <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe tu proyecto de hardware..."
                className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-[var(--neon-accent)] outline-none min-h-[120px] font-terminal"
             />
             <button 
                onClick={() => generateProject()}
                disabled={loading || !query.trim()}
                className="w-full py-4 bg-[var(--neon-accent)] text-black font-black uppercase tracking-[0.3em] text-[11px] hover:brightness-125 transition-all rounded-2xl shadow-[0_0_20px_var(--neon-glow)] disabled:opacity-30"
             >
                {loading ? 'SCORPION_WORKING...' : 'DESARROLLAR_PROYECTO'}
             </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2 bg-black/80 border border-white/5 rounded-[3rem] p-8 flex flex-col overflow-hidden shadow-2xl relative">
           <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none text-9xl">🦾</div>
           <div className="bg-white/5 p-3 rounded-xl text-[9px] text-white/40 uppercase tracking-widest flex justify-between border-b border-white/5 mb-6">
              <span>Blueprint_Output_Console</span>
              <span className="text-[var(--neon-accent)]">Live_Sync</span>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar font-terminal text-sm text-[#00f3ff]/90 space-y-4 leading-relaxed p-4 bg-black/40 border border-white/5 rounded-2xl">
              {result ? (
                <pre className="whitespace-pre-wrap selection:bg-[var(--neon-accent)] selection:text-black">
                   {result}
                </pre>
              ) : loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                   <div className="w-16 h-16 border-4 border-[var(--neon-accent)]/20 border-t-[var(--neon-accent)] rounded-full animate-spin"></div>
                   <p className="animate-pulse uppercase tracking-[0.5em] text-[10px]">Scorpion procesando ingeniería...</p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-10 text-center py-20 uppercase tracking-[1em]">
                   AWAITING_PROJECT_INITIALIZATION
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLab;
