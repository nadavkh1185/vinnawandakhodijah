"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconCalendar,
  IconCertificate,
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2">
          {certifications.map((certificate, index) => {
            const meta = getMeta(certificate);
            const hasImage = Boolean(certificate.image);

            return (
              <motion.div
                key={certificate.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
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
                          <IconCalendar size={18} className="text-[#22F2FF]" />
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
