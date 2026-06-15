'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  glowColor = 'rgba(87,151,177,0.16)',
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hover) return;
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -3;
      const rotateY = ((x - cx) / cx) * 3;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.006)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hover]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative rounded-[1.25rem] border border-[#5797B1]/15 bg-[#5797B1]/[0.045] shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm',
        'transition-all duration-300 ease-out will-change-transform',
        hover && 'hover:border-[#5797B1]/28 hover:bg-[#5797B1]/[0.06]',
        glow && 'hover:shadow-xl',
        className
      )}
      style={glow ? { '--glow-color': glowColor } as React.CSSProperties : undefined}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-[1.25rem] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `0 0 40px ${glowColor}` }}
        />
      )}
      {children}
    </div>
  );
}
