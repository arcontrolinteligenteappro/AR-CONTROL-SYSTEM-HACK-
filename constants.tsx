
import React from 'react';

export const DEVELOPER_CREDIT = "ChrisRey91";
export const DEVELOPER_SITE = "www.arcontrolinteligente.com";
// Nombre actualizado a AR CONTROL SYSTEM HACK TOOL
export const APP_NAME = "AR CONTROL SYSTEM HACK TOOL";
export const APP_SUBTITLE = "ADVANCED OFFENSIVE OPERATIONS SUITE";

export const MASTER_USER = "admin";
export const MASTER_PASS = "admin";

export type OpMode = 'sim' | 'real';

export const THEMES = {
  tech_dark: { 
    name: 'Ghost Mode', 
    accent: '#00f3ff', 
    glow: 'rgba(0, 243, 255, 0.4)', 
    bg: 'linear-gradient(135deg, #050a15 0%, #0a1a2f 100%)', 
    text: '#ffffff',
    isDark: true
  },
  toxin_green: { 
    name: 'Toxin Mode', 
    accent: '#39ff14', 
    glow: 'rgba(57, 255, 20, 0.4)', 
    bg: 'linear-gradient(135deg, #051505 0%, #0a2f0a 100%)', 
    text: '#ffffff',
    isDark: true
  },
  blood_red: { 
    name: 'Blood Mode', 
    accent: '#ff0033', 
    glow: 'rgba(255, 0, 51, 0.4)', 
    bg: 'linear-gradient(135deg, #150505 0%, #2f0a0a 100%)', 
    text: '#ffffff',
    isDark: true
  }
};

// Usuarios actualizados con temática hacking
export const REGISTERED_USERS = [
  { id: '1', name: 'ChrisRey91', icon: '🦂' },
  { id: '2', name: 'Ghost_Operator', icon: '💀' },
  { id: '3', name: 'Net_Stalker', icon: '🕵️' }
];

// Diccionario técnico actualizado con términos de hacking
export const TECHNICAL_DICT = [
  { term: 'Exploit', area: 'Hacking', def: 'Fragmento de software o comando que aprovecha una vulnerabilidad.' },
  { term: 'Payload', area: 'Hacking', def: 'Carga útil que se ejecuta tras una explotación exitosa.' },
  { term: 'Metasploit', area: 'Tools', def: 'Framework de código abierto para pruebas de penetración.' },
  { term: '0-Day', area: 'Vulnerability', def: 'Vulnerabilidad desconocida por el fabricante del software.' },
  { term: 'Phishing', area: 'Social Engineering', def: 'Método para engañar a usuarios y obtener credenciales.' }
];

export type AppCategory = 
  | 'System Core'
  | 'Network Ops'
  | 'Exploitation'
  | 'Intel & Recon'
  | 'Data Mgmt'
  | 'Terminals'
  | 'Academy';

export interface Tool {
  id: string;
  name: string;
  icon: string;
  cmd: string;
  category: AppCategory;
  modeSupport?: OpMode[];
}

export const TOOLS: Tool[] = [
  // Terminals
  { id: 'terminal_kali', name: 'Kali Linux', icon: '🐉', cmd: 'kali', category: 'Terminals' },
  { id: 'terminal_termux', name: 'Termux Shell', icon: '🐚', cmd: 'termux', category: 'Terminals' },
  { id: 'terminal_windows', name: 'Windows CMD', icon: '🪟', cmd: 'cmd', category: 'Terminals' },
  { id: 'terminal_macos', name: 'macOS Zsh', icon: '🍎', cmd: 'zsh', category: 'Terminals' },
  { id: 'terminal_ubuntu', name: 'Ubuntu Bash', icon: '🟠', cmd: 'bash', category: 'Terminals' },
  
  // Core & Intel
  { id: 'ai_scorpion', name: 'Scorpion IA', icon: '🦂', cmd: 'ai', category: 'System Core' },
  { id: 'command_intel', name: 'Cmd Intelligence', icon: '⌨️', cmd: 'intel', category: 'System Core' },
  { id: 'github_exploits', name: 'Repo Explorer', icon: '🐙', cmd: 'git', category: 'Intel & Recon' },
  
  // Offensive
  { id: 'network_scanner', name: 'Net Scanner', icon: '🔍', cmd: 'nmap', category: 'Network Ops' },
  { id: 'wireless_auditor', name: 'WiFi Ghost', icon: '📡', cmd: 'wifi', category: 'Network Ops' },
  { id: 'traffic_interceptor', name: 'Packet Sniffer', icon: '✂️', cmd: 'sniff', category: 'Network Ops' },
  { id: 'social_phish', name: 'Phish Master', icon: '🎭', cmd: 'phish', category: 'Exploitation' },
  { id: 'hacker_intel', name: 'Deep Intel', icon: '👺', cmd: 'deep', category: 'Intel & Recon' },
  
  // Storage & Utils
  { id: 'file_explorer', name: 'Ghost Files', icon: '📂', cmd: 'files', category: 'Data Mgmt' },
  { id: 'vpn_proxy', name: 'Ghost Proxy', icon: '🛡️', cmd: 'vpn', category: 'Network Ops' },
  { id: 'tech_academy', name: 'Hacker Academy', icon: '🎓', cmd: 'edu', category: 'Academy' }
];

export interface GitHubRepo {
  name: string;
  url: string;
  icon: string;
  description: string;
  stars: string;
  tags: string[];
}

export const REPOSITORIES: GitHubRepo[] = [
  { name: 'Metasploit', url: 'https://github.com/rapid7/metasploit-framework', icon: '🛡️', description: 'Framework de penetración líder.', stars: '32k', tags: ['Exploit', 'Ruby'] },
  { name: 'Nmap', url: 'https://github.com/nmap/nmap', icon: '🔍', description: 'Auditoría de red y descubrimiento.', stars: '16k', tags: ['Network', 'C++'] },
  { name: 'Sherlock', url: 'https://github.com/sherlock-project/sherlock', icon: '🕵️', description: 'Búsqueda de usuarios en RRSS.', stars: '45k', tags: ['OSINT', 'Python'] },
  { name: 'Airgeddon', url: 'https://github.com/v1s1t0r1sh3r3/airgeddon', icon: '📡', description: 'Auditoría inalámbrica multiusos.', stars: '13k', tags: ['WiFi', 'Bash'] },
  { name: 'Social-Engineer Toolkit', url: 'https://github.com/trustedsec/social-engineer-toolkit', icon: '🎭', description: 'Ingeniería social avanzada.', stars: '10k', tags: ['Phishing', 'Python'] }
];
