import React, { useState, useEffect } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';

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
  const [customUrl, setCustomUrl] = useState('https://www.facebook.com/login');
  const [phishingLink, setPhishingLink] = useState('');
  const [attacking, setAttacking] = useState(false);
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [capturedData, setCapturedData] = useState<TargetData[]>([]);

  const platforms = [
    { name: 'Facebook', icon: '📘', url: 'https://www.facebook.com/login' },
    { name: 'Google', icon: '📧', url: 'https://accounts.google.com' },
    { name: 'WhatsApp', icon: '🟢', url: 'https://web.whatsapp.com' },
    { name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/accounts/login/' },
    { name: 'Bank_Clone', icon: '💰', url: 'https://secure.bankofamerica.com' }
  ];

  const handlePlatformSelect = (p: {name: string, url: string}) => {
    setPlatform(p.name);
    setCustomUrl(p.url);
  };

  const startAttack = () => {
    if (!target || !customUrl) return;
    setAttacking(true);
    setPhishingLink('');
    setStep(1);
    
    setLogs([
        `[!] GHOST_PHISH: Initializing SOCIAL_ENGINEERING_TOOLKIT v5.5`, 
        `[*] Target_Vector: ${target}`, 
        `[*] Cloning URL: ${customUrl}`,
        `[+] Injecting credential harvester script... OK`,
        `[+] Generating obfuscated phishing link...`
    ]);

    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 15);
      const generatedLink = `https://secure-login-session.net/${platform.toLowerCase()}_auth_token=${randomString}`;
      setPhishingLink(generatedLink);
      setStep(2);
      setLogs(prev => [...prev, 
        `[+] SUCCESS! Phishing URL Generated.`,
        `[*] Listening for incoming connections on port 443...`,
        `[*] Waiting for victim interaction...`
      ]);
    }, 2500);
  };

  const simulateVictimInteraction = async () => {
    setStep(3);
    setLogs(prev => [...prev, 
      `[!] CONNECTION RECEIVED!`,
      `[*] Source IP: 187.164.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
      `[*] User Agent: Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36`,
      `[+] Victim submitting credentials...`
    ]);

    const prompt = `Simula un reporte de éxito de ingeniería social. El objetivo es ${target} en la plataforma ${platform}. 
    Muestra la clave capturada (inventa una realista y segura como "Scorpion_King_2024!"), los logs de la petición POST con los datos, 
    y un análisis de Scorpion AI sobre la efectividad del ataque. Usa tablas ASCII.`;
    
    const response = await executeCommandWithGemini(prompt, [], "SOCIAL_PHISH_FINAL_RESULT");

    setTimeout(() => {
      setLogs(prev => [...prev, 
        "[+] DATA_CAPTURE_SUCCESS: Credentials written to /root/ghost/harvest.log",
        response
      ]);
      
      const newData: TargetData = { 
        platform, 
        user: target, 
        pass: "Scorpion_King_2024!", 
        ip: `187.164.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
        device: "SM-G998B (Samsung S21 Ultra)",
        location: "Nayarit, MX",
        timestamp: new Date().toLocaleTimeString()
      };
      
      setCapturedData(prev => [newData, ...prev]);
      setAttacking(false);
      setStep(0);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] font-mono p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-4">
            <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">🎭</span>
            <div>
                <h2 className="text-[12px] font-cyber text-[var(--neon-accent)] tracking-widest uppercase font-black">Phish_Master_Pro_v5</h2>
                <p className="text-[8px] opacity-40 uppercase tracking-[0.4em]">Integrated with SEToolkit & Ghost OS</p>
            </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Lado Izquierdo: Configuración */}
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-black border-l-2 border-[var(--neon-accent)] pl-3">1. Seleccionar Plantilla (Opcional)</h3>
            <div className="grid grid-cols-5 gap-2">
              {platforms.map(p => (
                <button
                  key={p.name}
                  onClick={() => handlePlatformSelect(p)}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${platform === p.name ? 'bg-[var(--neon-accent)]/20 border-[var(--neon-accent)] text-white shadow-[0_0_15px_var(--neon-glow)]' : 'bg-black/40 border-white/5 text-white/30 hover:bg-white/5'}`}
                >
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-[8px] font-black uppercase">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-black border-l-2 border-[var(--neon-accent)] pl-3">2. Configurar Ataque</h3>
                <input 
                  type="text" 
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="URL A CLONAR (SIMULADO)"
                  className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white text-xs outline-none focus:border-[var(--neon-accent)] font-terminal shadow-inner"
                />
                <input 
                  type="text" 
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="TARGET_ACCOUNT (Email/User)"
                  className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-[var(--neon-accent)] text-xs outline-none focus:border-[var(--neon-accent)] font-terminal shadow-inner"
                />
                <button 
                  onClick={startAttack}
                  disabled={attacking || !target || !customUrl}
                  className="w-full py-4 bg-red-600/10 border-2 border-red-600 text-red-600 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-red-600 hover:text-white transition-all rounded-xl disabled:opacity-20 shadow-lg"
                >
                  {attacking ? 'INFILTRANDO...' : 'EJECUTAR ATAQUE'}
                </button>
            </div>

            {phishingLink && (
              <div className="space-y-3 pt-4 border-t border-white/5 animate-in fade-in duration-500">
                  <h3 className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-black border-l-2 border-[var(--neon-accent)] pl-3">3. Vector de Ataque</h3>
                  <div className="bg-black/50 p-3 rounded-lg border border-white/10 text-xs text-green-400 break-all">{phishingLink}</div>
                  <button onClick={() => navigator.clipboard.writeText(phishingLink)} className="w-full text-center bg-white/5 hover:bg-white/10 py-2 rounded-lg text-xs uppercase font-bold tracking-widest transition-colors">Copiar Enlace</button>
                  <button onClick={simulateVictimInteraction} disabled={step !== 2} className="w-full py-3 mt-2 bg-yellow-500/10 border-2 border-yellow-500 text-yellow-500 font-black uppercase text-[10px] hover:bg-yellow-500 hover:text-black transition-all rounded-xl disabled:opacity-20 shadow-lg">
                    Simular Interacción de la Víctima
                  </button>
              </div>
            )}
          </div>
          
          <div className="bg-black/60 border border-white/5 rounded-2xl p-4 flex-1 overflow-hidden flex flex-col">
             <h4 className="text-[9px] text-[var(--neon-accent)] uppercase tracking-widest mb-4 font-black">Credenciales Capturadas</h4>
             <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1">
                {capturedData.map((d, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[var(--neon-accent)]/30 transition-all group animate-in slide-in-from-bottom-4 duration-500">
                     <div className="flex justify-between items-center"><span className="text-[9px] text-[var(--neon-accent)] font-black uppercase tracking-widest">{d.platform}</span><span className="text-[7px] text-white/20">{d.timestamp}</span></div>
                     <div className="flex justify-between items-center border-t border-white/5 pt-2">
                        <span className="text-xs font-bold text-white/80">{d.user}</span>
                        <span className="text-xs text-red-500 font-terminal font-black cursor-pointer" onClick={(e) => (e.currentTarget.textContent = d.pass)}>********</span>
                     </div>
                     <div className="text-[7px] text-white/10 truncate uppercase">IP: {d.ip} | GEO: {d.location}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Lado Derecho: Consola Live */}
        <div className="bg-black/90 border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none text-9xl">🎭</div>
          <div className="bg-white/5 p-3 text-[9px] text-white/40 uppercase tracking-widest flex justify-between border-b border-white/10">
            <span className="flex items-center gap-2"><span className={`w-1.5 h-1.5 rounded-full ${attacking ? 'bg-red-600 animate-ping' : 'bg-green-500'}`}></span>SEToolkit_Neural_Link</span>
             <div className="text-[8px] text-red-500 font-black animate-pulse">MODO_SIMULACIÓN_ACTIVO</div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar font-mono text-[11px] text-[#00f3ff]/90 space-y-2 leading-relaxed">
            {logs.map((log, i) => (<div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300"><span className="text-white/20 mr-2 font-black">{'>'}</span> {log}</div>))}
            {logs.length === 0 && <div className="text-center py-20 opacity-10 tracking-[1em] uppercase">Ready_to_Phish</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPhish;