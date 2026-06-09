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
    'inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold',
    'transition-all duration-200 ease-out cursor-pointer select-none',
    variant === 'primary' && [
      'bg-indigo-600 text-white',
      'hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25',
      'active:scale-95',
    ],
    variant === 'ghost' && [
      'text-slate-300 hover:text-white hover:bg-white/5',
    ],
    variant === 'outline' && [
      'border border-white/10 text-slate-300 hover:border-white/20 hover:text-white hover:bg-white/5',
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
