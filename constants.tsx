import React from 'react';

export const KALI_BLUE = '#00f3ff';
export const DEVELOPER_CREDIT = "ChrisRey91";
export const TEAM_NAME = "AR CONTROL INTELLIGENTE";
export const DEVELOPER_SITE = "www.arcontrolinteligente.com";
export const APP_NAME = "AR CONTROL";
export const APP_SUBTITLE = "GHOST INTERFACE v5.5";

// CREDENCIALES ÚNICAS
export const MASTER_USER = "arcontrolinteligente";
export const MASTER_PASS = "12345abc";

export type OpMode = 'sim' | 'real';

export const THEMES = {
  ghost: { 
    name: 'Ghost Protocol', 
    accent: '#00f3ff', 
    glow: 'rgba(0, 243, 255, 0.4)', 
    bg: 'linear-gradient(135deg, #050a15 0%, #0a1a2f 100%)', 
    text: '#ffffff' 
  },
  scorpion: { 
    name: 'Scorpion Red', 
    accent: '#800020', 
    glow: 'rgba(128, 0, 32, 0.5)', 
    bg: 'linear-gradient(135deg, #0a0505 0%, #1a0a0a 100%)', 
    text: '#ffffff' 
  }
};

export type AppCategory = 
  | 'Terminals'
  | 'Network'
  | 'Intel'
  | 'Hardware'
  | 'Academy'
  | 'System & Tools'
  | 'AI Core'
  | 'Repositories';

export interface Tool {
  id: string;
  name: string;
  icon: string;
  cmd: string;
  category: AppCategory;
  modeSupport?: OpMode[];
}

export const TOOLS: Tool[] = [
  { id: 'ai_scorpion', name: 'Scorpion AI', icon: '🦂', cmd: 'ai', category: 'AI Core' },
  { id: 'terminal_kali', name: 'Kali Linux', icon: '🐉', cmd: 'kali', category: 'Terminals', modeSupport: ['sim', 'real'] },
  { id: 'terminal_termux', name: 'Termux', icon: '🐚', cmd: 'termux', category: 'Terminals', modeSupport: ['sim', 'real'] },
  { id: 'terminal_cmd', name: 'Windows CMD', icon: '🪟', cmd: 'cmd', category: 'Terminals', modeSupport: ['sim', 'real'] },
  { id: 'terminal_ps', name: 'PowerShell', icon: ' PowerShell', cmd: 'ps', category: 'Terminals', modeSupport: ['sim', 'real'] },
  { id: 'terminal_mac', name: 'macOS Shell', icon: '', cmd: 'zsh', category: 'Terminals', modeSupport: ['sim', 'real'] },
  { id: 'vpn_proxy', name: 'VPN Ghost Proxy', icon: '🛡️', cmd: 'ghostvpn', category: 'Network' },
  { id: 'traffic_visualizer', name: 'Traffic Visualizer', icon: '✨', cmd: 'netviz', category: 'Network', modeSupport: ['sim', 'real'] },
  { id: 'wireless_auditor', name: 'Wireless Auditor', icon: '📡', cmd: 'airmon', category: 'Network', modeSupport: ['sim', 'real'] },
  { id: 'traffic_interceptor', name: 'Traffic Interceptor', icon: '🚦', cmd: 'tcpdump', category: 'Network', modeSupport: ['sim', 'real'] },
  { id: 'network_scanner', name: 'Network Scanner', icon: '🔍', cmd: 'nmap', category: 'Network', modeSupport: ['sim'] },
  { id: 'hacker_intel', name: 'Hacker Intel', icon: '👺', cmd: 'intel', category: 'Intel' },
  { id: 'social_phish', name: 'Social Phisher', icon: '🎭', cmd: 'setoolkit', category: 'Intel' },
  { id: 'project_lab', name: 'Hardware Lab', icon: '🧪', cmd: 'lab', category: 'Hardware' },
  { id: 'tech_academy', name: 'Tech Academy', icon: '🎓', cmd: 'edu', category: 'Academy' },
  { id: 'github_connect', name: 'GitHub Sync', icon: '🐙', cmd: 'git', category: 'Repositories' },
  { id: 'github_exploits', name: 'GitHub Exploits', icon: '💥', cmd: 'gh-exploits', category: 'Repositories' },
  { id: 'file_explorer', name: 'File Explorer', icon: '📂', cmd: 'ls', category: 'System & Tools', modeSupport: ['sim', 'real'] },
  { id: 'system_monitor', name: 'System Monitor', icon: '📈', cmd: 'sysmon', category: 'System & Tools', modeSupport: ['sim', 'real'] },
  { id: 'productivity_tools', name: 'Productivity Suite', icon: '🛠️', cmd: 'utils', category: 'System & Tools' },
  { id: 'office_suite', name: 'Office Suite', icon: '💼', cmd: 'docs', category: 'System & Tools' },
  { id: 'media_factory', name: 'Media Factory', icon: '🎞️', cmd: 'media', category: 'System & Tools' },
  { id: 'settings', name: 'Core Config', icon: '⚙️', cmd: 'config', category: 'System & Tools' }
];

