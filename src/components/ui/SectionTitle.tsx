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
        'mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {/* Label pill */}
      <div className={cn('mb-4', align === 'center' ? 'flex justify-center' : '')}>
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
          <span className="h-1 w-1 rounded-full bg-indigo-400 animate-pulse" />
          {label}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-slate-400 mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
