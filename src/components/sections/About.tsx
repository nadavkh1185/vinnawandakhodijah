"use client";

import { motion } from "framer-motion";
import { IconCertificate, IconSchool, IconSparkles } from "@tabler/icons-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { certifications, profile, stats } from "@/lib/data";

const principles = [
  "Fullstack Development",
  "Software Architecture",
  "API systems and CI/CD pipeline",
  "Security and penetration testing",
  "Enterprise systems",
];

export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          label="About"
          title="Practical engineering with product awareness"
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <GlassCard className="p-6 sm:p-7" glow>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-[#22F2FF]/22 bg-[#07142B]/70 text-[#22F2FF]">
                <IconSparkles size={21} />
              </div>
              <p className="text-base leading-8 text-[#FFF4D7] sm:text-lg">
                {profile.summary}
              </p>
              <p className="mt-4 text-base leading-8 text-[#D8CDA9]">
                {profile.extendedSummary}
              </p>
              <p className="mt-4 text-base leading-8 text-[#D8CDA9]">
                {profile.interests}
              </p>
            </GlassCard>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <GlassCard className="h-full min-h-30 p-5">
                    <p className="text-2xl font-semibold text-[#FFF4D7]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#22F2FF]">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#D8CDA9]">
                      {stat.desc}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <GlassCard className="p-6 sm:p-7">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#BFF7FF]">
                Engineering Foundation
              </p>
              <div className="grid gap-3">
                {principles.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-md border border-[#22F2FF]/14 bg-[#07142B]/58 p-4"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#FF3F87] shadow-[0_0_18px_rgba(255,63,135,0.75)]" />
                    <span className="text-sm font-medium text-[#FFF4D7]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="grid gap-4 md:grid-cols-1">
              <GlassCard
                className="h-full p-6"
                glow
                glowColor="rgba(34,242,255,0.12)"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-[#22F2FF]/20 bg-[#07142B]/70 text-[#22F2FF]">
                  <IconSchool size={19} />
                </div>
                <p className="text-sm font-semibold text-[#FFF4D7]">
                  Bachelor of Computer Science
                </p>
                <p className="mt-1 text-sm text-[#D8CDA9]">
                  Universitas Pamulang, 2021 - 2025
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#BFF7FF]">
                  GPA 3.67 / 4.00
                </p>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
