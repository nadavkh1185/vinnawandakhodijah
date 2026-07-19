"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBuilding,
  IconCalendar,
  IconCircuitGround,
} from "@tabler/icons-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const getProjectImages = (project: Project) =>
  project.images?.length
    ? project.images
    : project.image?.length
      ? project.image
      : ["/dash-migrasi.png"];

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
      className="relative flex h-full min-h-[220px] overflow-hidden bg-[#07142B] p-3 sm:min-h-[260px] sm:p-4 lg:min-h-[320px] lg:p-7"
      style={{
        background: `radial-gradient(circle at 18% 18%, ${accentColor}55, transparent 34%), radial-gradient(circle at 88% 16%, rgba(255,63,135,0.24), transparent 30%), linear-gradient(135deg, #07142B, #081A38 56%, #030711)`,
      }}
    >
      <div className="absolute inset-0 opacity-40 noise" />
      <div className="relative flex w-full flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-md border border-[#22F2FF]/30 bg-[#07142B]/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#BFF7FF]">
            <IconCircuitGround size={14} />
            Showcase
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FFF4D7]">
            {year}
          </span>
        </div>

        <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3 lg:mt-8 lg:space-y-3">
          <div className="h-1.5 w-24 rounded-full bg-[#22F2FF]/45 shadow-[0_0_14px_rgba(34,242,255,0.28)]" />
          <div className="h-1.5 w-40 rounded-full bg-[#FF3F87]/35" />
          <div className="mt-4 sm:mt-5 lg:mt-7">
            <div
              className={cn(
                "relative mx-auto overflow-hidden border border-[#FFF4D7]/20 bg-[#050817] shadow-[0_24px_70px_rgba(0,0,0,0.34),0_0_38px_rgba(34,242,255,0.12)]",
                isMobileProject
                  ? "max-w-[250px] rounded-lg p-2"
                  : "rounded-lg p-2",
              )}
            >
              <div className="mb-2 flex items-center gap-2 px-1">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF375F] shadow-[0_0_10px_rgba(255,55,95,0.8)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFF4D7]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22F2FF] shadow-[0_0_10px_rgba(34,242,255,0.7)]" />
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.2em] text-[#BFF7FF]/75">
                  SYS-{String(year).slice(-2)}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-r from-[#FF3F87]/30 via-[#22F2FF]/30 to-[#FF3F87]/30 blur-xl" />

              <div
                className={cn(
                  "relative mx-auto overflow-hidden rounded-md border border-[#22F2FF]/18 bg-black",
                  isMobileProject
                    ? "flex h-[280px] w-[180px] items-center justify-center sm:h-[336px] sm:w-[208px] lg:h-[430px] lg:w-[238px]"
                    : "h-[220px] w-full sm:h-[240px] lg:aspect-[16/9]",
                )}
              >
                <Image
                  src={slides[currentImage]}
                  alt=""
                  fill
                  sizes={
                    isMobileProject
                      ? "(max-width: 768px) 240px, 280px"
                      : "(max-width: 768px) 100vw, 560px"
                  }
                  className="scale-110 object-cover opacity-35 blur-2xl"
                  aria-hidden="true"
                />

                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  onDragEnd={handleDragEnd}
                  className="relative h-full w-full overflow-hidden"
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
                          "transition-transform duration-700 group-hover:scale-[1.025] object-contain",
                          isMobileProject ? "p-3" : "",
                        )}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_50%,transparent_50%)] bg-[length:100%_5px] opacity-30" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030711]/42 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      currentImage === index
                        ? "w-6 bg-[#22F2FF] shadow-[0_0_12px_rgba(34,242,255,0.75)]"
                        : "w-2 bg-[#FFF4D7]/45 hover:bg-[#FFF4D7]/70",
                    )}
                    aria-label={`Show ${title} screenshot ${index + 1}`}
                    aria-current={currentImage === index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 lg:mt-8">
          <p className="text-sm font-medium text-[#BFF7FF]">Selected project</p>
        </div>
      </div>
    </div>
  );
}

