"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiBootstrap,
  SiClickup,
  SiDart,
  SiExpress,
  SiGithub,
  SiGitlab,
  SiGo,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
  SiVuedotjs,
  SiWordpress,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbBrandReactNative, TbDatabaseSearch, TbRobot } from "react-icons/tb";
import {
  LuBrainCircuit,
  LuCodeXml,
  LuGitBranch,
  LuShieldCheck,
  LuSparkles,
  LuTestTube,
} from "react-icons/lu";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { techStack } from "@/lib/data";

const categories = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Additional",
];

const techIcons: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  PHP: SiPhp,
  Java: FaJava,
  Golang: SiGo,
  Python: SiPython,
  Dart: SiDart,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "React Native": TbBrandReactNative,
  "Vue.js": SiVuedotjs,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  Laravel: SiLaravel,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  NestJS: SiNestjs,
  "PHP Native": SiPhp,
  "Gin Framework": SiGo,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Neon: TbDatabaseSearch,
  MongoDB: SiMongodb,
  "Prisma ORM": SiPrisma,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  ClickUp: SiClickup,
  Trello: SiTrello,
  "CI/CD": LuGitBranch,
  "Security Testing": LuShieldCheck,
  "Quality Testing": LuTestTube,
  "WordPress CMS": SiWordpress,
  "UI Design": LuSparkles,
  "Prompt Engineering": LuBrainCircuit,
  "AI Assisted Development": TbRobot,
};

const categoryMeta: Record<string, { accent: string; ring: string }> = {
  Languages: {
    accent: "text-[#FFF4D7]",
    ring: "group-hover:border-[#FFF4D7]/35",
  },
  Frontend: {
    accent: "text-[#22F2FF]",
    ring: "group-hover:border-[#22F2FF]/35",
  },
  Backend: {
    accent: "text-[#FF3F87]",
    ring: "group-hover:border-[#FF3F87]/35",
  },
  Database: {
    accent: "text-[#2A82FF]",
    ring: "group-hover:border-[#2A82FF]/35",
  },
  Tools: { accent: "text-[#BFF7FF]", ring: "group-hover:border-white/30" },
  Additional: {
    accent: "text-[#FFF4D7]",
    ring: "group-hover:border-[#22F2FF]/40",
  },
};

function TechIcon({ name, category }: { name: string; category: string }) {
  const Icon = techIcons[name] ?? LuCodeXml;
  const meta = categoryMeta[category] ?? categoryMeta.Additional;

  return (
    <div
      className={[
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#22F2FF]/18 bg-[#07142B]/80 shadow-[inset_0_1px_0_rgba(255,244,215,0.08)] transition-all duration-300",
        meta.ring,
      ].join(" ")}
    >
      <Icon className={`h-5 w-5 ${meta.accent}`} aria-hidden="true" />
    </div>
  );
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? techStack
      : techStack.filter((tech) => tech.category === activeCategory);

  return (
    <section id="stack" className="relative z-10 px-6 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          label="Tech Stack"
          title="A compact toolkit for modern product engineering"
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`stack-filter-${cat.toLowerCase().replace("/", "-")}`}
              onClick={() => setActiveCategory(cat)}
              className={[
                "min-h-10 rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.06em] transition-all duration-200",
                activeCategory === cat
                  ? "border border-[#22F2FF]/60 bg-[#22F2FF] text-[#6f84a8] shadow-[0_0_22px_rgba(34,242,255,0.24)]"
                  : "border border-[#22F2FF]/18 bg-[#07142B]/70 text-[#BFF7FF] hover:border-[#FF3F87]/45 hover:bg-[#FF3F87]/10 hover:text-[#FFF4D7]",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9"
        >
          {filtered.map((tech, index) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.28,
                delay: Math.min(index * 0.015, 0.18),
              }}
            >
              <GlassCard
                hover
                glow
                glowColor="rgba(34,242,255,0.12)"
                className="group h-full min-h-[80px] overflow-hidden p-3"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,242,255,0.16),transparent_38%),linear-gradient(135deg,rgba(255,63,135,0.08),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col justify-between gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <TechIcon name={tech.name} category={tech.category} />
                    <span className="text-[10px] font-semibold tabular-nums text-[#BFF7FF]/75">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold leading-tight text-[#FFF4D7">
                      {tech.name}
                    </h3>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
