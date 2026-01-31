
import React, { useState, useEffect } from 'react';
import { VirtualFS, VFSNode } from '../types';
import { OpMode } from '../constants';

interface Props {
  vfs: VirtualFS;
  opMode: OpMode;
}

const FileManager: React.FC<Props> = ({ vfs, opMode }) => {
  const [currentPath, setCurrentPath] = useState(vfs.currentPath);
  const [items, setItems] = useState<VFSNode[]>([]);
  
  useEffect(() => {
    // Lógica para el VFS simulado
    if (opMode === 'sim') {
        const pathParts = currentPath.split('/').filter(p => p);
        let current = vfs.root;
        for (const part of pathParts) {
            const found = current.children?.find(c => c.name === part);
            if (found && found.type === 'directory') current = found;
        }
        setItems(current.children || []);
    } else {
        // En modo real, podríamos usar una API o simplemente mostrar un placeholder.
        setItems([]);
    }
  }, [currentPath, vfs, opMode]);

  const navigateTo = (name: string) => {
    if (name === '..') {
      const parts = currentPath.split('/').filter(p => p);
      parts.pop();
      setCurrentPath('/' + parts.join('/'));
    } else {
      setCurrentPath(prev => prev === '/' ? `/${name}` : `${prev}/${name}`);
    }
  };

  const handleImport = async () => {
    if (opMode === 'real' && 'showOpenFilePicker' in window) {
      try {
        const handles = await (window as any).showOpenFilePicker({ multiple: true });
        const newFiles: VFSNode[] = await Promise.all(handles.map(async (handle: any) => {
          const file = await handle.getFile();
          return { name: file.name, type: 'file', size: file.size, permissions: 'rw-r--r--', owner: 'user' };
        }));
        setItems(prev => [...prev, ...newFiles]);
      } catch (err) {
        console.error("Acceso a archivos cancelado por el usuario.");
      }
    } else {
      // Fallback para simulación o navegadores no compatibles
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.onchange = (e: any) => {
        const files = e.target.files;
        if (!files) return;
        const newFiles: VFSNode[] = Array.from(files).map((f: any) => ({ name: f.name, type: 'file', size: f.size, permissions: 'rw-r--r--', owner: 'user' }));
        setItems(prev => [...prev, ...newFiles]);
      };
      input.click();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] text-[#d1d5db] font-mono select-none border-2 border-[var(--neon-accent)]/20 shadow-2xl">
      <div className="bg-[#1a1a24] p-3 border-b border-white/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo('..')} className="text-[var(--neon-accent)] hover:text-white transition-colors font-black text-xs">↑ BACK</button>
          <div className="flex-1 min-w-[200px] bg-black/40 border border-white/10 rounded px-3 py-1 text-xs text-[var(--neon-accent)] font-terminal italic">
            {opMode === 'real' ? `DEVICE_FS://${currentPath}` : `VFS://${currentPath}`}
          </div>
        </div>
        <button onClick={handleImport} className="bg-[var(--neon-accent)]/10 border border-[var(--neon-accent)]/40 text-[var(--neon-accent)] px-3 py-1 text-[10px] font-black hover:bg-[var(--neon-accent)] hover:text-black transition-all uppercase rounded">
             {opMode === 'real' ? 'Mount_Device_Files' : 'Import_to_VFS'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-10 bg-[radial-gradient(circle_at_top,rgba(0,243,255,0.02)_0%,transparent_80%)]">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer" onDoubleClick={() => item.type === 'directory' && navigateTo(item.name)}>
            <div className={`text-6xl transition-all group-hover:scale-125 filter group-hover:drop-shadow-[0_0_10px_var(--neon-accent)] ${item.type === 'directory' ? 'text-[var(--neon-accent)]' : 'text-gray-600'}`}>
              {item.type === 'directory' ? '📂' : '📄'}
            </div>
            <div className="text-center"><span className="text-[10px] font-black tracking-tight break-all px-2 bg-black/40 group-hover:bg-[var(--neon-accent)]/20 group-hover:text-[var(--neon-accent)] rounded transition-all uppercase">{item.name}</span></div>
          </div>
        ))}
        {items.length === 0 && (<div className="col-span-full flex flex-col items-center justify-center text-white/10 italic text-md mt-20 gap-4"><span className="text-8xl opacity-10">🏜️</span><span className="tracking-[1em] uppercase">Directory_Is_Empty</span></div>)}
      </div>

      <div className="h-10 bg-black/80 border-t border-white/5 px-6 flex items-center justify-between text-[9px] text-white/30 uppercase tracking-[0.3em] font-cyber">
        <div><span>Items: {items.length}</span></div>
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full animate-pulse"></span><span>GHOST_IO_ENCRYPTION: AES-256</span></div>
      </div>
    </div>
  );
};

export default FileManager;
