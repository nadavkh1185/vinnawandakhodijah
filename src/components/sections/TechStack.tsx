'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { techStack } from '@/lib/data';

const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'DevOps'];

const categoryColors: Record<string, string> = {
  Frontend: 'from-indigo-500/20 to-blue-500/10',
  Backend: 'from-emerald-500/20 to-teal-500/10',
  'AI/ML': 'from-purple-500/20 to-pink-500/10',
  DevOps: 'from-orange-500/20 to-amber-500/10',
};

const categoryAccents: Record<string, string> = {
  Frontend: 'text-indigo-400',
  Backend: 'text-emerald-400',
  'AI/ML': 'text-purple-400',
  DevOps: 'text-orange-400',
};

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? techStack
    : techStack.filter((t) => t.category === activeCategory);

  return (
    <section id="stack" className="relative z-10 py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          label="Tech Stack"
          title="Tools of the trade."
          subtitle="Technologies I use to architect, build, and ship production software."
        />

        {/* Category filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`stack-filter-${cat.toLowerCase().replace('/', '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={[
                'rounded-xl px-5 py-2 text-sm font-medium transition-all duration-200',
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'border border-white/8 text-slate-400 hover:border-white/16 hover:text-white hover:bg-white/5',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {filtered.map((tech, i) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
            >
              <GlassCard
                hover
                glow
                glowColor="rgba(99,102,241,0.15)"
                className={`group cursor-default overflow-hidden p-4 text-center transition-all duration-300 hover:border-white/16`}
              >
                {/* Category gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${categoryColors[tech.category] || ''} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-3 text-2xl">{tech.icon}</div>

                  {/* Name */}
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {tech.name}
                  </div>

                  {/* Category */}
                  <div className={`mt-1 text-[10px] font-medium uppercase tracking-wider ${categoryAccents[tech.category] || 'text-slate-500'}`}>
                    {tech.category}
                  </div>

                  {/* Proficiency bar */}
                  <div className="mt-3 h-1 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.03, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
