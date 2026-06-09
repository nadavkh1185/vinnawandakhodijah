'use client';

import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';

const socialLinks = [
  { icon: IconBrandGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: IconBrandX, href: 'https://x.com', label: 'X (Twitter)' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-[#030712]/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <a href="#" className="text-lg font-bold text-white" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="text-indigo-400">{'{'}</span>
            dev
            <span className="text-indigo-400">{'}'}</span>
          </a>

          {/* Copyright */}
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} — Built with Next.js 15 & Framer Motion
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-400 transition-all hover:border-white/20 hover:text-white hover:bg-white/5"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
