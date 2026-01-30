
import React, { useState, useEffect, useMemo } from 'react';
import { DEVELOPER_CREDIT, DEVELOPER_SITE, TOOLS, APP_NAME, Tool, AppCategory, TEAM_NAME } from '../constants';
import Logo from './Logo';

interface Props {
  children: React.ReactNode;
  onToolSelect?: (tool: Tool) => void;
  isLoggedIn: boolean;
  activeApp?: string;
  openWindows?: Tool[];
  onShutdown?: () => void;
  interfaceMode?: 'graphic' | 'coding' | 'hybrid';
  onModeChange?: (mode: 'graphic' | 'coding' | 'hybrid') => void;
}

const Layout: React.FC<Props> = ({ 
  children, 
  onToolSelect, 
  isLoggedIn, 
  activeApp, 
  openWindows = [], 
  onShutdown,
  interfaceMode = 'hybrid',
  onModeChange
}) => {
  const [time, setTime] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const categorizedTools = useMemo(() => {
    // Fix: Add missing 'Network' category to match the AppCategory type definition in constants.tsx
    const categories: Record<AppCategory, Tool[]> = {
      'Exploit': [],
      'Wireless': [],
      'Social': [],
      'Sniffing': [],
      'Stress': [],
      'System': [],
      'AI Consultant': [],
      'Office': [],
      'Media': [],
      'Repositories': [],
      'Network': [],
    };
    TOOLS.forEach(tool => {
      if (tool.category in categories) {
        categories[tool.category].push(tool);
      }
    });
    return Object.fromEntries(
      Object.entries(categories).filter(([, tools]) => tools.length > 0)
    );
  }, []);

  return (
    <div className="h-screen w-screen bg-[#050505] flex flex-col overflow-hidden text-sm relative select-none">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#050a15] via-black to-[#00f3ff]/5"></div>

      {isLoggedIn && (
        <div className="h-10 bg-black/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 z-[100] text-[10px] font-cyber text-white/80">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className={`font-black tracking-widest px-3 py-1 rounded transition-all flex items-center gap-2 border ${showMenu ? 'bg-[var(--neon-accent)] text-black border-[var(--neon-accent)] shadow-[0_0_15px_var(--neon-accent)]' : 'text-[var(--neon-accent)] border-[var(--neon-accent)]/30 hover:bg-white/5'}`}
            >
              MODULES_OS
            </button>
            <div className="h-4 w-px bg-white/10"></div>
            
            {/* Mode Switcher */}
            <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10">
               {(['graphic', 'coding', 'hybrid'] as const).map((m) => (
                 <button
                   key={m}
                   onClick={() => onModeChange?.(m)}
                   className={`px-3 py-1 rounded-md transition-all uppercase text-[8px] font-bold tracking-widest ${interfaceMode === m ? 'bg-[var(--neon-accent)] text-black shadow-[0_0_10px_var(--neon-glow)]' : 'text-white/40 hover:text-white'}`}
                 >
                   {m}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 font-bold tracking-[0.1em] pointer-events-none opacity-80 flex items-center gap-3">
             <div className="flex flex-col items-center">
                <span className="text-white text-[12px] font-cyber tracking-[0.2em]">{APP_NAME}</span>
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-[var(--neon-accent)]/5 border border-[var(--neon-accent)]/20 rounded-full">
                  <span className="text-[#39ff14] animate-pulse">●</span>
                  <span className="text-[8px] uppercase tracking-widest text-white/60">SCORPION_VPN_ON</span>
                </div>
                <div className="text-white/60 text-[11px] font-mono font-bold">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
            </div>
          </div>
        </div>
      )}

      {isLoggedIn && showMenu && (
        <div className="fixed inset-0 top-10 z-[150] bg-[#050000]/98 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-300 p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-10">
               <div className="flex items-center gap-8">
                 <Logo size={120} glow={true} showText={false} />
                 <div className="h-16 w-px bg-white/10"></div>
                 <div>
                    <h2 className="text-3xl font-black font-cyber text-[var(--neon-accent)] tracking-[0.25em] neon-text uppercase">{APP_NAME}</h2>
                    <p className="text-[10px] text-white/40 tracking-[0.6em] mt-2 font-cyber">OFFENSIVE OPERATION SYSTEM BY {DEVELOPER_CREDIT}</p>
                 </div>
               </div>
               <button onClick={() => setShowMenu(false)} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-red-500/20 rounded-full text-white/40 hover:text-red-500 transition-all text-3xl">×</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {(Object.entries(categorizedTools) as [string, Tool[]][]).map(([category, apps]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-[var(--neon-accent)] font-cyber text-[9px] tracking-[0.5em] uppercase border-l-2 border-[var(--neon-accent)] pl-3 py-1 bg-[var(--neon-accent)]/5">{category}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {apps.map(app => (
                      <button
                        key={app.id}
                        onClick={() => {
                          onToolSelect?.(app);
                          setShowMenu(false);
                        }}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-[var(--neon-accent)]/5 transition-all group border border-transparent hover:border-[var(--neon-accent)]/20 hover:scale-105"
                      >
                        <div className="text-4xl group-hover:scale-110 transition-transform filter drop-shadow-[0_0_10px_rgba(0,243,255,0.2)]">{app.icon}</div>
                        <span className="text-[9px] text-white/40 font-bold group-hover:text-white transition-colors text-center uppercase tracking-widest leading-tight">{app.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        {isLoggedIn && (
          <div className="w-18 bg-black/80 backdrop-blur-2xl border-r border-white/5 flex flex-col items-center py-6 gap-6 z-[120] shadow-2xl shrink-0">
             <div 
               onClick={() => setShowMenu(!showMenu)}
               className="mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#050a15] to-black border border-[var(--neon-accent)]/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.3)] cursor-pointer hover:scale-110 transition-all active:scale-95 group p-2"
             >
                <Logo size={36} glow={false} showText={false} />
             </div>
             
             <div className="flex flex-col gap-4 items-center overflow-y-auto no-scrollbar pb-6 flex-1 w-full px-2">
              {TOOLS.filter(t => openWindows.some(ow => ow.id === t.id) || ['terminal', 'monitor'].includes(t.id)).map(tool => {
                const isOpen = openWindows.some(ow => ow.id === tool.id);
                return (
                  <div key={tool.id} className="relative group flex items-center justify-center w-full">
                    <button
                      onClick={() => onToolSelect?.(tool)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95 border ${activeApp === tool.name ? 'bg-[var(--neon-accent)]/15 border-[var(--neon-accent)]/40' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                    >
                      <span className={`filter transition-all duration-500 ${isOpen ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100'}`}>{tool.icon}</span>
                    </button>
                  </div>
                );
              })}
             </div>
             
             <button className="mt-auto w-12 h-12 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 flex items-center justify-center text-xl transition-all" onClick={onShutdown}>⏻</button>
          </div>
        )}

        <div className="flex-1 relative overflow-hidden flex flex-col">
          <div className="flex-1 relative z-10 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
