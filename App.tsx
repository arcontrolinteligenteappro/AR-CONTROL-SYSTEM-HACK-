import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Terminal from './components/Terminal';
import { Tool, TOOLS, THEMES, OpMode } from './constants';
import AppWindow from './components/AppWindow';
import Login from './components/Login';
import AIConsultant from './components/AIConsultant';
import SettingsPanel from './components/SettingsPanel';
import ProductivityTools from './components/ProductivityTools';
import ProjectLab from './components/ProjectLab';
import TechAcademy from './components/TechAcademy';
import HackerIntel from './components/HackerIntel';
import GitHubConnect from './components/GitHubConnect';
import FileManager from './components/FileManager';
import WirelessAuditor from './components/WirelessAuditor';
import TrafficVisualizer from './components/TrafficVisualizer';
import TrafficInterceptor from './components/TrafficInterceptor';
import SystemMonitor from './components/SystemMonitor';
import NetworkScanner from './components/NetworkScanner';
import OfficeSuite from './components/OfficeSuite';
import MediaFactory from './components/MediaFactory';
import GitHubExploits from './components/GitHubExploits';
import SocialPhish from './components/SocialPhish';
import VPNProxy from './components/VPNProxy';

interface WindowState {
  id: string;
  tool: Tool;
  zIndex: number;
  isMinimized: boolean;
}

interface TerminalState {
  id: string;
  tool: Tool;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State for floating window apps
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  
  // State for terminal panels
  const [activeTerminals, setActiveTerminals] = useState<TerminalState[]>([]);

  const [theme, setTheme] = useState('scorpion');
  const [opMode, setOpMode] = useState<OpMode>('sim');
  const [intensity, setIntensity] = useState(5);
  const [prompt, setPrompt] = useState('operador@arcontrol');
  const [showUsers, setShowUsers] = useState(true);

  const applyTheme = useCallback((themeKey: string) => {
    const themeData = (THEMES as any)[themeKey];
    if (themeData) {
      document.documentElement.style.setProperty('--neon-accent', themeData.accent);
      document.documentElement.style.setProperty('--neon-glow', themeData.glow);
      setTheme(themeKey);
    }
  }, []);

  useEffect(() => { applyTheme(theme); }, [theme, applyTheme]);

  const bringToFront = (id: string) => {
    setFocusedWindowId(id);
    setOpenWindows(wins => wins.map(w => w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w));
    setMaxZIndex(prev => prev + 1);
  };

  const handleToolSelect = (tool: Tool) => {
    if (tool.category === 'Terminals') {
      const existing = activeTerminals.find(t => t.tool.id === tool.id);
      if (!existing) { // Allow multiple instances of same terminal type later if needed
          const newId = `${tool.id}-${Date.now()}`;
          setActiveTerminals(prev => [...prev, { id: newId, tool }]);
      }
    } else {
      const existing = openWindows.find(w => w.tool.id === tool.id);
      if (existing) {
        if (existing.isMinimized) {
          setOpenWindows(wins => wins.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
        }
        bringToFront(existing.id);
      } else {
        const newId = `${tool.id}-${Date.now()}`;
        const newWindow: WindowState = { id: newId, tool, zIndex: maxZIndex + 1, isMinimized: false };
        setOpenWindows(prev => [...prev, newWindow]);
        setFocusedWindowId(newId);
        setMaxZIndex(prev => prev + 1);
      }
    }
  };
  
  const handleMinimize = (id: string) => {
    setOpenWindows(wins => wins.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (focusedWindowId === id) {
       const nextFocus = openWindows.filter(w => !w.isMinimized && w.id !== id).sort((a,b) => b.zIndex - a.zIndex)[0];
       setFocusedWindowId(nextFocus ? nextFocus.id : null);
    }
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    if (focusedWindowId === id) {
       const nextFocus = openWindows.filter(w => w.id !== id).sort((a,b) => b.zIndex - a.zIndex)[0];
       setFocusedWindowId(nextFocus ? nextFocus.id : null);
    }
  };
  
  const handleCloseTerminal = (id: string) => {
    setActiveTerminals(prev => prev.filter(t => t.id !== id));
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const vfsMock = { root: { name: 'root', type: 'directory' as const, children: [] }, currentPath: '/' };
  
  const numTerminals = activeTerminals.length;
  const terminalGridClasses = 
      numTerminals === 1 ? 'grid-cols-1' :
      numTerminals === 2 ? 'grid-cols-2' :
      numTerminals === 3 ? 'grid-cols-3' :
      numTerminals >= 4 ? 'grid-cols-2 grid-rows-2' : '';


  return (
    <Layout 
      isLoggedIn={true} 
      onToolSelect={handleToolSelect} 
      openWindows={openWindows}
      onShutdown={() => setIsLoggedIn(false)}
      opMode={opMode}
      onOpModeChange={setOpMode}
      onFocus={bringToFront}
    >
      <div className="relative w-full h-full p-2 md:p-6">
        {/* Terminal Grid Background */}
        <div className={`absolute inset-2 md:inset-6 grid ${terminalGridClasses} gap-4 transition-all duration-500`}>
          {activeTerminals.map((term) => (
            <Terminal 
              key={term.id} 
              tool={term.tool} 
              opMode={opMode} 
              onClose={() => handleCloseTerminal(term.id)}
            />
          ))}
        </div>
        
        {/* Floating Windows Overlay */}
        {openWindows.filter(w => !w.isMinimized).map((win) => (
          <div 
            key={win.id}
            style={{ zIndex: win.zIndex }}
            className="absolute inset-0"
          >
            <AppWindow 
              tool={win.tool} 
              onClose={() => handleCloseWindow(win.id)}
              onMinimize={() => handleMinimize(win.id)}
              onFocus={() => bringToFront(win.id)}
              isFocused={focusedWindowId === win.id}
            >
              {win.tool.id === 'ai_scorpion' && <AIConsultant />}
              {win.tool.id === 'hacker_intel' && <HackerIntel />}
              {win.tool.id === 'project_lab' && <ProjectLab />}
              {win.tool.id === 'tech_academy' && <TechAcademy />}
              {win.tool.id === 'github_connect' && <GitHubConnect />}
              {win.tool.id === 'github_exploits' && <GitHubExploits />}
              {win.tool.id === 'file_explorer' && <FileManager vfs={vfsMock} opMode={opMode} />}
              {win.tool.id === 'wireless_auditor' && <WirelessAuditor opMode={opMode} />}
              {win.tool.id === 'traffic_visualizer' && <TrafficVisualizer opMode={opMode} />}
              {win.tool.id === 'traffic_interceptor' && <TrafficInterceptor />}
              {win.tool.id === 'system_monitor' && <SystemMonitor />}
              {win.tool.id === 'network_scanner' && <NetworkScanner />}
              {win.tool.id === 'office_suite' && <OfficeSuite />}
              {win.tool.id === 'media_factory' && <MediaFactory />}
              {win.tool.id === 'social_phish' && <SocialPhish />}
              {win.tool.id === 'vpn_proxy' && <VPNProxy />}
              {win.tool.id === 'productivity_tools' && <ProductivityTools />}
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
      </div>
    </Layout>
  );
}

export default App;
