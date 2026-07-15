export interface Project {
  id: number;
  title: string;
  client: string;
  year: string;
  images?: string[];
  image?: string[];
  description: string;
  tags: string[];
  featured?: boolean;
  accentColor: string;
}

export const profile = {
  name: "Vinawanda Khodijah",
  displayName: "VINAWANDA KHODIJAH",
  title: "Fullstack Engineer",
  initials: "VK",
  location: "Indonesia",
  email: "vinawandakhodijah@gmail.com",
  github: "https://github.com/nadavkh1185",
  linkedin: "https://www.linkedin.com/in/vinawanda-khodijah-3ba741351",
  mainsummary:
    "Building scalable web and mobile applications, APIs, and database-driven systems with modern technologies and engineering best practices",
  summary:
    "Fullstack Engineer experienced in building web and mobile applications using React, Next.js, Node.js, NestJS, PHP, Flutter, and modern database technologies.",
  extendedSummary:
    "Experienced in designing scalable systems, developing REST APIs, managing relational and NoSQL databases, implementing security testing, and collaborating in modern software development workflows.",
  interests:
    "Interested in software architecture, AI-assisted development, product engineering, and scalable digital solutions.",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certs", href: "#certifications" },
  { label: "Focus", href: "#ai" },
];

export const techStack = [
  { name: "JavaScript", category: "Languages", icon: "JS" },
  { name: "TypeScript", category: "Languages", icon: "TS" },
  { name: "PHP", category: "Languages", icon: "PHP" },
  { name: "Java", category: "Languages", icon: "JV" },
  { name: "Golang", category: "Languages", icon: "GO" },
  { name: "Python", category: "Languages", icon: "PY" },
  { name: "Dart", category: "Languages", icon: "DT" },
  { name: "React.js", category: "Frontend", icon: "RE" },
  { name: "Next.js", category: "Frontend", icon: "NX" },
  { name: "React Native", category: "Frontend", icon: "RN" },
  { name: "Vue.js", category: "Frontend", icon: "VU" },
  { name: "Tailwind CSS", category: "Frontend", icon: "TW" },
  { name: "Bootstrap", category: "Frontend", icon: "BS" },
  { name: "Laravel", category: "Frontend", icon: "LV" },
  { name: "Node.js", category: "Backend", icon: "ND" },
  { name: "Express.js", category: "Backend", icon: "EX" },
  { name: "NestJS", category: "Backend", icon: "NS" },
  { name: "PHP Native", category: "Backend", icon: "PN" },
  { name: "Gin Framework", category: "Backend", icon: "GF" },
  { name: "MySQL", category: "Database", icon: "MY" },
  { name: "PostgreSQL", category: "Database", icon: "PG" },
  { name: "Supabase", category: "Database", icon: "SB" },
  { name: "Neon", category: "Database", icon: "NE" },
  { name: "MongoDB", category: "Database", icon: "MO" },
  { name: "Prisma ORM", category: "Database", icon: "PR" },
  { name: "GitHub", category: "Tools", icon: "GH" },
  { name: "GitLab", category: "Tools", icon: "GL" },
  { name: "ClickUp", category: "Tools", icon: "CU" },
  { name: "Trello", category: "Tools", icon: "TR" },
  { name: "CI/CD", category: "Tools", icon: "CI" },
  { name: "Security Testing", category: "Additional", icon: "ST" },
  { name: "Quality Testing", category: "Additional", icon: "QT" },
  { name: "WordPress CMS", category: "Additional", icon: "WP" },
  { name: "UI Design", category: "Additional", icon: "UI" },
  { name: "Prompt Engineering", category: "Additional", icon: "PE" },
  {
    name: "AI Assisted Development",
    category: "Additional",
    icon: "AI",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Enterprise Control Center System",
    client: "PT. Putra Thamrin Meyer",
    year: "2026",
    images: ["/ecc_1.png", "/ecc_2.png", "/ecc_3.png"],
    description:
      "Built an enterprise-grade dashboard platform using Next.js and NestJS to manage operational data and business workflows. Designed PostgreSQL database architecture with Prisma ORM, developed secure REST APIs, implemented role-based access control, and performed SAST security testing to identify and mitigate code-level vulnerabilities.",
    tags: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "Prisma ORM",
      "PostgreSQL",
      "Supabase",
    ],
    featured: true,
    accentColor: "#2A82B7",
  },
  {
    id: 2,
    title: "Suarasa Mobile App",
    client: "Personal Project / GDG Event",
    year: "2026",
    images: ["/suarasa-1.png", "/suarasa-2.png", "/suarasa-3.png"],
    description:
      "Developed an AI-powered mobile application with Flutter and Dart during a rapid development event. Integrated Google Cloud services and Gemini AI to support voice-based interactions, intelligent responses, and cloud-powered processing while delivering a complete full-stack mobile solution.",
    tags: ["Flutter", "Dart", "Google Cloud", "Gemini AI"],
    featured: true,
    accentColor: "#5797B1",
  },
  {
    id: 3,
    title: "Company Profile CMS",
    client: "PT. Mitra Graha Integrasi",
    year: "2026",
    images: ["/dash-migrasi.png", "/migrrasi-1.png", "/migrrasi-2.png"],
    description:
      "Developed a company profile content management system using Next.js and NestJS. Built responsive administrative interfaces, REST API services, and MySQL database schemas with Prisma ORM. Integrated Google Analytics for visitor insights and reporting, while implementing an AI-powered chat assistant to improve user engagement and content accessibility.",
    tags: ["Next.js", "NestJS", "Prisma ORM", "MySQL"],
    featured: true,
    accentColor: "#67B3CF",
  },
  {
    id: 4,
    title: "ReflectQ Mobile App",
    client: "PT. Mitra Graha Integrasi",
    year: "2025",
    images: ["/display-1.png", "/display-2.png", "/display-1.png"],
    description:
      "Built mobile application features using React Native and backend services powered by Next.js and PostgreSQL.",
    tags: ["React Native", "Next.js", "Prisma ORM", "Supabase"],
    featured: false,
    accentColor: "#2A82B7",
  },
  {
    id: 5,
    title: "Learning Management System",
    client: "PT. Sarana Kawan Digital",
    year: "2025",
    images: [
      "/digital-doctor.png",
      "/digital-doctor.png",
      "/digital-doctor.png",
    ],
    description:
      "Developed LMS modules, REST APIs, user management systems, and content delivery functionality.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    featured: false,
    accentColor: "#5797B1",
  },
  {
    id: 6,
    title: "E-Commerce Platform",
    client: "Fishkinian",
    year: "2024",
    images: ["/ecom.png", "/ecom.png", "/ecom.png"],
    description:
      "Integrated payment systems and maintained post-deployment operations for e-commerce services.",
    tags: ["WordPress CMS", "Payment Gateway"],
    featured: false,
    accentColor: "#67B3CF",
  },
];

