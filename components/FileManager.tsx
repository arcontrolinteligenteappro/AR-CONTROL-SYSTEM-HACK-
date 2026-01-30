
import React, { useState, useEffect } from 'react';
import { VirtualFS, VFSNode } from '../types';

interface Props {
  vfs: VirtualFS;
}

const FileManager: React.FC<Props> = ({ vfs }) => {
  const [currentPath, setCurrentPath] = useState(vfs.currentPath);
  const [items, setItems] = useState<VFSNode[]>([]);

  useEffect(() => {
    // Basic navigation logic based on currentPath
    const pathParts = currentPath.split('/').filter(p => p);
    let current = vfs.root;
    
    for (const part of pathParts) {
      const found = current.children?.find(c => c.name === part);
      if (found && found.type === 'directory') {
        current = found;
      }
    }
    setItems(current.children || []);
  }, [currentPath, vfs]);

  const navigateTo = (name: string) => {
    if (name === '..') {
      const parts = currentPath.split('/').filter(p => p);
      parts.pop();
      setCurrentPath('/' + parts.join('/'));
    } else {
      setCurrentPath(prev => prev === '/' ? `/${name}` : `${prev}/${name}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] text-[#d1d5db] font-mono select-none">
      {/* Address Bar */}
      <div className="bg-[#1a1a24] p-3 border-b border-white/5 flex items-center gap-4">
        <button onClick={() => navigateTo('..')} className="text-[#00f3ff] hover:text-white transition-colors">↑ BACK</button>
        <div className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-1 text-xs text-[#00f3ff]">
          {currentPath}
        </div>
        <div className="text-[10px] text-white/30">VFS_SYNC: OK</div>
      </div>

      {/* Grid View */}
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onDoubleClick={() => item.type === 'directory' && navigateTo(item.name)}
          >
            <div className={`text-5xl transition-transform group-hover:scale-110 filter ${item.type === 'directory' ? 'text-[#00f3ff]' : 'text-gray-500'}`}>
              {item.type === 'directory' ? '📂' : '📄'}
            </div>
            <span className="text-[10px] font-bold text-center break-all px-1 bg-black/40 group-hover:bg-[#00f3ff]/20 rounded transition-colors">
              {item.name}
            </span>
            <div className="text-[8px] text-white/20 uppercase">
              {item.type} | {item.permissions || 'rwxr-xr-x'}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="col-span-full flex items-center justify-center text-white/10 italic text-sm mt-12">
            DIRECTORY_EMPTY
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="h-8 bg-black/60 border-t border-white/5 px-4 flex items-center justify-between text-[9px] text-white/40 uppercase tracking-widest">
        <div>Items: {items.length}</div>
        <div>V-Disk Usage: 1.4GB / 256GB</div>
      </div>
    </div>
  );
};

export default FileManager;
