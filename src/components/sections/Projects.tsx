"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import { useEffect, useMemo, useState } from "react";

function ProjectVisual({
  accentColor,
  title,
  year,
  images,
  isMobileProject,
}: {
  accentColor: string;
  title: string;
  year: string;
  images?: string[];
  isMobileProject: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [currentImage, setCurrentImage] = useState(0);
  const slides = useMemo(
    () => (images?.length ? images : ["/dash-migrasi.png"]),
    [images],
  );

  useEffect(() => {
    if (reduceMotion || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [reduceMotion, slides.length]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) => {
    if (Math.abs(info.offset.x) < 48 || slides.length <= 1) return;
    setCurrentImage((prev) =>
      info.offset.x < 0
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length,
    );
  };

  return (
    <div
      className="relative flex h-full min-h-[320px] overflow-hidden bg-[#103145]/75 p-4 sm:min-h-[360px] sm:p-6 lg:p-7"
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

        <div className="mt-8 space-y-3 sm:mt-10">
          <div className="h-2 w-24 rounded-full bg-white/25" />
          <div className="h-2 w-40 rounded-full bg-white/15" />
          <div className="mt-7 sm:mt-8">
            <div
              className={cn(
                "relative mx-auto overflow-hidden border border-white/10 bg-black/25 shadow-2xl shadow-black/20",
                isMobileProject
                  ? "max-w-[230px] rounded-[2rem] p-2"
                  : "rounded-2xl sm:rounded-3xl",
              )}
            >
              {isMobileProject && (
                <Image
                  src={slides[currentImage]}
                  alt=""
                  fill
                  sizes="260px"
                  className="scale-125 object-cover opacity-28 blur-2xl"
                  aria-hidden="true"
                />
              )}

              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={handleDragEnd}
                className={cn(
                  "relative overflow-hidden",
                  isMobileProject
                    ? "aspect-[9/19] rounded-[1.5rem] bg-[#06131d]"
                    : "aspect-[16/9]",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={slides[currentImage]}
                    initial={reduceMotion ? false : { opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -32 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[currentImage]}
                      alt={`${title} screenshot ${currentImage + 1}`}
                      fill
                      sizes={
                        isMobileProject
                          ? "(max-width: 768px) 220px, 260px"
                          : "(max-width: 768px) 100vw, 560px"
                      }
                      className={cn(
                        "transition-transform duration-700 group-hover:scale-[1.025]",
                        isMobileProject ? "object-contain" : "object-cover",
                      )}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#103145]/55 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      currentImage === index
                        ? "w-6 bg-white"
                        : "w-2 bg-white/45 hover:bg-white/70",
                    )}
                    aria-label={`Show ${title} screenshot ${index + 1}`}
                    aria-current={currentImage === index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <p className="text-sm font-medium text-[#D7ECF5]">Selected project</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
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
            const projectImages =
              "images" in project && Array.isArray(project.images)
                ? project.images
                : "image" in project && Array.isArray(project.image)
                  ? project.image
                  : undefined;
            const isMobileProject = project.tags.some((tag) =>
              ["Flutter", "React Native"].includes(tag),
            );

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
                        images={projectImages}
                        isMobileProject={isMobileProject}
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
