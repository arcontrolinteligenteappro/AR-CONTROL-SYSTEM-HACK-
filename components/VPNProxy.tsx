
import React, { useState, useEffect } from 'react';

const NODES = [
  { id: 'ru', name: 'Moscow, RU', ip: '95.161.224.11', latency: '42ms', security: 'ULTRA' },
  { id: 'cn', name: 'Shanghai, CN', ip: '139.12.204.88', latency: '210ms', security: 'ULTRA' },
  { id: 'us', name: 'Nevada, US (MIL)', ip: '204.15.20.99', latency: '15ms', security: 'MED' },
  { id: 'mx', name: 'Tepic, MX (EMSaD16)', ip: '187.164.42.1', latency: '5ms', security: 'LOW' },
  { id: 'ch', name: 'Zurich, CH', ip: '179.31.20.104', latency: '28ms', security: 'ULTRA' },
];

const VPNProxy: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState(NODES[0]);
  const [active, setActive] = useState(true);
  const [encryption, setEncryption] = useState('AES-512-GCM');
  const [hops, setHops] = useState(3);
  const [alertLevel, setAlertLevel] = useState(0);

  useEffect(() => {
    let timer: any;
    if (active) {
      timer = setInterval(() => {
        setAlertLevel(prev => {
           const next = prev + (Math.random() > 0.6 ? 2 : -1);
           return Math.max(0, Math.min(100, next));
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className={`flex flex-col h-full bg-[#050505] font-mono p-6 overflow-hidden transition-colors duration-1000 ${alertLevel > 80 ? 'bg-red-900/10' : ''}`}>
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className={`text-5xl transition-all duration-1000 ${active ? 'text-[var(--neon-accent)] drop-shadow-[0_0_20px_var(--neon-glow)]' : 'text-white/5 grayscale'}`}>🛡️</div>
          <div>
            <h2 className="text-xl font-black font-cyber text-[var(--neon-accent)] tracking-widest uppercase">Ghost_VPN_Chain_v5</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Multi-Hop Anonymity Tunnel</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-end">
             <span className="text-[8px] text-white/30 uppercase mb-1">Trace_Risk</span>
             <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div className={`h-full transition-all duration-500 ${alertLevel > 70 ? 'bg-red-600' : 'bg-[var(--neon-accent)]'}`} style={{ width: `${alertLevel}%` }}></div>
             </div>
          </div>
          <button 
            onClick={() => setActive(!active)}
            className={`px-8 py-3 rounded-xl border-2 font-black uppercase tracking-widest transition-all ${active ? 'bg-red-600/10 border-red-600 text-red-600 shadow-[0_0_15px_rgba(255,0,0,0.2)]' : 'bg-green-600/10 border-green-600 text-green-600'}`}
          >
            {active ? 'KILL_SWITCH' : 'ACTIVATE_GHOST'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        {/* Selector de Nodos */}
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 shadow-2xl">
            <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-4 font-black border-l-2 border-[var(--neon-accent)] pl-3">Neural_Nodes_Global</h3>
            <div className="space-y-3">
              {NODES.map(node => (
                <div 
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${selectedNode.id === node.id ? 'bg-[var(--neon-accent)]/10 border-[var(--neon-accent)] shadow-[0_0_15px_var(--neon-glow)]' : 'bg-black/40 border-white/5 hover:border-white/20'}`}
                >
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase text-white">{node.name}</span>
                    <span className="text-[9px] text-[var(--neon-accent)] font-terminal">{node.ip}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-white/40 uppercase">{node.latency}</div>
                    <div className={`text-[8px] font-black uppercase ${node.security === 'ULTRA' ? 'text-purple-500' : node.security === 'HIGH' ? 'text-blue-500' : 'text-red-500'}`}>SEC: {node.security}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visualizador de Topología */}
        <div className="bg-black/60 border border-white/5 rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,243,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
          <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-10 text-center font-black">Active_Tunnel_Flow</h3>
          
          <div className="flex-1 flex flex-col items-center justify-center gap-8 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-red-500/50 flex items-center justify-center text-red-500 text-[10px] font-black animate-pulse">HOME</div>
                <span className="text-[7px] text-white/20 mt-1 uppercase">187.164.X.X</span>
              </div>
              
              <div className="w-0.5 h-32 bg-gradient-to-b from-red-500/20 via-[var(--neon-accent)] to-[var(--neon-accent)] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--neon-accent)] rounded-full animate-ping"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-2 border-[var(--neon-accent)] flex items-center justify-center text-[var(--neon-accent)] text-2xl font-black shadow-[0_0_30px_var(--neon-glow)]">{selectedNode.id.toUpperCase()}</div>
                <div className="text-[11px] text-white font-black mt-3 uppercase tracking-widest">{selectedNode.name}</div>
                <div className="text-[9px] text-[var(--neon-accent)] mt-1 font-terminal">{selectedNode.ip}</div>
              </div>

              {alertLevel > 50 && (
                <div className="absolute top-1/2 left-4 text-red-500 text-[8px] animate-pulse font-black uppercase bg-black px-2 border border-red-600">
                  Tracing_Attempt_Detected!
                </div>
              )}
          </div>

          <div className="mt-8 bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-[9px] font-terminal">
              <span className="text-white/30 uppercase">Neural_Bypass:</span>
              <span className="text-green-500 font-black">STABLE</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-terminal">
              <span className="text-white/30 uppercase">Encryption:</span>
              <span className="text-white font-black">{encryption}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPNProxy;
