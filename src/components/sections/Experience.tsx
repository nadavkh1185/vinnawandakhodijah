"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IconBriefcase, IconSchool } from "@tabler/icons-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative z-10 px-6 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          label="Experience"
          title="Work, teaching, and education"
          subtitle="A timeline of the roles and learning milestones provided in the professional profile."
        />

        <div ref={containerRef} className="relative mx-auto max-w-5xl">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-[#22F2FF]/14 md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-[#FFF4D7] via-[#22F2FF] to-[#FF3F87] shadow-[0_0_18px_rgba(34,242,255,0.35)]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8 md:space-y-10">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const isWork = exp.type === "work";

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.55 }}
                  className={cn(
                    "relative flex items-start gap-6",
                    "md:w-[calc(50%-2rem)]",
                    isLeft
                      ? "md:mr-auto md:flex-row-reverse md:pr-8 md:text-right"
                      : "md:ml-auto md:pl-8",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-4 flex h-10 w-10 items-center justify-center rounded-md border border-[#22F2FF]/30 bg-[#07142B] text-[#22F2FF] shadow-[0_0_28px_rgba(34,242,255,0.18)]",
                      "left-0 md:left-auto",
                      isLeft ? "md:right-[-52px]" : "md:left-[-52px]",
                    )}
                  >
                    {isWork ? (
                      <IconBriefcase size={17} />
                    ) : (
                      <IconSchool size={17} />
                    )}
                  </div>

                  <div className="group relative ml-14 flex-1 overflow-hidden rounded-lg border border-[#22F2FF]/18 bg-[linear-gradient(135deg,rgba(255,244,215,0.08),rgba(7,20,43,0.9))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#22F2FF]/34 md:ml-0">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22F2FF]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div
                      className={cn(
                        "flex flex-wrap items-center gap-2",
                        isLeft ? "md:justify-end" : "",
                      )}
                    >
                      <p className="inline-flex rounded-md border border-[#22F2FF]/20 bg-[#07142B]/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#BFF7FF]">
                        {exp.period}
                      </p>
                      <span className="inline-flex rounded-md border border-[#FF3F87]/18 bg-[#FF3F87]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFF4D7]">
                        {isWork ? "Work" : "Education"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-[#FFF4D7]">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[#22F2FF]">
                      {exp.company}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#D8CDA9]">
                      {exp.description}
                    </p>

                    <div
                      className={cn(
                        "mt-5 flex flex-wrap gap-2",
                        isLeft ? "md:justify-end" : "",
                      )}
                    >
                      {exp.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-md border border-[#FFF4D7]/15 bg-[#FFF4D7]/8 px-3 py-1 text-[11px] font-medium text-[#FFF4D7]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
