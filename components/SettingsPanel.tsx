
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
    <div className="flex flex-col h-full bg-[#050505] text-[#d1d5db] font-mono select-none overflow-y-auto p-8 custom-scrollbar animate-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-black font-cyber text-[var(--neon-accent)] tracking-[0.3em] neon-text uppercase mb-10 border-b border-[var(--neon-accent)]/20 pb-4 flex items-center gap-4">
        <span>⚙️</span> Configuración del Núcleo AR Control
      </h2>

      {/* --- Visual Theme Section --- */}
      <div className="mb-12">
        <h3 className="text-white font-cyber text-[10px] tracking-[0.5em] uppercase border-l-2 border-[var(--neon-accent)] pl-3 py-1 bg-[var(--neon-accent)]/5 mb-6">
          Tema Visual del Sistema
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Object.entries(THEMES).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => onThemeChange(key)}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                currentTheme === key
                  ? 'border-[var(--neon-accent)] bg-[var(--neon-accent)]/10 shadow-[0_0_20px_var(--neon-glow)]'
                  : 'border-white/10 bg-black/30 hover:bg-white/5'
              }`}
            >
              <div className="w-16 h-10 rounded-lg shadow-inner" style={{ background: theme.bg }}></div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- User Management Section --- */}
      <div className="mb-12">
        <h3 className="text-white font-cyber text-[10px] tracking-[0.5em] uppercase border-l-2 border-[var(--neon-accent)] pl-3 py-1 bg-[var(--neon-accent)]/5 mb-6">
          Gestión de Operadores y Accesos
        </h3>
        <div className="bg-black/30 p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold tracking-wider">Mostrar Directorio de Usuarios</p>
              <p className="text-[9px] text-white/30 uppercase mt-1">Habilita botones de acceso rápido en la pantalla de inicio</p>
            </div>
            <button 
              onClick={() => onToggleUsers(!showUsers)}
              className={`w-14 h-7 rounded-full relative transition-all duration-300 ${showUsers ? 'bg-[var(--neon-accent)] shadow-[0_0_10px_var(--neon-glow)]' : 'bg-white/10'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${showUsers ? 'left-8' : 'left-1 shadow-lg'}`}></div>
            </button>
          </div>

          {showUsers && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5 animate-in fade-in zoom-in-95 duration-500">
              {REGISTERED_USERS.map(user => (
                <div key={user.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[var(--neon-accent)]/40 transition-all group">
                  <div className="text-2xl group-hover:scale-110 transition-transform">{user.icon}</div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-white">{user.name}</div>
                    <div className="text-[8px] text-[var(--neon-accent)] font-terminal">ID: {user.id.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- Effects & Prompt Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-white font-cyber text-[10px] tracking-[0.5em] uppercase border-l-2 border-[var(--neon-accent)] pl-3 py-1 bg-[var(--neon-accent)]/5 mb-6">
            Efectos de Terminal
          </h3>
          <div className="space-y-4 bg-black/30 p-6 rounded-2xl border border-white/10">
            <label htmlFor="intensity" className="flex justify-between items-center text-sm font-bold tracking-wider">
              <span>Intensidad de Glitch</span>
              <span className="font-black text-lg text-[var(--neon-accent)] bg-black px-3 py-1 rounded-lg">
                {intensity}
              </span>
            </label>
            <input
              id="intensity"
              type="range"
              min="0"
              max="10"
              step="1"
              value={intensity}
              onChange={(e) => onIntensityChange(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer range-slider"
            />
          </div>
        </div>

        <div>
          <h3 className="text-white font-cyber text-[10px] tracking-[0.5em] uppercase border-l-2 border-[var(--neon-accent)] pl-3 py-1 bg-[var(--neon-accent)]/5 mb-6">
            Identidad del Prompt
          </h3>
          <div className="space-y-2 bg-black/30 p-6 rounded-2xl border border-white/10">
            <label htmlFor="prompt" className="text-sm font-bold tracking-wider mb-2 block">
              Prompt Personalizado
            </label>
            <input
              id="prompt"
              type="text"
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="user@arcontrol"
              className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 focus:border-[var(--neon-accent)] outline-none text-white transition-all font-mono text-sm shadow-inner"
            />
             <p className="text-[10px] text-white/40 pt-2">
                Estructura recomendada: <span className="text-white/80">operador@terminal</span>
              </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-[8px] text-white/10 uppercase tracking-[1em]">
        AR CONTROL SYSTEM ARCHITECTURE v5.5 // SECURE BOOT ENABLED
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 243, 255, 0.3); border-radius: 3px; }
        .range-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: var(--neon-accent);
            cursor: pointer;
            border-radius: 50%;
            box-shadow: 0 0 10px var(--neon-glow);
        }
      `}</style>
    </div>
  );
};

export default SettingsPanel;
