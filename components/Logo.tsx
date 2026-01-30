
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 200, glow = true, showText = true }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`} style={{ width: size }}>
      {glow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(0,243,255,0.15)_0%,transparent_70%)] blur-[40px] rounded-full animate-pulse pointer-events-none"></div>
      )}
      
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]"
      >
        <defs>
          <linearGradient id="arGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#00f3ff" />
          </linearGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g id="CCTV" transform="translate(40, 60)" filter="url(#neonGlow)">
          <path d="M5 25 L45 15 L45 45 L5 35 Z" fill="#00f3ff" opacity="0.9" />
          <path d="M45 15 L55 10 L55 50 L45 45" fill="#00f3ff" opacity="0.6" />
          <circle cx="20" cy="28" r="6" fill="white" />
          <circle cx="20" cy="28" r="2.5" fill="#00f3ff" className="animate-pulse" />
          <path d="M30 55 L15 75 M30 75 L45 75" stroke="#00f3ff" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g id="AR_CENTER" transform="translate(140, 40)">
          <path
            d="M0 100 L45 0 L90 100"
            stroke="url(#arGradient)"
            strokeWidth="18"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M20 70 H70"
            stroke="#00f3ff"
            strokeWidth="12"
            strokeLinecap="square"
          />
          <path
            d="M100 0 V100 M100 0 C140 0 160 25 160 50C160 75 140 90 100 90L155 120"
            stroke="#00f3ff"
            strokeWidth="20"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M100 0 V100 M100 0 C140 0 160 25 160 50C160 75 140 90 100 90L155 120"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.8"
          />
        </g>

        <g id="HACKER" transform="translate(310, 60)" filter="url(#neonGlow)">
          <path d="M5 55 C5 10 75 10 75 55" stroke="#00f3ff" strokeWidth="4" fill="#050a15" />
          <path d="M15 55 C15 25 65 25 65 55" fill="#00f3ff" opacity="0.25" />
          <rect x="10" y="60" width="60" height="35" rx="3" fill="#0a1a2f" stroke="#00f3ff" strokeWidth="2" />
          <text x="20" y="85" fill="#39ff14" fontSize="16" fontWeight="bold" fontFamily="monospace" className="animate-pulse">
            &lt; /&gt;
          </text>
        </g>

        {showText && (
          <text
            x="200"
            y="185"
            textAnchor="middle"
            fill="white"
            style={{ 
              fontFamily: 'Orbitron, sans-serif', 
              fontSize: '22px', 
              fontWeight: '900', 
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              filter: 'drop-shadow(0 0 5px #00f3ff)'
            }}
          >
            GHOST HACK SYSTEM
          </text>
        )}
      </svg>
    </div>
  );
};

export default Logo;
