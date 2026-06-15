"use client";

import { motion } from "framer-motion";
import {
  IconBuilding,
  IconCalendar,
  IconLayersSubtract,
} from "@tabler/icons-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

function ProjectVisual({
  accentColor,
  title,
  year,
  image,
}: {
  accentColor: string;
  title: string;
  year: string;
  image?: string[];
}) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!image?.length) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % image.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [image]);

  return (
    <div
      className="relative flex h-full min-h-72 overflow-hidden bg-[#103145]/75 p-6 sm:p-7"
      style={{
        background: `radial-gradient(circle at 18% 18%, ${accentColor}55, transparent 34%), linear-gradient(135deg, #103145, #18364A 56%, #06131d)`,
      }}
    >
      <div className="absolute inset-0 opacity-40 noise" />
      <div className="relative flex w-full flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Case Study
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D7ECF5]">
            {year}
          </span>
        </div>

        <div className="mt-14 space-y-3">
          <div className="h-2 w-24 rounded-full bg-white/25" />
          <div className="h-2 w-40 rounded-full bg-white/15" />
          <div className="mt-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20">
              <Image
                src={image?.[currentImage] ?? "/dash-migrasi.png"}
                alt={title}
                width={1200}
                height={700}
                className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#103145]/60 via-transparent to-transparent" />

              {/* dots indicator */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {image?.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      currentImage === index
                        ? "w-6 bg-white"
                        : "w-2 bg-white/40",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm font-medium text-[#D7ECF5]">Selected project</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = projects.filter((project) => project.featured);
  const secondary = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      className="relative z-10 px-6 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          label="Projects"
          title="Selected work across product surfaces"
        />

        <div className="space-y-6">
          {featured.map((project, index) => {
            const isReverse = index % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <GlassCard
                  hover
                  glow
                  glowColor={`${project.accentColor}22`}
                  className="group overflow-hidden p-0"
                >
                  <div
                    className={cn(
                      "grid lg:min-h-[380px] lg:grid-cols-[0.95fr_1.05fr]",
                      isReverse && "lg:grid-cols-[1.05fr_0.95fr]",
                    )}
                  >
                    <div className={cn(isReverse && "lg:order-2")}>
                      <ProjectVisual
                        accentColor={project.accentColor}
                        title={project.title}
                        year={project.year}
                        image={project.image}
                      />
                    </div>

                    <div className="flex min-h-full flex-col justify-between p-6 sm:p-8">
                      <div>
                        <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7FA5B8]">
                          <span className="inline-flex items-center gap-2">
                            <IconBuilding size={14} />
                            {project.client}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <IconCalendar size={14} />
                            {project.year}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                          {project.title}
                        </h3>
                        <p className="mt-5 text-base leading-8 text-[#BAD3DE]">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-8 border-t border-[#5797B1]/15 pt-5">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FA5B8]">
                          Technology
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[#5797B1]/18 bg-[#5797B1]/10 px-3 py-1.5 text-xs font-medium text-[#D7ECF5]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {secondary.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <GlassCard
                hover
                className="group flex h-full min-h-[360px] flex-col p-6"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#5797B1]/15 bg-[#5797B1]/10 text-[#D7ECF5]">
                    <IconLayersSubtract size={20} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7FA5B8]">
                    {project.year}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7FA5B8]">
                    {project.client}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white transition-colors group-hover:text-[#D7ECF5]">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#BAD3DE]">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-[#5797B1]/12 pt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#5797B1]/15 bg-white/[0.03] px-3 py-1 text-xs text-[#BAD3DE]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
