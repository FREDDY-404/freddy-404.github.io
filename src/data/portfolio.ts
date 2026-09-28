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
  art: ProjectArt; // which illustration the project card uses
};

export type ProjectArt = "store" | "lock" | "coffee" | "shield" | "plant";

export type Certificate = {
  group: string; // certificates are listed under these headings
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  url?: string; // link to verify the certificate
  image?: string;
};

export type Education = {
  school: string;
  url?: string; // school website
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
  links?: Link[]; // website and social media for the company
};

export const profile = {
  name: "Min Khant Kyaw",
  title: "Full-Stack Developer",
  location: "Bangkok, Thailand",
  tagline:
    "I build full-stack web apps end to end — from the database and API to the interface people use.",
  about: [
    "I'm a full-stack developer and a Software Engineering student pursuing a BSc in Computing at the University of Sunderland. I'm also the founder of Keuri Digital Store, a digital products business I started in early 2026. During my internship at Tamarind Community, I worked on frontend components, databases, and integration between application parts inside a real development team.",
    "I work end to end with TypeScript, JavaScript, Python, SQL, Node.js, React, Next.js, Supabase, and PostgreSQL — shipping live products like an e-commerce store and an IoT security dashboard. I care about web applications that are reliable, well-structured, and easy to use.",
  ],
  email: "min778128572@gmail.com",
  workEmail: "freddy@tamarind.tech",
  avatar: "/avatar.webp", // background removed
  resumeUrl: "/Min_Khant_Kyaw_CV.pdf", // public copy, no phone number (source: cv/cv.html)
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
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL", "HTML", "CSS"],
  },
  {
    group: "Backend & Database",
    items: ["Node.js", "PostgreSQL", "Supabase", "Redis", "REST APIs", "Database Management", "Graph Data Modeling"],
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

export const experience: Experience[] = [
  {
    company: "Keuri Digital Store",
    title: "Founder",
    period: "2026 — Present",
    summary:
      "Founded and run a digital products store in early 2026, and designed and built its e-commerce site end to end.",
    highlights: [
      "Launched keuri.online: a bilingual (Burmese / English) storefront with local bank-transfer ordering",
      "Built the full stack myself with Next.js, TypeScript, and Supabase",
      "Handle the business side too: products, customers, and social media",
    ],
    links: [{ label: "keuri.online", href: "https://keuri.online" }],
    // Social media: add the store's pages here, e.g.
    // { label: "Facebook", href: "https://facebook.com/..." },
  },
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
    role: "Founder & Full-Stack Developer · My own business",
    period: "Since 2026",
    summary:
      "My own digital products business, founded in early 2026. I built its e-commerce site end to end around real customers and a smooth shopping experience.",
    highlights: [
      "Built application features with TypeScript, React, and Next.js",
      "Worked across both frontend and backend functionality",
      "Implemented the database layer with Supabase",
      "Bilingual storefront (Burmese / English) with dark mode and local bank-transfer ordering",
    ],
    tags: ["TypeScript", "Next.js", "React", "Supabase"],
    links: [{ label: "Visit site", href: "https://keuri.online" }],
    art: "store",
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
    art: "lock",
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
    art: "coffee",
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
    art: "shield",
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
    art: "plant",
  },
];

export const certificates: Certificate[] = [
  {
    group: "Developer tools",
    name: "Claude Code 101",
    issuer: "Anthropic",
    date: "Sep 2026",
    url: "https://verify.skilljar.com/c/vda96arsbnwd",
  },
  {
    group: "Developer tools",
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "Mar 2026",
    url: "https://verify.skilljar.com/c/ep7z8odgxpdk",
  },
  {
    group: "Developer tools",
    name: "Claude 101",
    issuer: "Anthropic",
    date: "Mar 2026",
    url: "https://verify.skilljar.com/c/m3cu2whyuunj",
  },
  {
    group: "Data & databases",
    name: "Graph Data Modeling Fundamentals",
    issuer: "Neo4j GraphAcademy",
    date: "Sep 2026",
    credentialId: "4a74ccb1-6dab-4cd8-aa84-f6fd24e730d3",
    url: "https://graphacademy.neo4j.com/c/4a74ccb1-6dab-4cd8-aa84-f6fd24e730d3/",
  },
  {
    group: "Design",
    name: "UX/UI Basic to Advanced Course",
    issuer: "Technortal School of IT",
    // date: "Mon YYYY", // TODO: add when you completed it
  },
  {
    group: "Language",
    name: "General English — Level 6 (CEFR B1)",
    issuer: "International House Yangon–Mandalay",
    date: "Aug 2025",
  },
];

export const education: Education[] = [
  {
    school: "University of Sunderland",
    url: "https://www.sunderland.ac.uk",
    degree: "BSc in Computing",
    period: "2026 — 2027",
    details: ["Currently studying · Expected graduation 2027"],
  },
  {
    school: "Info Myanmar College",
    url: "http://imu.edu.mm", // now Info Myanmar University; its https certificate is broken
    degree: "HND in Software Engineering",
    period: "2024 — 2026",
    details: ["Higher National Diploma"],
  },
];
