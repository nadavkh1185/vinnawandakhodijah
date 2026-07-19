"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconCalendar,
  IconCertificate,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconPhoto,
  IconShieldCheck,
  IconX,
} from "@tabler/icons-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { certifications } from "@/lib/data";

type Certificate = (typeof certifications)[number];

function getMeta(certificate: Certificate) {
  const issued = certificate.year || "Issue year not specified";
  const validity = certificate.validUntil
    ? `Valid until ${certificate.validUntil}`
    : "No expiry provided";

  return { issued, validity };
}

export default function Certifications() {
  const [preview, setPreview] = useState<Certificate | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    setHasInteracted(true);
    const track = trackRef.current;
    if (!track) return;

    let closestIndex = 0;
    let closestDistance = Infinity;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(
        card.offsetLeft - track.offsetLeft - track.scrollLeft,
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const goPrev = () => {
    setHasInteracted(true);
    scrollToIndex(Math.max(activeIndex - 1, 0));
  };

  const goNext = () => {
    setHasInteracted(true);
    scrollToIndex(Math.min(activeIndex + 1, certifications.length - 1));
  };

  return (
    <section
      id="certifications"
      className="relative z-10 px-6 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          label="Certifications"
          title="Verified learning and professional standards"
        />

        <div className="relative mt-4">
          {/* Swipe hint */}
          <AnimatePresence>
            {!hasInteracted && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#BFF7FF] sm:justify-end"
              >
                <motion.span
                  animate={{ x: [0, -4, 0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="flex items-center gap-1"
                >
                  <IconChevronLeft size={14} />
                  Swipe for more
                  <IconChevronRight size={14} />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edge fades to signal scrollability */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#030711] to-transparent sm:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#030711] to-transparent sm:w-14" />

          {/* Desktop/tablet arrow controls */}
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Sertifikat sebelumnya"
            className="absolute left-1 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#22F2FF]/25 bg-[#07142B]/85 p-2 text-[#BFF7FF] backdrop-blur-md transition-opacity hover:text-[#FFF4D7] disabled:opacity-30 sm:flex"
          >
            <IconChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === certifications.length - 1}
            aria-label="Sertifikat berikutnya"
            className="absolute right-1 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#22F2FF]/25 bg-[#07142B]/85 p-2 text-[#BFF7FF] backdrop-blur-md transition-opacity hover:text-[#FFF4D7] disabled:opacity-30 sm:flex"
          >
            <IconChevronRight size={20} />
          </button>

          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar scroll-smooth"
          >
            {certifications.map((certificate, index) => {
              const meta = getMeta(certificate);
              const hasImage = Boolean(certificate.image);

              return (
                <motion.div
                  key={certificate.title}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="w-[300px] shrink-0 snap-center sm:w-[340px]"
                >
                  <GlassCard
                    hover
                    glow
                    glowColor="rgba(87,151,177,0.16)"
                    className="group h-full overflow-hidden p-0"
                  >
                    <div className="relative flex h-full flex-col">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22F2FF]/70 to-transparent" />
                      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#FF3F87]/16 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />

                      <button
                        type="button"
                        disabled={!hasImage}
                        onClick={() => hasImage && setPreview(certificate)}
                        className="group/preview relative aspect-[4/3] w-full overflow-hidden bg-[#07142B]/72 text-left disabled:cursor-not-allowed"
                        aria-label={`Preview ${certificate.title}`}
                      >
                        {hasImage ? (
                          <Image
                            src={certificate.image}
                            alt={`${certificate.title} certificate preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
                            className="object-cover transition-transform duration-500 group-hover/preview:scale-105"
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-md border border-[#22F2FF]/22 bg-[#07142B]/70 text-[#22F2FF]">
                              <IconPhoto size={24} />
                            </div>
                            <p className="text-sm font-semibold text-[#FFF4D7]">
                              Certificate image pending
                            </p>
                          </div>
                        )}
                        {hasImage && (
                          <span className="absolute inset-x-4 bottom-4 inline-flex items-center justify-center gap-2 rounded-md border border-[#22F2FF]/25 bg-[#07142B]/82 px-4 py-2 text-xs font-semibold text-[#FFF4D7] opacity-0 backdrop-blur-md transition-opacity group-hover/preview:opacity-100">
                            <IconEye size={15} />
                            Preview Image
                          </span>
                        )}
                      </button>

                      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                        <div className="mb-5 flex items-start justify-between gap-5">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#22F2FF]/24 bg-[#07142B]/72 text-[#22F2FF] shadow-[0_0_30px_rgba(34,242,255,0.12)]">
                            <IconCertificate size={25} />
                          </div>
                          <span className="rounded-md border border-[#FF3F87]/24 bg-[#FF3F87]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#FFF4D7]">
                            Credential
                          </span>
                        </div>

                        <div className="flex-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#BFF7FF]">
                            {certificate.issuer}
                          </p>
                          <h3 className="mt-3 text-xl font-semibold text-[#FFF4D7] sm:text-2xl">
                            {certificate.title}
                          </h3>
                          <p className="mt-2 text-sm font-semibold text-[#22F2FF]">
                            {certificate.credential}
                          </p>
                          {certificate.result && (
                            <p className="mt-2 inline-flex rounded-md border border-[#22F2FF]/20 bg-[#22F2FF]/10 px-3 py-1 text-xs font-semibold text-[#FFF4D7]">
                              {certificate.result}
                            </p>
                          )}
                          <p className="mt-5 line-clamp-4 text-sm leading-7 text-[#D8CDA9]">
                            {certificate.description}
                          </p>
                        </div>

                        <div className="mt-6 grid gap-3 border-t border-[#22F2FF]/14 pt-5">
                          <div className="flex items-center gap-3 rounded-md border border-[#22F2FF]/14 bg-[#07142B]/60 p-4">
                            <IconCalendar
                              size={18}
                              className="text-[#22F2FF]"
                            />
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#BFF7FF]">
                                Issued
                              </p>
                              <p className="mt-1 text-sm font-medium text-[#FFF4D7]">
                                {meta.issued}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 rounded-md border border-[#22F2FF]/14 bg-[#07142B]/60 p-4">
                            <IconShieldCheck
                              size={18}
                              className="text-[#22F2FF]"
                            />
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#BFF7FF]">
                                Validity
                              </p>
                              <p className="mt-1 text-sm font-medium text-[#FFF4D7]">
                                {meta.validity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {certifications.map((certificate, index) => (
              <button
                key={certificate.title}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Ke sertifikat ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-6 bg-[#22F2FF]"
                    : "w-1.5 bg-[#22F2FF]/25 hover:bg-[#22F2FF]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-[#06131d]/85 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} certificate preview`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg border border-[#22F2FF]/22 bg-[#07142B] shadow-2xl shadow-black/40"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#22F2FF]/16 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#BFF7FF]">
                    Certificate Preview
                  </p>
                  <h4 className="mt-1 text-base font-semibold text-[#FFF4D7]">
                    {preview.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-[#BFF7FF] transition-colors hover:bg-white/5 hover:text-[#FFF4D7]"
                  aria-label="Close certificate preview"
                >
                  <IconX size={20} />
                </button>
              </div>

              <div className="max-h-[72vh] overflow-auto bg-[#030711]/55 p-4">
                {preview.image && (
                  <Image
                    src={preview.image}
                    alt={`${preview.title} certificate`}
                    width={1200}
                    height={850}
                    sizes="(max-width: 1024px) 95vw, 1024px"
                    className="mx-auto h-auto max-h-[68vh] w-auto rounded-md border border-[#22F2FF]/18 object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
