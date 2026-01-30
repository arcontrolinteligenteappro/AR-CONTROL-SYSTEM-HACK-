
import React, { useState } from 'react';
import { TOOLS, Tool } from '../constants';

interface Props {
  onToolSelect: (tool: Tool) => void;
}

const FloatingTools: React.FC<Props> = ({ onToolSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickTools = TOOLS.filter(t => ['wifi_crack', 'social_phish', 'sms_bomber', 'ai_consultant'].includes(t.id));

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col items-end gap-2 mb-2 animate-in slide-in-from-bottom-4 duration-300">
          {quickTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                onToolSelect(tool);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-[var(--neon-accent)]/30 px-4 py-2 rounded-full hover:bg-[var(--neon-accent)] hover:text-black transition-all group shadow-2xl"
            >
              <span className="text-[9px] font-cyber font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                {tool.name}
              </span>
              <span className="text-xl">{tool.icon}</span>
            </button>
          ))}
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_0_20px_var(--neon-glow)] transition-all duration-500 border-2 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-red-600 border-red-400 rotate-45' : 'bg-black/80 border-[var(--neon-accent)]'}`}
      >
        <div className={isOpen ? 'text-white' : 'text-[var(--neon-accent)] font-black text-xl font-cyber'}>
          {isOpen ? '×' : 'AR'}
        </div>
        {!isOpen && (
           <div className="absolute -inset-1 rounded-full border border-[var(--neon-accent)]/30 animate-ping pointer-events-none"></div>
        )}
      </button>
    </div>
  );
};

export default FloatingTools;
