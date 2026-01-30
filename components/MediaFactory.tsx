
import React, { useState } from 'react';

const MediaFactory: React.FC = () => {
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [fileType, setFileType] = useState<'video' | 'audio' | 'image'>('video');

  const startConversion = () => {
    setConverting(true);
    setProgress(0);
    setLogs(["[ffmpeg] Initializing FFmpeg v4.4-ghost...", "[ffmpeg] Analyzing input stream #0:0 (video/mp4)..."]);
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setConverting(false);
          setLogs(l => [...l, "[ffmpeg] Conversion completed successfully.", "[ffmpeg] Output written to /root/Media/ghost_convert.mp4"]);
          return 100;
        }
        
        if (Math.random() > 0.7) {
          setLogs(l => [...l, `[ffmpeg] frame=${Math.floor(p*10)} fps=${Math.floor(Math.random()*60+30)} q=28.0 size=${Math.floor(p/2)}MB...`]);
        }
        
        return p + Math.random() * 5;
      });
    }, 200);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] p-6 font-mono overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="text-5xl animate-pulse">🎞️</div>
        <div>
          <h2 className="text-xl font-black font-cyber text-[var(--neon-accent)] tracking-widest uppercase">Media_Factory_v4</h2>
          <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase">Multi-Stream Converter Engine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        {/* Control Panel */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
             <h3 className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Input_Configuration</h3>
             <div className="flex gap-4">
                {(['video', 'audio', 'image'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setFileType(type)}
                    className={`flex-1 py-3 rounded-xl border transition-all uppercase text-[9px] font-bold tracking-widest ${fileType === type ? 'bg-[var(--neon-accent)] text-black border-[var(--neon-accent)] shadow-[0_0_15px_var(--neon-glow)]' : 'bg-black/40 border-white/10 text-white/40 hover:text-white'}`}
                  >
                    {type}
                  </button>
                ))}
             </div>
             
             <div className="space-y-2 mt-4">
                <label className="text-[8px] text-white/20 uppercase tracking-widest">Target_Format</label>
                <select className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-[var(--neon-accent)] outline-none appearance-none">
                  {fileType === 'video' ? (
                    <>
                      <option>MP4 (H.264 + AAC)</option>
                      <option>MKV (HEVC + FLAC)</option>
                      <option>AVI (Xvid)</option>
                    </>
                  ) : fileType === 'audio' ? (
                    <>
                      <option>MP3 (320kbps)</option>
                      <option>FLAC (Lossless)</option>
                      <option>OGG (Vorbis)</option>
                    </>
                  ) : (
                    <>
                      <option>PNG (Lossless)</option>
                      <option>JPG (Quality 90)</option>
                      <option>WebP (Compressed)</option>
                    </>
                  )}
                </select>
             </div>

             <button 
               onClick={startConversion}
               disabled={converting}
               className="w-full py-4 mt-6 bg-[var(--neon-accent)]/10 border border-[var(--neon-accent)] text-[var(--neon-accent)] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[var(--neon-accent)] hover:text-black transition-all rounded-xl shadow-lg disabled:opacity-30"
             >
               {converting ? 'Converting...' : 'Start_Conversion'}
             </button>
          </div>

          {converting && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
               <div className="flex justify-between text-[8px] font-cyber uppercase tracking-widest text-[var(--neon-accent)]">
                  <span>Progress_Status</span>
                  <span>{Math.floor(progress)}%</span>
               </div>
               <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-[var(--neon-accent)] shadow-[0_0_10px_var(--neon-accent)] transition-all" style={{ width: `${progress}%` }}></div>
               </div>
            </div>
          )}
        </div>

        {/* Terminal Logs */}
        <div className="bg-black/80 border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
           <div className="bg-white/5 p-3 text-[9px] text-white/30 uppercase tracking-widest flex justify-between border-b border-white/5">
              <span>FFmpeg_Neural_Output</span>
              <span className="text-[#39ff14]">Ready</span>
           </div>
           <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-[10px] text-[#00f3ff]/60 space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-white/20 mr-2">{'>'}</span> {log}
                </div>
              ))}
              {logs.length === 0 && <div className="text-white/10 italic">AWAITING_MEDIA_STREAM...</div>}
           </div>
        </div>
      </div>
    </div>
  );
};

export default MediaFactory;
