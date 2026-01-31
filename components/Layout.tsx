
import React, { useState, useEffect, useMemo } from 'react';
import { DEVELOPER_CREDIT, TOOLS, APP_NAME, Tool, AppCategory, OpMode } from '../constants';
import Logo from './Logo';
import FloatingTools from './FloatingTools';

interface Props {
  children: React.ReactNode;
  onToolSelect: (tool: Tool) => void;
  isLoggedIn: boolean;
  openWindows: { id: string, tool: Tool, isMinimized: boolean, zIndex: number }[];
  onShutdown: () => void;
  opMode: OpMode;
  onOpModeChange: (mode: OpMode) => void;
  onFocus: (id: string) => void;
}

const Layout: React.FC<Props> = ({ 
  children, onToolSelect, isLoggedIn, openWindows, onShutdown, opMode, onOpModeChange, onFocus
}) => {
  const [time, setTime] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);
  const [scorpionText, setScorpionText] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let i = 0;
    const fullText = `GHOST_OS_v5.5 >>> Desarrollado por ${DEVELOPER_CREDIT} >>> Nivel: Scorpion`;
    const interval = setInterval(() => {
      setScorpionText(fullText.substring(0, i + 1) + (i < fullText.length ? '_' : ''));
      i++;
      if (i > fullText.length) i = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const categorizedTools = useMemo(() => {
    const categories: Record<AppCategory, Tool[]> = {
      'Terminals': [], 'Network': [], 'Intel': [], 'Hardware': [], 'Academy': [], 
      'System & Tools': [], 'AI Core': [], 'Repositories': []
    };
    TOOLS.forEach(tool => {
      if (categories[tool.category]) {
        categories[tool.category].push(tool);
      }
    });
    // FIX: Changed to return an array of entries directly to avoid type inference issues with Object.fromEntries.
    // This ensures `tools` is correctly typed as Tool[] later on.
    return Object.entries(categories).filter(([, tools]) => tools.length > 0);
  }, []);
  
  const handleToolClick = (tool: Tool) => {
    onToolSelect(tool);
    setShowMenu(false);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] flex flex-col overflow-hidden text-sm relative select-none font-cyber">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#050a15] via-black to-[var(--neon-accent)]/10"></div>

      {isLoggedIn && (
        <header className="h-12 bg-black/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 z-[100] relative shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowMenu(!showMenu)} className={`font-black tracking-widest px-4 py-1.5 rounded-xl transition-all flex items-center gap-3 border-2 ${showMenu ? 'bg-[var(--neon-accent)] text-black border-[var(--neon-accent)] shadow-[0_0_15px_var(--neon-accent)]' : 'text-[var(--neon-accent)] border-[var(--neon-accent)]/30 hover:bg-white/5 active:scale-95'}`}>
              <span className="text-xl">≡</span>
              <span className="text-[10px] hidden sm:inline">NUCLEO_SCORPION</span>
            </button>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
             <h1 className="text-white text-[14px] font-black tracking-[0.3em] neon-text uppercase cyber-glitch" data-text={APP_NAME}>{APP_NAME}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 p-1 rounded-lg border border-white/10">
                <span className={`text-[8px] font-black uppercase tracking-wider px-2 ${opMode === 'sim' ? 'text-green-400' : 'text-white/30'}`}>SIM</span>
                <button onClick={() => onOpModeChange(opMode === 'sim' ? 'real' : 'sim')} className={`w-10 h-5 rounded-md relative transition-colors ${opMode === 'real' ? 'bg-red-600' : 'bg-green-600/30'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded transition-all ${opMode === 'real' ? 'left-5' : 'left-0.5'}`}></div>
                </button>
                <span className={`text-[8px] font-black uppercase tracking-wider px-2 ${opMode === 'real' ? 'text-red-500 animate-pulse' : 'text-white/30'}`}>REAL</span>
            </div>
            <div className="text-white/40 text-[11px] font-terminal hidden sm:block border-l border-white/10 pl-4">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </header>
      )}

      {showMenu && (
        <div className="fixed inset-0 top-0 z-[1000] bg-[#050000]/98 backdrop-blur-3xl animate-in slide-in-from-top-12 duration-500 p-6 md:p-12 overflow-y-auto custom-scrollbar">
           <div className="max-w-7xl mx-auto">
             <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl md:text-5xl font-black text-[var(--neon-accent)] tracking-[0.3em] uppercase neon-text">
                  SCORPION_OS_NUCLEUS
                </h2>
                <button onClick={() => setShowMenu(false)} className="text-5xl text-white/40 hover:text-[var(--neon-accent)] transition-transform hover:rotate-90">×</button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {categorizedTools.map(([category, tools]) => (
                  <div key={category} className="space-y-6">
                    <h3 className="text-[10px] font-black tracking-[0.5em] uppercase border-l-4 border-[var(--neon-accent)] pl-4 py-2 bg-[var(--neon-accent)]/10">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {tools.map(tool => (
                        <button 
                          key={tool.id}
                          onClick={() => handleToolClick(tool)}
                          className="flex flex-col items-center justify-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl h-28 text-center hover:bg-[var(--neon-accent)]/20 hover:border-[var(--neon-accent)] transition-all group active:scale-95 shadow-lg"
                        >
                          <div className="text-4xl filter group-hover:drop-shadow-[0_0_10px_var(--neon-accent)] transition-all">{tool.icon}</div>
                          <span className="text-[9px] font-bold uppercase tracking-widest">{tool.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
             
             <div className="mt-20 text-center">
                 <button 
                    onClick={onShutdown}
                    className="px-10 py-4 bg-red-600/10 border-2 border-red-600 text-red-500 font-black uppercase tracking-[0.4em] text-sm hover:bg-red-600 hover:text-white transition-all shadow-xl"
                 >
                   SHUTDOWN_SEQUENCE
                 </button>
             </div>
           </div>
        </div>
      )}

      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 relative">{children}</div>
      </main>

      {isLoggedIn && (
        <footer className="h-14 bg-black/90 backdrop-blur-xl border-t border-white/10 z-[200] shrink-0">
            <div className="flex items-center h-full px-4 gap-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {openWindows.filter(w => w.isMinimized).map(win => (
                        <button key={win.id} onClick={() => onToolSelect(win.tool)} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 hover:bg-[var(--neon-accent)]/20 hover:border-[var(--neon-accent)]/50 transition-all whitespace-nowrap">
                            <span className="text-lg">{win.tool.icon}</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest">{win.tool.name}</span>
                        </button>
                    ))}
                </div>

                <div className="ml-auto text-[10px] font-terminal tracking-widest text-white/40 whitespace-nowrap hidden md:block">
                   {scorpionText}
                </div>
            </div>
        </footer>
      )}
      {isLoggedIn && <FloatingTools onToolSelect={onToolSelect} />}
    </div>
  );
};

export default Layout;