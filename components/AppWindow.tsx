
import React from 'react';
import { Tool } from '../constants';

interface Props {
  tool: Tool;
  onClose: () => void;
  onMinimize: () => void;
  onFocus?: () => void;
  isMaximized?: boolean;
  isFocused?: boolean;
  children: React.ReactNode;
}

const AppWindow: React.FC<Props> = ({ tool, onClose, onMinimize, onFocus, isMaximized, isFocused, children }) => {
  return (
    <div 
      onMouseDown={onFocus}
      className={`flex flex-col bg-black/80 text-gray-300 font-mono text-[13px] overflow-hidden border-2 transition-all duration-300 shadow-2xl rounded-xl backdrop-blur-2xl 
      ${isMaximized ? 'w-full h-full' : 'w-[94%] h-[90%] mx-auto my-auto mt-4'}
      ${isFocused ? 'border-[var(--neon-accent)] shadow-[0_0_40px_var(--neon-glow)]' : 'border-white/10 opacity-80'}`}
    >
      <header className={`h-10 border-b flex items-center justify-between px-4 shrink-0 select-none cursor-grab active:cursor-grabbing ${isFocused ? 'bg-white/5 border-[var(--neon-accent)]/20' : 'bg-black/60 border-transparent'}`}>
        <div className="flex items-center gap-3">
          <span className={`text-xl transition-all ${isFocused ? 'filter grayscale-0' : 'grayscale opacity-50'}`}>{tool.icon}</span>
          <h2 className={`font-cyber font-bold tracking-[0.2em] uppercase text-[9px] transition-colors ${isFocused ? 'text-[var(--neon-accent)]' : 'text-gray-500'}`}>
            {tool.name}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
           <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-lg text-white/40 transition-colors font-black">－</button>
           <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-6 h-6 rounded bg-red-500/20 hover:bg-red-500 flex items-center justify-center text-lg text-red-500 hover:text-white transition-all font-black">×</button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col relative">
        {children}
      </main>

      <footer className={`h-6 px-4 flex items-center justify-between text-[7px] uppercase tracking-widest font-cyber border-t transition-colors ${isFocused ? 'bg-black/40 border-white/5 text-white/30' : 'bg-black/80 border-transparent text-white/10'}`}>
        <div className="flex gap-4">
           <span>OPERATOR: ADMIN</span>
           <span>MODULE: {tool.category.toUpperCase()}</span>
           <span className="text-[var(--neon-accent)] animate-pulse">SCORPION_LINK: ESTABLISHED</span>
        </div>
        <div className="flex gap-2">
           <span className={isFocused ? 'text-red-500' : ''}>OFFENSIVE_MODE</span>
           <span className="opacity-30">|</span>
           <span>GHOST_SYSTEM_v5.5</span>
        </div>
      </footer>
    </div>
  );
};

export default AppWindow;
