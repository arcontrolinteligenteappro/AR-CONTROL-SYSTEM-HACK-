
import React, { useState, useEffect, memo } from 'react';
import { TerminalLine as ITerminalLine } from '../types';

interface Props {
  line: ITerminalLine;
}

const TerminalLine: React.FC<Props> = memo(({ line }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Sin animación para comandos o mensajes del sistema, solo renderizarlos.
    if (line.type === 'command' || line.type === 'system') {
      setDisplayedContent(line.content || '');
      setIsTyping(false);
      return;
    }

    // Animación de escritura para output/error
    if (line.content) {
      setIsTyping(true);
      setDisplayedContent(''); // Restablecer contenido para la animación
      let i = 0;
      const fullText = line.content;
      // Ajustar velocidad: más rápido para texto corto, más lento para texto muy largo para ser legible
      const delay = fullText.length > 300 ? 1 : 5;

      const interval = setInterval(() => {
        setDisplayedContent(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, delay);
      
      return () => clearInterval(interval);
    } else {
      setDisplayedContent('');
      setIsTyping(false);
    }
  }, [line.id, line.content, line.type]); // Depender de props estables

  if (line.type === 'command') {
    const prompt = line.command || 'admin@ar-control';
    const [user, host] = prompt.split('@');
    return (
      <div className="flex gap-3 mb-1 opacity-90">
        <div className="flex gap-1 shrink-0 select-none font-bold text-[14px]">
          <span className="text-[var(--neon-accent)] opacity-80">{user}</span>
          <span className="text-white/20">@</span>
          <span className="text-[var(--neon-magenta)] opacity-80">{host || 'ar-control'}</span>
          <span className="text-white/40">:</span>
          <span className="text-[var(--neon-green)]">{line.path || '~'}</span>
          <span className="text-[var(--neon-accent)]">#</span>
        </div>
        <span className="text-white font-mono tracking-wide">{line.content}</span>
      </div>
    );
  }

  if (line.type === 'error') {
    return (
      <div className="border-l-2 border-[#ff0033] pl-4 py-1 my-1 error-glitch bg-red-500/5">
        <pre className="whitespace-pre-wrap font-mono text-[12px] uppercase">
          [!] {displayedContent}
          {isTyping && <span className="inline-block w-2 h-3 bg-[#ff0033] ml-1 animate-pulse"></span>}
        </pre>
      </div>
    );
  }

  // Mejora visual para salidas de herramientas específicas (simulación de UI híbrida)
  const isHybrid = line.content.includes('[+]') || line.content.includes('|--') || line.content.includes('SUCCESS');

  if (line.type === 'system' || (line.type === 'output' && isHybrid)) {
    return (
      <div className="relative group">
         <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-[var(--neon-accent)] opacity-20 group-hover:opacity-100 transition-opacity"></div>
         <pre className={`text-[var(--neon-accent)] opacity-90 whitespace-pre-wrap mb-4 font-mono text-[11px] leading-tight filter drop-shadow-[0_0_2px_var(--neon-glow)] ${isHybrid ? 'bg-[var(--neon-accent)]/5 p-2 rounded border border-[var(--neon-accent)]/10' : ''}`}>
            {displayedContent}
            {isTyping && <span className="inline-block w-2 h-3 bg-[var(--neon-accent)] ml-1 animate-pulse shadow-[0_0_8px_var(--neon-accent)]"></span>}
         </pre>
      </div>
    );
  }

  return (
    <div className="mb-2">
      <pre className="text-gray-300 whitespace-pre-wrap font-mono leading-relaxed text-[13px] selection:bg-[var(--neon-accent)] selection:text-black">
        {displayedContent}
        {isTyping && <span className="inline-block w-2 h-4 bg-[var(--neon-accent)] ml-1 animate-pulse shadow-[0_0_8px_var(--neon-accent)]"></span>}
      </pre>
    </div>
  );
});

export default TerminalLine;
