import {
  siAnthropic,
  siCss,
  siGit,
  siHtml5,
  siJavascript,
  siMinio,
  siNeo4j,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

// Official brand logos (Simple Icons), keyed by the names used in portfolio data
const ICONS: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  Java: siOpenjdk,
  SQL: siPostgresql,
  HTML: siHtml5,
  CSS: siCss,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  Redis: siRedis,
  "Redis 7": siRedis,
  Nginx: siNginx,
  MinIO: siMinio,
  Vercel: siVercel,
  Git: siGit,
  "Graph Data Modeling": siNeo4j,
  "Neo4j GraphAcademy": siNeo4j,
  Anthropic: siAnthropic,
};

export const hasTechIcon = (name: string) => name in ICONS;

/* Brand logo in its official colour; near-black brands use the site ink */
export function TechIcon({ name, className = "size-3.5" }: { name: string; className?: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  const hex = parseInt(icon.hex, 16);
  const dark = ((hex >> 16) & 255) * 0.3 + ((hex >> 8) & 255) * 0.59 + (hex & 255) * 0.11 < 40;
  return (
    <svg role="img" aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill={dark ? "#16130f" : `#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}

/* Chip: logo + label */
export function TechChip({ name, className = "" }: { name: string; className?: string }) {
  return (
    <li className={`inline-flex items-center gap-1.5 rounded border-2 border-ink bg-paper-2 px-2 py-0.5 text-xs font-bold ${className}`}>
      <TechIcon name={name} />
      {name}
    </li>
  );
}
