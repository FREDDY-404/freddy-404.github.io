// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your portfolio.
//  Everything on the site is generated from the data below.
//  Images go in /public (e.g. /public/certs/aws.png → "/certs/aws.png").
// ─────────────────────────────────────────────────────────────

export type Link = { label: string; href: string };

export type Project = {
  title: string;
  role: string; // what YOU did on the project
  period: string;
  summary: string;
  highlights?: string[];
  tags: string[];
  links?: Link[];
  image?: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  url?: string; // link to verify the certificate
  image?: string;
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  details?: string[];
};

export type Experience = {
  company: string;
  title: string;
  period: string;
  summary: string;
  highlights?: string[];
};

export const profile = {
  name: "Min Khant Kyaw",
  title: "AI & Full-Stack Developer",
  location: "Bangkok, Thailand",
  tagline:
    "I build full-stack web apps and AI-powered features — from the database and API to the interface people use.",
  about: [
    "I'm an AI and full-stack developer and a Software Engineering student pursuing a BSc in Computing at the University of Sunderland. As a Junior AI Developer Intern at Tamarind Community, I worked across frontend, database, and AI-related development inside a real team.",
    "I work end to end with TypeScript, JavaScript, Python, SQL, Node.js, React, Next.js, Supabase, and PostgreSQL — shipping live products like an e-commerce store and an IoT security dashboard. I'm most excited about bringing AI into practical web applications that are reliable, well-structured, and easy to use.",
  ],
  email: "min778128572@gmail.com",
  workEmail: "freddy@tamarind.tech",
  avatar: "/avatar.webp", // background removed
  resumeUrl: "", // e.g. "/resume.pdf" (put the file in /public)
  socials: [
    { label: "GitHub", href: "https://github.com/FREDDY-404" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/min-khant-kyaw-053b8839a/",
    },
  ] as Link[],
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI",
    items: ["AI Development", "Python", "Graph Data Modeling"],
  },
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL", "HTML", "CSS"],
  },
  {
    group: "Backend & Database",
    items: ["Node.js", "PostgreSQL", "Supabase", "Redis", "REST APIs", "Database Management"],
  },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  {
    group: "Other",
    items: [
      "UI/UX Design",
      "SDLC",
      "Microsoft Office",
      "Meta Business Suite",
    ],
  },
];

export const spokenLanguages: { name: string; level: string }[] = [
  { name: "Burmese", level: "Native" },
  { name: "English", level: "Intermediate · CEFR B1" },
  { name: "Thai", level: "Basic" },
];

// How I work on projects — shown as numbered steps
export const process: { step: string; detail: string }[] = [
  {
    step: "Understand",
    detail:
      "Start from the real requirements — who uses it, what the business needs, and what 'done' looks like.",
  },
  {
    step: "Design",
    detail:
      "Sketch the user flow and UI, then model the data: tables, relationships, and the APIs between them.",
  },
  {
    step: "Build",
    detail:
      "Develop end to end — database, backend logic and APIs, then the interface — in small, working pieces.",
  },
  {
    step: "Test & refine",
    detail:
      "Check each feature against the requirements, fix issues, and polish the experience before release.",
  },
  {
    step: "Ship & improve",
    detail:
      "Deploy live, gather feedback, and keep iterating, following the software development lifecycle.",
  },
];

export const experience: Experience[] = [
  {
    company: "Tamarind Community",
    title: "Junior AI Developer Intern",
    period: "2026 · 7 months",
    summary:
      "Contributed to software development across frontend and database work within a development team.",
    highlights: [
      "Developed and maintained frontend components for community projects",
      "Worked with databases and supported data-related development tasks",
      "Contributed to technical implementation and integration between application components",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Keuri Digital Store",
    role: "Full-Stack Developer · Business project",
    period: "3 months",
    summary:
      "An e-commerce website for a digital products business, built around practical business requirements and a smooth shopping experience.",
    highlights: [
      "Built application features with TypeScript, React, and Next.js",
      "Worked across both frontend and backend functionality",
      "Implemented the database layer with Supabase",
      "Bilingual storefront (Burmese / English) with dark mode and local bank-transfer ordering",
    ],
    tags: ["TypeScript", "Next.js", "React", "Supabase"],
    links: [{ label: "Visit site", href: "https://keuri.online" }],
    image: "/projects/keuri.jpg",
  },
  {
    title: "Myan Shield",
    role: "Backend & Frontend Developer · Team project",
    period: "Team",
    summary:
      "A smoke detection system built as a team. I developed the user-facing application and the communication between it and the backend services.",
    highlights: [
      "Built the user interface with React, TypeScript, and Tailwind CSS",
      "Implemented API calls and backend communication with Node.js services",
      "Worked in a stack of PostgreSQL, Redis 7, MinIO, Mailpit, and Nginx",
    ],
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis 7", "MinIO", "Mailpit", "Nginx", "Tailwind CSS"],
    links: [],
  },
  {
    title: "2FA Smart Door Lock",
    role: "IoT Developer · University project",
    period: "6 months",
    summary:
      "An IoT smart door lock secured with two-factor authentication, combining software development with hardware for a practical security system.",
    highlights: [
      "Implemented user authentication and access control",
      "Built tracking logs to record system and access activity",
      "Built an admin dashboard for RFID access, live device events, and security alarms",
    ],
    tags: ["IoT", "RFID", "Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    links: [
      { label: "Visit site", href: "https://smartdoor-mmcom.online" },
      { label: "Code", href: "https://github.com/FREDDY-404/smartdoor" },
    ],
    image: "/projects/smartdoor.jpg",
  },
  {
    title: "Uri Plant Shop",
    role: "Full-Stack Developer · University project",
    period: "2 months",
    summary:
      "A plant-shop e-commerce website with frontend, backend, and database functionality.",
    highlights: [
      "Implemented frontend and backend functionality",
      "Worked with databases and application logic",
      "Applied software development lifecycle practices throughout",
    ],
    tags: ["Full-Stack", "Database", "SDLC"],
    links: [],
  },
  {
    title: "Code & Coffee Game",
    role: "Developer · Workshop game",
    period: "Game",
    summary:
      "A browser game for coding classes and workshops, run on one projector with phones or one laptop per team.",
    highlights: [
      "Programming Charades: one player acts out a language logo, their partner types the name",
      "Team Debug Wars: teams solve random debugging questions one round at a time",
      "Live scoreboard tracking charades score, rounds played, accuracy, and answers",
    ],
    tags: ["JavaScript", "HTML", "CSS", "Game", "Vercel"],
    links: [{ label: "Play game", href: "https://code-coffee-game.vercel.app" }],
    image: "/projects/code-coffee.jpg",
  },
];

export const certificates: Certificate[] = [
  {
    name: "Graph Data Modeling Fundamentals",
    issuer: "Neo4j GraphAcademy",
    date: "Sep 2026",
    credentialId: "4a74ccb1-6dab-4cd8-aa84-f6fd24e730d3",
    url: "https://graphacademy.neo4j.com/c/4a74ccb1-6dab-4cd8-aa84-f6fd24e730d3/",
  },
  {
    name: "UX/UI Basic to Advanced Course",
    issuer: "Technortal School of IT",
    // date: "Mon YYYY", // TODO: add when you completed it
  },
  {
    name: "General English — Level 6 (CEFR B1)",
    issuer: "International House Yangon–Mandalay",
    date: "Aug 2025",
  },
];

export const education: Education[] = [
  {
    school: "University of Sunderland",
    degree: "BSc in Computing",
    period: "2026 — 2027",
    details: ["Currently studying · Expected graduation 2027"],
  },
  {
    school: "Info Myanmar College",
    degree: "HND in Software Engineering",
    period: "2024 — 2026",
    details: ["Higher National Diploma"],
  },
];
