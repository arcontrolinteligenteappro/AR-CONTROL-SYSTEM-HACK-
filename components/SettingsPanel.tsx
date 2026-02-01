
import React from 'react';
import { THEMES, REGISTERED_USERS } from '../constants';

interface Props {
  currentTheme: string;
  onThemeChange: (themeKey: string) => void;
  intensity: number;
  onIntensityChange: (value: number) => void;
  prompt: string;
  onPromptChange: (value: string) => void;
  showUsers: boolean;
  onToggleUsers: (val: boolean) => void;
}

const SettingsPanel: React.FC<Props> = ({
  currentTheme,
  onThemeChange,
  intensity,
  onIntensityChange,
  prompt,
  onPromptChange,
  showUsers,
  onToggleUsers
}) => {
  return (
    <div className="flex flex-col h-full bg-[#050505] text-[#d1d5db] font-mono select-none overflow-y-auto p-4 md:p-10 custom-scrollbar animate-in slide-in-from-right-8 duration-700">
      <h2 className="text-2xl md:text-3xl font-black font-cyber text-[var(--neon-accent)] tracking-[0.2em] neon-text uppercase mb-8 border-b border-[var(--neon-accent)]/20 pb-6 flex items-center gap-4">
        <span>⚙️</span> SYSTEM_CONFIG
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* --- Visual Theme Section --- */}
        <div>
          <h3 className="text-white font-cyber text-[10px] tracking-[0.4em] uppercase border-l-4 border-[var(--neon-accent)] pl-4 py-2 bg-[var(--neon-accent)]/10 mb-6">
            INTERFACE_THEME
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(THEMES).map(([key, theme]: [any, any]) => (
              <button
                key={key}
                onClick={() => onThemeChange(key)}
                className={`flex flex-col items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-500 ${
                  currentTheme === key
                    ? 'border-[var(--neon-accent)] bg-[var(--neon-accent)]/20 shadow-[0_0_25px_var(--neon-glow)] scale-105'
                    : 'border-white/10 bg-black/40 opacity-60'
                }`}
              >
                <div className="w-full h-8 rounded-xl shadow-inner" style={{ background: theme.bg }}></div>
                <span className="text-[10px] font-black uppercase tracking-widest">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- User Management Section --- */}
        <div>
          <h3 className="text-white font-cyber text-[10px] tracking-[0.4em] uppercase border-l-4 border-[var(--neon-accent)] pl-4 py-2 bg-[var(--neon-accent)]/10 mb-6">
            OPERATOR_MANAGEMENT
          </h3>
          <div className="bg-black/40 p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold">Show Directory</span>
              <button 
                onClick={() => onToggleUsers(!showUsers)}
                className={`w-12 h-6 rounded-full relative transition-all ${showUsers ? 'bg-[var(--neon-accent)]' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showUsers ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            {showUsers && (
              <div className="grid grid-cols-3 gap-2 pt-4">
                {REGISTERED_USERS.map(user => (
                  <div key={user.id} className="text-center p-2 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-xl mb-1">{user.icon}</div>
                    <div className="text-[7px] font-black uppercase truncate">{user.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-8">
            <div>
              <h3 className="text-white font-cyber text-[10px] tracking-[0.4em] uppercase border-l-4 border-[var(--neon-accent)] pl-4 py-2 bg-[var(--neon-accent)]/10 mb-6">
                SYSTEM_PROMPT
              </h3>
              <div className="bg-black/40 p-6 rounded-3xl border border-white/10">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => onPromptChange(e.target.value)}
                  placeholder="operator@scorpion"
                  className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 focus:border-[var(--neon-accent)] outline-none text-white transition-all font-mono text-xs uppercase"
                />
              </div>
            </div>
        </div>

        <div>
          <h3 className="text-white font-cyber text-[10px] tracking-[0.4em] uppercase border-l-4 border-[var(--neon-accent)] pl-4 py-2 bg-[var(--neon-accent)]/10 mb-6">
            GHOST_INTENSITY
          </h3>
          <div className="bg-black/40 p-6 rounded-3xl border border-white/10">
            <input
              type="range" min="0" max="10" step="1"
              value={intensity}
              onChange={(e) => onIntensityChange(Number(e.target.value))}
              className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-[var(--neon-accent)]"
            />
            <div className="flex justify-between text-[9px] mt-3 font-black text-white/30 uppercase tracking-widest">
              <span>MIN</span>
              <span className="text-[var(--neon-accent)]">{intensity}</span>
              <span>MAX</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto text-center py-10 opacity-10 font-cyber tracking-[1.5em] text-[10px] uppercase">
        AR CONTROL // GHOST SYSTEM // BY CHRISREY91
      </div>
    </div>
  );
};

export default SettingsPanel;
