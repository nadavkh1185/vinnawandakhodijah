"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-[#22F2FF]/18 bg-[#07142B]/86 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "bg-transparent",
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="group relative flex items-center gap-3 text-sm font-semibold text-[#FFF4D7]"
            id="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#22F2FF]/35 bg-[#07142B]/80 text-xs shadow-[0_0_24px_rgba(34,242,255,0.18)] transition-all duration-300 group-hover:border-[#FF3F87]/50 group-hover:shadow-[0_0_32px_rgba(255,63,135,0.22)] sm:h-11 sm:w-11">
              {!avatarError ? (
                <Image
                  src="/my_photo.png"
                  alt={`${profile.name} profile photo`}
                  fill
                  sizes="(max-width: 640px) 36px, 44px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => setAvatarError(true)}
                  priority
                />
              ) : (
                <span className="font-semibold text-[#BFF7FF]">
                  {profile.initials}
                </span>
              )}
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-semibold leading-5 text-[#FFF4D7]">
                {profile.name}
              </span>
              <span className="block truncate text-[11px] font-medium leading-4 text-[#BFF7FF]">
                {profile.title}
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex" role="list">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                    id={`nav-${id}`}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative rounded-md px-3.5 py-2 text-sm font-semibold transition-colors duration-200",
                      isActive
                        ? "text-[#FFF4D7]"
                        : "text-[#BFF7FF] hover:text-[#FFF4D7]",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-md border border-[#22F2FF]/25 bg-[#22F2FF]/12"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.4,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            id="nav-cta"
            className="hidden min-h-10 items-center rounded-md border border-[#22F2FF]/45 bg-[#22F2FF] px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#07142B] shadow-[0_0_22px_rgba(34,242,255,0.22)] transition-colors hover:bg-[#FFF4D7] md:inline-flex"
          >
            Contact
          </a>

          <button
            id="nav-mobile-toggle"
            className="flex items-center justify-center rounded-md p-2 text-[#BFF7FF] transition-colors hover:bg-[#22F2FF]/10 hover:text-[#FFF4D7] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-30 bg-[#030711]/65 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-4 top-[78px] z-40 overflow-hidden rounded-lg border border-[#22F2FF]/22 bg-[#07142B]/96 shadow-2xl shadow-black/30 backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col gap-1 p-3" role="list">
                {navLinks.map((link) => {
                  const id = link.href.slice(1);
                  const isActive = activeSection === id;

                  return (
                    <li key={link.href}>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm font-semibold transition-colors",
                          isActive
                            ? "bg-[#22F2FF]/12 text-[#FFF4D7]"
                            : "text-[#BFF7FF] hover:bg-white/5 hover:text-[#FFF4D7]",
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FF3F87] shadow-[0_0_16px_rgba(255,63,135,0.9)]" />
                        )}
                      </button>
                    </li>
                  );
                })}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleNavClick("#contact")}
                    className="block w-full rounded-md bg-[#22F2FF] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.08em] text-[#07142B] transition-colors hover:bg-[#FFF4D7]"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
