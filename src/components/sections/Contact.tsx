'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconMail, IconMapPin, IconSend, IconCheck } from '@tabler/icons-react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';

const socials = [
  { icon: IconBrandGithub, href: 'https://github.com', label: 'GitHub', handle: '@alexchen' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', handle: 'linkedin.com/in/alexchen' },
  { icon: IconBrandX, href: 'https://x.com', label: 'X (Twitter)', handle: '@alexchen_dev' },
  { icon: IconMail, href: 'mailto:alex@example.com', label: 'Email', handle: 'alex@example.com' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate network request
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="relative z-10 py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          label="Contact"
          title="Let's work together."
          subtitle="Have a project in mind? I'd love to hear about it. Send me a message."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Availability */}
            <GlassCard className="p-6" glow glowColor="rgba(16,185,129,0.1)">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Open to opportunities</p>
                  <p className="text-xs text-slate-500">Available for full-time & consulting roles</p>
                </div>
              </div>
            </GlassCard>

            {/* Location */}
            <div className="flex items-center gap-3 text-slate-400">
              <IconMapPin size={16} className="shrink-0 text-indigo-400" />
              <span className="text-sm">San Francisco, CA · Remote-friendly</span>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group flex items-center gap-4 rounded-xl border border-white/6 bg-white/[0.02] p-4 hover:border-white/12 hover:bg-white/[0.05] transition-all"
                  id={`contact-social-${s.label.toLowerCase().replace(/\s|\(|\)/g, '-')}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-slate-400 group-hover:text-white group-hover:bg-indigo-500/20 transition-all">
                    <s.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{s.handle}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="p-8" glow glowColor="rgba(99,102,241,0.1)">
              {status === 'success' ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <IconCheck size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message sent!</h3>
                  <p className="text-sm text-slate-400">I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                  {/* Name */}
                  <div className="group relative">
                    <label htmlFor="contact-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/6 focus:ring-1 focus:ring-indigo-500/30"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/6 focus:ring-1 focus:ring-indigo-500/30"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="w-full resize-none rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/6 focus:ring-1 focus:ring-indigo-500/30"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={status === 'loading'}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#030712]"
                  >
                    {status === 'loading' ? (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                    ) : (
                      <>
                        Send Message
                        <IconSend size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