export interface GitHubRepo {
  name: string;
  url: string;
  icon: string;
  stars: string;
  description: string;
  tags: string[]; // For filtering by terminal type
}

export const REPOSITORIES: GitHubRepo[] = [
  { name: 'Metasploit', url: 'https://github.com/rapid7/metasploit-framework', icon: '🛡️', stars: '32k', description: 'Advanced penetration testing framework.', tags: ['kali', 'macos'] },
  { name: 'Nmap', url: 'https://github.com/nmap/nmap', icon: '🔍', stars: '18k', description: 'Network discovery and security auditing.', tags: ['kali', 'macos', 'termux', 'cmd'] },
  { name: 'Airgeddon', url: 'https://github.com/v1s1t0r1sh3r3/airgeddon', icon: '📡', stars: '12k', description: 'Multi-use bash script for wireless auditing.', tags: ['kali'] },
  { name: 'PowerSploit', url: 'https://github.com/PowerShellMafia/PowerSploit', icon: ' PowerShell', stars: '11k', description: 'A collection of PowerShell modules for penetration testers.', tags: ['ps'] },
  { name: 'Termux-packages', url: 'https://github.com/termux/termux-packages', icon: '🐚', stars: '12k', description: 'The main package repository for Termux.', tags: ['termux'] },
  { name: 'Mimikatz', url: 'https://github.com/gentilkiwi/mimikatz', icon: '🔑', stars: '18k', description: 'A little tool to play with Windows security.', tags: ['cmd', 'ps'] }
];

// FIX: Define and export TECHNICAL_DICT for use in ProductivityTools component.
export interface TechDictItem {
  term: string;
  def: string;
  area: 'Hacking' | 'Electrónica' | 'Robótica' | 'Redes' | 'Software';
}

export const TECHNICAL_DICT: TechDictItem[] = [
  { term: 'Metasploit', def: 'Framework para pruebas de penetración usado para desarrollar y ejecutar exploits contra máquinas remotas.', area: 'Hacking' },
  { term: 'Nmap', def: 'Escáner de redes para descubrir hosts y servicios en una red informática, creando un mapa de la misma.', area: 'Redes' },
  { term: 'Arduino', def: 'Plataforma de hardware de código abierto para construir proyectos electrónicos interactivos y prototipado.', area: 'Electrónica' },
  { term: 'ESP32', def: 'Microcontrolador de bajo costo con Wi-Fi y Bluetooth, ideal para proyectos del Internet de las Cosas (IoT).', area: 'Electrónica' },
  { term: 'Raspberry Pi', def: 'Ordenador de placa única de bajo costo para aprender a programar y construir proyectos de hardware complejos.', area: 'Electrónica' },
  { term: 'Phishing', def: 'Técnica de ingeniería social que suplanta la identidad para engañar a usuarios y obtener información confidencial.', area: 'Hacking' },
  { term: 'Ransomware', def: 'Tipo de malware que cifra los archivos de la víctima y exige un rescate (pago) para restaurar el acceso.', area: 'Hacking' },
  { term: 'Servomotor', def: 'Actuador rotativo que permite un control preciso de la posición angular, velocidad y aceleración.', area: 'Robótica' },
  { term: 'I2C', def: 'Protocolo de comunicación en serie para conectar periféricos de baja velocidad a microcontroladores, como sensores.', area: 'Electrónica' },
  { term: 'Firewall', def: 'Sistema de seguridad de red que monitorea y controla el tráfico entrante y saliente basado en reglas de seguridad.', area: 'Redes' },
  { term: 'Python', def: 'Lenguaje de programación de alto nivel, popular para scripting, desarrollo web y automatización de ciberseguridad.', area: 'Software' },
  { term: 'JavaScript', def: 'Lenguaje de programación esencial para el desarrollo web que permite la interactividad en el lado del cliente.', area: 'Software' },
  { term: 'SQL Injection', def: 'Técnica de inyección de código que aprovecha vulnerabilidades en la capa de base de datos de una aplicación web.', area: 'Hacking' },
  { term: 'Rootkit', def: 'Colección de software malicioso diseñado para permitir el acceso no autorizado a un sistema mientras oculta su presencia.', area: 'Hacking' },
  { term: 'UART', def: 'Protocolo de comunicación de hardware para la comunicación en serie asíncrona entre dispositivos.', area: 'Electrónica' }
];

export const REGISTERED_USERS = [
  { id: 'admin', name: 'Master Operator', icon: '👤' }
];