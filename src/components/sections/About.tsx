'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { stats } from '@/lib/data';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const easing = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easing } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easing } },
};

export default function About() {
  return (
    <section id="about" className="relative z-10 py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          label="About Me"
          title="Engineering with purpose."
          subtitle="I blend deep technical expertise with product thinking to ship things that matter."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left — text */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-slate-400">
              I&apos;m a fullstack engineer with{' '}
              <span className="text-white font-medium">6+ years</span> of experience building
              production-grade web applications. I specialize in the intersection of
              <span className="text-indigo-400 font-medium"> AI and product engineering</span> —
              creating intelligent systems that feel magical to use.
            </p>
            <p className="text-lg leading-relaxed text-slate-400">
              Previously at{' '}
              <span className="text-white font-medium">Vercel, Linear, and Stripe</span>. I care
              deeply about performance, accessibility, and developer experience. I believe the best
              code is code you don&apos;t have to write.
            </p>
            <p className="text-lg leading-relaxed text-slate-400">
              When I&apos;m not shipping products, I contribute to open source, write about software
              architecture, and mentor engineers on building AI-native applications.
            </p>

            {/* Philosophy tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Systems thinking', 'AI-first', 'DX obsessed', 'Performance mindset', 'Clean code'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — stats cards */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: 'Years Experience', value: 6, suffix: '+', desc: 'Production engineering' },
              { label: 'Projects Shipped', value: 50, suffix: '+', desc: 'Across 3 continents' },
              { label: 'Open Source Stars', value: 12, suffix: 'k', desc: 'GitHub contributions' },
              { label: 'Engineers Mentored', value: 8, suffix: '', desc: 'Senior & mid-level' },
            ].map((stat, i) => (
              <GlassCard
                key={stat.label}
                className="flex flex-col gap-2 p-6"
                glow
                glowColor="rgba(99,102,241,0.12)"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                >
                  <div className="text-4xl font-extrabold text-white">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-200">{stat.label}</div>
                  <div className="text-xs text-slate-500">{stat.desc}</div>
                </motion.div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
