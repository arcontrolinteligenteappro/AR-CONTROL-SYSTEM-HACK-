
import React, { useState } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';

const CommandIntel: React.FC = () => {
  const [query, setQuery] = useState('');
  const [intelligence, setIntelligence] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchIntel = async (cmd?: string) => {
    const targetCmd = cmd || query;
    if (!targetCmd.trim()) return;
    
    setLoading(true);
    const prompt = `Proporciona INTELIGENCIA TÁCTICA sobre el comando o herramienta: ${targetCmd}.
    INCLUYE:
    1. Descripción técnica breve.
    2. Sintaxis básica y avanzada (3 ejemplos).
    3. MÉTODO DE USO: Cómo se emplea en un escenario de auditoría.
    4. FUNCIONAMIENTO REAL VS SIMULADO: Qué ocurre realmente en el sistema cuando se ejecuta.
    5. CONSEJOS PRÁCTICOS DE SCORPION: Trucos para evitar detección o mejorar eficiencia.
    6. REDIRECCIÓN: ¿En qué sistema operativo (Kali, Termux, Windows) es más común?`;
    
    const response = await executeCommandWithGemini(prompt, [], "COMMAND_TACTICAL_INTELLIGENCE");
    setIntelligence(response);
    setLoading(false);
  };

  const commonCmds = ['nmap -sS', 'sqlmap -u', 'msfvenom -p', 'aircrack-ng', 'netcat -lvp', 'hashcat -m'];

  return (
    <div className="flex flex-col h-full bg-black/95 font-terminal p-6 overflow-hidden">
      <div className="mb-8 border-b border-white/10 pb-6 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <span className="text-4xl">⌨️</span>
            <div>
              <h2 className="text-xl font-black text-[var(--neon-accent)] tracking-[0.2em] uppercase">COMMAND_INTELLIGENCE</h2>
              <p className="text-[8px] opacity-30 uppercase tracking-[0.4em]">Tactical Manual & Operational Logic</p>
            </div>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
        <div className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar pr-2">
           <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4">
              <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Command Search</h3>
              <div className="flex gap-2">
                 <input 
                  type="text" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchIntel()}
                  placeholder="e.g. nmap -sV" 
                  className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-[var(--neon-accent)] outline-none focus:border-[var(--neon-accent)]"
                 />
                 <button onClick={() => fetchIntel()} className="px-4 bg-[var(--neon-accent)] text-black rounded-xl">➜</button>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4">
              <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Tactical Quick-Links</h3>
              <div className="grid grid-cols-2 gap-2">
                 {commonCmds.map(c => (
                   <button 
                    key={c} 
                    onClick={() => { setQuery(c); fetchIntel(c); }}
                    className="p-3 bg-black border border-white/5 rounded-xl text-[9px] text-white/40 hover:text-[var(--neon-accent)] hover:border-[var(--neon-accent)] transition-all text-left truncate"
                   >
                     {c}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 bg-black/40 border border-white/5 rounded-[3rem] p-8 flex flex-col overflow-hidden relative shadow-2xl">
           <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none text-9xl">⌨️</div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar font-terminal text-[13px] text-[#00f3ff]/90 space-y-4 leading-relaxed p-4 bg-black/60 border border-white/5 rounded-2xl">
              {intelligence ? (
                <pre className="whitespace-pre-wrap animate-in fade-in duration-700">
                   {intelligence}
                </pre>
              ) : loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-6">
                   <div className="w-12 h-12 border-4 border-[var(--neon-accent)]/20 border-t-[var(--neon-accent)] rounded-full animate-spin"></div>
                   <div className="text-[10px] font-black animate-pulse tracking-widest">QUERYING_SCORPION_MANUALS...</div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-10 text-center py-20 uppercase tracking-[1.5em]">
                   READY_FOR_COMMAND_QUERY
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommandIntel;
