
import React, { useState, useEffect } from 'react';

const SystemMonitor: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<number[]>(new Array(30).fill(0));
  const [memUsage, setMemUsage] = useState<number[]>(new Array(30).fill(0));
  const [netUsage, setNetUsage] = useState<number[]>(new Array(30).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => [...prev.slice(1), Math.random() * 40 + 5]);
      setMemUsage(prev => [...prev.slice(1), Math.random() * 10 + 30]);
      setNetUsage(prev => [...prev.slice(1), Math.random() * 100]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderGraph = (data: number[], color: string, max: number = 100) => (
    <div className="flex items-end gap-[2px] h-24 border-b border-white/10 pb-2 relative group">
      {data.map((val, idx) => (
        <div 
          key={idx} 
          style={{ height: `${(val / max) * 100}%`, backgroundColor: color }} 
          className="flex-1 opacity-60 hover:opacity-100 transition-opacity"
        />
      ))}
      <div className="absolute top-0 right-0 text-[9px] font-bold bg-black/40 px-1" style={{ color }}>
        {data[data.length - 1].toFixed(1)}%
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#050505] p-6 text-[#d1d5db] font-mono overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CPU */}
        <div className="space-y-4">
          <h3 className="text-[#00f3ff] text-[10px] tracking-[0.4em] font-black uppercase">CPU_LOAD_CORES(16)</h3>
          {renderGraph(cpuUsage, '#00f3ff')}
          <div className="grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/5 p-1 flex justify-between items-center text-[8px]">
                <span className="text-white/20">C{i}</span>
                <span className="text-[#39ff14]">{Math.floor(Math.random() * 20 + 5)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Memory */}
        <div className="space-y-4">
          <h3 className="text-[#ff00ff] text-[10px] tracking-[0.4em] font-black uppercase">MEMORY_POOL</h3>
          {renderGraph(memUsage, '#ff00ff')}
          <div className="flex justify-between text-[10px] border-t border-white/5 pt-2">
             <span className="text-white/40">Total RAM:</span>
             <span className="text-white font-bold">128.0 GiB</span>
          </div>
          <div className="flex justify-between text-[10px]">
             <span className="text-white/40">Allocated:</span>
             <span className="text-[#ff00ff] font-bold">42.8 GiB</span>
          </div>
        </div>

        {/* Network */}
        <div className="space-y-4">
          <h3 className="text-[#39ff14] text-[10px] tracking-[0.4em] font-black uppercase">ETH0_TRAFFIC</h3>
          {renderGraph(netUsage, '#39ff14', 500)}
          <div className="flex items-center gap-4 text-[9px]">
             <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-[#39ff14]"></div>
                <span>TX: 245 KB/s</span>
             </div>
             <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-[#00f3ff]"></div>
                <span>RX: 1.2 MB/s</span>
             </div>
          </div>
        </div>

        {/* Active Processes */}
        <div className="space-y-4">
          <h3 className="text-white text-[10px] tracking-[0.4em] font-black uppercase">TOP_PROCESSES</h3>
          <div className="space-y-1">
            {['system-core', 'terminal-bash', 'xploitgpt-srv', 'gui-gnome-arci', 'vfs-sync-daemon'].map((proc, i) => (
              <div key={i} className="flex justify-between items-center text-[9px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors">
                <span className="font-bold">{proc}</span>
                <div className="flex gap-4">
                  <span className="text-[#00f3ff]">{Math.floor(Math.random() * 5 + 1)}%</span>
                  <span className="text-white/30">{Math.floor(Math.random() * 500 + 100)}MB</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/5">
        <div className="text-[8px] text-white/20 tracking-widest text-center uppercase">
          Neural Hypervisor v3.5 // Protected by AES-X Ghost Protocol
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
