
import React, { useState, useEffect } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';
import { DEVELOPER_SITE } from '../constants';

interface WifiNetwork {
  ssid: string;
  bssid: string;
  pwr: number;
  beacons: number;
  data: number;
  ch: number;
  enc: string;
  auth: string;
  clients: string[];
}

const WirelessAuditor: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<WifiNetwork | null>(null);
  const [logs, setLogs] = useState<string>('');
  const [cracking, setCracking] = useState(false);
  const [crackedKey, setCrackedKey] = useState<string | null>(null);
  const [crackProgress, setCrackProgress] = useState(0);

  const startScan = () => {
    setScanning(true);
    setLogs(`[+] Monitor mode enabled on wlan0mon\n[+] Scanning 2.4GHz / 5GHz spectrum...\n`);
    setCrackedKey(null);
    setCrackProgress(0);
    
    setTimeout(() => {
      setNetworks([
        { ssid: 'Starlink_GHOST', bssid: 'F4:F2:6D:88:99:AA', pwr: -32, beacons: 4200, data: 125, ch: 11, enc: 'WPA2', auth: 'PSK', clients: ['E0:D4:64:11:22:33', '88:12:F4:A1:B2:C3'] },
        { ssid: 'Scorpion_Net', bssid: 'A0:D1:60:E2:42:5A', pwr: -45, beacons: 1205, data: 450, ch: 1, enc: 'WPA3', auth: 'SAE', clients: [] },
        { ssid: 'CECYTEN_EMSAD16', bssid: '00:E0:4C:68:12:34', pwr: -68, beacons: 240, data: 12, ch: 6, enc: 'WPA2', auth: 'PSK', clients: ['B4:D9:E3:44:55:66'] },
        { ssid: 'Home_Wifi_234', bssid: 'B4:12:D9:88:11:22', pwr: -55, beacons: 500, data: 88, ch: 9, enc: 'WPA2', auth: 'PSK', clients: [] }
      ]);
      setScanning(false);
      setLogs(l => l + `[+] Found 4 targets. Handshakes detected on Starlink_GHOST.\n`);
    }, 2000);
  };

  const startCrack = async () => {
    if (!selectedNetwork) return;
    setCracking(true);
    setCrackProgress(0);
    setLogs(l => l + `\n[!] ATTACK: Starting brute force attack against ${selectedNetwork.ssid} using rockyou.txt\n`);
    
    const interval = setInterval(() => {
        setCrackProgress(p => (p < 100 ? p + Math.random() * 8 : 100));
    }, 300);

    const prompt = `Simula el proceso de cracking de una red WiFi con Aircrack-ng. Muestra la tabla de fuerza bruta, el conteo de keys por segundo (K/s) y finalmente muestra el mensaje "KEY FOUND! [ password ]" con una clave realista. Red: ${selectedNetwork.ssid}.`;
    const response = await executeCommandWithGemini(prompt, [], "AIRCRACK_NG_CRACK_MODE");
    
    setTimeout(() => {
        clearInterval(interval);
        setCrackProgress(100);
        setLogs(l => l + response);
        setCrackedKey(response.match(/\[\s*(.*?)\s*\]/)?.[1] || "GHOST_X_99");
        setCracking(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] font-mono text-sm overflow-hidden">
      <div className="bg-black/90 border-b border-[var(--neon-accent)]/20 p-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <span className="text-4xl animate-pulse">📡</span>
          <div>
            <h2 className="text-[12px] font-cyber text-[var(--neon-accent)] tracking-widest uppercase font-black">Scorpion_Airodump_Terminal_v5</h2>
            <p className="text-[8px] opacity-40 uppercase">Aircrack-ng Suite Integrated | ChrisRey91</p>
          </div>
        </div>
        <button onClick={startScan} disabled={scanning} className="px-8 py-3 bg-[var(--neon-accent)]/10 border-2 border-[var(--neon-accent)] text-[var(--neon-accent)] uppercase text-[12px] font-black hover:bg-[var(--neon-accent)] hover:text-black transition-all shadow-[0_0_25px_var(--neon-glow)]">
          {scanning ? 'INHALING_PACKETS...' : 'EXECUTE_AIRMON_NG'}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-white/10 overflow-hidden flex flex-col bg-black/40">
           <div className="p-4 bg-white/5 border-b border-white/5 text-[9px] uppercase tracking-[0.4em] font-black text-white/30 flex justify-between">
              <span>BSSID_Scanning_Table</span>
              <span className="text-green-500">Live</span>
           </div>
           <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead className="sticky top-0 bg-[#0a1a2f] border-b border-white/10 text-white/40 uppercase tracking-widest">
                    <tr>
                        <th className="p-2">BSSID</th>
                        <th className="p-2">PWR</th>
                        <th className="p-2">DATA</th>
                        <th className="p-2">ESSID</th>
                    </tr>
                </thead>
                <tbody>
                    {networks.map((net, i) => (
                        <tr 
                            key={i} 
                            onClick={() => setSelectedNetwork(net)}
                            className={`cursor-pointer border-b border-white/5 transition-all ${selectedNetwork?.bssid === net.bssid ? 'bg-[var(--neon-accent)]/20 text-white' : 'hover:bg-white/5 text-white/60'}`}
                        >
                            <td className="p-2 font-terminal">{net.bssid}</td>
                            <td className={`p-2 font-bold ${net.pwr > -50 ? 'text-green-500' : 'text-yellow-500'}`}>{net.pwr}</td>
                            <td className="p-2 text-white/40">{net.data}</td>
                            <td className="p-2 font-black text-[var(--neon-accent)]">{net.ssid}</td>
                        </tr>
                    ))}
                </tbody>
              </table>
              {networks.length === 0 && !scanning && (
                <div className="h-64 flex flex-col items-center justify-center opacity-5 select-none uppercase tracking-[1.5em] text-center italic">
                    Start_Airodump
                </div>
              )}
           </div>
        </div>

        <div className="flex-1 bg-black/50 p-8 flex flex-col overflow-hidden relative">
           {selectedNetwork ? (
             <div className="space-y-8 z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{selectedNetwork.ssid}</h3>
                        <p className="text-[10px] text-white/30 uppercase mt-2 font-bold tracking-widest">Target: {selectedNetwork.bssid} | Enc: {selectedNetwork.enc}</p>
                    </div>
                    {crackedKey && (
                        <div className="bg-green-600/10 border-2 border-green-600 p-5 rounded-2xl animate-in zoom-in-95 shadow-[0_0_30px_rgba(0,255,0,0.3)]">
                            <div className="text-[9px] text-green-500 uppercase font-black mb-2 tracking-[0.5em]">Network_Key_Compromised</div>
                            <div className="text-2xl font-terminal text-white select-all">{crackedKey}</div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button onClick={startCrack} disabled={cracking} className="py-4 bg-red-600/10 border-2 border-red-600/40 text-red-600 text-[11px] uppercase font-black hover:bg-red-600 hover:text-white transition-all rounded-xl disabled:opacity-20 shadow-lg">
                      {cracking ? 'BRUTE_FORCING...' : 'LAUNCH_AIRCRACK_NG'}
                   </button>
                   <button className="py-4 bg-white/5 border border-white/10 text-white/60 text-[11px] uppercase font-black hover:bg-white/10 transition-all rounded-xl">
                      DEAUTH_CLIENTS
                   </button>
                </div>
                
                {cracking && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-[var(--neon-accent)] font-black">
                      <span>Neural_Cracking_v5</span>
                      <span>{Math.floor(crackProgress)}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                      <div className="h-full bg-[var(--neon-accent)] shadow-[0_0_20px_var(--neon-glow)] transition-all" style={{ width: `${crackProgress}%` }}></div>
                    </div>
                  </div>
                )}

                <div className="flex-1 bg-black/40 border border-white/5 p-6 rounded-3xl overflow-y-auto custom-scrollbar shadow-inner relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none text-9xl">🦂</div>
                    <pre className="text-[13px] text-[#00f3ff]/90 leading-relaxed font-terminal z-10 relative">
                        {logs || 'SCORPION_GHOST_AIRCRAFING_STDBY...'}
                    </pre>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center opacity-10 uppercase tracking-[1em] text-center select-none">
                <span className="text-9xl mb-12">🦂</span>
                <br/>Target_Not_Locked
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default WirelessAuditor;
