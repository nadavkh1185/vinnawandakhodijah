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
  glowColor = 'rgba(34,242,255,0.18)',
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hover) return;
    const card = cardRef.current;
    if (!card) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarsePointer) return;

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
        'relative rounded-lg border border-[#22F2FF]/20 bg-[linear-gradient(135deg,rgba(255,244,215,0.095),rgba(7,20,43,0.86)_34%,rgba(4,8,18,0.92))] shadow-[0_18px_60px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,244,215,0.08)] backdrop-blur-sm',
        'before:pointer-events-none before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#22F2FF]/70 before:to-transparent',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-[linear-gradient(rgba(255,255,255,0.035)_50%,transparent_50%)] after:bg-[length:100%_6px] after:opacity-20',
        'transition-all duration-300 ease-out will-change-transform',
        hover && 'hover:-translate-y-1 hover:border-[#22F2FF]/38 hover:shadow-[0_22px_70px_rgba(0,0,0,0.34),0_0_28px_rgba(34,242,255,0.12)]',
        glow && 'hover:shadow-xl',
        className
      )}
      style={glow ? { '--glow-color': glowColor } as React.CSSProperties : undefined}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `0 0 40px ${glowColor}` }}
        />
      )}
      {children}
    </div>
  );
}
