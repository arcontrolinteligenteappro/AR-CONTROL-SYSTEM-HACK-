
import React, { useState, useEffect } from 'react';
import { MASTER_USER, MASTER_PASS, APP_NAME, APP_SUBTITLE, DEVELOPER_CREDIT } from '../constants';
import Logo from './Logo';

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
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center p-6 overflow-hidden animate-in fade-in duration-1000">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(0,243,255,0.1)_0%,transparent_70%)]"></div>
      
      <div className="w-full max-w-md space-y-8 z-10 transition-all transform scale-100 hover:scale-[1.01]">
        <div className="text-center space-y-4">
          <Logo size={140} glow={true} showText={false} className="mx-auto animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-black font-cyber text-[var(--neon-accent)] neon-text tracking-tighter uppercase">
            {APP_NAME}
          </h1>
          <p className="text-[9px] font-cyber text-white/30 uppercase tracking-[0.5em]">{APP_SUBTITLE}</p>
        </div>

        <div className="bg-black/60 border border-white/10 p-4 rounded-xl font-mono text-[9px] text-[var(--neon-accent)]/50 h-24 overflow-hidden shadow-inner">
           {bootLog.map((log, idx) => (
             <div key={idx} className="animate-in slide-in-from-left-2 duration-300">
               <span className="text-white/20 mr-2">>>></span> {log}
             </div>
           ))}
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl space-y-6 animate-in slide-in-from-bottom-8 duration-700">
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="OPERATOR_ID"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-[var(--neon-accent)] outline-none transition-all font-mono text-sm uppercase placeholder:text-white/20"
              autoComplete="off"
            />
            <input 
              type="password" 
              placeholder="PASS_TOKEN"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-[var(--neon-accent)] outline-none transition-all font-mono text-sm uppercase placeholder:text-white/20"
            />
          </div>

          {error && (
            <div className="text-red-500 text-[10px] font-black text-center animate-pulse tracking-widest uppercase bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              [!] {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--neon-accent)] text-black font-black py-4 rounded-2xl hover:brightness-125 active:scale-95 transition-all uppercase tracking-[0.3em] shadow-[0_0_20px_var(--neon-glow)] disabled:opacity-50"
          >
            {loading ? 'AUTENTICANDO...' : 'INICIALIZAR_SCORPION'}
          </button>
        </form>

        <p className="text-center text-[8px] text-white/10 font-cyber tracking-[1em] uppercase">
          PROTECTED BY GHOST_PROTOCOL_X64
        </p>
      </div>
    </div>
  );
};

export default Login;
