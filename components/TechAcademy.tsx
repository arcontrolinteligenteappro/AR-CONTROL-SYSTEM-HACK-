
import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'malware', name: 'Virus & Malware', icon: '🦠' },
  { id: 'robotics', name: 'Robótica & Electrónica', icon: '🤖' },
  { id: 'domotics', name: 'Domótica & IoT', icon: '🏠' },
  { id: 'programming', name: 'Software & Redes', icon: '💻' }
];

const MALWARE_DB = [
  { 
    name: 'Ransomware', 
    type: 'Criptográfico / Extorsión', 
    traits: 'Cifra archivos locales y de red, deshabilita copias de seguridad.', 
    symptoms: 'Ficheros con extensiones extrañas (.encrypted), nota de rescate en fondo de pantalla, alta actividad de disco.' 
  },
  { 
    name: 'Troyano (Trojan)', 
    type: 'Acceso Remoto (RAT)', 
    traits: 'Se disfraza de software útil para abrir puertas traseras (Backdoors).', 
    symptoms: 'Cámara web activándose sola, ratón moviéndose, procesos desconocidos en segundo plano.' 
  },
  { 
    name: 'Spyware / Keylogger', 
    type: 'Espionaje', 
    traits: 'Registra pulsaciones de teclas, capturas de pantalla y micrófonos.', 
    symptoms: 'Lentitud al escribir, anuncios emergentes extraños, correos enviados sin permiso.' 
  },
  { 
    name: 'Rootkit', 
    type: 'Persistencia de Kernel', 
    traits: 'Modifica el núcleo del SO para ocultarse de antivirus y herramientas del sistema.', 
    symptoms: 'El sistema no detecta el virus, pantallazos azules frecuentes, permisos de archivos que cambian solos.' 
  },
  { 
    name: 'Gusano (Worm)', 
    type: 'Auto-propagación', 
    traits: 'Se replica a través de redes, correos y memorias USB de forma autónoma.', 
    symptoms: 'Uso de ancho de banda al 100%, memoria RAM saturada, archivos duplicados en carpetas compartidas.' 
  }
];

const ROBOTICS_INFO = [
  { title: 'Sensores de Proximidad', info: 'Ultrasonido (HC-SR04), Infrarrojos (TCRT5000) y LiDAR para navegación autónoma.' },
  { title: 'Actuadores', info: 'Servomotores para precisión, Motores DC para tracción y Motores a pasos para maquinaria CNC.' },
  { title: 'Controladores', info: 'Arduino Uno (Base), ESP32 (IoT), Raspberry Pi (Procesamiento de imagen).' }
];

const TechAcademy: React.FC = () => {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0]);

  return (
    <div className="flex flex-col h-full bg-[#050505] p-6 overflow-hidden animate-in slide-in-from-bottom-8 duration-700 font-cyber">
      <div className="flex items-center gap-4 mb-8">
        <div className="text-5xl animate-bounce">🎓</div>
        <div>
          <h2 className="text-xl font-black text-[var(--neon-accent)] tracking-widest uppercase">Scorpion_Academy_V5</h2>
          <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase">Base de Conocimientos GHOST_OS</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
         {CATEGORIES.map(cat => (
           <button 
             key={cat.id}
             onClick={() => setActiveCat(cat)}
             className={`px-8 py-3 rounded-2xl flex items-center gap-3 transition-all whitespace-nowrap border-2 ${activeCat.id === cat.id ? 'bg-[var(--neon-accent)] text-black border-[var(--neon-accent)] shadow-[0_0_15px_var(--neon-glow)]' : 'bg-white/5 text-white/40 border-white/5 hover:text-white'}`}
           >
             <span>{cat.icon}</span>
             <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
           </button>
         ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
         {activeCat.id === 'malware' && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MALWARE_DB.map((m, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] hover:border-red-600 transition-all group shadow-xl">
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-[var(--neon-accent)] font-black uppercase tracking-widest">{m.name}</span>
                      <span className="text-[8px] bg-red-600/20 text-red-500 px-3 py-1 rounded-full">{m.type}</span>
                   </div>
                   <div className="space-y-4">
                      <div>
                        <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Características</p>
                        <p className="text-xs text-white/70 font-terminal">{m.traits}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Sintomatología</p>
                        <p className="text-xs text-red-500/80 font-terminal">{m.symptoms}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
         )}

         {activeCat.id === 'robotics' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ROBOTICS_INFO.map((r, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] hover:border-[var(--neon-accent)] transition-all group">
                   <h3 className="text-[var(--neon-accent)] font-black uppercase tracking-widest mb-4">{r.title}</h3>
                   <p className="text-sm text-white/70 font-terminal leading-relaxed">{r.info}</p>
                </div>
              ))}
           </div>
         )}

         {(activeCat.id === 'domotics' || activeCat.id === 'programming') && (
           <div className="h-full flex flex-col items-center justify-center opacity-10 text-center py-20 uppercase tracking-[1em]">
              Biblioteca_Cargando...
              <br/><br/>
              <span className="text-6xl">{activeCat.icon}</span>
           </div>
         )}
      </div>
    </div>
  );
};

export default TechAcademy;
