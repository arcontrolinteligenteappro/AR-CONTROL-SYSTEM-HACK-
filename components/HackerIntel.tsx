
import React, { useState } from 'react';

interface HackerGroup {
  id: string;
  name: string;
  logo: string;
  description: string;
  philosophy: string;
  targets: string[];
  links: { label: string, url: string, type: 'telegram' | 'web' | 'onion' }[];
  news: { date: string, title: string, description: string }[];
}

const HACKER_GROUPS: HackerGroup[] = [
  {
    id: 'anon',
    name: 'Anonymous',
    logo: '🎭',
    description: 'Movimiento internacional descentralizado de hacktivismo.',
    philosophy: 'Libertad de expresión, acceso a la información y lucha contra la censura. "We are Legion."',
    targets: ['Gobiernos', 'Cienciología', 'Corporaciones'],
    links: [
      { label: 'Official Site', url: 'https://anoninsider.com', type: 'web' },
      { label: 'Telegram Hub', url: 'https://t.me/anonymous_hub', type: 'telegram' }
    ],
    news: [
      { date: '2024-05-12', title: 'OpRussia 2.0', description: 'Nueva oleada de ataques a infraestructura crítica.' },
      { date: '2023-11-20', title: 'Data Leak Central Bank', description: 'Exposición de 35GB de datos financieros confidenciales.' }
    ]
  },
  {
    id: 'guacamaya',
    name: 'Guacamaya',
    logo: '🦜',
    description: 'Colectivo hacktivista centrado en América Latina.',
    philosophy: 'Anticolonialismo, protección del medio ambiente y denuncia de abusos militares.',
    targets: ['Ejército de México (SEDENA)', 'Gobierno de Chile', 'Fiscalía de Colombia'],
    links: [
      { label: 'Enlace Hacktivista', url: 'https://enlacehacktivista.org', type: 'web' },
      { label: 'DeepWeb Leak Portal', url: 'http://guacamaya.onion', type: 'onion' }
    ],
    news: [
      { date: '2022-09-29', title: 'SEDENA Leaks', description: 'Filtración de 6 terabytes de correos electrónicos del ejército mexicano.' },
      { date: '2023-01-15', title: 'Operación Milico Leaks', description: 'Ataque coordinado a múltiples ministerios de defensa.' }
    ]
  },
  {
    id: 'revil',
    name: 'REvil (Sodinokibi)',
    logo: '💀',
    description: 'Sindicato de cibercrimen enfocado en Ransomware-as-a-Service (RaaS).',
    philosophy: 'Puro beneficio económico. Cifrado y extorsión agresiva.',
    targets: ['Apple', 'JBS Foods', 'Kaseya'],
    links: [
      { label: 'Happy Blog (Onion)', url: 'http://revil.onion', type: 'onion' },
      { label: 'Darknet Forum', url: 'https://xss.is', type: 'web' }
    ],
    news: [
      { date: '2021-07-02', title: 'Kaseya VSA Attack', description: 'Infección masiva a través de software de gestión remota.' },
      { date: '2022-01-14', title: 'FSB Takedown', description: 'Supuesto desmantelamiento de la célula operativa en Rusia.' }
    ]
  }
];

const HackerIntel: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<HackerGroup | null>(null);

  return (
    <div className="flex flex-col h-full bg-[#050505] overflow-hidden animate-in fade-in duration-1000 font-cyber">
      {/* Header Animado */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-black via-[#800020]/10 to-black">
        <div className="flex items-center gap-4">
          <div className="text-4xl animate-pulse">👺</div>
          <div>
            <h2 className="text-xl font-black text-[var(--neon-accent)] tracking-[0.3em] uppercase">Hacker_Intelligence_Bureau</h2>
            <p className="text-[9px] text-white/30 tracking-[0.4em] uppercase">Deep Web Analysis & Live Feeds</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">Connection: Encrypted</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Lista de Grupos */}
        <div className="w-1/3 border-r border-white/5 bg-black/40 overflow-y-auto no-scrollbar p-4 space-y-4">
          <h3 className="text-[10px] text-white/40 uppercase tracking-[0.5em] mb-4 border-l-4 border-[var(--neon-accent)] pl-3">Detected_Entities</h3>
          {HACKER_GROUPS.map(group => (
            <div 
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer group relative overflow-hidden ${selectedGroup?.id === group.id ? 'bg-[var(--neon-accent)]/10 border-[var(--neon-accent)] shadow-[0_0_20px_var(--neon-glow)] scale-105' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl group-hover:scale-125 transition-transform">{group.logo}</span>
                <div>
                  <div className="text-sm font-black uppercase text-white tracking-widest">{group.name}</div>
                  <div className="text-[8px] text-white/30 mt-1 uppercase">Active Operational Unit</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de Inteligencia */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-black/60 relative">
          {selectedGroup ? (
            <div className="animate-in slide-in-from-right-8 duration-700 space-y-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">{selectedGroup.name}</h3>
                  <div className="flex gap-2">
                    {selectedGroup.targets.map(t => (
                      <span key={t} className="text-[8px] bg-red-600/20 text-red-500 px-3 py-1 rounded-full uppercase font-black">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/20 uppercase tracking-widest font-black">Threat_Level</div>
                  <div className="text-2xl text-red-600 font-terminal font-black">CRITICAL</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4">
                  <h4 className="text-[var(--neon-accent)] text-[10px] font-black uppercase tracking-widest border-b border-white/5 pb-2">Philosophy_&_Bio</h4>
                  <p className="text-sm text-white/70 leading-relaxed font-terminal">{selectedGroup.description}</p>
                  <p className="text-xs text-[var(--neon-accent)] italic font-terminal mt-4">"{selectedGroup.philosophy}"</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4">
                  <h4 className="text-[var(--neon-accent)] text-[10px] font-black uppercase tracking-widest border-b border-white/5 pb-2">Deep_Space_Links</h4>
                  <div className="space-y-3">
                    {selectedGroup.links.map((l, idx) => (
                      <a 
                        key={idx} 
                        href={l.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5 hover:border-[var(--neon-accent)] transition-all group"
                      >
                        <span className="text-xs font-bold text-white/80 uppercase">{l.label}</span>
                        <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${l.type === 'telegram' ? 'bg-blue-600/20 text-blue-500' : 'bg-purple-600/20 text-purple-500'}`}>
                          {l.type}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-black border border-white/5 rounded-[3rem] p-8 space-y-6">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                  Recent_Attack_Log
                </h4>
                <div className="space-y-6">
                  {selectedGroup.news.map((news, idx) => (
                    <div key={idx} className="border-l-2 border-white/10 pl-6 space-y-1 hover:border-red-600 transition-colors">
                      <div className="text-[9px] text-white/20 font-terminal">{news.date}</div>
                      <div className="text-sm font-black text-red-500 uppercase tracking-widest">{news.title}</div>
                      <p className="text-xs text-white/50 leading-relaxed">{news.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-10 text-center space-y-8 select-none">
              <span className="text-9xl animate-bounce">🦂</span>
              <h2 className="text-2xl font-cyber tracking-[1em] uppercase">Awaiting_Entity_Selection</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackerIntel;
