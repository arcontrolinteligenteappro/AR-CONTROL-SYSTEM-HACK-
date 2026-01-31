
import React, { useState, useRef, useEffect } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [chat, setChat] = useState<any[]>([
    { role: 'model', text: '[+] SCORPION_AI ONLINE.\n[+] Identificado: ChrisRey91 Operador Maestro.\n[+] ¿En qué puedo asistirte hoy? Puedo explicar comandos, generar exploits o analizar archivos.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [chat]);

  const startVoice = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => setInput(e.results[0][0].transcript);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const msg = input.trim();
    setInput('');
    setChat(prev => [...prev, { role: 'user', text: msg }]);
    setIsTyping(true);

    const res = await executeCommandWithGemini(msg, chat, "Eres Scorpion AI. Eres un experto en ciberseguridad, robótica y electrónica. Explica de forma detallada, proporciona código real y usa tablas ASCII. Estás ayudando a ChrisRey91.");
    setChat(prev => [...prev, { role: 'model', text: res }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-700 font-terminal">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>
        {chat.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl border transition-all duration-500 shadow-xl ${m.role === 'user' ? 'bg-[var(--neon-accent)]/10 border-[var(--neon-accent)]/30 text-white rounded-tr-none' : 'bg-white/5 border-white/10 text-[var(--neon-accent)] rounded-tl-none relative overflow-hidden'}`}>
              {m.role === 'model' && (
                <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none select-none text-6xl">🦂</div>
              )}
              <pre className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">{m.text}</pre>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl rounded-tl-none animate-pulse flex gap-2 items-center">
              <div className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-bounce delay-200"></div>
              <span className="text-[10px] text-white/30 uppercase ml-2 tracking-widest">Scorpion_Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-black/80 border-t border-white/10 backdrop-blur-md">
        <div className="flex gap-4 items-center max-w-5xl mx-auto">
          <button 
            type="button" 
            onClick={startVoice}
            title="Dictar comando"
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-90 ${isListening ? 'bg-red-600 animate-pulse text-white shadow-red-500/50' : 'bg-white/5 hover:bg-white/10 text-[var(--neon-accent)] border border-white/10'}`}
          >
            <span className="text-2xl">🎤</span>
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Introduce consulta técnica o dicta comando..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white outline-none focus:border-[var(--neon-accent)] transition-all font-mono text-sm shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-14 h-14 rounded-full bg-[var(--neon-accent)] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_var(--neon-glow)] disabled:opacity-30"
          >
            <span className="text-2xl">➜</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIConsultant;
