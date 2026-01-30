
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Terminal from './components/Terminal';
import { Tool, TOOLS, THEMES } from './constants';
import { VirtualFS } from './types';
import AppWindow from './components/AppWindow';
import FileManager from './components/FileManager';
import SystemMonitor from './components/SystemMonitor';
import Login from './components/Login';
import GenericToolDisplay from './components/GenericToolDisplay';
import AIConsultant from './components/AIConsultant';
import FloatingTools from './components/FloatingTools';
import OfficeSuite from './components/OfficeSuite';
import MediaFactory from './components/MediaFactory';
import NetworkScanner from './components/NetworkScanner';
import GitHubExploits from './components/GitHubExploits';
import TrafficInterceptor from './components/TrafficInterceptor';
import WirelessAuditor from './components/WirelessAuditor';
import SocialPhish from './components/SocialPhish';
import VPNProxy from './components/VPNProxy';
import SettingsPanel from './components/SettingsPanel';

export type InterfaceMode = 'graphic' | 'coding' | 'hybrid';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openWindows, setOpenWindows] = useState<any[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>(() => 
    (localStorage.getItem('arci_mode') as InterfaceMode) || 'hybrid'
  );

  const [theme, setTheme] = useState(() => localStorage.getItem('arci_theme') || 'blood');
  const [intensity, setIntensity] = useState(() => Number(localStorage.getItem('arci_intensity') || 8));
  const [customPrompt, setCustomPrompt] = useState(() => localStorage.getItem('arci_prompt') || 'admin@arcontrol');
  const [showUsers, setShowUsers] = useState(() => localStorage.getItem('arci_show_users') === 'true');

  const applyTheme = useCallback((themeKey: string) => {
    const themeData = THEMES[themeKey.toLowerCase()];
    if (themeData) {
      document.documentElement.style.setProperty('--neon-accent', themeData.accent);
      document.documentElement.style.setProperty('--neon-glow', themeData.glow);
      document.documentElement.style.setProperty('--bg-color', themeData.bg);
      document.documentElement.style.setProperty('--text-color', themeData.text);
      localStorage.setItem('arci_theme', themeKey);
      setTheme(themeKey);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    localStorage.setItem('arci_mode', interfaceMode);
    localStorage.setItem('arci_show_users', String(showUsers));
  }, [interfaceMode, showUsers]);

  const [vfs, setVfs] = useState<VirtualFS>(() => ({
    currentPath: '/root',
    root: {
      name: '/',
      type: 'directory',
      children: [
        { name: 'root', type: 'directory', children: [
          { name: 'AR_CONTROL', type: 'directory', children: [
             { name: 'bypass_log.txt', type: 'file', content: 'SESSION_ID: Scorpion_99\nACCESS: GRANTED' }
          ] },
          { name: 'EXPLOITS', type: 'directory', children: [
             { name: 'ghost_injector.sh', type: 'file', content: '#!/bin/bash\necho "Injecting GHOST_PAYLOAD..."' }
          ] }
        ]}
      ]
    }
  }));

  const handleToolSelect = (tool: Tool) => {
    const existing = openWindows.find(w => w.tool.id === tool.id);
    if (existing) {
      focusWindow(existing.id);
      if (existing.isMinimized) {
        setOpenWindows(prev => prev.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
      }
      return;
    }

    const newId = `${tool.id}-${Date.now()}`;
    const newWindow = {
      id: newId,
      tool,
      isMinimized: false,
      isMaximized: interfaceMode === 'coding' || tool.id === 'settings',
      zIndex: maxZIndex + 1
    };
    
    setOpenWindows(prev => [...prev, newWindow]);
    setFocusedWindowId(newId);
    setMaxZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    if (focusedWindowId === id) setFocusedWindowId(null);
  };

  const focusWindow = (id: string) => {
    setFocusedWindowId(id);
    setMaxZIndex(prev => prev + 1);
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w));
  };

  const toggleMinimize = (id: string) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  };

  const toggleMaximize = (id: string) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} showUsers={showUsers} />;
  }

  return (
    <Layout 
      isLoggedIn={true} 
      onToolSelect={handleToolSelect} 
      activeApp={focusedWindowId ? openWindows.find(w => w.id === focusedWindowId)?.tool.name : undefined}
      openWindows={openWindows.map(w => w.tool)}
      onShutdown={() => setIsLoggedIn(false)}
      interfaceMode={interfaceMode}
      onModeChange={setInterfaceMode}
    >
      <div className="relative w-full h-full p-4 overflow-hidden">
        {openWindows.map((win) => (
          <div 
            key={win.id}
            style={{ zIndex: win.zIndex }}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${win.isMinimized ? 'opacity-0 scale-90 translate-y-full pointer-events-none' : 'opacity-100 scale-100'}`}
          >
            <AppWindow 
              tool={win.tool} 
              isMaximized={win.isMaximized}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => toggleMinimize(win.id)}
              onMaximize={() => toggleMaximize(win.id)}
              onFocus={() => focusWindow(win.id)}
              isFocused={focusedWindowId === win.id}
            >
              {win.tool.id === 'terminal' || interfaceMode === 'coding' ? (
                <Terminal 
                  vfs={vfs} 
                  onVfsUpdate={setVfs} 
                  intensity={intensity} 
                  customPrompt={customPrompt}
                  onIntensityChange={setIntensity}
                  onPromptChange={setCustomPrompt}
                  onThemeChange={applyTheme}
                  embedded={interfaceMode === 'hybrid' && win.tool.id !== 'terminal'}
                />
              ) : null}

              {(win.tool.id !== 'terminal' && (interfaceMode === 'graphic' || interfaceMode === 'hybrid')) && (
                <div className="flex-1 flex flex-col min-h-0 animate-in slide-in-from-bottom-2 duration-500">
                   {win.tool.id === 'ai_consultant' ? (
                    <AIConsultant />
                  ) : win.tool.id === 'monitor' ? (
                    <SystemMonitor />
                  ) : win.tool.id === 'biblioteca' ? (
                    <FileManager vfs={vfs} />
                  ) : win.tool.id === 'settings' ? (
                    <SettingsPanel 
                      currentTheme={theme} 
                      onThemeChange={applyTheme} 
                      intensity={intensity} 
                      onIntensityChange={setIntensity}
                      prompt={customPrompt}
                      onPromptChange={setCustomPrompt}
                      showUsers={showUsers}
                      onToggleUsers={setShowUsers}
                    />
                  ) : win.tool.id === 'office_suite' ? (
                    <OfficeSuite />
                  ) : win.tool.id === 'media_factory' ? (
                    <MediaFactory />
                  ) : win.tool.id === 'net_scanner' ? (
                    <NetworkScanner />
                  ) : win.tool.id === 'github_exploits' ? (
                    <GitHubExploits />
                  ) : win.tool.id === 'traffic_interceptor' ? (
                    <TrafficInterceptor />
                  ) : win.tool.id === 'wifi_crack' ? (
                    <WirelessAuditor />
                  ) : win.tool.id === 'social_phish' ? (
                    <SocialPhish />
                  ) : win.tool.id === 'vpn_proxy' ? (
                    <VPNProxy />
                  ) : (
                    <GenericToolDisplay tool={win.tool} mode={interfaceMode} />
                  )}
                </div>
              )}
            </AppWindow>
          </div>
        ))}

        {openWindows.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none select-none transition-all duration-1000">
             <div className="text-[12rem] font-black font-cyber text-[var(--neon-accent)] leading-none animate-pulse">CONTROL</div>
             <div className="text-xl font-mono tracking-[1.5em] uppercase text-center">Protocolo Ghost v5.5 Activo<br/>Interfaz de Seguridad Cargada</div>
          </div>
        )}

        <FloatingTools onToolSelect={handleToolSelect} />
      </div>
    </Layout>
  );
}

export default App;
