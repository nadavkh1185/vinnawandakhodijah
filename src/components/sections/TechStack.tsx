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
    accent: "text-[#F7DF1E]",
    ring: "group-hover:border-[#F7DF1E]/35",
  },
  Frontend: {
    accent: "text-[#61DAFB]",
    ring: "group-hover:border-[#61DAFB]/35",
  },
  Backend: {
    accent: "text-[#9FD1E5]",
    ring: "group-hover:border-[#9FD1E5]/35",
  },
  Database: {
    accent: "text-[#67B3CF]",
    ring: "group-hover:border-[#67B3CF]/35",
  },
  Tools: { accent: "text-[#D7ECF5]", ring: "group-hover:border-white/30" },
  Additional: {
    accent: "text-[#9FD1E5]",
    ring: "group-hover:border-[#5797B1]/40",
  },
};

function TechIcon({ name, category }: { name: string; category: string }) {
  const Icon = techIcons[name] ?? LuCodeXml;
  const meta = categoryMeta[category] ?? categoryMeta.Additional;

  return (
    <div
      className={[
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#5797B1]/15 bg-[#103145]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300",
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
                "min-h-10 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-[#5797B1] text-white shadow-lg shadow-[#2A82B7]/20"
                  : "border border-[#5797B1]/15 bg-white/[0.015] text-[#BAD3DE] hover:border-[#5797B1]/30 hover:bg-[#5797B1]/10 hover:text-white",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
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
                glowColor="rgba(87,151,177,0.12)"
                className="group h-full min-h-[104px] overflow-hidden p-3.5 sm:min-h-[112px] sm:p-4"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(87,151,177,0.12),transparent_38%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <TechIcon name={tech.name} category={tech.category} />
                    <span className="rounded-full border border-[#5797B1]/12 bg-white/[0.025] px-2 py-0.5 text-[10px] font-medium text-[#7FA5B8]">
                      {tech.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="truncate text-sm font-semibold leading-5 text-white">
                      {tech.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7FA5B8]">
                      {tech.category}
                    </p>
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
