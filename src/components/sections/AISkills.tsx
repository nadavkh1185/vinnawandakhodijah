'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { aiSkills } from '@/lib/data';
import { IconSparkles, IconBrain, IconRobot, IconCode } from '@tabler/icons-react';

const aiTools = [
  { name: 'GPT-4o', icon: '✦', color: 'text-emerald-400' },
  { name: 'Claude 3.5', icon: '◆', color: 'text-purple-400' },
  { name: 'Gemini', icon: '◐', color: 'text-blue-400' },
  { name: 'LangChain', icon: '🔗', color: 'text-yellow-400' },
  { name: 'LlamaIndex', icon: '🦙', color: 'text-orange-400' },
  { name: 'Pinecone', icon: '⬡', color: 'text-indigo-400' },
  { name: 'Vercel AI SDK', icon: '▲', color: 'text-white' },
  { name: 'Hugging Face', icon: '🤗', color: 'text-pink-400' },
];

const highlights = [
  { icon: IconBrain, label: 'AI Product Design', desc: 'Designing AI-native interfaces and interaction patterns' },
  { icon: IconRobot, label: 'Agent Orchestration', desc: 'Building reliable multi-step agentic pipelines' },
  { icon: IconCode, label: 'AI Engineering', desc: 'Production RAG, fine-tuning, and deployment pipelines' },
  { icon: IconSparkles, label: 'Generative UI', desc: 'Streaming interfaces, AI-generated components' },
];

export default function AISkills() {
  return (
    <section id="ai" className="relative z-10 py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          label="AI Skills"
          title="Building with AI."
          subtitle="Specializing in the rapidly evolving AI engineering landscape — from LLMs to production agentic systems."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left — skill bars */}
          <div className="space-y-5">
            {aiSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassCard className="p-5 hover:border-white/12 transition-all duration-300" glow glowColor="rgba(168,85,247,0.1)">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{skill.description}</p>
                    </div>
                    <span className="text-xs font-bold text-purple-400 tabular-nums">
                      {skill.proficiency}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08 + 0.2, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Right — visual + tool chips */}
          <div className="flex flex-col gap-6">
            {/* Highlight cards */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <GlassCard hover className="group p-5 h-full">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                      <h.icon size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{h.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{h.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* AI tool chips */}
            <GlassCard className="p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                AI Tools & Models
              </p>
              <div className="flex flex-wrap gap-3">
                {aiTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-3 py-2 cursor-default"
                  >
                    <span className={`text-base ${tool.color}`}>{tool.icon}</span>
                    <span className="text-sm font-medium text-slate-200">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
