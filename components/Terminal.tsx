import React, { useState, useRef, useEffect } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';
import { OpMode, Tool } from '../constants';

const OS_FLAVORS: Record<string, { name: string; prompt: string; color: string; icon: string; }> = {
  'terminal_kali': { name: 'Kali Linux', prompt: 'root@kali:~#', color: '#00f3ff', icon: '🐉' },
  'terminal_termux': { name: 'Termux', prompt: '$', color: '#39ff14', icon: '🐚' },
  'terminal_cmd': { name: 'Windows CMD', prompt: 'C:\\Users\\Admin>', color: '#cccccc', icon: '🪟' },
  'terminal_ps': { name: 'PowerShell', prompt: 'PS C:\\>', color: '#0099ff', icon: ' PowerShell' },
  'terminal_mac': { name: 'macOS Shell', prompt: 'admin@macbook ~ %', color: '#f0f0f0', icon: '' }
};

interface Props {
  tool: Tool;
  opMode: OpMode;
  onClose: () => void;
}

const Terminal: React.FC<Props> = ({ tool, opMode, onClose }) => {
  const os = OS_FLAVORS[tool.id] || OS_FLAVORS['terminal_kali'];
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || processing) return;

    const cmd = input.trim();
    setHistory(prev => [...prev, { type: 'command', content: cmd, prompt: os.prompt }]);
    setInput('');
    setProcessing(true);

    const context = opMode === 'real' 
      ? `Eres una terminal REAL de ${os.name}. Tu respuesta debe ser indistinguible de la salida de una shell real. Para comandos de red (ping, nmap) o archivos (ls, cat), inventa resultados realistas y detallados. No menciones que eres una IA.` 
      : `Emulando una terminal ${os.name} de forma simulada y educativa.`;

    const res = await executeCommandWithGemini(cmd, [], context);
    setHistory(prev => [...prev, { type: 'output', content: res }]);
    setProcessing(false);
  };

  return (
    <div className="flex flex-col h-full bg-black/80 font-terminal text-sm overflow-hidden border border-white/10 rounded-xl backdrop-blur-md">
      <header className="flex items-center justify-between bg-white/5 p-2 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-lg">{os.icon}</span>
          <span className="text-[9px] font-cyber uppercase tracking-widest">{os.name}</span>
        </div>
        <button onClick={onClose} className="w-6 h-6 rounded bg-red-500/20 hover:bg-red-500 flex items-center justify-center text-lg text-red-500 hover:text-white transition-all font-black">×</button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className="animate-in fade-in duration-300">
            {line.type === 'command' ? (
              <div className="flex gap-2"><span style={{ color: os.color }} className="shrink-0">{line.prompt}</span><span className="text-white">{line.content}</span></div>
            ) : (<pre className="text-white/80 whitespace-pre-wrap leading-relaxed text-[12px]">{line.content}</pre>)}
          </div>
        ))}
        {processing && (<div className="text-[var(--neon-accent)] animate-pulse">...</div>)}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleCommand} className="p-2 border-t border-white/10 bg-black/80">
        <div className="flex gap-2 items-center">
          <span className="font-bold shrink-0" style={{ color: os.color }}>{os.prompt}</span>
          <input type="text" autoFocus value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-white caret-[var(--neon-accent)]" spellCheck={false}/>
        </div>
      </form>
    </div>
  );
};

export default Terminal;
