
import React, { useState, useEffect } from 'react';
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
  const [view, setView] = useState<'list' | 'map'>('list');
  const [scanning, setScanning] = useState(false);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [targetRange, setTargetRange] = useState('192.168.1.0/24');
  const [logs, setLogs] = useState<string>('');
  const [activeExploit, setActiveExploit] = useState<string | null>(null);

  const startScan = async () => {
    setScanning(true);
    setLogs(`[+] Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toLocaleString()}\n[+] Initiate Stealth SYN Scan (-sS -sV -O -T4)...\n`);
    
    setTimeout(() => setLogs(l => l + "Scanning 256 IPs... [####################] 100%\n"), 1500);
    
    const prompt = `Simula un escaneo nmap real en ${targetRange}. Devuelve un log detallado de nmap incluyendo MAC Addresses, vendors (Cisco, Apple, Microsoft), y versiones exactas de servicios (ej: Apache 2.4.41). Identifica al menos 3 hosts con vulnerabilidades críticas como EternalBlue o Log4j.`;
    const response = await executeCommandWithGemini(prompt, [], "NMAP_DETAILED_SCAN_MODE");
    
    setLogs(l => l + response);
    
    setHosts([
      { 
        ip: '192.168.1.1', 
        mac: '00:50:56:C0:00:01', 
        vendor: 'Cisco Systems', 
        status: 'up', 
        os: 'IOS 15.1', 
        ports: [{port: 80, service: 'http', state: 'open', version: 'Apache/2.2.8'}, {port: 443, service: 'https', state: 'open'}],
        vulnerabilities: ['CVE-2018-0171']
      },
      { 
        ip: '192.168.1.105', 
        mac: 'B4:2E:99:A1:C2:E4', 
        vendor: 'Microsoft Corp', 
        status: 'up', 
        os: 'Windows 7 SP1 (Internal)', 
        ports: [{port: 445, service: 'microsoft-ds', state: 'open', version: 'SMBv1'}],
        vulnerabilities: ['MS17-010 (EternalBlue)']
      },
      { 
        ip: '192.168.1.112', 
        mac: '08:00:27:0D:33:F1', 
        vendor: 'Oracle/VirtualBox', 
        status: 'up', 
        os: 'Ubuntu 16.04', 
        ports: [{port: 22, service: 'ssh', state: 'open', version: 'OpenSSH 7.2p2'}],
        vulnerabilities: ['Local Privilege Escalation']
      }
    ]);
    
    setScanning(false);
  };

  const launchExploit = async (host: Host, vuln: string) => {
    setActiveExploit(host.ip);
    setLogs(l => l + `\n[!] ATTACK_START: Launching exploit ${vuln} against ${host.ip}...\n`);
    
    const prompt = `Simula la ejecución de un exploit real contra ${host.ip} usando ${vuln}. Muestra logs de Metasploit (MSFconsole), el proceso de bypass de firewall, el envío del payload y finalmente la obtención de una sesión de Meterpreter. Muestra la shell interactiva.`;
    const response = await executeCommandWithGemini(prompt, [], "METASPLOIT_EXPLOITATION_ACTIVE");
    
    setTimeout(() => {
        setLogs(l => l + response + `\n[+] SESSION_ESTABLISHED: meterpreter session 1 opened (${host.ip}:4444)\n`);
        setActiveExploit(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] font-mono p-4 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between mb-4 border-b border-white/5 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">🔍</span>
          <div>
            <h2 className="text-[12px] font-cyber text-[var(--neon-accent)] tracking-widest uppercase font-black">Scorpion_Network_Mapper_v5</h2>
            <p className="text-[8px] opacity-40 uppercase">Mode: Stealth / Aggressive OS Fingerprinting</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <input 
            type="text" 
            value={targetRange} 
            onChange={(e) => setTargetRange(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-[11px] text-[var(--neon-accent)] outline-none focus:border-[var(--neon-accent)] w-64 font-terminal shadow-inner"
          />
          <button 
            onClick={startScan}
            disabled={scanning}
            className="bg-[var(--neon-accent)]/10 border border-[var(--neon-accent)] text-[var(--neon-accent)] px-6 py-2 text-[11px] uppercase font-black hover:bg-[var(--neon-accent)] hover:text-black transition-all disabled:opacity-30 shadow-[0_0_15px_var(--neon-glow)]"
          >
            {scanning ? 'INFILTRATING...' : 'EXECUTE_SCAN'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black">Discovered_Targets</h3>
             <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[9px] text-green-500 font-bold uppercase">Live_Feed</span>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
            {hosts.map((host, idx) => (
              <div key={idx} className={`bg-white/5 border-2 rounded-2xl p-5 transition-all group relative overflow-hidden ${activeExploit === host.ip ? 'border-red-600 animate-pulse bg-red-600/5' : 'border-white/5 hover:border-[var(--neon-accent)]/30'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xl font-black text-[var(--neon-accent)] tracking-tighter">{host.ip}</div>
                    <div className="text-[9px] text-white/40 uppercase font-bold mt-1">{host.vendor} | MAC: {host.mac}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black text-white/60 bg-white/5 px-2 py-1 rounded-lg uppercase">{host.os}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {host.ports.map((p, pi) => (
                    <div key={pi} className="flex flex-col bg-black/60 p-2 rounded-xl border border-white/5">
                      <div className="flex justify-between text-[9px] font-black">
                        <span className="text-[var(--neon-accent)]">{p.port}/{p.service.toUpperCase()}</span>
                        <span className="text-green-500">{p.state}</span>
                      </div>
                      <div className="text-[8px] text-white/20 truncate">{p.version || 'No Version Info'}</div>
                    </div>
                  ))}
                </div>

                {host.vulnerabilities.length > 0 && (
                  <div className="space-y-2">
                    {host.vulnerabilities.map((v, vi) => (
                      <div key={vi} className="flex items-center justify-between bg-red-600/10 border border-red-600/20 p-3 rounded-xl">
                        <span className="text-[10px] text-red-500 font-black uppercase tracking-widest animate-pulse">VULN: {v}</span>
                        <button 
                          onClick={() => launchExploit(host, v)}
                          disabled={activeExploit !== null}
                          className="bg-red-600 text-white text-[9px] font-black px-4 py-1 rounded-lg hover:bg-white hover:text-red-600 transition-all uppercase disabled:opacity-20"
                        >
                          Exploit
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {hosts.length === 0 && !scanning && (
              <div className="h-full flex flex-col items-center justify-center opacity-10 text-center py-20 uppercase tracking-[1em] select-none italic">
                <span className="text-6xl mb-6">🎯</span>
                No_Nodes_Mapped
              </div>
            )}
          </div>
        </div>

        <div className="bg-black/60 border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-inner relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--neon-accent)] opacity-20"></div>
          <div className="bg-white/5 p-3 text-[9px] text-white/40 flex justify-between uppercase font-cyber tracking-widest border-b border-white/5">
            <span>Terminal_Raw_Output</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span> Live_Log</span>
          </div>
          <pre className="flex-1 p-6 text-[12px] text-[#00f3ff]/90 overflow-y-auto whitespace-pre-wrap custom-scrollbar leading-relaxed font-terminal selection:bg-red-600 selection:text-white">
            {logs || "SCORPION_KALI_SYSTEM_INITIALIZED_STDBY..."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default NetworkScanner;
