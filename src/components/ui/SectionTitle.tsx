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
        <span className="inline-flex items-center gap-2 rounded-full border border-[#5797B1]/30 bg-[#5797B1]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#9FD1E5]">
          <span className="h-1 w-1 rounded-full bg-[#5797B1] animate-pulse" />
          {label}
        </span>
      </div>

      {/* Title */}
      <h2 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#BAD3DE] md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
