
import React from 'react';

export const KALI_BLUE = '#00f3ff';
export const DEVELOPER_CREDIT = "ChrisRey91";
export const TEAM_NAME = "AR CONTROL INTELLIGENTE";
export const DEVELOPER_SITE = "www.arcontrolinteligente.com";
export const APP_NAME = "AR CONTROL";
export const APP_SUBTITLE = "GHOST INTERFACE v5.5";

export const INITIAL_WELCOME = `
[+] AR-CONTROL KERNEL v5.5 ONLINE...
[+] SYSTEM_STATUS: OPERATIONAL
[+] NEURAL_LINK: SCORPION_V5_ACTIVE
[+] OPERATOR: ${DEVELOPER_CREDIT}
[+] SITE: ${DEVELOPER_SITE}

[!] WARNING: ACCESO RESTRINGIDO A PERSONAL AUTORIZADO.
[!] PROTOCOLO DE CIFRADO GHOST: ACTIVADO.
`;

export interface SystemTheme {
  name: string;
  accent: string;
  glow: string;
  bg: string;
  text: string;
}

export const THEMES: Record<string, SystemTheme> = {
  ghost: { 
    name: 'Ghost Protocol', 
    accent: '#00f3ff', 
    glow: 'rgba(0, 243, 255, 0.4)', 
    bg: 'linear-gradient(135deg, #050a15 0%, #0a1a2f 100%)', 
    text: '#ffffff' 
  },
  blood: { 
    name: 'Scorpion Red', 
    accent: '#ff0033', 
    glow: 'rgba(255, 0, 51, 0.5)', 
    bg: 'linear-gradient(135deg, #0a0505 0%, #1a0a0a 100%)', 
    text: '#ffffff' 
  },
  toxin: { 
    name: 'Neural Toxin', 
    accent: '#39ff14', 
    glow: 'rgba(57, 255, 20, 0.5)', 
    bg: 'linear-gradient(135deg, #050f05 0%, #0a1f0a 100%)', 
    text: '#ffffff' 
  }
};

export const KALI_DRAGON_LOGO = `
    ██████╗ ██████╗      ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     
    ██╔══██╗██╔══██╗    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     
    ██████╔╝██████╔╝    ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     
    ██╔══██╗██╔══██╗    ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     
    ██║  ██║██║  ██║    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗
    ╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
                                                                                   
         AR CONTROL | GHOST INTERFACE | DESARROLLADO POR CHRISREY91
`;

export type AppCategory = 
  'Exploit' | 
  'Wireless' | 
  'Social' | 
  'Sniffing' | 
  'Stress' | 
  'System' |
  'Office' |
  'Media' |
  'AI Consultant' |
  'Repositories' |
  'Network';

export interface Tool {
  id: string;
  name: string;
  icon: string;
  cmd: string;
  category: AppCategory;
  description: string;
}

export const TOOLS: Tool[] = [
  { id: 'terminal', name: 'Terminal Bash', icon: '🐚', cmd: 'bash', category: 'System', description: 'Interfaz de comandos neural avanzada.' },
  { id: 'vpn_proxy', name: 'VPN Ghost Proxy', icon: '🛡️', cmd: 'proxychains', category: 'Network', description: 'Enrutamiento global anónimo y cifrado.' },
  { id: 'ai_consultant', name: 'Scorpion IA', icon: '🦂', cmd: 'ask_scorpion', category: 'AI Consultant', description: 'Consultoría experta en seguridad ofensiva.' },
  { id: 'github_exploits', name: 'Repositorios Ghost', icon: '🐙', cmd: 'git search', category: 'Repositories', description: 'Navegador de herramientas de élite.' },
  { id: 'wifi_crack', name: 'Auditoría WiFi', icon: '📡', cmd: 'airgeddon', category: 'Wireless', description: 'Auditoría profesional de redes inalámbricas.' },
  { id: 'net_scanner', name: 'Scanner de Red', icon: '🔍', cmd: 'nmap', category: 'Network', description: 'Descubrimiento de hosts y mapeo de puertos.' },
  { id: 'traffic_interceptor', name: 'Interceptor de Tráfico', icon: '🕸️', cmd: 'tcpdump', category: 'Sniffing', description: 'Captura y análisis de paquetes en tiempo real.' },
  { id: 'social_phish', name: 'Maestro de Phishing', icon: '🎭', cmd: 'setoolkit', category: 'Social', description: 'Plataforma de ingeniería social y payloads.' },
  { id: 'sms_bomber', name: 'Bomber de Stress', icon: '💣', cmd: 'flood', category: 'Stress', description: 'Pruebas de stress y simulación de inundación.' },
  { id: 'payload_gen', name: 'Centro de Exploits', icon: '💉', cmd: 'msfconsole', category: 'Exploit', description: 'Framework avanzado de explotación.' },
  { id: 'office_suite', name: 'Suite Office', icon: '📝', cmd: 'office', category: 'Office', description: 'Herramientas de productividad para reportes.' },
  { id: 'media_factory', name: 'Media Factory', icon: '🎞️', cmd: 'ffmpeg', category: 'Media', description: 'Procesamiento multimedia avanzado.' },
  { id: 'settings', name: 'Configuración', icon: '⚙️', cmd: 'config', category: 'System', description: 'Ajustes del núcleo AR Control.' },
  { id: 'monitor', name: 'Monitor del Sistema', icon: '📊', cmd: 'top', category: 'System', description: 'Telemetría y salud del sistema en tiempo real.' }
];

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  icon: string;
  stars: string;
}

export const REPOSITORIES: GitHubRepo[] = [
  { name: 'Metasploit Framework', description: 'El framework de pruebas de penetración más usado.', url: 'https://github.com/rapid7/metasploit-framework', icon: '💉', stars: '32k' },
  { name: 'Nmap', description: 'Herramienta de exploración y escaneo de seguridad.', url: 'https://github.com/nmap/nmap', icon: '🔍', stars: '18k' },
  { name: 'SQLmap', description: 'Inyección SQL automática y toma de control de DB.', url: 'https://github.com/sqlmapproject/sqlmap', icon: '💾', stars: '29k' },
  { name: 'Bettercap', description: 'Suite para ataques WiFi, BLE, HID y red.', url: 'https://github.com/bettercap/bettercap', icon: '🕵️', stars: '12k' }
];

export const REGISTERED_USERS = [
  { id: 'admin', name: 'Administrador Maestro', icon: '👑' },
  { id: 'chrisrey', name: 'ChrisRey91 (Dev)', icon: '🦂' },
  { id: 'emsad16', name: 'Operador Plantel 16', icon: '🏢' }
];
