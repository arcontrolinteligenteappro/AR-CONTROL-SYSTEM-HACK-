
import React from 'react';
import { Tool } from '../constants';

interface Props {
  tool: Tool;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  isMaximized?: boolean;
  isFocused?: boolean;
  isSyncing?: boolean;
  children: React.ReactNode;
}

const AppWindow: React.FC<Props> = ({ tool, onClose, onMinimize, onMaximize, onFocus, isMaximized, isFocused, isSyncing, children }) => {
  return (
    <div 
      onClick={onFocus}
      className={`flex flex-col bg-[#050505]/95 text-gray-300 font-mono text-[13px] overflow-hidden border transition-all duration-300 shadow-2xl rounded-xl backdrop-blur-3xl 
      ${isMaximized ? 'w-full h-full' : 'w-[94%] h-[90%] mx-auto my-auto mt-4'}
      ${isFocused ? 'border-[var(--neon-accent)]/40 shadow-[var(--neon-accent)]/20' : 'border-white/10 opacity-60'}`}
    >
      <div className={`h-10 border-b flex items-center justify-between px-4 shrink-0 select-none ${isFocused ? 'bg-white/5 border-white/10' : 'bg-black/60 border-transparent'}`}>
        <div className="flex items-center gap-3">
          <span className={`text-xl ${isFocused ? 'filter grayscale-0' : 'grayscale opacity-50'}`}>{tool.icon}</span>
          <span className={`font-cyber font-bold tracking-[0.2em] uppercase text-[9px] ${isFocused ? 'text-[var(--neon-accent)]' : 'text-gray-500'}`}>
            {tool.name}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
           <button onClick={(e) => { e.stopPropagation(); onMinimize?.(); }} className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs text-white/40 transition-colors">–</button>
           <button onClick={(e) => { e.stopPropagation(); onMaximize?.(); }} className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-[8px] text-white/40 transition-colors">□</button>
           <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-5 h-5 rounded bg-red-500/20 hover:bg-red-500 flex items-center justify-center text-[10px] text-red-500 hover:text-white transition-all">×</button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative">
        {children}
      </div>

      <div className={`h-6 px-4 flex items-center justify-between text-[7px] uppercase tracking-widest font-cyber border-t ${isFocused ? 'bg-black/40 border-white/5 text-white/30' : 'bg-black/80 border-transparent text-white/10'}`}>
        <div className="flex gap-4">
           <span>OPERATOR_ID: ADMIN</span>
           <span>MODULE: {tool.category.toUpperCase()}</span>
           <span className="text-[var(--neon-accent)] animate-pulse">SCORPION_LINK: ESTABLISHED</span>
        </div>
        <div className="flex gap-2">
           <span className={isFocused ? 'text-[#ff0033]' : ''}>OFFENSIVE_MODE</span>
           <span className="opacity-30">|</span>
           <span>GHOST_SYSTEM_v4</span>
        </div>
      </div>
    </div>
  );
};

export default AppWindow;
