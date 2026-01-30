
import React, { useState } from 'react';

const OfficeSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'docs' | 'sheets' | 'slides'>('docs');
  const [content, setContent] = useState('OFFENSIVE SECURITY REPORT\n\nTo: Operator 01\nFrom: ChrisRey91\nSubject: Network Audit Findings\n\n[INSERT SYSTEM VULNERABILITIES HERE]\n\n---------------------------------\nSCORPION GHOST SYSTEM v4.5');

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] font-sans text-gray-200 overflow-hidden">
      {/* Ribbon Bar */}
      <div className="bg-[#1a1a24] p-1 flex items-center border-b border-white/5">
        <div className="flex gap-1 p-1 bg-black/20 rounded-lg">
          {(['docs', 'sheets', 'slides'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-[10px] font-cyber uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[var(--neon-accent)] text-black shadow-[0_0_10px_var(--neon-glow)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              {tab === 'docs' ? '📄 Word' : tab === 'sheets' ? '📊 Excel' : '🎭 Slides'}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4 px-4 border-l border-white/10 h-6">
          <button className="text-[10px] text-white/60 hover:text-[var(--neon-accent)]">Save_to_VFS</button>
          <button className="text-[10px] text-white/60 hover:text-[var(--neon-accent)]">Export_PDF</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Tools Panel */}
        <div className="w-12 bg-black/40 border-r border-white/5 flex flex-col items-center py-4 gap-6">
          <span className="cursor-pointer hover:text-[var(--neon-accent)] font-bold">B</span>
          <span className="cursor-pointer hover:text-[var(--neon-accent)] italic">I</span>
          <span className="cursor-pointer hover:text-[var(--neon-accent)] underline">U</span>
          <div className="h-px w-6 bg-white/10"></div>
          <span className="text-xs cursor-pointer hover:text-[var(--neon-accent)]">Aa</span>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-[#1a1a24]/50 p-8 overflow-y-auto flex justify-center custom-scrollbar">
          {activeTab === 'docs' && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full max-w-[800px] bg-white text-black p-12 min-h-[1000px] shadow-2xl rounded-sm font-serif text-lg leading-relaxed outline-none focus:ring-4 focus:ring-[var(--neon-accent)]/20 transition-all"
              placeholder="Start drafting your offensive report..."
            />
          )}

          {activeTab === 'sheets' && (
            <div className="w-full bg-white text-black rounded-sm shadow-2xl overflow-hidden border border-gray-300">
               <div className="grid grid-cols-8 border-b border-gray-300">
                  {['A','B','C','D','E','F','G','H'].map(l => (
                    <div key={l} className="bg-gray-100 border-r border-gray-300 py-1 text-center font-bold text-[10px]">{l}</div>
                  ))}
               </div>
               {[...Array(20)].map((_, r) => (
                 <div key={r} className="grid grid-cols-8 border-b border-gray-200">
                    <div className="bg-gray-100 border-r border-gray-300 py-1 text-center text-[9px] font-bold">{r+1}</div>
                    {[...Array(7)].map((_, c) => (
                      <div key={c} contentEditable className="border-r border-gray-100 p-2 text-xs outline-none focus:bg-blue-50"></div>
                    ))}
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'slides' && (
            <div className="w-full max-w-[900px] aspect-video bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center gap-4 text-black border-8 border-gray-800">
                <div contentEditable className="text-4xl font-black text-center px-10 outline-none hover:bg-gray-100 transition-all">
                  CYBERSECURITY AUDIT 2024
                </div>
                <div contentEditable className="text-xl text-gray-600 outline-none hover:bg-gray-100 transition-all">
                  SCORPION GHOST SYSTEM :: CHRISREY91
                </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-6 bg-[#1a1a24] border-t border-white/5 px-4 flex items-center justify-between text-[8px] text-white/30 uppercase tracking-[0.2em]">
        <span>Character_Count: {content.length}</span>
        <span>Autosaved to /root/Reports/security_audit.docx</span>
        <span>GHOST_DOC_SECURE_MODE: ON</span>
      </div>
    </div>
  );
};

export default OfficeSuite;
