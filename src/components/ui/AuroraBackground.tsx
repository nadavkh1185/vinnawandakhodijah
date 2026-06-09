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
        { x: 0.2, y: 0.3, r: 0.55, color1: 'rgba(99,102,241,0.18)', color2: 'transparent' },
        { x: 0.75, y: 0.2, r: 0.45, color1: 'rgba(168,85,247,0.14)', color2: 'transparent' },
        { x: 0.5, y: 0.7, r: 0.5, color1: 'rgba(59,130,246,0.12)', color2: 'transparent' },
        { x: 0.85, y: 0.65, r: 0.4, color1: 'rgba(139,92,246,0.1)', color2: 'transparent' },
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
