"use client";

import { motion } from "framer-motion";
import {
  IconArrowDown,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import MagneticButton from "@/components/ui/MagneticButton";
import PcbTraceBackground from "@/components/ui/PcbTraceBackground";
import { profile } from "@/lib/data";

const easing = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: easing },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center overflow-hidden bg-[#07142B] px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <PcbTraceBackground />

      <div className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-7xl flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center text-center">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 rounded-md border border-[#22F2FF]/30 bg-[#07142B]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#BFF7FF] shadow-[0_0_24px_rgba(34,242,255,0.14)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3F87] shadow-[0_0_18px_rgba(255,63,135,0.9)]" />
            {profile.location}
          </motion.div>

          <motion.p
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#BFF7FF]"
          >
            {profile.displayName}
          </motion.p>

          <motion.h1
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl font-semibold text-white sm:text-6xl lg:text-7xl"
          >
            <span className="gradient-text">Fullstack Engineer</span>
          </motion.h1>

          <motion.p
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-5xl text-center text-base leading-8 text-[#FFF4D7] sm:text-lg"
          >
            {profile.mainsummary}
          </motion.p>

          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center"
          >
            <MagneticButton
              href="#projects"
              variant="primary"
              id="hero-cta-projects"
            >
              View Projects
              <IconArrowDown size={16} />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              variant="outline"
              id="hero-cta-email"
            >
              <IconMail size={16} />
              Contact Me
            </MagneticButton>
            <MagneticButton
              href={profile.github}
              variant="ghost"
              id="hero-cta-github"
            >
              <IconBrandGithub size={16} />
              GitHub
            </MagneticButton>
            <MagneticButton
              href={profile.linkedin}
              variant="ghost"
              id="hero-cta-linkedin"
            >
              <IconBrandLinkedin size={16} />
              LinkedIn
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          custom={0.45}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        ></motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#BFF7FF] transition-colors hover:text-[#FFF4D7] md:flex"
        aria-label="Scroll to about"
        id="hero-scroll-indicator"
      >
        <span className="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <IconArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
