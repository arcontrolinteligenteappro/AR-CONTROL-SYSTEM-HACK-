
import React, { useState, useEffect, useRef } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';

interface Host {
  ip: string;
  mac: string;
  vendor: string;
  status: 'up' | 'down';
  os: string;
  ports: { port: number, service: string, state: string, version?: string }[];
  vulnerabilities: string[];
}

const NetworkScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [targetRange, setTargetRange] = useState('192.168.1.0/24');
  const [logs, setLogs] = useState<string>('');
  const [activeExploit, setActiveExploit] = useState<string | null>(null);
  const logRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const startScan = async () => {
    setScanning(true);
    setHosts([]);
    setLogs(`[+] Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleString()}\n[+] Initiate Stealth SYN Scan (-sS -sV -O -T4)...\n[+] Scanning subnet ${targetRange}...\n`);
    
    const prompt = `Simula un escaneo nmap real en ${targetRange}. Devuelve un log detallado de nmap incluyendo MAC Addresses, vendors y versiones exactas. Proporciona los datos en un bloque de código y asegúrate de que haya 3 hosts: uno Cisco, uno Windows 7 (vulnerable a EternalBlue) y uno Linux.`;
    const response = await executeCommandWithGemini(prompt, [], "NMAP_DETAILED_SCAN_MODE");
    
    setLogs(prev => prev + response);
    
    // Simular el mapeo de los hosts tras el reporte de la IA
    setHosts([
      { 
        ip: '192.168.1.1', 
        mac: '00:50:56:C0:00:01', 
        vendor: 'Cisco Systems', 
        status: 'up', 
        os: 'IOS 15.1', 
        ports: [{port: 80, service: 'http', state: 'open', version: 'Apache/2.2.8'}],
        vulnerabilities: []
      },
      { 
        ip: '192.168.1.105', 
        mac: 'B4:2E:99:A1:C2:E4', 
        vendor: 'Microsoft Corp', 
        status: 'up', 
        os: 'Windows 7 SP1', 
        ports: [{port: 445, service: 'microsoft-ds', state: 'open', version: 'SMBv1'}],
        vulnerabilities: ['MS17-010 (EternalBlue)']
      },
      { 
        ip: '192.168.1.112', 
        mac: '08:00:27:0D:33:F1', 
        vendor: 'Ubuntu Linux', 
        status: 'up', 
        os: 'Linux 5.4.0', 
        ports: [{port: 22, service: 'ssh', state: 'open', version: 'OpenSSH 7.2p2'}],
        vulnerabilities: ['SSH Weak Auth']
      }
    ]);
    
    setScanning(false);
  };

  const launchExploit = async (host: Host, vuln: string) => {
    setActiveExploit(host.ip);
    setLogs(prev => prev + `\n\n[!] ATTACK_START: Launching exploit ${vuln} against ${host.ip}...\n`);
    
    const prompt = `Simula la ejecución de un exploit real contra ${host.ip} usando ${vuln}. Muestra logs de Metasploit, el envío del payload y finalmente la obtención de una sesión de Meterpreter. No menciones que eres una IA.`;
    const response = await executeCommandWithGemini(prompt, [], "METASPLOIT_EXPLOITATION_ACTIVE");
    
    setLogs(prev => prev + response + `\n[+] SESSION_ESTABLISHED: meterpreter session 1 opened (${host.ip}:4444)\n`);
    setActiveExploit(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] font-mono p-4 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between mb-4 border-b border-white/5 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">🔍</span>
          <div>
            <h2 className="text-[12px] font-cyber text-[var(--neon-accent)] tracking-widest uppercase font-black">Scorpion_Network_Mapper</h2>
            <p className="text-[8px] opacity-40 uppercase">Mode: Stealth OS Fingerprinting</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <input 
            type="text" 
            value={targetRange} 
            onChange={(e) => setTargetRange(e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-[11px] text-[var(--neon-accent)] outline-none focus:border-[var(--neon-accent)] font-terminal"
          />
          <button 
            onClick={startScan}
            disabled={scanning}
            className="bg-[var(--neon-accent)]/10 border border-[var(--neon-accent)] text-[var(--neon-accent)] px-4 py-2 text-[10px] uppercase font-black hover:bg-[var(--neon-accent)] hover:text-black transition-all active-scale disabled:opacity-30"
          >
            {scanning ? 'INFILTRANDO...' : 'EJECUTAR_SCAN'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Targets List */}
        <div className="w-full lg:w-1/2 bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col overflow-hidden">
          <h3 className="text-[9px] text-white/40 uppercase tracking-widest mb-4">MAPPED_NODES</h3>
          <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {hosts.map((host, idx) => (
              <div key={idx} className={`bg-white/5 border rounded-xl p-4 transition-all ${activeExploit === host.ip ? 'border-red-600 animate-pulse' : 'border-white/5 hover:border-[var(--neon-accent)]/30'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[var(--neon-accent)] font-bold text-lg">{host.ip}</div>
                  <div className="text-[8px] bg-white/5 px-2 py-1 rounded text-white/60">{host.os}</div>
                </div>
                <div className="text-[9px] text-white/40 mb-3 truncate">MAC: {host.mac} | {host.vendor}</div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {host.ports.map((p, pi) => (
                    <span key={pi} className="text-[8px] bg-black/60 px-2 py-1 border border-white/5 rounded text-green-500">
                      {p.port}/{p.service}
                    </span>
                  ))}
                </div>

                {host.vulnerabilities.map((v, vi) => (
                  <button 
                    key={vi} 
                    onClick={() => launchExploit(host, v)}
                    disabled={activeExploit !== null}
                    className="w-full mt-2 bg-red-600/20 border border-red-600/40 text-red-500 text-[9px] py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all font-black uppercase disabled:opacity-20"
                  >
                    Launch Exploit: {v}
                  </button>
                ))}
              </div>
            ))}
            {hosts.length === 0 && !scanning && (
              <div className="h-full flex flex-col items-center justify-center opacity-10 uppercase tracking-widest text-center">
                <span className="text-4xl mb-4">📡</span>
                No Nodes Mapped
              </div>
            )}
          </div>
        </div>

        {/* Console Logs */}
        <div className="w-full lg:w-1/2 bg-black/60 border border-white/5 rounded-xl flex flex-col overflow-hidden">
          <div className="bg-white/5 p-2 text-[8px] text-white/30 uppercase tracking-[0.2em] border-b border-white/5 flex justify-between">
            <span>Terminal_Output</span>
            <span className="text-red-500 animate-pulse">Live_Feed</span>
          </div>
          <pre 
            ref={logRef}
            className="flex-1 p-4 text-[11px] text-[#00f3ff]/90 overflow-y-auto whitespace-pre-wrap font-terminal leading-relaxed"
          >
            {logs || "SCORPION_KALI_SYSTEM_STDBY..."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default NetworkScanner;