export const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "PT. Mitra Graha Integrasi",
    period: "Nov 2025 - May 2026",
    description:
      "Worked across fullstack development, API engineering, database design, security testing, and mobile application development.",
    highlights: [
      "Fullstack development",
      "API engineering",
      "Database design",
      "Security testing",
      "Mobile apps",
    ],
    type: "work",
  },
  {
    id: 2,
    role: "Private IT Teacher",
    company: "Eduprima Education Group",
    period: "May 2024 - Present",
    description:
      "Mentors students through programming, web development, and personalized technical learning paths.",
    highlights: [
      "Programming mentoring",
      "Web development training",
      "Personalized teaching",
    ],
    type: "work",
  },
  {
    id: 3,
    role: "Web Developer",
    company: "PT. Tribuana Sarana Utama",
    period: "Aug 2024 - Jan 2025",
    description:
      "Built internal web systems, implemented requirements, and collaborated with stakeholders during delivery.",
    highlights: [
      "Internal web systems",
      "Requirement implementation",
      "Stakeholder collaboration",
    ],
    type: "work",
  },
  {
    id: 4,
    role: "Various Industries",
    company: "PT Mitsuba Indonesia, PT Gajah Tunggal Tbk, CV OVJ",
    period: "2021 - 2025",
    description:
      "Finance, Quality Control, and Tax Administration roles across manufacturing and services sectors. ",
    highlights: ["Quality Control", "Finance"],
    type: "work",
  },
  {
    id: 5,
    role: "Bachelor of Computer Science",
    company: "Universitas Pamulang",
    period: "2021 - 2025",
    description:
      "Completed a Computer Science degree with a GPA of 3.67 / 4.00.",
    highlights: ["Computer Science", "GPA 3.67 / 4.00"],
    type: "education",
  },
  {
    id: 6,
    role: "Automation Office Administration",
    company: "SMKN 1 Kota Tangerang",
    period: "2016 - 2019",
    description:
      "Completed vocational education in Automation Office Administration.",
    highlights: ["Vocational education", "Office administration"],
    type: "education",
  },
];

export const certifications = [
  {
    title: "National Internship Programme Certification",
    issuer: "Kementrian Tenaga Kerja Republik Indonesia",
    credential: "Software Engineer",
    year: "2026",
    validUntil: "-",
    result: "Excellent Grade",
    description:
      "Successfully completed a national internship program focused on full-stack software engineering, API development, database management, security testing, and collaborative development workflows.",
    image: "/Sertifikat_Maganghub.png",
  },
  {
    title: "BNSP Programmer Certification",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    credential: "Programmer Scheme",
    year: "2025",
    validUntil: "2028",
    result: "",
    description:
      "National competency certification validating software development knowledge, programming skills, and professional standards.",
    image: "/Sertif_BNSP.jpg",
  },
  {
    title: "Dicoding Certification",
    issuer: "Dicoding",
    credential: "Fundamental Data Visualization",
    year: "2024",
    validUntil: "2027",
    result: "",
    description:
      "Data visualization certification from Dicoding, covering fundamental concepts and techniques.",
    image: "/dicoding-visdat.png",
    pdf: "",
  },
];

export const focusAreas = [
  {
    name: "Software Architecture",
    description:
      "Designing maintainable systems, API boundaries, and scalable application structure.",
  },
  {
    name: "AI-Assisted Development",
    description:
      "Using AI workflows thoughtfully to accelerate research, implementation, and debugging.",
  },
  {
    name: "Product Engineering",
    description:
      "Balancing technical implementation with clear user value and delivery discipline.",
  },
  {
    name: "Scalable Digital Solutions",
    description:
      "Building web, mobile, and data-backed products that can evolve with business needs.",
  },
];

export const stats = [
  { label: "Featured Projects", value: "6", desc: "Listed portfolio work" },
  { label: "Experiences", value: "2 years", desc: "Engineering and teaching" },
];
