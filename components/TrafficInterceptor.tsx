
import React, { useState, useEffect, useRef } from 'react';
import { executeCommandWithGemini } from '../services/geminiService';
import { DEVELOPER_CREDIT } from '../constants';

interface Packet {
  no: number;
  time: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
  payload: string;
  threat: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
}

const TrafficInterceptor: React.FC = () => {
  const [capturing, setCapturing] = useState(false);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [selected, setSelected] = useState<Packet | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedIface, setSelectedIface] = useState('eth0');
  const [filter, setFilter] = useState('ALL');
  const scrollRef = useRef<HTMLDivElement>(null);

  const interfaces = ['eth0', 'wlan0mon', 'lo', 'tun0 (VPN)'];
  const protocols = ['ALL', 'TCP', 'UDP', 'HTTP', 'DNS', 'ICMP'];

  useEffect(() => {
    let timer: any;
    if (capturing) {
      timer = setInterval(() => {
        const protocolsArr = ['TCP', 'HTTP', 'TLSv1.2', 'UDP', 'DNS', 'ICMP'];
        const p: Packet = {
          no: packets.length + 1,
          time: new Date().toLocaleTimeString().split(' ')[0],
          source: ['192.168.1.1', '10.0.0.15', '172.16.0.101', '8.8.8.8', '192.168.1.200'][Math.floor(Math.random() * 5)],
          destination: '192.168.1.105',
          protocol: protocolsArr[Math.floor(Math.random() * protocolsArr.length)],
          length: Math.floor(Math.random() * 1200 + 40),
          info: '',
          payload: Array.from({ length: 64 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' '),
          threat: 'LOW'
        };

        // Logic for specific protocol info and threats
        if (p.protocol === 'HTTP') {
          p.info = 'GET /login.php?user=admin&pass=root';
          p.threat = Math.random() > 0.8 ? 'HIGH' : 'LOW';
        } else if (p.protocol === 'DNS') {
          p.info = 'Standard query 0x' + Math.floor(Math.random() * 0xFFFF).toString(16) + ' A ghost-os.net';
        } else if (p.protocol === 'TCP') {
          p.info = `${Math.floor(Math.random() * 5000 + 1024)} -> 445 [SYN] Seq=0 Win=64240`;
          p.threat = p.source === '192.168.1.200' ? 'MED' : 'LOW';
        } else if (p.protocol === 'ICMP') {
          p.info = 'Echo (ping) request id=0x0001, seq=1/256, ttl=64';
          p.threat = Math.random() > 0.9 ? 'CRITICAL' : 'LOW';
        } else {
          p.info = 'Application Data Stream [ENCRYPTED]';
        }

        // Apply filtering
        if (filter === 'ALL' || p.protocol === filter) {
          setPackets(prev => [...prev.slice(-149), p]);
        }
      }, 400);
    }
    return () => clearInterval(timer);
  }, [capturing, packets.length, filter]);

  useEffect(() => {
    if (scrollRef.current && capturing) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [packets, capturing]);

  const analyzePacket = async (p: Packet) => {
    setSelected(p);
    setAnalyzing(true);
    setAnalysis('');
    const prompt = `Analiza este paquete capturado en la interfaz ${selectedIface}: 
    Protocolo: ${p.protocol}, Origen: ${p.source}, Destino: ${p.destination}, Info: ${p.info}. 
    Payload Hex: ${p.payload}. 
    Identifica si es un ataque (como SQLi, Ping of Death, o Port Scan). Responde como Scorpion AI Pro con un reporte de amenaza técnico.`;
    
    const result = await executeCommandWithGemini(prompt, [], "PACKET_ANALYSIS_OFFENSIVE_MODE");
    setAnalysis(result);
    setAnalyzing(false);
  };

  const getThreatColor = (t: string) => {
    switch (t) {
      case 'CRITICAL': return 'text-red-500 font-black animate-pulse';
      case 'HIGH': return 'text-orange-500 font-bold';
      case 'MED': return 'text-yellow-500';
      default: return 'text-green-500 opacity-60';
    }
  };

  const getProtoColor = (p: string) => {
    switch (p) {
      case 'HTTP': return 'text-green-400';
      case 'DNS': return 'text-blue-400';
      case 'TCP': return 'text-purple-400';
      case 'ICMP': return 'text-yellow-400';
      default: return 'text-white/60';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] font-mono text-[11px] overflow-hidden">
      {/* Control Header */}
      <div className="bg-black/90 border-b border-white/10 p-4 flex flex-wrap gap-4 items-center justify-between z-10 shadow-xl">
         <div className="flex items-center gap-4">
            <button 
              onClick={() => setCapturing(!capturing)}
              className={`px-6 py-2 rounded-lg border-2 uppercase font-black tracking-widest transition-all ${capturing ? 'bg-red-600/20 text-red-500 border-red-500 animate-pulse' : 'bg-[var(--neon-accent)]/10 text-[var(--neon-accent)] border-[var(--neon-accent)]/40 hover:bg-[var(--neon-accent)] hover:text-black'}`}
            >
              {capturing ? '⏹ STOP_SNIFF' : '▶ START_SNIFF'}
            </button>
            
            <div className="h-8 w-px bg-white/10 mx-2"></div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[7px] text-white/30 uppercase tracking-[0.2em]">Interface_Link</label>
              <select 
                value={selectedIface}
                onChange={(e) => { setSelectedIface(e.target.value); setPackets([]); }}
                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-[var(--neon-accent)] outline-none focus:border-[var(--neon-accent)]"
              >
                {interfaces.map(iface => <option key={iface} value={iface}>{iface}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[7px] text-white/30 uppercase tracking-[0.2em]">Protocol_Filter</label>
              <div className="flex bg-white/5 rounded p-0.5 border border-white/10">
                {protocols.map(p => (
                  <button 
                    key={p}
                    onClick={() => setFilter(p)}
                    className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-tighter transition-all ${filter === p ? 'bg-[var(--neon-accent)] text-black font-bold' : 'text-white/40 hover:text-white'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
         </div>
         
         <div className="flex flex-col items-end">
            <div className="text-[var(--neon-accent)] text-[9px] font-cyber tracking-widest flex items-center gap-2">
               <span className={`w-2 h-2 rounded-full ${capturing ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></span>
               {capturing ? 'PACKET_FEED_LIVE' : 'INTERCEPTOR_STDBY'}
            </div>
            <div className="text-white/20 text-[7px] mt-1">BUFFER: {packets.length}/150 | DROP: 0</div>
         </div>
      </div>

      {/* Packet Table */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/40 relative" ref={scrollRef}>
         <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 bg-[#0a1a2f]/95 backdrop-blur-md border-b border-white/10 text-white/40 text-[9px] uppercase tracking-widest z-20">
               <tr>
                  <th className="p-3 w-16">No.</th>
                  <th className="p-3 w-24">Time</th>
                  <th className="p-3 w-36">Source</th>
                  <th className="p-3 w-36">Destination</th>
                  <th className="p-3 w-24">Protocol</th>
                  <th className="p-3 w-20 text-center">Threat</th>
                  <th className="p-3">Info</th>
               </tr>
            </thead>
            <tbody className="font-terminal">
               {packets.map(p => (
                 <tr 
                   key={p.no} 
                   onClick={() => analyzePacket(p)}
                   className={`cursor-pointer border-b border-white/5 transition-colors group ${selected?.no === p.no ? 'bg-[var(--neon-accent)]/20' : 'hover:bg-white/5'}`}
                 >
                    <td className="p-3 text-white/30">{p.no}</td>
                    <td className="p-3 opacity-40">{p.time}</td>
                    <td className="p-3 font-bold text-white/80 group-hover:text-[var(--neon-accent)]">{p.source}</td>
                    <td className="p-3 font-bold text-white/80">{p.destination}</td>
                    <td className={`p-3 font-black ${getProtoColor(p.protocol)}`}>{p.protocol}</td>
                    <td className={`p-3 text-center text-[8px] font-black ${getThreatColor(p.threat)}`}>{p.threat}</td>
                    <td className="p-3 truncate text-white/50 group-hover:text-white transition-colors">{p.info}</td>
                 </tr>
               ))}
               {packets.length === 0 && (
                 <tr>
                    <td colSpan={7} className="p-20 text-center opacity-10 uppercase tracking-[1em]">Awaiting_Traffic_Stream</td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>

      {/* Detail Pane */}
      <div className="h-[300px] flex border-t-2 border-white/10 bg-black/90 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-30">
         {/* Raw Data */}
         <div className="w-1/2 p-6 border-r border-white/10 overflow-hidden flex flex-col">
            <h3 className="text-[9px] text-white/30 uppercase tracking-[0.4em] mb-4 flex justify-between items-center">
               <span>Raw_Data_Inspection [Hex]</span>
               <button className="text-[var(--neon-accent)] hover:underline">Copy_Base64</button>
            </h3>
            {selected ? (
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/40 border border-white/5 p-4 rounded-lg font-mono text-[10px] leading-relaxed">
                 <div className="text-[var(--neon-accent)] font-black mb-3 pb-2 border-b border-white/5 flex justify-between">
                    <span>Frame {selected.no}: {selected.length} bytes on wire</span>
                    <span>PROTO: {selected.protocol}</span>
                 </div>
                 <div className="grid grid-cols-8 gap-x-4 gap-y-1 opacity-60">
                    {selected.payload.split(' ').map((h, i) => (
                      <span key={i} className="hover:bg-[var(--neon-accent)]/20 hover:text-[var(--neon-accent)] px-1 rounded transition-all cursor-crosshair">{h}</span>
                    ))}
                 </div>
                 <div className="mt-4 pt-4 border-t border-white/5 text-white/20 break-all select-all hover:text-white/40 transition-colors">
                    ASCII: {atob(btoa(selected.payload.replace(/ /g, ''))).replace(/[^\x20-\x7E]/g, '.')}
                 </div>
              </div>
            ) : <div className="h-full flex flex-col items-center justify-center opacity-5 select-none uppercase tracking-widest italic">Target_Packet_Not_Selected</div>}
         </div>

         {/* AI Analysis */}
         <div className="w-1/2 p-6 overflow-hidden flex flex-col bg-gradient-to-br from-black to-red-900/10">
            <h3 className="text-[9px] text-red-500 font-black uppercase tracking-[0.4em] mb-4 flex justify-between items-center">
               <span>Scorpion_Neural_Security_Engine</span>
               {analyzing && <span className="animate-pulse flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full"></div>Scanning_Threat...</span>}
            </h3>
            <div className="flex-1 bg-black/40 border border-red-500/20 p-6 rounded-lg overflow-y-auto custom-scrollbar relative">
               <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                  <span className="text-9xl leading-none">🦂</span>
               </div>
               
               {analyzing ? (
                 <div className="h-full flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                    <div className="text-[10px] text-red-500/60 uppercase tracking-widest animate-pulse">Running_Heuristic_Check_v5...</div>
                 </div>
               ) : (
                 <pre className="text-[12px] text-[#00f3ff]/90 whitespace-pre-wrap leading-relaxed font-terminal">
                    {analysis || 'LOCK_ON_PACKET_TO_INITIATE_VULNERABILITY_ASSESSMENT'}
                 </pre>
               )}
            </div>
            <div className="mt-4 flex justify-between items-center text-[8px] text-white/20 uppercase tracking-widest">
               <span>Kernel: {DEVELOPER_CREDIT}_X64_SCORPION</span>
               <span className="text-red-500 font-bold">MODE: OFFENSIVE_SENSORS_ON</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TrafficInterceptor;
