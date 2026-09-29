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
  challenge?: string; // the problem the project had to solve
  solution?: string; // how I solved it
  growth?: string; // what I learned / how I keep making it better
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
  about?: string[]; // what the company is — shown in a pop-up from Quick facts
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

// Each group says HOW I use the tools, not just which ones.
// The site links each group to the projects whose tags match its items.
export const skills: { group: string; how: string; items: string[] }[] = [
  {
    group: "Frontend",
    how: "I build interfaces in React and Next.js, styled with Tailwind — mobile first, one reusable component at a time, and checked on real phones before I ship.",
    items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    group: "Backend & Database",
    how: "I design the data model first, then build the API around it. Supabase and PostgreSQL for most projects, Node.js services and Redis when a system has more moving parts.",
    items: ["Node.js", "Supabase", "PostgreSQL", "Redis", "REST APIs", "Graph Data Modeling"],
  },
  {
    group: "Languages",
    how: "TypeScript by default, so mistakes show up in my editor instead of in front of users. JavaScript for quick tools and games, Python, Java and SQL for university and data work.",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
  },
  {
    group: "Design & process",
    how: "I sketch the UI/UX before coding, follow the SDLC from requirements to testing, and use AI tools like Claude Code to move faster — while still reading and reviewing every change.",
    items: ["UI/UX Design", "SDLC", "Claude Code", "Meta Business Suite"],
  },
];

// How I work, step by step (shown above the skills)
export const workflow: { step: string; detail: string }[] = [
  { step: "Understand", detail: "Start from the real problem and who has it — customers, users, or the team." },
  { step: "Plan & design", detail: "Sketch the screens and the data model before writing code." },
  { step: "Build small", detail: "Ship in small working pieces with TypeScript, testing as I go." },
  { step: "Improve", detail: "Put it in front of people, listen to feedback, and fix what slows them down." },
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
      "Contributed to software development across frontend and database work within a development team at Tamarind Tech, a tech initiative supporting communities in Myanmar.",
    highlights: [
      "Developed and maintained frontend components for community projects",
      "Worked with databases and supported data-related development tasks",
      "Contributed to technical implementation and integration between application components",
    ],
    about: [
      "Tamarind is a humanitarian tech initiative supporting Myanmar with tech-powered solutions, started after the 2025 earthquake.",
      "Its mission is to help communities recover, rebuild, and rise stronger — together.",
      "As a Junior AI Developer intern for 7 months, I built frontend components, worked on databases, and helped connect the parts of our apps inside a real development team.",
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
      challenge:
      "Many of my customers can't pay by card and prefer to read in Burmese, so a standard online checkout didn't fit them.",
    solution:
      "I built ordering around local bank transfers and made the whole storefront bilingual, with Supabase holding products and orders.",
    growth:
      "I watch where customers get stuck or message me with questions, then fix that step first — small updates, often.",
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
      challenge:
      "A lock that only checks an RFID card can be opened by anyone who finds or copies the card.",
    solution:
      "I added a second authentication factor on top of RFID, logged every access attempt, and built a dashboard that shows live events and raises alarms.",
    growth:
      "Working with real hardware taught me to plan for dropped connections and odd edge cases, not just the happy path.",
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
      challenge:
      "A workshop game has to run on one projector with whatever devices people bring — no installs, no sign-ups.",
    solution:
      "I kept it to plain HTML, CSS, and JavaScript on Vercel, so it opens instantly in any browser, with one shared live scoreboard.",
    growth:
      "Each time it's played I note which rounds drag or confuse people, and simplify them for next time.",
    tags: ["JavaScript", "HTML", "CSS", "Game", "Vercel"],
    links: [{ label: "Play game", href: "https://code-coffee-game.vercel.app" }],
    art: "coffee",
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
      challenge:
      "My first full-stack project: connecting the interface, server logic, and database without it turning into a tangle.",
    solution:
      "I followed the SDLC — requirements, design, build, test — and kept the frontend, backend, and data layers separate.",
    growth:
      "It's where I learned to plan before I code, a habit I've used in every project since.",
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
