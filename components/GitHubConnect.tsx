
import React, { useState } from 'react';
import { REPOSITORIES } from '../constants';

const GitHubConnect: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState(REPOSITORIES);

  const handleLogin = () => {
    setLoading(true);
    // Simulación de OAuth
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] p-8 overflow-hidden animate-in fade-in duration-700 font-cyber">
      <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
        <div className="flex items-center gap-6">
          <div className="text-6xl text-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">🐙</div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">GitHub_Ghost_Sync</h2>
            <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase">Ethical Hacking Repository Integrator</p>
          </div>
        </div>
        {!isLoggedIn ? (
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-[var(--neon-accent)] transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? 'CONNECTING_SSH...' : 'LOGIN_WITH_GITHUB'}
          </button>
        ) : (
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-[var(--neon-accent)]/30">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">👤</div>
             <div>
                <div className="text-[10px] font-black text-white uppercase">ChrisRey91_DEV</div>
                <div className="text-[8px] text-[var(--neon-accent)] uppercase">Status: AUTHENTICATED</div>
             </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] hover:border-[var(--neon-accent)] transition-all group relative overflow-hidden flex flex-col">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">🐙</div>
               <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl filter group-hover:drop-shadow-[0_0_8px_var(--neon-accent)] transition-all">{repo.icon}</span>
                  <div>
                    <h3 className="text-sm font-black text-white tracking-widest group-hover:text-[var(--neon-accent)] transition-colors">{repo.name}</h3>
                    <div className="text-[8px] text-white/20 font-terminal uppercase">Stars: {repo.stars}</div>
                  </div>
               </div>
               <p className="text-xs text-white/60 leading-relaxed font-terminal flex-1 mb-6">{repo.description}</p>
               <div className="flex gap-3">
                  <a href={repo.url} target="_blank" className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-xl text-center text-[9px] font-black uppercase tracking-widest border border-white/10 transition-all">View_Source</a>
                  <button className="flex-1 bg-[var(--neon-accent)] text-black py-3 rounded-xl text-center text-[9px] font-black uppercase tracking-widest transition-all shadow-lg">CLONE_VFS</button>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 p-6 bg-red-600/5 border-2 border-dashed border-red-600/20 rounded-3xl flex items-center gap-6">
          <div className="text-4xl animate-pulse">⚠️</div>
          <div className="text-[10px] text-white/40 leading-relaxed uppercase font-terminal">
            <span className="text-red-500 font-black">ADVERTENCIA:</span> LA CLONACIÓN DE REPOSITORIOS DESCONOCIDOS PUEDE COMPROMETER EL NÚCLEO AR CONTROL. 
            SIEMPRE AUDITE EL CÓDIGO ANTES DE LA EJECUCIÓN EN MODO REAL.
          </div>
      </div>
    </div>
  );
};

export default GitHubConnect;