function ProjectSurface({
  project,
  isReverse,
  isMobileProject,
}: {
  project: Project;
  isReverse: boolean;
  isMobileProject: boolean;
}) {
  const projectImages = useMemo(() => getProjectImages(project), [project]);

  return (
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

      <div className="flex min-h-full flex-col justify-between bg-[#FFF4D7] p-4 text-[#091427] sm:p-6 lg:p-8">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#24465A] sm:mb-5 lg:text-xs">
            <span className="inline-flex items-center gap-2">
              <IconBuilding size={14} />
              {project.client}
            </span>
            <span className="inline-flex items-center gap-2">
              <IconCalendar size={14} />
              {project.year}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-[#07142B] sm:text-2xl lg:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#203247] sm:mt-4 sm:text-base sm:leading-8">
            {project.description}
          </p>
        </div>

        <div className="mt-5 border-t border-[#07142B]/15 pt-4 sm:mt-6 sm:pt-5 lg:mt-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#24465A] sm:text-xs">
            Technology
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#07142B]/15 bg-[#07142B]/8 px-3 py-1.5 text-xs font-semibold text-[#07142B]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const currentProject = useMemo(
    () => projects[activeIndex] ?? projects[0],
    [activeIndex],
  );
  const nextProject = useMemo(() => {
    const nextIndex = (activeIndex + 1) % projects.length;
    return projects[nextIndex];
  }, [activeIndex]);
  const isMobileProject = useMemo(
    () =>
      currentProject.tags.some((tag) =>
        ["Flutter", "React Native"].includes(tag),
      ),
    [currentProject],
  );

  const isReverse = activeIndex % 2 === 1;
  const projectCountLabel = `Project ${activeIndex + 1} / ${projects.length}`;

  const showPrevious = useCallback(() => {
    if (isAnimating) return;
    setDragging(false);
    setDragOffset(0);
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, [isAnimating]);

  const showNext = useCallback(() => {
    if (isAnimating) return;
    setDragging(false);
    setDragOffset(0);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [isAnimating]);

  const goToProject = useCallback(
    (index: number) => {
      if (index === activeIndex || isAnimating) return;
      setDragging(false);
      setDragOffset(0);
      setActiveIndex(index);
    },
    [activeIndex, isAnimating],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showNext, showPrevious]);

  useEffect(() => {
    const neighbors = [activeIndex - 1, activeIndex + 1].filter(
      (index) => index >= 0 && index < projects.length,
    );

    neighbors.forEach((index) => {
      const project = projects[index];
      if (!project) return;

      getProjectImages(project).forEach((image) => {
        const preloaded = new window.Image();
        preloaded.src = image;
      });
    });
  }, [activeIndex]);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;

    const distance =
      (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(distance) > 64) {
      if (distance < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }

    touchStartX.current = null;
    setDragging(false);
    setDragOffset(0);
  };

  const transitionSettings = reduceMotion
    ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="projects"
      className="relative z-10 px-4 py-16 sm:px-6 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          label="Projects"
          title="Selected work across product surfaces"
        />

        <div className="space-y-4 sm:space-y-5">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="touch-pan-y"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="relative mx-auto max-w-5xl">
                <div className="relative flex-1 overflow-visible">
                  <div className="absolute inset-0 top-6 z-[1] rounded-lg opacity-40 scale-[0.96]">
                    <GlassCard
                      hover={false}
                      glow={false}
                      className="h-full overflow-hidden p-0"
                    >
                      <ProjectSurface
                        project={nextProject}
                        isReverse={false}
                        isMobileProject={nextProject.tags.some((tag) =>
                          ["Flutter", "React Native"].includes(tag),
                        )}
                      />
                    </GlassCard>
                  </div>

                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.16}
                    onDragStart={() => {
                      setDragging(true);
                      setIsAnimating(true);
                    }}
                    onDrag={(event, info) => {
                      setDragOffset(info.offset.x);
                    }}
                    onDragEnd={(event, info) => {
                      const threshold = 120;
                      if (info.offset.x < -threshold) {
                        showNext();
                      } else if (info.offset.x > threshold) {
                        showPrevious();
                      } else {
                        setDragging(false);
                        setDragOffset(0);
                        setIsAnimating(false);
                      }
                    }}
                    animate={
                      reduceMotion
                        ? {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            boxShadow: "0 18px 60px rgba(0, 0, 0, 0.28)",
                          }
                        : dragging
                          ? {
                              x: dragOffset,
                              opacity: 0.9,
                              scale: 0.985,
                              y: -6,
                              boxShadow: "0 24px 78px rgba(0, 0, 0, 0.36)",
                              rotate: dragOffset / 35,
                            }
                          : {
                              x: 0,
                              opacity: 1,
                              scale: 1,
                              y: 0,
                              boxShadow: "0 18px 60px rgba(0, 0, 0, 0.28)",
                              rotate: 0,
                            }
                    }
                    transition={transitionSettings}
                    className="relative z-[2]"
                  >
                    <GlassCard
                      hover={false}
                      glow={false}
                      className="overflow-hidden p-0"
                    >
                      <ProjectSurface
                        project={currentProject}
                        isReverse={isReverse}
                        isMobileProject={isMobileProject}
                      />
                    </GlassCard>
                  </motion.div>

                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="View previous project"
                    disabled={isAnimating}
                    className="absolute -left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#22F2FF]/25 bg-[#07142B]/85 text-[#FFF4D7] shadow-[0_0_24px_rgba(34,242,255,0.16)] backdrop-blur-md transition-all duration-300 hover:border-[#22F2FF]/45 hover:text-[#22F2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22F2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07142B] disabled:cursor-not-allowed disabled:opacity-70 sm:-left-4 sm:h-14 sm:w-14 lg:-left-8 lg:h-16 lg:w-16"
                  >
                    <IconArrowLeft size={18} className="sm:hidden" />
                    <IconArrowLeft size={20} className="hidden sm:block" />
                  </button>

                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="View next project"
                    disabled={isAnimating}
                    className="absolute -right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#22F2FF]/25 bg-[#07142B]/85 text-[#FFF4D7] shadow-[0_0_24px_rgba(34,242,255,0.16)] backdrop-blur-md transition-all duration-300 hover:border-[#22F2FF]/45 hover:text-[#22F2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22F2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07142B] disabled:cursor-not-allowed disabled:opacity-70 sm:-right-4 sm:h-14 sm:w-14 lg:-right-8 lg:h-16 lg:w-16"
                  >
                    <IconArrowRight size={18} className="sm:hidden" />
                    <IconArrowRight size={20} className="hidden sm:block" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#BFF7FF]">
              {projectCountLabel}
            </div>

            <div className="flex justify-center gap-2">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goToProject(index)}
                  aria-label={`Go to ${project.title}`}
                  aria-current={activeIndex === index}
                  className={cn(
                    "h-2.5 rounded-full border border-[#22F2FF]/25 transition-all duration-300",
                    activeIndex === index
                      ? "w-8 bg-[#22F2FF] shadow-[0_0_12px_rgba(34,242,255,0.75)]"
                      : "w-2.5 bg-[#FFF4D7]/35 hover:bg-[#FFF4D7]/60",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
