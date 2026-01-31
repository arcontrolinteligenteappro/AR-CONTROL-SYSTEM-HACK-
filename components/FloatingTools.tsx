
import React from 'react';
import { TOOLS, Tool } from '../constants';

interface Props {
  onToolSelect: (tool: Tool) => void;
}

const FloatingTools: React.FC<Props> = ({ onToolSelect }) => {

  const handleHelpClick = () => {
    const aiTool = TOOLS.find(t => t.id === 'ai_scorpion');
    if (aiTool) {
      onToolSelect(aiTool);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-[200]">
      <button 
        onClick={handleHelpClick}
        title="Consulta Rápida a Scorpion AI"
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-[0_0_25px_var(--neon-glow)] transition-all duration-500 border-2 transform hover:scale-110 active:scale-95 bg-black/80 border-[var(--neon-accent)]"
      >
        <div className="text-[var(--neon-accent)] font-black animate-pulse">?</div>
        <div className="absolute -inset-1.5 rounded-full border-2 border-[var(--neon-accent)]/30 animate-ping pointer-events-none"></div>
      </button>
    </div>
  );
};

export default FloatingTools;
