
import React, { useState } from 'react';
import { TECHNICAL_DICT } from '../constants';

const ProductivityTools: React.FC = () => {
  const [tab, setTab] = useState<'calc' | 'conv' | 'dict' | 'notes'>('dict');
  const [search, setSearch] = useState('');
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [notes, setNotes] = useState<string[]>(() => {
    const saved = localStorage.getItem('ar_notes');
    return saved ? JSON.parse(saved) : ["Bienvenido al centro de notas. Guardado local activado."];
  });
  const [newNote, setNewNote] = useState('');

  const filteredDict = TECHNICAL_DICT.filter(i => 
    i.term.toLowerCase().includes(search.toLowerCase()) || 
    i.area.toLowerCase().includes(search.toLowerCase())
  );

  const saveNotes = (updated: string[]) => {
    setNotes(updated);
    localStorage.setItem('ar_notes', JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] p-4 md:p-8 overflow-hidden animate-in zoom-in-95 duration-500 font-cyber">
      <div className="flex gap-2 md:gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar scroll-smooth">
        {[
          {id: 'dict', name: 'Diccionario', icon: '📖'},
          {id: 'calc', name: 'Calculadora', icon: '🔢'},
          {id: 'conv', name: 'Conversor', icon: '🔄'},
          {id: 'notes', name: 'Notas Rápidas', icon: '📝'}
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setTab(item.id as any)} 
            className={`px-6 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all flex items-center gap-3 whitespace-nowrap shadow-lg ${tab === item.id ? 'bg-[var(--neon-accent)] text-black shadow-[0_0_15px_var(--neon-glow)] scale-105' : 'bg-white/5 text-white/40 hover:text-white'}`}
          >
            <span>{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {tab === 'dict' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <input 
              type="text" 
              placeholder="BUSCAR TÉRMINO (ELECTRÓNICA / ROBÓTICA / HACKING...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-8 text-white outline-none focus:border-[var(--neon-accent)] transition-all font-terminal text-sm shadow-inner uppercase"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDict.map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-[var(--neon-accent)] transition-all group hover:scale-[1.02] shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[var(--neon-accent)] font-black uppercase tracking-[0.2em]">{item.term}</span>
                    <span className="text-[8px] text-white/20 px-3 py-1 bg-white/5 rounded-full">{item.area}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-terminal">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'calc' && (
          <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto animate-in zoom-in-95 duration-500">
             <div className="w-full bg-black/80 border-4 border-white/10 p-10 rounded-[3rem] shadow-2xl space-y-8">
                <div className="bg-black/40 border-2 border-white/5 p-8 rounded-2xl text-right text-4xl font-terminal text-[var(--neon-accent)] shadow-inner break-all overflow-hidden min-h-[4rem]">
                   {calcDisplay}
                </div>
                <div className="grid grid-cols-4 gap-4">
                   {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+','C'].map(btn => (
                     <button 
                      key={btn}
                      onClick={() => {
                        if (btn === 'C') setCalcDisplay('0');
                        else if (btn === '=') {
                          try { setCalcDisplay(eval(calcDisplay).toString()); } catch { setCalcDisplay('ERROR'); }
                        } else {
                          setCalcDisplay(prev => prev === '0' ? btn : prev + btn);
                        }
                      }}
                      className={`h-16 rounded-2xl flex items-center justify-center font-black text-xl transition-all active:scale-90 shadow-lg ${btn === '=' ? 'bg-[var(--neon-accent)] text-black col-span-1 shadow-[0_0_15px_var(--neon-glow)]' : btn === 'C' ? 'bg-red-600/20 text-red-500 border border-red-500/20' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
                     >
                       {btn}
                     </button>
                   ))}
                </div>
             </div>
          </div>
        )}

        {tab === 'conv' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-500">
             <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-xl space-y-6">
                <h4 className="text-[var(--neon-accent)] font-black uppercase tracking-widest text-[10px] mb-4 border-l-4 border-[var(--neon-accent)] pl-4">Conversor de Almacenamiento</h4>
                <div className="space-y-4">
                  <input type="number" placeholder="VALOR" className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white text-sm" />
                  <div className="flex gap-4">
                    <select className="flex-1 bg-black border border-white/10 rounded-xl py-3 px-4 text-xs">
                      <option>MB (Megabytes)</option>
                      <option>GB (Gigabytes)</option>
                      <option>TB (Terabytes)</option>
                    </select>
                    <span className="text-[var(--neon-accent)] self-center">➜</span>
                    <select className="flex-1 bg-black border border-white/10 rounded-xl py-3 px-4 text-xs">
                      <option>GB (Gigabytes)</option>
                      <option>MB (Megabytes)</option>
                      <option>TB (Terabytes)</option>
                    </select>
                  </div>
                </div>
             </div>
             <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] shadow-xl space-y-6">
                <h4 className="text-[var(--neon-accent)] font-black uppercase tracking-widest text-[10px] mb-4 border-l-4 border-[var(--neon-accent)] pl-4">Conversor Electrónico</h4>
                <div className="space-y-4">
                   <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Resistencias, Voltaje, Amperaje</p>
                   <div className="h-40 flex items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-white/10 italic">Módulo de IA para fórmulas activo</div>
                </div>
             </div>
          </div>
        )}

        {tab === 'notes' && (
          <div className="space-y-8 animate-in fade-in duration-500 h-full flex flex-col">
             <div className="flex gap-4">
                <input 
                  type="text" 
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="AÑADIR NOTA RÁPIDA..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-3xl py-4 px-8 text-white text-sm uppercase font-terminal shadow-inner focus:border-[var(--neon-accent)] transition-all"
                  onKeyDown={(e) => { if(e.key === 'Enter') { saveNotes([newNote, ...notes]); setNewNote(''); } }}
                />
                <button 
                  onClick={() => { saveNotes([newNote, ...notes]); setNewNote(''); }}
                  className="w-14 h-14 rounded-full bg-[var(--neon-accent)] text-black flex items-center justify-center shadow-lg active:scale-90"
                >
                  <span className="text-2xl">+</span>
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                {notes.map((note, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-4 group hover:bg-[var(--neon-accent)]/5 transition-all">
                     <p className="text-xs text-white/80 font-terminal leading-relaxed">{note}</p>
                     <div className="mt-auto flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => saveNotes(notes.filter((_, idx) => idx !== i))} className="text-red-500 text-[10px] hover:underline uppercase font-black">Eliminar</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductivityTools;
