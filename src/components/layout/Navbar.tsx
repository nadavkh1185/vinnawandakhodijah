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
            ? "border-b border-[#5797B1]/15 bg-[#06131d]/82 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "bg-transparent",
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="group relative flex items-center gap-3 text-sm font-semibold tracking-tight text-white"
            id="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#5797B1]/35 bg-[#5797B1]/10 text-xs shadow-[0_0_24px_rgba(87,151,177,0.22)] transition-all duration-300 group-hover:border-[#9FD1E5]/50 group-hover:shadow-[0_0_32px_rgba(87,151,177,0.34)] sm:h-11 sm:w-11">
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
                <span className="font-semibold text-[#D7ECF5]">
                  {profile.initials}
                </span>
              )}
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-semibold leading-5 text-white">
                {profile.name}
              </span>
              <span className="block truncate text-[11px] font-medium leading-4 text-[#7FA5B8]">
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
                      "relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-white"
                        : "text-[#BAD3DE] hover:text-white",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-xl bg-[#5797B1]/14"
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
            className="hidden min-h-10 items-center rounded-xl bg-[#5797B1] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2A82B7]/18 transition-colors hover:bg-[#6EADC7] md:inline-flex"
          >
            Contact
          </a>

          <button
            id="nav-mobile-toggle"
            className="flex items-center justify-center rounded-lg p-2 text-[#BAD3DE] transition-colors hover:bg-white/5 hover:text-white lg:hidden"
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
              className="fixed inset-0 z-30 bg-[#06131d]/55 backdrop-blur-sm lg:hidden"
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
              className="fixed inset-x-4 top-[78px] z-40 overflow-hidden rounded-2xl border border-[#5797B1]/18 bg-[#06131d]/94 shadow-2xl shadow-black/30 backdrop-blur-xl lg:hidden"
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
                          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[#5797B1]/12 text-white"
                            : "text-[#BAD3DE] hover:bg-white/5 hover:text-white",
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#5797B1] shadow-[0_0_16px_rgba(87,151,177,0.9)]" />
                        )}
                      </button>
                    </li>
                  );
                })}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleNavClick("#contact")}
                    className="block w-full rounded-xl bg-[#5797B1] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#6EADC7]"
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
