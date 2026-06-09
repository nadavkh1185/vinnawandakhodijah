'use client';

import { motion } from 'framer-motion';
import { IconArrowDown, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import MagneticButton from '@/components/ui/MagneticButton';

const words = ['Fullstack', 'Engineer.'];
const easing = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easing },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: easing },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      {/* Subtle top noise grain */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] opacity-40" />

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for new opportunities
        </span>
      </motion.div>

      {/* Main heading */}
      <div className="mb-6">
        <p className="mb-3 text-base font-medium tracking-widest text-slate-500 uppercase">
          Hi, I&apos;m Vinawanda Khodijah —
        </p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              {i === 0 ? (
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Subtitle */}
      <motion.p
        custom={0.8}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-xl text-lg text-slate-400 md:text-xl"
      >
        I build <span className="text-white font-medium">AI-powered products</span> and
        scalable web applications — with obsessive attention to performance, UX, and code quality.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        custom={1.1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton
          href="#projects"
          variant="primary"
          id="hero-cta-projects"
        >
          View Projects
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </MagneticButton>
        <MagneticButton href="https://github.com" variant="outline" id="hero-cta-github">
          <IconBrandGithub size={16} />
          GitHub
        </MagneticButton>
        <MagneticButton href="https://linkedin.com" variant="ghost" id="hero-cta-linkedin">
          <IconBrandLinkedin size={16} />
          LinkedIn
        </MagneticButton>
      </motion.div>

      {/* Stats row */}
      <motion.div
        custom={1.4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
      >
        {[
          { label: 'Years exp.', value: '6+' },
          { label: 'Projects shipped', value: '50+' },
          { label: 'GitHub stars', value: '12k' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-white">{stat.value}</span>
            <span className="text-xs text-slate-500 tracking-wide uppercase">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors"
        aria-label="Scroll to about"
        id="hero-scroll-indicator"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <IconArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
