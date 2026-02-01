
import React, { useState, useRef, useEffect } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';
import { OpMode, Tool } from '../constants';

const OS_FLAVORS: Record<string, { name: string; prompt: string; color: string; icon: string; user: string; host: string; shell: string }> = {
  'terminal_kali': { name: 'Kali Linux', prompt: 'root@kali:~#', color: '#00f3ff', icon: '🐉', user: 'root', host: 'kali', shell: 'zsh' },
  'terminal_termux': { name: 'Termux', prompt: '$', color: '#39ff14', icon: '🐚', user: 'u0_a156', host: 'localhost', shell: 'bash' },
  'terminal_windows': { name: 'Windows CMD', prompt: 'C:\\Users\\Admin>', color: '#ffffff', icon: '🪟', user: 'Admin', host: 'DESKTOP-GHOST', shell: 'cmd.exe' },
  'terminal_macos': { name: 'macOS Zsh', prompt: 'admin@MacBook-Pro ~ %', color: '#e5e7eb', icon: '🍎', user: 'admin', host: 'MacBook-Pro', shell: 'zsh' },
  'terminal_ubuntu': { name: 'Ubuntu', prompt: 'user@ubuntu:~$', color: '#e67e22', icon: '🟠', user: 'user', host: 'ubuntu', shell: 'bash' },
};

interface Props {
  tool: Tool;
  opMode: OpMode;
}

const Terminal: React.FC<Props> = ({ tool, opMode }) => {
  const os = OS_FLAVORS[tool.id] || OS_FLAVORS['terminal_kali'];
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'command' | 'output' | 'system'; content: string; prompt?: string }[]>([]);
  const [processing, setProcessing] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory([
      { type: 'system', content: `[+] ${os.name} Engine v5.5 initialized` },
      { type: 'system', content: `[+] Shell: ${os.shell} | User: ${os.user} | Host: ${os.host}` },
      { type: 'system', content: `[+] Mode: ${opMode.toUpperCase()}` }
    ]);
  }, [tool.id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, processing]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd || processing) return;

    setHistory(prev => [...prev, { type: 'command', content: cmd, prompt: os.prompt }]);
    setInput('');

    if (cmd.toLowerCase() === 'clear' || cmd.toLowerCase() === 'cls') {
      setHistory([]);
      return;
    }

    setProcessing(true);

    const context = `Actúa como una terminal de ${os.name}. 
    SISTEMA: ${os.name}.
    SHELL: ${os.shell}.
    USUARIO: ${os.user}.
    HOST: ${os.host}.
    MODO: ${opMode}.
    Si el sistema es Windows, usa comandos como 'dir', 'ipconfig', 'type'.
    Si es Linux/macOS, usa 'ls', 'ifconfig', 'cat'.
    Muestra solo la salida técnica, sin explicaciones.`;

    const res = await executeCommandWithGemini(cmd, [], context);
    setHistory(prev => [...prev, { type: 'output', content: res }]);
    setProcessing(false);
  };

  return (
    <div className="flex flex-col h-full bg-black/95 font-terminal text-[12px] md:text-[14px] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-150">
            {line.type === 'command' ? (
              <div className="flex gap-2">
                <span className="shrink-0 font-bold" style={{ color: os.color }}>{line.prompt}</span>
                <span className="text-white tracking-wider">{line.content}</span>
              </div>
            ) : line.type === 'system' ? (
              <div className="text-[var(--neon-accent)] opacity-30 font-bold text-[10px] tracking-widest">{line.content}</div>
            ) : (
              <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed font-terminal mt-1 mb-4 bg-white/5 p-3 rounded-lg border border-white/5 shadow-inner">
                {line.content}
              </pre>
            )}
          </div>
        ))}
        {processing && (
          <div className="flex items-center gap-2 text-[var(--neon-accent)] animate-pulse mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-accent)]"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Executing_Subprocess...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleCommand} className="p-4 bg-black border-t border-white/10 shrink-0 flex items-center gap-2">
        <span className="font-bold shrink-0 text-sm" style={{ color: os.color }}>{os.prompt}</span>
        <input 
          type="text" 
          autoFocus 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="flex-1 bg-transparent border-none outline-none text-white caret-[var(--neon-accent)] font-terminal text-sm" 
          spellCheck={false}
          disabled={processing}
          placeholder={processing ? "Kernel busy..." : ""}
        />
      </form>
    </div>
  );
};

export default Terminal;
