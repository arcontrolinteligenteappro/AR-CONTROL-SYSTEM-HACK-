
import React, { useState, useEffect, useMemo } from 'react';
import { DEVELOPER_CREDIT, DEVELOPER_SITE, TOOLS, APP_NAME, Tool, OpMode, THEMES } from '../constants';
import ScorpionText from './ScorpionText';

interface Props {
  children: React.ReactNode;
  onToolSelect: (tool: Tool) => void;
  isLoggedIn: boolean;
  openWindows: { id: string, tool: Tool, isMinimized: boolean, zIndex: number }[];
  onShutdown: () => void;
  opMode: OpMode;
  onOpModeChange: (mode: OpMode) => void;
  onFocus: (id: string) => void;
  theme: string;
}

const Layout: React.FC<Props> = ({ 
  children, onToolSelect, isLoggedIn, openWindows, onShutdown, opMode, onFocus, theme
}) => {
  const [time, setTime] = useState(new Date());
  const [isNavOpen, setIsNavOpen] = useState(false);
  const currentTheme = (THEMES as any)[theme] || THEMES.tech_dark;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const categorizedTools = useMemo(() => {
    const categories: any = {};
    TOOLS.forEach(tool => {
      if (!categories[tool.category]) categories[tool.category] = [];
      categories[tool.category].push(tool);
    });
    return Object.entries(categories);
  }, []);

  return (
    <div className={`h-full w-full flex flex-col md:flex-row overflow-hidden relative font-cyber transition-all duration-500`} style={{ background: currentTheme.bg, color: currentTheme.text }}>
      
      {/* Lateral Navigation */}
      {isLoggedIn && (
        <nav className={`fixed md:relative z-[2000] h-full transition-all duration-500 flex flex-col bg-black/90 backdrop-blur-3xl border-r border-white/10 ${isNavOpen ? 'w-64' : 'w-0 md:w-20'} overflow-hidden`}>
          <div className="p-4 flex flex-col items-center gap-6 border-b border-white/5 h-24 justify-center">
            <button onClick={() => setIsNavOpen(!isNavOpen)} className="text-[var(--neon-accent)] hover:scale-110 transition-all duration-300 drop-shadow-[0_0_10px_var(--neon-glow)]">
               <span className="text-3xl">{isNavOpen ? '◁' : '🦂'}</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar py-6 space-y-6">
            {categorizedTools.map(([category, tools]: [any, any]) => (
              <div key={category} className="px-4">
                {isNavOpen && <div className="text-[7px] text-[var(--neon-accent)] opacity-40 uppercase tracking-[0.5em] mb-4 font-black border-l border-[var(--neon-accent)] pl-2">{category}</div>}
                <div className="space-y-1">
                  {tools.map((tool: Tool) => (
                    <button
                      key={tool.id}
                      onClick={() => onToolSelect(tool)}
                      className={`w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--neon-accent)]/10 transition-all group ${isNavOpen ? 'justify-start' : 'justify-center'}`}
                    >
                      <span className="text-xl filter group-hover:drop-shadow-[0_0_8px_var(--neon-accent)]">{tool.icon}</span>
                      {isNavOpen && <span className="text-[9px] font-black uppercase tracking-[0.2em] truncate">{tool.name}</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/5">
             <button onClick={onShutdown} className={`w-full p-3 rounded-xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all flex items-center gap-4 ${isNavOpen ? 'justify-start' : 'justify-center'}`}>
                <span className="text-xl">⏻</span>
                {isNavOpen && <span className="text-[9px] font-bold tracking-[0.3em]">LOG_OUT</span>}
             </button>
          </div>
        </nav>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header - Centered Branding */}
        <header className="h-20 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-[1000] shrink-0">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-xs md:text-sm font-black text-white/40 tracking-[0.4em] uppercase">
              <ScorpionText text={APP_NAME} speed={100} repeat={true} />
            </h1>
          </div>

          {/* Centered Credit */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            <div className="text-[10px] font-black text-[var(--neon-accent)] tracking-[0.8em] uppercase neon-text animate-pulse">
              CHRISREY
            </div>
            <div className="text-[6px] opacity-20 tracking-[0.5em] mt-1 font-terminal">
              MASTER_SYSTEM_OPERATOR
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-end gap-6">
            <div className="hidden lg:flex flex-col items-end">
               <span className="text-[10px] text-[var(--neon-accent)] font-terminal">{time.toLocaleTimeString()}</span>
            </div>
            <div className="px-3 py-1 rounded bg-black/60 border border-white/10">
                <span className="text-[8px] font-black text-white/50">{opMode.toUpperCase()}</span>
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 relative overflow-hidden">
          {children}
        </main>

        {/* Taskbar */}
        {isLoggedIn && openWindows.length > 0 && (
          <footer className="h-16 bg-black/60 backdrop-blur-2xl border-t border-white/10 flex items-center px-6 gap-3 overflow-x-auto no-scrollbar shrink-0">
            {openWindows.map(win => (
              <button 
                key={win.id} 
                onClick={() => onFocus(win.id)} 
                className={`flex items-center gap-3 px-5 py-2 rounded-lg border transition-all duration-300 ${win.isMinimized ? 'opacity-30 bg-white/5 border-transparent' : 'bg-[var(--neon-accent)]/10 border-[var(--neon-accent)]/40 shadow-[0_0_15px_var(--neon-glow)]'}`}
              >
                <span className="text-lg">{win.tool.icon}</span>
                <span className="text-[8px] font-black uppercase tracking-widest">{win.tool.name}</span>
              </button>
            ))}
          </footer>
        )}
      </div>

      {/* Floating Toggle for Mobile */}
      <button 
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 bg-[var(--neon-accent)] text-black rounded-full flex items-center justify-center text-3xl z-[3000] shadow-[0_0_30px_var(--neon-glow)] active:scale-90"
      >
        {isNavOpen ? '×' : '🦂'}
      </button>
    </div>
  );
};

export default Layout;
