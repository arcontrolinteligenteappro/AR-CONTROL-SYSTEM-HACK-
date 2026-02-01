
import React, { useState, useEffect } from 'react';
import { MASTER_USER, MASTER_PASS, APP_NAME, APP_SUBTITLE, DEVELOPER_CREDIT } from '../constants';
import Logo from './Logo';
import ScorpionText from './ScorpionText';

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);

  useEffect(() => {
    const logs = [
      "[...] Inicializando Core Ghost v5.5",
      "[...] Verificando integridad Scorpion",
      "[...] Estableciendo enlace neural",
      "[...] Esperando operador autorizado"
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setBootLog(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (user === MASTER_USER && pass === MASTER_PASS) {
        onLogin();
      } else {
        setError('ACCESO DENEGADO: TOKEN DE SEGURIDAD INVÁLIDO');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-[#020408] flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(0,243,255,0.05)_0%,transparent_70%)]"></div>
      
      <div className="w-full max-w-lg space-y-10 z-10">
        <div className="text-center space-y-6">
          <div className="relative inline-block group">
            <Logo size={160} glow={true} showText={false} className="mx-auto transform group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] font-black text-[var(--neon-accent)] tracking-[1em] uppercase neon-text">
                {DEVELOPER_CREDIT}
              </span>
            </div>
          </div>
          
          <div className="pt-4">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-[0.3em] uppercase">
              <ScorpionText text={APP_NAME} speed={120} repeat={true} />
            </h1>
          </div>

          {/* Anonymous Slogan */}
          <div className="bg-white/5 border border-white/5 py-4 px-8 rounded-full backdrop-blur-sm animate-pulse">
            <p className="text-[10px] font-black text-white/50 tracking-[0.5em] uppercase">
              ANONYMOUS: NO OLVIDAMOS, NO PERDONAMOS.
            </p>
          </div>
        </div>

        <div className="bg-black/80 border border-white/10 p-5 rounded-2xl font-terminal text-[10px] text-[var(--neon-accent)]/60 h-28 overflow-hidden shadow-2xl">
           {bootLog.map((log, idx) => (
             <div key={idx} className="animate-in slide-in-from-left-4 duration-300">
               <span className="text-white/20 mr-3">#</span> {log}
             </div>
           ))}
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="OPERATOR_ID"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-[var(--neon-accent)] outline-none transition-all font-terminal text-xs uppercase placeholder:text-white/10"
                autoComplete="off"
              />
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="PASS_TOKEN"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-[var(--neon-accent)] outline-none transition-all font-terminal text-xs uppercase placeholder:text-white/10"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-[10px] font-black text-center animate-pulse tracking-widest uppercase bg-red-500/10 py-3 rounded-xl border border-red-500/20">
              [!] {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--neon-accent)] text-black font-black py-4 rounded-2xl hover:brightness-125 active:scale-95 transition-all uppercase tracking-[0.5em] text-xs shadow-[0_0_25px_var(--neon-glow)] disabled:opacity-50"
          >
            {loading ? 'AUTENTICANDO...' : 'LOG_IN_SYSTEM'}
          </button>
        </form>

        <div className="flex justify-center items-center gap-6 opacity-20">
          <div className="h-px w-12 bg-white/20"></div>
          <p className="text-[8px] font-terminal tracking-[1em] uppercase">
            GHOST_CORE_SECURED
          </p>
          <div className="h-px w-12 bg-white/20"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
