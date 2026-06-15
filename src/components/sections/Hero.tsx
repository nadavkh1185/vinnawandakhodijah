"use client";

import { motion } from "framer-motion";
import {
  IconArrowDown,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile, stats } from "@/lib/data";

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
      className="relative z-10 flex min-h-screen items-center overflow-hidden bg-[#06131d] px-6 py-24 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute -left-1/4 top-[-18%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle_at_center,rgba(42,130,183,0.26),rgba(87,151,177,0.11)_38%,transparent_68%)] blur-3xl will-change-transform"
          animate={{
            x: [0, 48, 14, 0],
            y: [0, 32, -18, 0],
            scale: [1, 1.06, 0.98, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-[-18%] top-[8%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(87,151,177,0.20),rgba(16,49,69,0.20)_42%,transparent_70%)] blur-3xl will-change-transform"
          animate={{
            x: [0, -42, -10, 0],
            y: [0, 36, 10, 0],
            scale: [1, 0.96, 1.05, 1],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[-30%] left-[22%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,49,69,0.72),rgba(42,130,183,0.12)_44%,transparent_72%)] blur-3xl will-change-transform"
          animate={{
            x: [0, 28, -26, 0],
            y: [0, -24, 18, 0],
            scale: [1, 1.08, 1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute inset-x-[-20%] top-[-46%] h-[70%] rotate-[-7deg] bg-[radial-gradient(ellipse_at_center,rgba(215,236,245,0.16),rgba(87,151,177,0.07)_34%,transparent_68%)] blur-2xl will-change-transform"
          animate={{ opacity: [0.5, 0.78, 0.56], x: [-20, 28, -20] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-[-12%] top-[18%] h-[42rem] w-[34rem] rotate-12 bg-[linear-gradient(90deg,transparent,rgba(87,151,177,0.10),transparent)] blur-2xl will-change-transform"
          animate={{ x: [-18, 30, -18], opacity: [0.28, 0.52, 0.28] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(159,209,229,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(159,209,229,0.12) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(circle at 50% 42%, black 0%, rgba(0,0,0,0.78) 34%, transparent 78%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_48%_38%,rgba(245,251,255,0.10),transparent_28%),linear-gradient(180deg,rgba(6,19,29,0.08),rgba(6,19,29,0.82)_88%)]"
        />
        <div className="absolute inset-0 noise opacity-70" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5797B1]/25 bg-[#5797B1]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#D7ECF5]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#5797B1] shadow-[0_0_18px_rgba(87,151,177,0.9)]" />
            {profile.location}
          </motion.div>

          <motion.p
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#7FA5B8]"
          >
            {profile.displayName}
          </motion.p>

          <motion.h1
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl"
          >
            <span className="gradient-text">Fullstack Engineer</span>
          </motion.h1>

          <motion.p
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#BAD3DE] sm:text-lg lg:mx-0"
          >
            {profile.summary} {profile.extendedSummary}
          </motion.p>

          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
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
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#2A82B7]/24 via-transparent to-[#103145]/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[#5797B1]/20 bg-[#103145]/45 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
            <div className="mb-6 flex items-center justify-between border-b border-[#5797B1]/15 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#7FA5B8]">
                  Portfolio
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {profile.title}
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#5797B1]/20 bg-white/5 text-lg font-semibold text-white">
                {profile.initials}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.1rem] border border-[#5797B1]/15 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7FA5B8]">
                  Current Focus
                </p>
                <p className="mt-3 text-sm leading-7 text-[#D7ECF5]">
                  {profile.interests}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-h-24 rounded-[1.1rem] border border-[#5797B1]/15 bg-white/[0.035] p-4"
                  >
                    <p className="text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#BAD3DE]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 rounded-[1.1rem] border border-[#5797B1]/15 bg-white/[0.035] p-4 text-sm text-[#BAD3DE]">
                <IconMapPin size={17} className="text-[#9FD1E5]" />
                Based in {profile.location}
              </div>
            </div>
          </div>
        </motion.div>
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
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#7FA5B8] transition-colors hover:text-white md:flex"
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
