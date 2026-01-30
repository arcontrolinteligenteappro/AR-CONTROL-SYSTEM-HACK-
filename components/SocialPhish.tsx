
import React, { useState, useEffect } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';
import { DEVELOPER_SITE, DEVELOPER_CREDIT } from '../constants';

interface TargetData {
  platform: string;
  user: string;
  pass: string;
  ip: string;
  device: string;
  location: string;
  timestamp: string;
}

const SocialPhish: React.FC = () => {
  const [target, setTarget] = useState('');
  const [platform, setPlatform] = useState('Facebook');
  const [attacking, setAttacking] = useState(false);
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [capturedData, setCapturedData] = useState<TargetData[]>([]);
  const [alertStatus, setAlertStatus] = useState<'SAFE' | 'TRACED' | 'EXPOSED'>('SAFE');

  const platforms = [
    { name: 'Facebook', icon: '📘', url: 'facebook.com' },
    { name: 'Google', icon: '📧', url: 'accounts.google.com' },
    { name: 'WhatsApp', icon: '🟢', url: 'web.whatsapp.com' },
    { name: 'Instagram', icon: '📸', url: 'instagram.com' },
    { name: 'Bank_Clone', icon: '💰', url: 'secure.bank-id.net' }
  ];

  const startAttack = async () => {
    if (!target) return;
    setAttacking(true);
    setStep(1);
    setAlertStatus('SAFE');
    
    setLogs([
        `[!] GHOST_PHISH: Initializing SOCIAL_ENGINEERING_TOOLKIT v5.5`, 
        `[*] Target_Vector: ${target}`, 
        `[*] Cloner: Downloading CSS/HTML/JS from ${platform}...`,
        `[+] SUCCESS: Credential harvester active on hidden node.`
    ]);

    // Fase 2: Enganche
    setTimeout(() => {
      setStep(2);
      setLogs(prev => [...prev, 
        `[*] Victim ${target} reached the phishing URL...`,
        `[*] Capturing device fingerprint: OS: Android 14, Browser: Chrome 124`,
        `[*] Geo-Location tracking: Latitude: 19.4326, Longitude: -99.1332 (Mexico City)`
      ]);
    }, 2500);

    const prompt = `Simula un reporte de éxito de ingeniería social. El objetivo es ${target} en la plataforma ${platform}. 
    Muestra la clave capturada (inventa una realista como "Admin2024!"), los logs de POST request, 
    y un análisis de Scorpion AI sobre la efectividad del ataque. Usa tablas ASCII.`;
    
    const response = await executeCommandWithGemini(prompt, [], "SOCIAL_PHISH_FINAL_RESULT");
    
    setTimeout(() => {
      setStep(3);
      setLogs(prev => [...prev, 
        "[+] DATA_CAPTURE_SUCCESS: Credentials written to /root/ghost/harvest.log",
        response
      ]);
      
      const newData: TargetData = { 
        platform, 
        user: target, 
        pass: "********** (Click to reveal)", 
        ip: `187.164.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
        device: "SM-G998B (Samsung S21 Ultra)",
        location: "Nayarit, MX",
        timestamp: new Date().toLocaleTimeString()
      };
      
      setCapturedData(prev => [newData, ...prev]);
      setAttacking(false);
      setStep(0);
      if (Math.random() > 0.7) setAlertStatus('TRACED');
    }, 6000);
  };

  return (
    <div className={`flex flex-col h-full bg-[#050505] font-mono p-4 overflow-hidden transition-all duration-700 ${alertStatus === 'TRACED' ? 'border-4 border-red-600 animate-pulse' : ''}`}>
      {alertStatus === 'TRACED' && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center bg-red-600/10 backdrop-blur-[2px]">
           <div className="text-red-600 font-black text-6xl rotate-12 opacity-40">TRACED_BY_IDS</div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-4">
            <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">🎭</span>
            <div>
                <h2 className="text-[12px] font-cyber text-[var(--neon-accent)] tracking-widest uppercase font-black">Phish_Master_Pro_v5</h2>
                <p className="text-[8px] opacity-40 uppercase tracking-[0.4em]">Integrated with SEToolkit & Ghost OS</p>
            </div>
        </div>
        <div className="flex gap-4">
           <div className="px-3 py-1 bg-black border border-white/10 rounded-lg text-[8px] flex flex-col items-center">
              <span className="text-white/20">STATUS</span>
              <span className={alertStatus === 'SAFE' ? 'text-green-500' : 'text-red-500 font-black'}>{alertStatus}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Lado Izquierdo: Configuración */}
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-black border-l-2 border-[var(--neon-accent)] pl-3">Target_Config</h3>
            
            <div className="grid grid-cols-3 gap-2">
              {platforms.map(p => (
                <button
                  key={p.name}
                  onClick={() => setPlatform(p.name)}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${platform === p.name ? 'bg-[var(--neon-accent)]/20 border-[var(--neon-accent)] text-white shadow-[0_0_15px_var(--neon-glow)]' : 'bg-black/40 border-white/5 text-white/30 hover:bg-white/5'}`}
                >
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-[8px] font-black uppercase">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
                <input 
                  type="text" 
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="TARGET_ACCOUNT (Email/User)"
                  className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-[var(--neon-accent)] text-xs outline-none focus:border-[var(--neon-accent)] font-terminal shadow-inner"
                />
                <button 
                  onClick={startAttack}
                  disabled={attacking}
                  className="w-full py-4 bg-red-600/10 border-2 border-red-600 text-red-600 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-red-600 hover:text-white transition-all rounded-xl disabled:opacity-20 shadow-lg"
                >
                  {attacking ? 'INFILTRATING...' : 'EXECUTE_ATTACK'}
                </button>
            </div>
          </div>

          <div className="bg-black/60 border border-white/5 rounded-2xl p-4 flex-1 overflow-hidden flex flex-col">
             <h4 className="text-[9px] text-[var(--neon-accent)] uppercase tracking-widest mb-4 font-black">Captured_Credentials_DB</h4>
             <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1">
                {capturedData.map((d, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[var(--neon-accent)]/30 transition-all group">
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] text-[var(--neon-accent)] font-black uppercase tracking-widest">{d.platform}</span>
                        <span className="text-[7px] text-white/20">{d.timestamp}</span>
                     </div>
                     <div className="flex justify-between items-center border-t border-white/5 pt-2">
                        <span className="text-xs font-bold text-white/80">{d.user}</span>
                        <span className="text-xs text-red-500 font-terminal font-black group-hover:hidden">********</span>
                        <span className="text-xs text-red-500 font-terminal font-black hidden group-hover:block animate-pulse">SECRET_X99</span>
                     </div>
                     <div className="text-[7px] text-white/10 truncate uppercase">
                        IP: {d.ip} | GEO: {d.location} | DEV: {d.device}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Lado Derecho: Consola Live */}
        <div className="bg-black/90 border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none text-9xl">🎭</div>
          <div className="bg-white/5 p-3 text-[9px] text-white/40 uppercase tracking-widest flex justify-between border-b border-white/10">
            <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${attacking ? 'bg-red-600 animate-ping' : 'bg-green-500'}`}></span>
                SEToolkit_Neural_Link
            </span>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar font-mono text-[11px] text-[#00f3ff]/90 space-y-2 leading-relaxed">
            {logs.map((log, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-white/20 mr-2 font-black">{'>'}</span> {log}
              </div>
            ))}
            {attacking && (
                <div className="flex flex-col gap-2 mt-4 bg-[var(--neon-accent)]/5 p-4 border border-[var(--neon-accent)]/10 rounded-xl">
                    <div className="flex items-center gap-3 text-[var(--neon-accent)] text-[9px] font-black uppercase animate-pulse">
                        <div className="w-3 h-3 border-2 border-[var(--neon-accent)] border-t-transparent rounded-full animate-spin"></div>
                        {step === 1 ? 'Mapping_Payload...' : step === 2 ? 'Infecting_DOM...' : 'Listening_Listener_01...'}
                    </div>
                </div>
            )}
            {logs.length === 0 && <div className="text-center py-20 opacity-10 tracking-[1em] uppercase">Ready_to_Phish</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPhish;
