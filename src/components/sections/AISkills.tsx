"use client";

import { motion } from "framer-motion";
import {
  IconBrain,
  IconCode,
  IconRoute,
  IconSparkles,
} from "@tabler/icons-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { focusAreas } from "@/lib/data";

const icons = [IconRoute, IconSparkles, IconCode, IconBrain];

export default function AISkills() {
  return (
    <section id="ai" className="relative z-10 px-6 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          label="Focus"
          title="Where the engineering energy is going"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area, i) => {
            const Icon = icons[i] ?? IconCode;

            return (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassCard
                  hover
                  glow
                  className="h-full min-h-64 p-6"
                  glowColor="rgba(87,151,177,0.14)"
                >
                  <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-[#5797B1]/18 bg-[#5797B1]/12 text-[#D7ECF5]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {area.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#BAD3DE]">
                    {area.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
