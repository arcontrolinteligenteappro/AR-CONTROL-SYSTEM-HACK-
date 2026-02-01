
import React from 'react';
import { Tool } from '../constants';

interface Props {
  tool: Tool;
  onClose: () => void;
  onMinimize: () => void;
  onFocus?: () => void;
  isFocused?: boolean;
  children: React.ReactNode;
}

const AppWindow: React.FC<Props> = ({ tool, onClose, onMinimize, onFocus, isFocused, children }) => {
  return (
    <div 
      onMouseDown={onFocus}
      className={`flex flex-col bg-black/95 text-gray-300 font-mono text-[13px] overflow-hidden transition-all duration-300 shadow-2xl backdrop-blur-2xl 
      fixed inset-0 z-50 md:relative md:inset-auto md:w-[96%] md:h-[92%] md:mx-auto md:mt-4 md:rounded-xl md:border-2
      ${isFocused ? 'md:border-[var(--neon-accent)] md:shadow-[0_0_40px_var(--neon-glow)]' : 'md:border-white/10 md:opacity-80'}`}
    >
      {/* Header - Optimized for Mobile Taps */}
      <header className={`h-12 md:h-10 border-b flex items-center justify-between px-4 shrink-0 select-none ${isFocused ? 'bg-white/5 border-[var(--neon-accent)]/20' : 'bg-black/60 border-transparent'}`}>
        <div className="flex items-center gap-3">
          <span className={`text-xl transition-all ${isFocused ? 'filter grayscale-0' : 'grayscale opacity-50'}`}>{tool.icon}</span>
          <h2 className={`font-cyber font-bold tracking-[0.2em] uppercase text-[9px] md:text-[10px] transition-colors ${isFocused ? 'text-[var(--neon-accent)]' : 'text-gray-500'}`}>
            {tool.name}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
           <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }} 
            className="w-8 h-8 md:w-6 md:h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-lg text-white/40 transition-colors"
           >
             －
           </button>
           <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="w-8 h-8 md:w-6 md:h-6 rounded bg-red-500/10 hover:bg-red-500 flex items-center justify-center text-xl md:text-lg text-red-500 hover:text-white transition-all"
           >
             ×
           </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-black">
        {children}
      </main>

      {/* Footer - Compact on Mobile */}
      <footer className={`h-6 px-4 hidden sm:flex items-center justify-between text-[7px] md:text-[8px] uppercase tracking-widest font-cyber border-t transition-colors ${isFocused ? 'bg-black/40 border-white/5 text-white/30' : 'bg-black/80 border-transparent text-white/10'}`}>
        <div className="flex gap-4">
           <span>OPERATOR: {localStorage.getItem('ar_operator') || 'ADMIN'}</span>
           <span className="hidden md:inline">MODULE: {tool.category.toUpperCase()}</span>
           <span className="text-[var(--neon-accent)] animate-pulse">SCORPION_LINK: ESTABLISHED</span>
        </div>
        <div className="flex gap-2">
           <span className={isFocused ? 'text-red-500' : ''}>OFFENSIVE_MODE</span>
           <span className="opacity-30">|</span>
           <span className="hidden md:inline">GHOST_SYSTEM_v5.5</span>
        </div>
      </footer>
    </div>
  );
};

export default AppWindow;
