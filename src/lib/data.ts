export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "AI", href: "#ai" },
  { label: "Contact", href: "#contact" },
];

export const techStack = [
  // Frontend
  { name: "React", category: "Frontend", icon: "⚛️", level: 98 },
  { name: "Next.js", category: "Frontend", icon: "▲", level: 95 },
  { name: "TypeScript", category: "Frontend", icon: "TS", level: 94 },
  { name: "Tailwind CSS", category: "Frontend", icon: "🌊", level: 97 },
  { name: "Framer Motion", category: "Frontend", icon: "◐", level: 88 },
  { name: "Three.js", category: "Frontend", icon: "🔺", level: 75 },
  // Backend
  { name: "Node.js", category: "Backend", icon: "⬡", level: 92 },
  { name: "Python", category: "Backend", icon: "🐍", level: 90 },
  { name: "Go", category: "Backend", icon: "◉", level: 78 },
  { name: "PostgreSQL", category: "Backend", icon: "🐘", level: 88 },
  { name: "Redis", category: "Backend", icon: "🔴", level: 82 },
  { name: "GraphQL", category: "Backend", icon: "◈", level: 86 },
  // AI / ML
  { name: "LangChain", category: "AI/ML", icon: "🔗", level: 88 },
  { name: "OpenAI API", category: "AI/ML", icon: "✦", level: 95 },
  { name: "PyTorch", category: "AI/ML", icon: "🔥", level: 72 },
  { name: "Hugging Face", category: "AI/ML", icon: "🤗", level: 80 },
  { name: "LlamaIndex", category: "AI/ML", icon: "🦙", level: 82 },
  { name: "Vercel AI SDK", category: "AI/ML", icon: "▲", level: 92 },
  // DevOps
  { name: "Docker", category: "DevOps", icon: "🐳", level: 88 },
  { name: "Kubernetes", category: "DevOps", icon: "☸", level: 72 },
  { name: "AWS", category: "DevOps", icon: "☁️", level: 80 },
  { name: "Vercel", category: "DevOps", icon: "▲", level: 96 },
  { name: "GitHub Actions", category: "DevOps", icon: "⚡", level: 90 },
  { name: "Terraform", category: "DevOps", icon: "🟣", level: 70 },
];

export const projects = [
  {
    id: 1,
    title: "NeuralChat — AI Assistant Platform",
    description:
      "A production-grade AI chat platform with real-time streaming, multi-model support (GPT-4, Claude, Gemini), RAG pipelines, and custom knowledge bases. Built for 50k+ active users.",
    tags: ["Next.js", "OpenAI", "LangChain", "PostgreSQL", "Redis"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    accentColor: "#6366f1",
  },
  {
    id: 2,
    title: "Orbit — Design System",
    description:
      "A comprehensive, accessible component library with 80+ components, dark/light theming, animation primitives, and full TypeScript support. Used by 200+ teams.",
    tags: ["React", "TypeScript", "Storybook", "Radix UI", "Tailwind"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentColor: "#06b6d4",
  },
  {
    id: 3,
    title: "Flux — Real-time Collaboration",
    description:
      "A Figma-inspired collaborative workspace with operational transforms, presence indicators, and conflict-free replicated data types (CRDTs) for conflict resolution.",
    tags: ["Next.js", "WebSockets", "CRDTs", "Go", "Redis"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "#10b981",
  },
  {
    id: 4,
    title: "Prism Analytics",
    description:
      "Privacy-first web analytics platform with automated insights, custom event tracking, and AI-powered anomaly detection. GDPR compliant, no cookies required.",
    tags: ["Next.js", "ClickHouse", "Python", "OpenAI", "Docker"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    accentColor: "#f59e0b",
  },
];

export const experiences = [
  {
    id: 1,
    role: "Senior Fullstack Engineer",
    company: "Vercel",
    period: "2024 — Present",
    description:
      "Leading frontend infrastructure for Vercel's dashboard. Architected micro-frontend system that improved build times by 60%. Shipped AI-powered deployment suggestions feature.",
    highlights: ["Next.js 15", "Turbopack", "Edge Runtime", "AI Features"],
    type: "work",
  },
  {
    id: 2,
    role: "Lead Engineer",
    company: "Linear",
    period: "2022 — 2024",
    description:
      "Drove performance engineering initiatives across the product. Reduced P50 latency by 40% through query optimization. Led the design system team delivering 100+ components.",
    highlights: ["React", "Electron", "GraphQL", "Postgres", "Design Systems"],
    type: "work",
  },
  {
    id: 3,
    role: "Fullstack Engineer",
    company: "Stripe",
    period: "2020 — 2022",
    description:
      "Built and maintained critical payment flow components. Implemented risk assessment UI for fraud prevention. Contributed to Stripe Elements accessibility overhaul.",
    highlights: ["React", "Ruby on Rails", "Payments", "A11y", "Testing"],
    type: "work",
  },
  {
    id: 4,
    role: "B.Sc. Computer Science",
    company: "MIT",
    period: "2016 — 2020",
    description:
      "Graduated with honors. Research focus on distributed systems and human-computer interaction. Built open-source tools used by thousands of developers.",
    highlights: ["Distributed Systems", "HCI", "Research", "Open Source"],
    type: "education",
  },
];

export const aiSkills = [
  {
    name: "RAG Systems",
    description: "Vector search, document chunking, context-aware retrieval",
    proficiency: 92,
  },
  {
    name: "LLM Fine-tuning",
    description: "LoRA, PEFT, domain adaptation, RLHF alignment",
    proficiency: 78,
  },
  {
    name: "AI Agents",
    description: "Multi-agent orchestration, tool use, planning loops",
    proficiency: 88,
  },
  {
    name: "Prompt Engineering",
    description: "Chain-of-thought, few-shot, structured outputs",
    proficiency: 95,
  },
  {
    name: "Embeddings & Search",
    description: "pgvector, Pinecone, semantic search pipelines",
    proficiency: 90,
  },
  {
    name: "AI UI/UX",
    description: "Streaming UIs, generative interfaces, AI-native products",
    proficiency: 94,
  },
];

export const stats = [
  { label: "Years Experience", value: "6+" },
  { label: "Projects Shipped", value: "50+" },
  { label: "Open Source Stars", value: "12k" },
  { label: "Teams Mentored", value: "8" },
];
