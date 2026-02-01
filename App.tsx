
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Terminal from './components/Terminal';
// Added APP_NAME to imports
import { Tool, TOOLS, THEMES, OpMode, APP_NAME } from './constants';
import AppWindow from './components/AppWindow';
import Login from './components/Login';
import AIConsultant from './components/AIConsultant';
import SettingsPanel from './components/SettingsPanel';
import FileManager from './components/FileManager';
import WirelessAuditor from './components/WirelessAuditor';
import TrafficVisualizer from './components/TrafficVisualizer';
import TrafficInterceptor from './components/TrafficInterceptor';
import SystemMonitor from './components/SystemMonitor';
import NetworkScanner from './components/NetworkScanner';
import GitHubExploits from './components/GitHubExploits';
import SocialPhish from './components/SocialPhish';
import VPNProxy from './components/VPNProxy';
import HackerIntel from './components/HackerIntel';
import CommandIntel from './components/CommandIntel';
import TechAcademy from './components/TechAcademy';

interface WindowState {
  id: string;
  tool: Tool;
  zIndex: number;
  isMinimized: boolean;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  
  const [theme, setTheme] = useState(() => localStorage.getItem('ar_theme') || 'tech_dark');
  const [opMode, setOpMode] = useState<OpMode>('sim');
  const [intensity, setIntensity] = useState(5);
  const [prompt, setPrompt] = useState('operator@scorpion');
  const [showUsers, setShowUsers] = useState(true);

  const applyTheme = useCallback((themeKey: string) => {
    const themeData = (THEMES as any)[themeKey] || THEMES.tech_dark;
    if (themeData) {
      document.documentElement.style.setProperty('--neon-accent', themeData.accent);
      document.documentElement.style.setProperty('--neon-glow', themeData.glow);
      setTheme(themeKey);
      localStorage.setItem('ar_theme', themeKey);
    }
  }, []);

  useEffect(() => { applyTheme(theme); }, [theme, applyTheme]);

  const bringToFront = (id: string) => {
    setFocusedWindowId(id);
    setOpenWindows(wins => wins.map(w => w.id === id ? { ...w, zIndex: maxZIndex + 1, isMinimized: false } : w));
    setMaxZIndex(prev => prev + 1);
  };

  const handleToolSelect = (tool: Tool) => {
    const existing = openWindows.find(w => w.tool.id === tool.id);
    if (existing) {
      bringToFront(existing.id);
    } else {
      const newId = `${tool.id}-${Date.now()}`;
      const newWindow: WindowState = { id: newId, tool, zIndex: maxZIndex + 1, isMinimized: false };
      setOpenWindows(prev => [...prev, newWindow]);
      setFocusedWindowId(newId);
      setMaxZIndex(prev => prev + 1);
    }
  };
  
  const handleMinimize = (id: string) => {
    setOpenWindows(wins => wins.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (focusedWindowId === id) {
       const nextFocus = openWindows.filter(w => !w.isMinimized && w.id !== id).sort((a,b) => b.zIndex - a.zIndex)[0];
       setFocusedWindowId(nextFocus ? nextFocus.id : null);
    }
  };

  const handleClose = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    if (focusedWindowId === id) {
       // Fixed boolean-string comparison error (!w.id replaced with w.id)
       const nextFocus = openWindows.filter(w => w.id !== id).sort((a,b) => b.zIndex - a.zIndex)[0];
       setFocusedWindowId(nextFocus ? nextFocus.id : null);
    }
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const vfsMock = { root: { name: 'root', type: 'directory' as const, children: [] }, currentPath: '/' };

  return (
    <Layout 
      isLoggedIn={true} 
      onToolSelect={handleToolSelect} 
      openWindows={openWindows}
      onShutdown={() => setIsLoggedIn(false)}
      opMode={opMode}
      onOpModeChange={setOpMode}
      onFocus={bringToFront}
      theme={theme}
    >
      <div className="relative w-full h-full p-0 md:p-4 overflow-hidden">
        {openWindows.filter(w => !w.isMinimized).map((win) => (
          <div 
            key={win.id}
            style={{ zIndex: win.zIndex }}
            className={`absolute inset-0 transition-all duration-300 ${focusedWindowId === win.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
          >
            <AppWindow 
              tool={win.tool} 
              onClose={() => handleClose(win.id)}
              onMinimize={() => handleMinimize(win.id)}
              onFocus={() => bringToFront(win.id)}
              isFocused={focusedWindowId === win.id}
            >
              {win.tool.category === 'Terminals' && <Terminal tool={win.tool} opMode={opMode} />}
              {win.tool.id === 'ai_scorpion' && <AIConsultant />}
              {win.tool.id === 'command_intel' && <CommandIntel />}
              {win.tool.id === 'hacker_intel' && <HackerIntel />}
              {win.tool.id === 'file_explorer' && <FileManager vfs={vfsMock} opMode={opMode} />}
              {win.tool.id === 'wireless_auditor' && <WirelessAuditor opMode={opMode} />}
              {win.tool.id === 'traffic_interceptor' && <TrafficInterceptor />}
              {win.tool.id === 'system_monitor' && <SystemMonitor />}
              {win.tool.id === 'network_scanner' && <NetworkScanner />}
              {win.tool.id === 'github_exploits' && <GitHubExploits />}
              {win.tool.id === 'social_phish' && <SocialPhish />}
              {win.tool.id === 'vpn_proxy' && <VPNProxy />}
              {win.tool.id === 'tech_academy' && <TechAcademy />}
              {win.tool.id === 'settings' && <SettingsPanel 
                currentTheme={theme} 
                onThemeChange={applyTheme}
                intensity={intensity}
                onIntensityChange={setIntensity}
                prompt={prompt}
                onPromptChange={setPrompt}
                showUsers={showUsers}
                onToggleUsers={setShowUsers}
              />}
            </AppWindow>
          </div>
        ))}
        
        {/* Empty State / Desktop Wallpaper */}
        {openWindows.filter(w => !w.isMinimized).length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-40 select-none animate-in fade-in duration-1000">
             <div className="text-9xl mb-8 animate-float text-[var(--neon-accent)] drop-shadow-[0_0_30px_var(--neon-glow)]">🦂</div>
             <h2 className="text-3xl md:text-5xl font-black tracking-[0.5em] uppercase mb-2 neon-text">{APP_NAME}</h2>
             <p className="text-[10px] md:text-sm tracking-[0.8em] uppercase opacity-60">TACTICAL_OFFENSIVE_SUITE_v5.5</p>
             <div className="mt-12 flex gap-4">
                <div className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-ping"></div>
                <div className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-ping [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-ping [animation-delay:0.4s]"></div>
             </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
