
import React, { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import TerminalLine from './TerminalLine';
import MatrixRain from './MatrixRain';
import { TerminalLine as ITerminalLine, VirtualFS } from '../types';
import { executeCommandWithGemini } from '../services/geminiService';
import { INITIAL_WELCOME, KALI_DRAGON_LOGO, THEMES, TOOLS, APP_NAME } from '../constants';

export interface TerminalHandle {
  injectCommand: (cmd: string) => void;
}

interface Props {
  vfs: VirtualFS;
  onVfsUpdate: (vfs: VirtualFS) => void;
  intensity: number;
  customPrompt: string;
  onIntensityChange: (n: number) => void;
  onPromptChange: (p: string) => void;
  onThemeChange: (t: string) => boolean;
  isSyncing?: boolean;
  embedded?: boolean;
}

const COMMAND_DICT = [
  'airodump-ng', 'aireplay-ng', 'airmon-ng', 'airgeddon', 'wifite',
  'setoolkit', 'msfconsole', 'msfvenom', 'bettercap', 'tcpdump',
  'wireshark', 'nmap -sS -sV -O', 'nmap -sn', 'netdiscover',
  'hydra -l admin -P /usr/share/wordlists/rockyou.txt',
  'sqlmap -u "target.php?id=1" --batch',
  'hashcat -m 0 -a 0', 'john --format=raw-md5',
  'flood --sms --threads 10', 'phish --fb --clone',
  'ls -lah', 'cd /root/EXPLOITS', 'cat secrets.txt', 'whoami',
  'clear', 'tema list', 'config prompt', 'help', 'monitor', 'exit', 'neofetch',
  'grep', 'awk', 'sed', 'cat', 'vi', 'nano', 'ssh', 'scp', 'curl', 'wget'
];

const Terminal = forwardRef<TerminalHandle, Props>(({ 
  vfs, 
  onVfsUpdate, 
  intensity,
  customPrompt,
  onIntensityChange,
  onPromptChange,
  onThemeChange,
  embedded = false
}, ref) => {
  const [history, setHistory] = useState<ITerminalLine[]>(() => {
    const saved = localStorage.getItem('terminal_history');
    return saved ? JSON.parse(saved) : [
      { id: 'logo', type: 'system', content: KALI_DRAGON_LOGO, timestamp: new Date() },
      { id: 'welcome', type: 'system', content: INITIAL_WELCOME, timestamp: new Date() }
    ];
  });
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHud, setShowHud] = useState(() => localStorage.getItem('terminal_hud') !== 'false');
  
  const [telemetry, setTelemetry] = useState({
    cpu: new Array(20).fill(0),
    ram: new Array(20).fill(0),
    net: new Array(20).fill(0)
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('terminal_history', JSON.stringify(history.slice(-50)));
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => ({
        cpu: [...prev.cpu.slice(1), Math.random() * 40 + 10],
        ram: [...prev.ram.slice(1), Math.random() * 5 + 60],
        net: [...prev.net.slice(1), Math.random() * 100]
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!input) { setSuggestion(''); return; }
    const match = COMMAND_DICT.find(c => c.toLowerCase().startsWith(input.toLowerCase()));
    setSuggestion(match && match.toLowerCase() !== input.toLowerCase() ? match : '');
  }, [input]);

  const handleCommand = useCallback(async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, {
      id: Date.now().toString(),
      type: 'command',
      content: trimmed,
      timestamp: new Date(),
      command: customPrompt,
      path: vfs.currentPath
    }]);

    setInput('');
    setSuggestion('');
    
    if (trimmed === 'clear') { setHistory([]); return; }
    if (trimmed === 'monitor') { setShowHud(!showHud); return; }

    setIsProcessing(true);
    const result = await executeCommandWithGemini(trimmed, [], `ROOT_SHELL_ACTIVE`);
    
    setHistory(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      type: 'output',
      content: result,
      timestamp: new Date()
    }]);
    setIsProcessing(false);
  }, [vfs, customPrompt, showHud]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && suggestion) { e.preventDefault(); setInput(suggestion); }
    else if (e.key === 'Enter') handleCommand(input);
  };

  useImperativeHandle(ref, () => ({
    injectCommand: (cmd: string) => !isProcessing && handleCommand(cmd)
  }));

  return (
    <div className={`flex-1 flex flex-col bg-transparent p-6 font-terminal overflow-y-auto relative z-10 transition-all`} onClick={() => inputRef.current?.focus()}>
      {!embedded && <MatrixRain />}
      
      {showHud && !embedded && (
        <div className="fixed top-16 right-8 z-[60] bg-black/90 backdrop-blur-2xl border border-[var(--neon-accent)]/20 p-4 rounded-xl w-64 shadow-2xl">
          <div className="text-[9px] font-cyber text-[var(--neon-accent)] mb-4 tracking-widest flex justify-between items-center">
            <span>SCORPION_HUD_v5</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-accent)] animate-pulse"></span>
          </div>
          <div className="space-y-4">
             {['cpu', 'ram', 'net'].map((key) => (
               <div key={key}>
                  <div className="flex justify-between text-[7px] opacity-40 uppercase mb-1">
                    <span>{key}_utilization</span>
                    <span className="text-[var(--neon-accent)]">{telemetry[key as keyof typeof telemetry][19].toFixed(1)}%</span>
                  </div>
                  <div className="flex items-end gap-[1px] h-6 bg-black/50 p-0.5 border border-white/5">
                    {telemetry[key as keyof typeof telemetry].map((v, i) => (
                      <div key={i} style={{ height: `${v}%` }} className="flex-1 bg-[var(--neon-accent)] opacity-30" />
                    ))}
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1 relative z-20">
        {history.map((line) => <TerminalLine key={line.id} line={line} />)}
        {isProcessing && (
          <div className="flex items-center gap-2 text-[var(--neon-accent)] opacity-60 mt-2 animate-pulse">
            <span className="w-2 h-4 bg-[var(--neon-accent)]"></span>
            <span className="text-[10px] tracking-widest">GHOST_KERNEL_BUSY...</span>
          </div>
        )}
        {!isProcessing && (
          <div className="flex gap-2 items-center mt-2">
            <div className="flex gap-1 shrink-0 font-bold text-[14px]">
              <span className="text-[var(--neon-accent)]">{customPrompt.split('@')[0]}</span>
              <span className="text-white/20">@</span>
              <span className="text-[var(--neon-magenta)]">{customPrompt.split('@')[1] || 'ar-ghost'}</span>
              <span className="text-[var(--neon-accent)]">#</span>
            </div>
            <div className="flex-1 relative">
              <input
                ref={inputRef} type="text" value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-full bg-transparent border-none outline-none text-white caret-[var(--neon-accent)] text-[14px] font-mono tracking-wider focus:ring-0 z-10"
                autoFocus spellCheck={false}
              />
              {suggestion && (
                <div className="absolute top-0 left-0 text-white/10 text-[14px] font-mono pointer-events-none z-0">
                  <span className="opacity-0">{input}</span>{suggestion.slice(input.length)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div ref={terminalEndRef} className="h-4" />
    </div>
  );
});

export default Terminal;
