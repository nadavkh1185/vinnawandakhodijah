'use client';

import { motion } from 'framer-motion';
import { IconBrandGithub, IconExternalLink, IconStar } from '@tabler/icons-react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { projects } from '@/lib/data';

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative z-10 py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          label="Projects"
          title="Things I've built."
          subtitle="A selection of projects I'm proud of — from side experiments to production systems."
        />

        {/* Featured projects */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <GlassCard
                hover
                glow
                glowColor={`${project.accentColor}22`}
                className="group flex h-full flex-col overflow-hidden"
              >
                {/* Gradient header */}
                <div
                  className={`relative h-2 w-full bg-gradient-to-r ${project.gradient.replace('from-', 'from-').replace('/20', '').replace('/10', '')}`}
                  style={{ background: `linear-gradient(90deg, ${project.accentColor}60 0%, ${project.accentColor}20 50%, transparent 100%)` }}
                />

                <div className="flex flex-1 flex-col gap-4 p-6">
                  {/* Featured badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-yellow-400">
                      <IconStar size={10} className="fill-yellow-400" />
                      Featured
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:text-white hover:bg-white/8"
                      >
                        <IconBrandGithub size={16} />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:text-white hover:bg-white/8"
                      >
                        <IconExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-white/90">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="flex-1 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md px-2 py-1 text-[11px] font-medium text-slate-400 bg-white/4 border border-white/6"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {others.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard hover className="flex items-start gap-4 p-5 group">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-md px-2 py-0.5 text-[10px] font-medium text-slate-500 bg-white/4 border border-white/6">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                      <IconBrandGithub size={18} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                      <IconExternalLink size={18} />
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* More on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            id="projects-github-cta"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all"
          >
            <IconBrandGithub size={18} />
            View more on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
