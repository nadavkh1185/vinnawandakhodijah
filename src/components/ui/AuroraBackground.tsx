'use client';

import { useEffect, useRef } from 'react';

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawAurora = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradients = [
        { x: 0.18, y: 0.28, r: 0.55, color1: 'rgba(42,130,183,0.20)', color2: 'transparent' },
        { x: 0.78, y: 0.18, r: 0.45, color1: 'rgba(87,151,177,0.16)', color2: 'transparent' },
        { x: 0.5, y: 0.72, r: 0.52, color1: 'rgba(16,49,69,0.28)', color2: 'transparent' },
        { x: 0.84, y: 0.68, r: 0.4, color1: 'rgba(245,251,255,0.06)', color2: 'transparent' },
      ];

      gradients.forEach((g, i) => {
        const offsetX = Math.sin(time * 0.3 + i * 1.5) * 0.08;
        const offsetY = Math.cos(time * 0.2 + i * 1.2) * 0.06;

        const cx = (g.x + offsetX) * canvas.width;
        const cy = (g.y + offsetY) * canvas.height;
        const radius = g.r * Math.max(canvas.width, canvas.height);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, g.color1);
        gradient.addColorStop(1, g.color2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      time += 0.005;
      animationId = requestAnimationFrame(drawAurora);
    };

    drawAurora();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
