"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { profile } from "@/lib/data";

const socialLinks = [
  { icon: IconBrandGithub, href: profile.github, label: "GitHub" },
  { icon: IconBrandLinkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: IconMail, href: "#contact", label: "Contact form" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#5797B1]/15 bg-[#06131d]/70 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <a
            href="#"
            className="flex items-center gap-3 text-sm font-semibold text-white"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#5797B1]/20 bg-[#5797B1]/10 text-xs">
              {profile.initials}
            </span>
            {profile.name}
          </a>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#5797B1]/15 text-[#BAD3DE] transition-all hover:border-[#5797B1]/35 hover:bg-[#5797B1]/10 hover:text-white"
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
