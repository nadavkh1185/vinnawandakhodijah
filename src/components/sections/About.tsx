"use client";

import { motion } from "framer-motion";
import { IconCertificate, IconSchool, IconSparkles } from "@tabler/icons-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { certifications, profile, stats } from "@/lib/data";

const principles = [
  "Scalable systems",
  "REST API design",
  "Relational and NoSQL databases",
  "Security testing",
  "Modern team workflows",
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
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5797B1]/15 text-[#D7ECF5]">
                <IconSparkles size={21} />
              </div>
              <p className="text-base leading-8 text-[#D7ECF5] sm:text-lg">
                {profile.summary}
              </p>
              <p className="mt-4 text-base leading-8 text-[#BAD3DE]">
                {profile.extendedSummary}
              </p>
              <p className="mt-4 text-base leading-8 text-[#BAD3DE]">
                {profile.interests}
              </p>
            </GlassCard>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <GlassCard className="h-full min-h-32 p-5">
                    <p className="text-3xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#D7ECF5]">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#7FA5B8]">
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
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#7FA5B8]">
                Engineering Foundation
              </p>
              <div className="grid gap-3">
                {principles.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-[#5797B1]/12 bg-white/[0.025] p-4"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#5797B1] shadow-[0_0_18px_rgba(87,151,177,0.75)]" />
                    <span className="text-sm font-medium text-[#D7ECF5]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="grid gap-4 md:grid-cols-2">
              <GlassCard
                className="h-full p-6"
                glow
                glowColor="rgba(87,151,177,0.12)"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#5797B1]/15 text-[#D7ECF5]">
                  <IconSchool size={19} />
                </div>
                <p className="text-sm font-semibold text-white">
                  Bachelor of Computer Science
                </p>
                <p className="mt-1 text-sm text-[#BAD3DE]">
                  Universitas Pamulang, 2021 - 2025
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FA5B8]">
                  GPA 3.67 / 4.00
                </p>
              </GlassCard>

              <GlassCard
                className="h-full p-6"
                glow
                glowColor="rgba(87,151,177,0.12)"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#5797B1]/15 text-[#D7ECF5]">
                  <IconCertificate size={19} />
                </div>
                <p className="text-sm font-semibold text-white">
                  Certifications
                </p>
                <div className="mt-3 space-y-2">
                  {certifications.map((cert) => (
                    <p
                      key={cert.title}
                      className="text-sm leading-6 text-[#BAD3DE]"
                    >
                      {cert.title}
                      {cert.validUntil
                        ? ` - Valid Until ${cert.validUntil}`
                        : ""}
                      {cert.result ? ` - ${cert.result}` : ""}
                    </p>
                  ))}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
