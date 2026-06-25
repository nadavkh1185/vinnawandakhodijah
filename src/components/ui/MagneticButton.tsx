'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'ghost' | 'outline';
  id?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = 'primary',
  id,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarsePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = () => {
      btn.style.transform = 'translate(0px, 0px)';
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const baseClasses = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em]',
    'transition-all duration-200 ease-out cursor-pointer select-none',
    variant === 'primary' && [
      'border border-[#22F2FF]/50 bg-[#22F2FF] text-[#07142B]',
      'shadow-[0_0_24px_rgba(34,242,255,0.28)] hover:bg-[#FFF4D7] hover:shadow-[0_0_30px_rgba(34,242,255,0.42)]',
      'active:scale-95',
    ],
    variant === 'ghost' && [
      'text-[#BFF7FF] hover:bg-[#FF3F87]/12 hover:text-[#FFF4D7]',
    ],
    variant === 'outline' && [
      'border border-[#FF3F87]/45 text-[#FFF4D7] hover:border-[#22F2FF]/55 hover:bg-[#22F2FF]/10 hover:text-white',
    ],
    className
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        id={id}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      id={id}
    >
      {children}
    </button>
  );
}
