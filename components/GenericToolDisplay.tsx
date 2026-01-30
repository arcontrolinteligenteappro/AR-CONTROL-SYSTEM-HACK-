
import React, { useState, useEffect } from 'react';
import { Tool } from '../constants';
import { executeCommandWithGemini } from '../services/geminiService';

interface Props {
  tool: Tool;
  mode?: 'graphic' | 'coding' | 'hybrid';
}

const GenericToolDisplay: React.FC<Props> = ({ tool, mode = 'hybrid' }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 30;
        });
      }, 80);
    }
    if (progress >= 100 && loading) {
      startModule();
    }
    return () => clearInterval(interval);
  }, [progress, loading]);

  const startModule = async () => {
    setLoading(false);
    const response = await executeCommandWithGemini(`Initialize offensive module: ${tool.name}. Command: ${tool.cmd}. Generate a realistic Kali Linux terminal output for this tool.`, []);
    setContent(response);
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black z-50">
        <div className="text-9xl animate-pulse filter drop-shadow-[0_0_20px_var(--neon-accent)]">{tool.icon}</div>
        <div className="w-full max-w-sm space-y-4 px-6">
          <div className="flex justify-between text-[10px] font-cyber text-[var(--neon-accent)] uppercase tracking-[0.4em]">
            <span>SCORPION_INITIALIZING...</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-[var(--neon-accent)] shadow-[0_0_15px_var(--neon-accent)] transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden p-6 font-mono text-sm bg-black flex flex-col gap-4 relative">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
         <h2 className="text-[10px] font-cyber tracking-widest uppercase text-white/40 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--neon-accent)] animate-ping"></span>
            {tool.name} Engine Output
         </h2>
         <div className="text-[8px] opacity-20 uppercase tracking-[0.3em]">Module_ID: {tool.id}</div>
      </div>

      <div className="flex-1 bg-black/40 border border-white/5 p-4 rounded overflow-y-auto custom-scrollbar">
         <pre className="whitespace-pre-wrap leading-relaxed text-[#00f3ff]/80 text-[12px] font-mono">
            {content}
         </pre>
      </div>
    </div>
  );
};

export default GenericToolDisplay;
