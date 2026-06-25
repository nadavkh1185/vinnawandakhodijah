'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  className,
  align = 'center',
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        'mb-12 md:mb-14',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {/* Label pill */}
      <div className={cn('mb-4', align === 'center' ? 'flex justify-center' : '')}>
        <span className="inline-flex items-center gap-2 rounded-md border border-[#22F2FF]/35 bg-[#07142B]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#BFF7FF] shadow-[0_0_20px_rgba(34,242,255,0.12)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF3F87] shadow-[0_0_14px_rgba(255,63,135,0.9)]" />
          {label}
        </span>
      </div>

      {/* Title */}
      <h2 className="mx-auto max-w-4xl text-3xl font-semibold text-[#FFF4D7] sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#BFF7FF] md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
