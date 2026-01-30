
import React, { useState, useRef, useEffect } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [chat, setChat] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [chat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await executeCommandWithGemini(userMsg, chat, "SCORPION_CONSULTANT_MODE");
    setChat(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] font-mono text-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
         <span className="text-[15rem] leading-none">🦂</span>
      </div>

      <div className="bg-black/80 border-b border-[var(--neon-accent)]/20 p-4 flex justify-between items-center z-10">
         <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_red]"></span>
            <span className="text-[10px] font-cyber tracking-widest uppercase text-white/80">SCORPION AI CONSULTANT</span>
         </div>
         <span className="text-[8px] opacity-30 font-cyber">OFFENSIVE_KNOWLEDGE_BASE v4.0</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar z-10">
        {chat.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
             <div className="text-5xl">🦂</div>
             <div className="max-w-md">
                <p className="font-cyber tracking-[0.2em] uppercase text-xs">Bienvenido al Núcleo Scorpion</p>
                <p className="text-[10px] mt-2">Pide comandos, busca repositorios de GitHub, solicita consejos de intrusión o aprende a asegurar tus redes.</p>
             </div>
          </div>
        )}

        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
             <div className={`max-w-[85%] p-4 rounded-xl border ${msg.role === 'user' ? 'bg-[var(--neon-accent)]/10 border-[var(--neon-accent)]/20 text-white' : 'bg-black/60 border-white/10 text-[#00f3ff]/90'}`}>
                <div className="text-[8px] uppercase tracking-widest mb-2 opacity-40 font-cyber">
                   {msg.role === 'user' ? 'OPERATOR' : 'SCORPION_CORE'}
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed text-[12px]">{msg.text}</pre>
             </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-black/60 border border-white/10 p-4 rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-bounce delay-200"></span>
             </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-black/80 border-t border-white/5 z-10">
        <div className="relative group">
           <input 
             type="text" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Pregunta algo sobre hacking, comandos o repositorios..."
             className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 focus:border-[var(--neon-accent)] outline-none transition-all pr-16"
           />
           <button 
             type="submit"
             disabled={isTyping}
             className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--neon-accent)]/10 border border-[var(--neon-accent)]/30 text-[var(--neon-accent)] flex items-center justify-center hover:bg-[var(--neon-accent)] hover:text-black transition-all disabled:opacity-30"
           >
              ➜
           </button>
        </div>
      </form>
    </div>
  );
};

export default AIConsultant;
