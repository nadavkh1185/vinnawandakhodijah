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
          <div className="absolute bottom-0 left-5 top-0 w-px bg-[#5797B1]/12 md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-[#D7ECF5] via-[#5797B1] to-[#2A82B7]"
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
                      "absolute top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#5797B1]/25 bg-[#06131d] text-[#D7ECF5] shadow-[0_0_28px_rgba(87,151,177,0.18)]",
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

                  <div className="group relative ml-14 flex-1 overflow-hidden rounded-[1.25rem] border border-[#5797B1]/15 bg-[#5797B1]/[0.045] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#5797B1]/30 hover:bg-[#5797B1]/[0.07] md:ml-0">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5797B1]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div
                      className={cn(
                        "flex flex-wrap items-center gap-2",
                        isLeft ? "md:justify-end" : "",
                      )}
                    >
                      <p className="inline-flex rounded-full border border-[#5797B1]/15 bg-white/[0.035] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9FD1E5]">
                        {exp.period}
                      </p>
                      <span className="inline-flex rounded-full border border-[#5797B1]/10 bg-[#103145]/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7FA5B8]">
                        {isWork ? "Work" : "Education"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[#9FD1E5]">
                      {exp.company}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#BAD3DE]">
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
                          className="rounded-full border border-[#5797B1]/15 bg-white/[0.035] px-3 py-1 text-[11px] font-medium text-[#D7ECF5]"
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
