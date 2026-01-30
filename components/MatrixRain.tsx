
import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()_+-=[]{}|;:,.<>?/パイプラインハッカー';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 10, 21, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Obtener el color del acento dinámicamente desde CSS variables
      const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-accent').trim() || '#00f3ff';
      
      ctx.font = `${fontSize}px "Fira Code"`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Efectos de color dinámicos basados en el tema actual
        const rand = Math.random();
        if (rand > 0.98) ctx.fillStyle = '#ffffff'; 
        else if (rand > 0.95) ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--neon-magenta').trim() || '#ff00ff';
        else ctx.fillStyle = themeColor;

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-15 pointer-events-none z-0" />;
};

export default MatrixRain;
