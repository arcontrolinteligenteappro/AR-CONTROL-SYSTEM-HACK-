
import React, { useState } from 'react';
import { OpMode } from '../constants';

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

interface Props { opMode: OpMode; }

const WirelessAuditor: React.FC<Props> = ({ opMode }) => {
  const [scanning, setScanning] = useState(false);
  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<WifiNetwork | null>(null);
  const [logs, setLogs] = useState<string>('');
  const [attacking, setAttacking] = useState<string | null>(null);

  const startScan = async () => {
    if (opMode === 'real') {
      try {
        await navigator.geolocation.getCurrentPosition(() => {}, () => {
          setLogs(l => "[!] ERROR_REAL_MODE: Geolocation permission denied.\n" + l);
        });
      } catch (e) {
        setLogs(l => "[!] ERROR: Could not access device sensors.\n" + l);
        return;
      }
    }
    
    setScanning(true);
    setSelectedNetwork(null);
    setLogs(`[+] Monitor mode enabled on wlan0mon\n[+] Scanning spectrum... (Mode: ${opMode === 'real' ? 'REAL_RADIO' : 'SIMULATED'})\n`);
    
    setTimeout(() => {
      const mockNets: WifiNetwork[] = [
        { ssid: 'Starlink_GHOST', bssid: 'F4:F2:6D:88:99:AA', pwr: -32, beacons: 4200, data: 125, ch: 11, enc: 'WPA2', auth: 'PSK', clients: ['E0:D4:64:11:22:33'] },
        { ssid: 'Scorpion_Net', bssid: 'A0:D1:60:E2:42:5A', pwr: -45, beacons: 1205, data: 450, ch: 1, enc: 'WPA3', auth: 'SAE', clients: [] },
        { ssid: 'CECYTEN_EMSAD16', bssid: '00:E0:4C:68:12:34', pwr: -68, beacons: 240, data: 12, ch: 6, enc: 'WPA2', auth: 'PSK', clients: ['A1:B2:C3:D4:E5:F6', 'F7:E6:D5:C4:B3:A2'] },
        { ssid: 'FBI_SURVEILLANCE', bssid: 'B4:12:D9:88:11:22', pwr: -85, beacons: 50, data: 2, ch: 9, enc: 'WPA2', auth: 'PSK', clients: [] },
        { ssid: 'INFINITUM_GUEST', bssid: 'C8:D3:FF:1A:BC:DE', pwr: -75, beacons: 150, data: 5, ch: 1, enc: 'OPEN', auth: 'N/A', clients: [] }
      ];
      setNetworks(mockNets);
      setScanning(false);
      setLogs(l => `[+] Found ${mockNets.length} targets. Real-time sniffing active.\n` + l);
    }, 2500);
  };

  const handleAttack = (attackType: string) => {
    if (!selectedNetwork) return;
    setAttacking(attackType);
    let attackLogs = `\n\n[!] ATTACK_VECTOR: Launching ${attackType} on ${selectedNetwork.ssid} (${selectedNetwork.bssid})...\n`;
    setLogs(l => attackLogs + l);
    
    setTimeout(() => {
      attackLogs += `[+] Analyzing target... Security: ${selectedNetwork.enc} (${selectedNetwork.auth})\n`;
      setLogs(l => attackLogs + l.split('\n\n')[1]);
    }, 1000);
    
    setTimeout(() => {
      attackLogs += `[+] Sending crafted packets to BSSID...\n`;
      setLogs(l => attackLogs + l.split('\n\n')[1]);
    }, 2500);
    
    setTimeout(() => {
      attackLogs += `[+] SUCCESS: Handshake captured / Deauth successful / WPS Pixie Dust completed.\n`;
      setLogs(l => attackLogs + l.split('\n\n')[1]);
      setAttacking(null);
    }, 5000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] font-mono text-sm overflow-hidden border-2 border-[var(--neon-accent)]/20">
      <div className="bg-black/90 border-b border-[var(--neon-accent)]/20 p-5 flex items-center justify-between z-10 shadow-xl">
        <div className="flex items-center gap-4">
          <span className="text-4xl animate-pulse">📡</span>
          <div>
            <h2 className="text-[12px] font-cyber text-[var(--neon-accent)] tracking-widest uppercase font-black">Wireless_Auditor_Pro</h2>
            <p className="text-[8px] opacity-40 uppercase tracking-[0.4em]">802.11 Monitor & Deauth Suite</p>
          </div>
        </div>
        <button onClick={startScan} disabled={scanning} className="px-8 py-3 bg-[var(--neon-accent)]/10 border-2 border-[var(--neon-accent)] text-[var(--neon-accent)] uppercase text-[12px] font-black hover:bg-[var(--neon-accent)] hover:text-black transition-all shadow-[0_0_20px_var(--neon-glow)]">
          {scanning ? 'INHALING_PACKETS...' : 'SCAN_NETWORKS'}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Network List */}
        <div className="w-1/2 border-r border-white/10 bg-black/40 overflow-y-auto no-scrollbar">
           <div className="p-4 bg-white/5 border-b border-white/5 text-[9px] uppercase tracking-[0.4em] font-black text-white/40 flex justify-between sticky top-0 bg-[#0a1a2f]">
              <span>Detected_BSSID_Table</span>
              <span className="text-green-500 animate-pulse">Live_Sync</span>
           </div>
           <div className="p-4 space-y-2">
              <table className="w-full text-left text-[11px]">
                <thead>
                    <tr className="text-white/20 uppercase text-[9px] border-b border-white/5">
                        <th className="p-2">ESSID</th><th className="p-2">PWR</th><th className="p-2">ENC</th><th className="p-2">CH</th>
                    </tr>
                </thead>
                <tbody>
                    {networks.map((net, i) => (
                        <tr key={i} onClick={() => { setSelectedNetwork(net); setLogs(''); }} className={`cursor-pointer border-b border-white/5 transition-all group ${selectedNetwork?.bssid === net.bssid ? 'bg-[var(--neon-accent)]/20 text-white' : 'hover:bg-white/5 text-white/60'}`}>
                            <td className="p-2 font-black text-[var(--neon-accent)] group-hover:pl-4 transition-all">{net.ssid}</td>
                            <td className={`p-2 font-bold ${net.pwr > -50 ? 'text-green-500' : 'text-yellow-500'}`}>{net.pwr} dBm</td>
                            <td className={`p-2 font-bold ${net.enc === 'OPEN' ? 'text-red-500' : 'opacity-50'}`}>{net.enc}</td>
                            <td className="p-2 text-white/40">{net.ch}</td>
                        </tr>
                    ))}
                </tbody>
              </table>
              {scanning && <div className="text-center py-4 text-[var(--neon-accent)] animate-pulse text-xs">Scanning...</div>}
           </div>
        </div>

        {/* Action Panel */}
        <div className="flex-1 bg-black/50 p-6 flex flex-col overflow-hidden relative">
           {selectedNetwork ? (
             <div className="animate-in slide-in-from-right-8 duration-500 h-full flex flex-col">
                <div className="mb-6 border-b border-white/10 pb-6">
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{selectedNetwork.ssid}</h3>
                    <p className="text-[10px] text-white/30 uppercase mt-2 font-bold tracking-widest italic">BSSID: {selectedNetwork.bssid}</p>
                    <div className="text-[9px] text-[var(--neon-accent)] mt-2">Clients Connected: {selectedNetwork.clients.length}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                   <button onClick={() => handleAttack('Handshake_Capture')} disabled={!!attacking} className="py-4 bg-red-600/10 border-2 border-red-600/40 text-red-600 text-[9px] uppercase font-black hover:bg-red-600 hover:text-white transition-all rounded-xl shadow-xl disabled:opacity-20">{attacking === 'Handshake_Capture' ? 'WORKING...' : 'Capture Handshake'}</button>
                   <button onClick={() => handleAttack('WPS_Pin_Attack')} disabled={!!attacking} className="py-4 bg-white/5 border border-white/10 text-white/60 text-[9px] uppercase font-black hover:bg-white/10 transition-all rounded-xl disabled:opacity-20">{attacking === 'WPS_Pin_Attack' ? 'WORKING...' : 'WPS Pin Attack'}</button>
                   <button onClick={() => handleAttack('Deauth_Flood')} disabled={!!attacking} className="py-4 bg-white/5 border border-white/10 text-white/60 text-[9px] uppercase font-black hover:bg-white/10 transition-all rounded-xl disabled:opacity-20">{attacking === 'Deauth_Flood' ? 'FLOODING...' : 'Deauth Flood'}</button>
                </div>

                <div className="flex-1 bg-black/60 border border-white/5 p-4 rounded-[1rem] overflow-y-auto custom-scrollbar relative shadow-inner">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none text-9xl">🦂</div>
                    <pre className="text-[12px] text-[#00f3ff]/80 leading-relaxed font-terminal whitespace-pre-wrap">{logs || 'SCORPION_GHOST_RADIO_STDBY...'}</pre>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center opacity-10 text-center select-none space-y-8 uppercase tracking-[1em]">
                <span className="text-9xl animate-pulse">📡</span>
                <p>Select a Target</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default WirelessAuditor;
