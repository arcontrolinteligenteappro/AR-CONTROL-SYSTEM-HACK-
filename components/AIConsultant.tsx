
import React, { useState, useRef, useEffect } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';
import ScorpionText from './ScorpionText';

const AIConsultant: React.FC = () => {
  const [chat, setChat] = useState<any[]>([
    { role: 'model', text: '[+] SCORPION_AI ONLINE.\n[+] Operador: ChrisRey Maestro.\n[+] Anonymous activo: No olvidamos.\n[+] ¿Objetivo?' }
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

    const res = await executeCommandWithGemini(msg, chat, "Eres Scorpion IA, la inteligencia de AR CONTROL SYSTEM HACK TOOL. Tu creador es ChrisRey. Eres un experto agresivo en hacking. Tu lema es Anonymous: No olvidamos, no perdonamos.");
    setChat(prev => [...prev, { role: 'model', text: res }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#020408] animate-in fade-in duration-700 font-terminal">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>
        {chat.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] md:max-w-[80%] p-6 rounded-3xl border transition-all duration-500 shadow-2xl ${m.role === 'user' ? 'bg-[var(--neon-accent)]/10 border-[var(--neon-accent)]/30 text-white rounded-tr-none' : 'bg-white/5 border-white/10 text-[var(--neon-accent)] rounded-tl-none relative overflow-hidden'}`}>
              <pre className="whitespace-pre-wrap text-[11px] md:text-sm leading-relaxed tracking-wide">
                {m.role === 'model' && i === chat.length - 1 && !isTyping ? <ScorpionText text={m.text} speed={30} delay={0} /> : m.text}
              </pre>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none animate-pulse flex gap-3 items-center">
              <div className="w-2 h-2 bg-[var(--neon-accent)] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[var(--neon-accent)] rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-[var(--neon-accent)] rounded-full animate-bounce delay-200"></div>
              <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] ml-2">Scorpion_Typing...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-black/90 border-t border-white/10 backdrop-blur-3xl pb-safe">
        <div className="flex gap-4 items-center max-w-5xl mx-auto">
          <button 
            type="button" 
            onClick={startVoice}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-600 animate-pulse text-white' : 'bg-white/5 text-[var(--neon-accent)] border border-white/10'}`}
          >
            <span className="text-xl">🎤</span>
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Introduce comando o consulta..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white outline-none focus:border-[var(--neon-accent)] transition-all font-terminal text-sm uppercase"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-14 h-14 rounded-full bg-[var(--neon-accent)] text-black flex items-center justify-center disabled:opacity-30 shadow-[0_0_15px_var(--neon-glow)]"
          >
            <span className="text-xl">➜</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIConsultant;
