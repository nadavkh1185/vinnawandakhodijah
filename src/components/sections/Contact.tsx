"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  IconAlertCircle,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconLoader2,
  IconMapPin,
  IconSend,
} from "@tabler/icons-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { contactSchema, type ContactFormValues } from "@/lib/contact";
import { profile } from "@/lib/data";

const socials = [
  {
    icon: IconBrandGithub,
    href: profile.github,
    label: "GitHub",
    handle: "github.com/nadavkh1185",
  },
  {
    icon: IconBrandLinkedin,
    href: profile.linkedin,
    label: "LinkedIn",
    handle: "linkedin.com/in/vinawanda-khodijah-3ba741351",
  },
];

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

const inputClass =
  "w-full rounded-2xl border border-[#5797B1]/15 bg-[#103145]/35 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-[#7FA5B8]/60 focus:border-[#5797B1]/45 focus:bg-[#103145]/55 focus:ring-2 focus:ring-[#5797B1]/15";

export default function Contact() {
  const [toast, setToast] = useState<ToastState>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
      startedAt: undefined,
    },
  });

  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  const onSubmit = async (values: ContactFormValues) => {
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        message?: string;
        errors?: Partial<Record<keyof ContactFormValues, string[]>>;
      };

      if (!response.ok) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (messages?.[0]) {
              setError(field as keyof ContactFormValues, {
                type: "server",
                message: messages[0],
              });
            }
          });
        }

        setToast({
          type: "error",
          message:
            result.message ||
            "Unable to send your message right now. Please try again.",
        });
        return;
      }

      reset({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
        startedAt: undefined,
      });
      setToast({
        type: "success",
        message: "Your message has been sent. Thank you for reaching out.",
      });
      window.setTimeout(() => setToast(null), 4500);
    } catch {
      setToast({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  return (
    <section id="contact" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          label="Contact"
          title="Let's Build Something Meaningful"
          subtitle="Whether you have a project, collaboration opportunity, or simply want to connect, feel free to reach out."
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8" glow>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#5797B1]/20 bg-[#5797B1]/12 text-[#D7ECF5] shadow-[0_0_30px_rgba(87,151,177,0.12)]">
                <IconSend size={24} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7FA5B8]">
                Direct Website Message
              </p>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white">
                {profile.name}
              </h3>

              <div className="mt-8 space-y-4 border-t border-[#5797B1]/12 pt-6">
                <div className="flex items-center gap-3 text-sm text-[#BAD3DE]">
                  <IconMapPin size={17} className="text-[#9FD1E5]" />
                  {profile.location}
                </div>
                <div className="rounded-2xl border border-[#5797B1]/12 bg-white/[0.025] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7FA5B8]">
                    Email
                  </p>
                  <p className="mt-2 break-words text-sm font-medium text-[#D7ECF5]">
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="group rounded-2xl border border-[#5797B1]/12 bg-white/[0.025] p-4 transition-all hover:border-[#5797B1]/28 hover:bg-[#5797B1]/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#103145]/55 text-[#D7ECF5] transition-transform group-hover:-translate-y-0.5">
                        <social.icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7FA5B8]">
                          {social.label}
                        </p>
                        <p className="mt-1 break-words text-sm font-medium text-[#D7ECF5]">
                          {social.handle}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="relative"
          >
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98 }}
                  className={[
                    "mb-4 flex items-start gap-3 rounded-2xl border p-4 text-sm shadow-lg backdrop-blur-xl",
                    toast.type === "success"
                      ? "border-[#5797B1]/25 bg-[#5797B1]/12 text-[#D7ECF5]"
                      : "border-red-400/25 bg-red-500/10 text-red-100",
                  ].join(" ")}
                  role="status"
                  aria-live="polite"
                >
                  {toast.type === "success" ? (
                    <IconCheck size={18} className="mt-0.5 shrink-0" />
                  ) : (
                    <IconAlertCircle size={18} className="mt-0.5 shrink-0" />
                  )}
                  <span>{toast.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <GlassCard
              className="p-6 sm:p-8"
              glow
              glowColor="rgba(87,151,177,0.14)"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <input
                  {...register("website")}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <input
                  {...register("startedAt", { valueAsNumber: true })}
                  type="hidden"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9FD1E5]"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      className={inputClass}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-2 text-xs text-red-200"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9FD1E5]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      className={inputClass}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-2 text-xs text-red-200"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9FD1E5]"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Project, collaboration, or opportunity"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? "contact-subject-error" : undefined
                    }
                    className={inputClass}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p
                      id="contact-subject-error"
                      className="mt-2 text-xs text-red-200"
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#9FD1E5]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    placeholder="Tell me about what you would like to build..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className={`${inputClass} resize-none leading-7`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-2 text-xs text-red-200"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p
                    className="text-xs leading-5 text-[#7FA5B8]"
                    aria-live="polite"
                  >
                    {isSubmitSuccessful
                      ? "Form cleared after successful submission."
                      : "Protected with validation and anti-spam checks."}
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5797B1] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#6EADC7] hover:shadow-lg hover:shadow-[#2A82B7]/40 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <IconLoader2 size={17} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <IconSend size={17} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
