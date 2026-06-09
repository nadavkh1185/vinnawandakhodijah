'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IconBriefcase, IconSchool } from '@tabler/icons-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { experiences } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative z-10 py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          label="Experience"
          title="The journey so far."
          subtitle="Companies, roles, and milestones that shaped how I think and build."
        />

        <div ref={containerRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/6 md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={cn(
                    'relative flex items-start gap-6',
                    'md:w-[calc(50%-2rem)]',
                    isLeft ? 'md:ml-0 md:mr-auto md:pr-8 md:text-right md:flex-row-reverse' : 'md:ml-auto md:pl-8'
                  )}
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      'absolute top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-indigo-500 bg-[#030712]',
                      'left-[13px] md:left-auto',
                      isLeft ? 'md:right-[-42px]' : 'md:left-[-42px]'
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  </div>

                  {/* Card */}
                  <div className={cn(
                    'ml-12 flex-1 rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm',
                    'hover:border-white/12 hover:bg-white/[0.05] transition-all duration-300',
                    'md:ml-0'
                  )}>
                    {/* Header */}
                    <div className={cn('flex items-start gap-3 mb-3', isLeft ? 'md:flex-row-reverse' : '')}>
                      <div className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                        exp.type === 'work' ? 'bg-indigo-500/15 text-indigo-400' : 'bg-emerald-500/15 text-emerald-400'
                      )}>
                        {exp.type === 'work' ? <IconBriefcase size={16} /> : <IconSchool size={16} />}
                      </div>
                      <div className={isLeft ? 'md:text-right' : ''}>
                        <h3 className="font-bold text-white text-base">{exp.role}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-semibold text-indigo-400">{exp.company}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-xs text-slate-500">{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={cn('text-sm leading-relaxed text-slate-400 mb-4', isLeft ? 'md:text-right' : '')}>
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <div className={cn('flex flex-wrap gap-2', isLeft ? 'md:justify-end' : '')}>
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-md border border-white/6 bg-white/4 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
