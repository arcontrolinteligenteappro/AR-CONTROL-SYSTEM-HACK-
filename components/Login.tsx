
import React, { useState, useEffect } from 'react';
import { DEVELOPER_CREDIT, DEVELOPER_SITE, APP_NAME, APP_SUBTITLE, REGISTERED_USERS } from '../constants';
import Logo from './Logo';

interface Props {
  onLogin: () => void;
  showUsers?: boolean;
}

const Login: React.FC<Props> = ({ onLogin, showUsers = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bootText, setBootText] = useState<string[]>([]);
  const [showScorpion, setShowScorpion] = useState(false);

  const bootSequence = [
    "[...] INICIALIZANDO NÚCLEO AR CONTROL v5.5",
    "[...] CARGANDO INTERFAZ GHOST",
    "[...] VERIFICANDO ENLACES DE RED",
    "[...] ESTABLECIENDO CONEXIÓN SCORPION",
    "[...] SISTEMA LISTO PARA OPERADOR"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootText(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e?: React.FormEvent, directUser?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    const targetUser = directUser || username;
    const isDirect = !!directUser;

    setTimeout(() => {
      // Validar accesos solicitados
      const validUsers = [
        { u: 'admin', p: 'admin' },
        { u: 'chrisrey', p: 'scorpion91' },
        { u: 'emsad16', p: 'control2025' }
      ];

      const isValid = isDirect || validUsers.some(v => v.u === targetUser.toLowerCase() && v.p === password);

      if (isValid) {
        setShowScorpion(true);
        setTimeout(() => {
          onLogin();
        }, 1500);
      } else {
        setError('ACCESO DENEGADO: CREDENCIALES NO VÁLIDAS');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#050505] relative overflow-hidden h-screen w-screen animate-in fade-in duration-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,243,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      
      {showScorpion && (
        <div className="fixed inset-0 z-[500] bg-red-600/20 backdrop-blur-md flex items-center justify-center animate-pulse">
           <div className="text-[25rem] opacity-20 animate-ping">🦂</div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black font-cyber text-white tracking-[1em] text-center uppercase">
              ACCESO_GHOST_CONCEDIDO
           </div>
        </div>
      )}

      <div className="mb-8 z-10 transform hover:scale-105 transition-transform duration-700">
        <Logo size={200} glow={true} showText={false} />
      </div>
      
      <div className="w-full max-w-lg space-y-6 z-10 relative">
        <div className="text-center">
            <h1 className="text-5xl font-black text-[var(--neon-accent)] tracking-[0.3em] font-cyber neon-text uppercase">
              {APP_NAME}
            </h1>
            <p className="text-white/40 text-[10px] font-cyber tracking-[0.6em] uppercase mt-2">{APP_SUBTITLE} BY {DEVELOPER_CREDIT}</p>
        </div>

        <div className="bg-black/90 border border-white/5 p-4 rounded-xl font-mono text-[9px] text-[var(--neon-accent)]/60 h-28 overflow-hidden shadow-2xl">
            {bootText.map((text, idx) => (
                <div key={idx} className="animate-in slide-in-from-left-2 duration-300 mb-0.5">
                  <span className="text-white/20 mr-2">>>></span> {text}
                </div>
            ))}
            {bootText.length === bootSequence.length && <div className="text-white/40 animate-pulse mt-2">_ ESPERANDO_CREDENCIALES_DEL_OPERADOR</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 focus:border-[var(--neon-accent)] outline-none text-white transition-all font-mono text-xs shadow-inner uppercase"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="OPERATOR_ID"
                autoFocus
              />
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 focus:border-[var(--neon-accent)] outline-none text-white transition-all font-mono text-xs shadow-inner uppercase"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASS_TOKEN"
              />
              {error && <p className="text-red-500 text-[8px] font-black text-center animate-pulse tracking-[0.3em] uppercase">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--neon-accent)]/5 border border-[var(--neon-accent)] text-[var(--neon-accent)] font-black py-4 rounded-xl hover:bg-[var(--neon-accent)] hover:text-black transition-all uppercase tracking-[0.3em] text-[10px] shadow-lg disabled:opacity-30"
              >
                {loading ? 'CONECTANDO...' : 'INICIALIZAR_NÚCLEO'}
              </button>
            </form>

            {showUsers && (
                <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-700">
                    <p className="text-[8px] text-white/30 uppercase tracking-[0.4em] mb-2 font-black border-l-2 border-[var(--neon-accent)] pl-2">Acceso Rápido de Operadores</p>
                    {REGISTERED_USERS.map(user => (
                        <button
                            key={user.id}
                            onClick={() => { setUsername(user.id); handleLogin(undefined, user.id); }}
                            className="w-full flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-[var(--neon-accent)] hover:text-black hover:border-[var(--neon-accent)] transition-all group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">{user.icon}</span>
                            <div className="text-left">
                                <div className="text-[9px] font-black uppercase">{user.name}</div>
                                <div className="text-[7px] opacity-40 font-terminal">LOGIN_ID: {user.id.toUpperCase()}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>
      
      <div className="fixed bottom-6 text-[8px] text-white/10 font-cyber tracking-[1em] uppercase">
        {DEVELOPER_SITE}
      </div>
    </div>
  );
};

export default Login;
