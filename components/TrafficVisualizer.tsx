
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { OpMode } from '../constants';

interface Node {
  id: number;
  ip: string;
  mac: string;
  x: number;
  y: number;
  type: 'router' | 'server' | 'client' | 'target' | 'home';
  status: 'online' | 'compromised' | 'scanning';
}

interface Packet {
  id: number;
  sourceId: number;
  targetId: number;
  progress: number;
  type: 'data' | 'ping' | 'attack';
  color: string;
}

interface LogEntry {
  id: number;
  text: string;
  type: 'info' | 'warn' | 'success' | 'error';
}

interface Props {
  opMode: OpMode;
}

const TrafficVisualizer: React.FC<Props> = ({ opMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const addLog = useCallback((text: string, type: LogEntry['type']) => {
    setLogs(prev => [...prev.slice(-9), { id: Date.now(), text, type }]);
  }, []);

  const generateNetwork = useCallback((width: number, height: number) => {
    const isReal = opMode === 'real';
    const homeNode: Node = { id: 0, ip: isReal ? '172.217.16.142' : '192.168.1.100', mac: 'YOUR_MAC_ADDR', x: width / 2, y: height - 50, type: 'home', status: 'online' };
    const routerNode: Node = { id: 1, ip: isReal ? '208.67.222.222' : '192.168.1.1', mac: '00:1A:2B:3C:4D:5E', x: width / 2, y: height / 2, type: 'router', status: 'online' };
    const serverNode: Node = { id: 2, ip: isReal ? '104.18.32.227' : '192.168.1.50', mac: '00:DE:AD:BE:EF:00', x: width * 0.25, y: height * 0.25, type: 'server', status: 'online' };
    const clientNode: Node = { id: 3, ip: isReal ? '151.101.193.69' : '192.168.1.101', mac: 'A1:B2:C3:D4:E5:F6', x: width * 0.75, y: height * 0.25, type: 'client', status: 'online' };
    const targetNode: Node = { id: 4, ip: isReal ? '45.33.32.156' : '192.168.1.155', mac: 'FF:EE:DD:CC:BB:AA', x: width / 2, y: 50, type: 'target', status: 'online' };
    
    setNodes([homeNode, routerNode, serverNode, clientNode, targetNode]);
    addLog('Network topology mapped successfully.', 'success');
  }, [opMode, addLog]);

  const handleAction = (action: 'ping' | 'scan' | 'exploit') => {
    if (!selectedNode) return;
    const homeNode = nodes.find(n => n.type === 'home');
    if (!homeNode) return;

    if (action === 'ping') {
      addLog(`Pinging ${selectedNode.ip}...`, 'info');
      const newPackets = Array.from({ length: 4 }, (_, i) => ({
        id: Date.now() + i,
        sourceId: homeNode.id,
        targetId: selectedNode.id,
        progress: 0,
        type: 'ping' as const,
        color: '#39ff14',
      }));
      setPackets(p => [...p, ...newPackets]);
      setTimeout(() => addLog(`Ping reply from ${selectedNode.ip}: time=12ms`, 'info'), 1000);
    }
    
    if (action === 'scan') {
      addLog(`Initiating port scan on ${selectedNode.ip}...`, 'warn');
      setNodes(n => n.map(node => node.id === selectedNode.id ? { ...node, status: 'scanning' } : node));
      setTimeout(() => {
        addLog(`PORT 80 (HTTP) OPEN - Apache 2.4.29`, 'success');
        addLog(`PORT 443 (HTTPS) OPEN - OpenSSL`, 'success');
        if (selectedNode.type === 'target') addLog(`PORT 445 (SMB) OPEN - VULNERABLE`, 'error');
        setNodes(n => n.map(node => node.id === selectedNode.id ? { ...node, status: 'online' } : node));
      }, 3000);
    }
    
    if (action === 'exploit') {
        if(selectedNode.type !== 'target') {
            addLog(`Node ${selectedNode.ip} is not a vulnerable target.`, 'error');
            return;
        }
        addLog(`Launching exploit against ${selectedNode.ip}:445...`, 'error');
        const attackPackets = Array.from({ length: 20 }, (_, i) => ({
          id: Date.now() + i,
          sourceId: homeNode.id,
          targetId: selectedNode.id,
          progress: Math.random() * 0.1, // Staggered start
          type: 'attack' as const,
          color: '#ff0033'
        }));
        setPackets(p => [...p, ...attackPackets]);
        setTimeout(() => {
            setNodes(n => n.map(node => node.id === selectedNode.id ? {...node, status: 'compromised'} : node));
            setSelectedNode(n => n ? {...n, status: 'compromised'} : null);
            addLog(`ROOT ACCESS GRANTED on ${selectedNode.ip}!`, 'error');
        }, 4000);
    }
  };

  useEffect(() => {
    if (!isVisualizing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    if (nodes.length === 0) {
      generateNetwork(canvas.width, canvas.height);
    }
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodes.forEach(nodeA => {
        nodes.forEach(nodeB => {
          if (nodeA.id !== nodeB.id) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(0, 243, 255, 0.1)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Draw and update packets
      setPackets(prevPackets => {
        const updatedPackets = prevPackets.map(p => ({ ...p, progress: p.progress + 0.01 })).filter(p => p.progress < 1);
        
        updatedPackets.forEach(p => {
            const source = nodes.find(n => n.id === p.sourceId);
            const target = nodes.find(n => n.id === p.targetId);
            if(source && target){
                const x = source.x + (target.x - source.x) * p.progress;
                const y = source.y + (target.y - source.y) * p.progress;
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
        });
        return updatedPackets;
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        let radius = 10;
        let color = '#00f3ff';
        if (node.status === 'compromised') {
            color = '#ff0033'; radius = 15;
            ctx.shadowColor = color; ctx.shadowBlur = 20;
        } else if (node.status === 'scanning') {
            color = '#ffff00'; radius = 12;
            ctx.shadowColor = color; ctx.shadowBlur = 15;
        } else {
             ctx.shadowColor = color; ctx.shadowBlur = 10;
        }
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '10px "Fira Code"';
        ctx.fillText(node.type.toUpperCase(), node.x, node.y + radius + 12);
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isVisualizing, nodes, generateNetwork]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const clickedNode = nodes.find(node => Math.hypot(node.x - x, node.y - y) < 20);
    setSelectedNode(clickedNode || null);
  };

  const startStopVisualization = () => {
    if(isVisualizing) {
      setIsVisualizing(false);
      setNodes([]);
      setPackets([]);
      setLogs([]);
      setSelectedNode(null);
    } else {
      setIsVisualizing(true);
      addLog('Visualization engine started.', 'info');
    }
  }

  const getLogColor = (type: LogEntry['type']) => {
    if (type === 'error') return 'text-red-500';
    if (type === 'warn') return 'text-yellow-500';
    if (type === 'success') return 'text-green-500';
    return 'text-[var(--neon-accent)]/70';
  }

  return (
    <div className="flex flex-col h-full bg-black/95 font-cyber text-sm overflow-hidden border-2 border-white/10 shadow-inner relative">
      <header className="flex bg-white/5 border-b border-white/10 items-center justify-between p-4 shrink-0 z-10">
        <div>
          <h2 className="text-[12px] text-[var(--neon-accent)] tracking-widest uppercase font-black">Network_Traffic_Visualizer</h2>
          <p className="text-[8px] opacity-40 uppercase tracking-[0.4em]">Real-time Deep Packet Inspection</p>
        </div>
        <button onClick={startStopVisualization} className={`px-6 py-2 rounded-lg border-2 uppercase font-black tracking-widest text-[11px] transition-all ${isVisualizing ? 'bg-red-600/20 text-red-500 border-red-500' : 'bg-[var(--neon-accent)]/10 text-[var(--neon-accent)] border-[var(--neon-accent)]/40 hover:bg-[var(--neon-accent)] hover:text-black'}`}>
          {isVisualizing ? 'Stop Visualization' : 'Start Visualization'}
        </button>
      </header>
      
      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" onClick={handleCanvasClick} />
        
        {!isVisualizing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center opacity-30 space-y-4">
              <div className="text-7xl animate-pulse">✨</div>
              <h3 className="tracking-[1em] uppercase">SYSTEM_STANDBY</h3>
            </div>
          </div>
        )}

        {/* Logs Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
            <div className="font-terminal text-[10px] space-y-1">
                {logs.map(log => (
                    <div key={log.id} className={`animate-in fade-in slide-in-from-bottom-2 ${getLogColor(log.type)}`}>
                        <span className="opacity-50 mr-2">&gt;</span>{log.text}
                    </div>
                ))}
            </div>
        </div>

        {/* Selected Node Panel */}
        {selectedNode && (
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-[var(--neon-accent)]/30 rounded-2xl w-72 p-6 z-20 animate-in slide-in-from-right-8 duration-500 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-black uppercase text-[var(--neon-accent)]">{selectedNode.type}</h3>
                <p className="text-xs text-white/50 font-terminal">{selectedNode.ip}</p>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-white/30 hover:text-white">×</button>
            </div>
            <div className="text-[8px] text-white/30 uppercase mt-1">MAC: {selectedNode.mac}</div>
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                <button onClick={() => handleAction('ping')} className="w-full text-left bg-white/5 hover:bg-white/10 p-3 rounded-lg text-xs uppercase font-bold tracking-widest transition-colors">Ping Node</button>
                <button onClick={() => handleAction('scan')} className="w-full text-left bg-white/5 hover:bg-white/10 p-3 rounded-lg text-xs uppercase font-bold tracking-widest transition-colors">Scan Ports</button>
                {selectedNode.type === 'target' && (
                    <button onClick={() => handleAction('exploit')} className="w-full text-left bg-red-600/20 hover:bg-red-600/40 p-3 rounded-lg text-xs uppercase font-black tracking-widest text-red-500 transition-colors">Launch Exploit</button>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficVisualizer;