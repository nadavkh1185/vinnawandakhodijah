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
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold',
    'transition-all duration-200 ease-out cursor-pointer select-none',
    variant === 'primary' && [
      'bg-[#5797B1] text-white',
      'shadow-lg shadow-[#2A82B7]/18 hover:bg-[#6EADC7] hover:shadow-xl hover:shadow-[#2A82B7]/28',
      'active:scale-95',
    ],
    variant === 'ghost' && [
      'text-[#BAD3DE] hover:text-white hover:bg-[#5797B1]/10',
    ],
    variant === 'outline' && [
      'border border-[#5797B1]/25 text-[#D7ECF5] hover:border-[#5797B1]/45 hover:text-white hover:bg-[#5797B1]/10',
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
