import type { ProjectArt } from "@/data/portfolio";

/*
 * Original cover art for each project, drawn in the site palette:
 * a flat colour ground, the title in heavy yellow, and an illustration
 * of what the project is, lit in electric blue.
 */

type Palette = { bg: string; dark: string; mid: string; light: string; accent: string };

// Grounds cycle red → blue → navy so neighbouring cards differ
const PALETTES: Palette[] = [
  { bg: "#d91a3c", dark: "#0a0a22", mid: "#3b4bff", light: "#8fa2ff", accent: "#f5c518" },
  { bg: "#3b4bff", dark: "#0a0a22", mid: "#1b1b4d", light: "#c9d2ff", accent: "#f5c518" },
  { bg: "#12123a", dark: "#0a0a22", mid: "#3b4bff", light: "#8fa2ff", accent: "#f5c518" },
];

function Illustration({ art, c }: { art: ProjectArt; c: Palette }) {
  switch (art) {
    // Digital store: shopping bag with a play button, a card, and a price tag
    case "store":
      return (
        <g>
          <rect x="112" y="44" width="58" height="38" rx="6" fill={c.light} transform="rotate(12 141 63)" />
          <rect x="112" y="52" width="58" height="7" fill={c.dark} transform="rotate(12 141 63)" />
          <path d="M76 40 q0 -22 24 -22 q24 0 24 22" fill="none" stroke={c.dark} strokeWidth="6" strokeLinecap="round" />
          <path d="M60 40 h80 l-6 70 h-68 z" fill={c.mid} />
          <path d="M60 40 h80 l-2 16 h-76 z" fill={c.dark} opacity="0.35" />
          <circle cx="100" cy="78" r="18" fill={c.dark} />
          <path d="M94 69 l15 9 -15 9 z" fill={c.accent} />
          <g transform="rotate(-18 40 92)">
            <path d="M22 80 h30 l10 12 -10 12 h-30 z" fill={c.accent} />
            <circle cx="28" cy="92" r="3" fill={c.bg} />
            <text x="44" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill={c.dark} fontFamily="sans-serif">Ks</text>
          </g>
        </g>
      );
    // Smart lock: door, padlock with keyhole, RFID card with signal, 2FA code
    case "lock":
      return (
        <g>
          <rect x="34" y="16" width="58" height="96" rx="4" fill={c.dark} />
          <rect x="42" y="24" width="42" height="36" rx="2" fill={c.mid} opacity="0.55" />
          <rect x="42" y="66" width="42" height="38" rx="2" fill={c.mid} opacity="0.55" />
          <path d="M104 58 v-12 a18 18 0 0 1 36 0 v12" fill="none" stroke={c.light} strokeWidth="7" />
          <rect x="96" y="56" width="52" height="42" rx="6" fill={c.mid} />
          <circle cx="122" cy="72" r="5" fill={c.dark} />
          <rect x="120" y="74" width="4" height="12" rx="2" fill={c.dark} />
          <rect x="150" y="84" width="34" height="22" rx="3" fill={c.accent} transform="rotate(-10 167 95)" />
          <path d="M160 70 q8 -6 16 0 M156 62 q12 -10 24 0" fill="none" stroke={c.accent} strokeWidth="3" strokeLinecap="round" />
          <g fill={c.light}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx={100 + i * 9} cy="110" r="3" />
            ))}
          </g>
        </g>
      );
    // Workshop game: coffee cup steaming </>, plus a controller
    case "coffee":
      return (
        <g>
          <text x="98" y="36" textAnchor="middle" fontSize="26" fontWeight="800" fill={c.accent} fontFamily="monospace">
            {"</>"}
          </text>
          <path d="M60 46 h76 l-8 52 a10 10 0 0 1 -10 8 h-40 a10 10 0 0 1 -10 -8 z" fill={c.mid} />
          <path d="M60 46 h76 l-1.5 10 h-73 z" fill={c.light} opacity="0.5" />
          <path d="M134 58 q24 0 20 20 q-4 16 -24 12" fill="none" stroke={c.mid} strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="98" cy="110" rx="56" ry="7" fill={c.dark} />
          <g transform="translate(150 20)">
            <rect x="0" y="0" width="40" height="24" rx="12" fill={c.dark} />
            <path d="M10 8 v8 M6 12 h8" stroke={c.light} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="28" cy="9" r="2.5" fill={c.accent} />
            <circle cx="33" cy="15" r="2.5" fill={c.light} />
          </g>
        </g>
      );
    // Smoke detection: shield with smoke curls and an alert signal
    case "shield":
      return (
        <g>
          <path d="M100 12 l42 14 v34 c0 28 -20 46 -42 56 c-22 -10 -42 -28 -42 -56 v-34 z" fill={c.dark} />
          <path d="M100 22 l32 11 v27 c0 22 -15 36 -32 44 c-17 -8 -32 -22 -32 -44 v-27 z" fill={c.mid} />
          <path
            d="M84 86 q-8 -10 2 -18 q10 -8 2 -18 M100 90 q-8 -12 2 -22 q10 -10 2 -22 M116 86 q-8 -10 2 -18 q10 -8 2 -18"
            fill="none"
            stroke={c.light}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="150" cy="30" r="7" fill={c.accent} />
          <path d="M160 18 q10 12 0 24 M168 12 q16 18 0 36" fill="none" stroke={c.accent} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    // Plant shop: potted plant with a price tag
    case "plant":
      return (
        <g>
          <path d="M100 70 C100 50 100 36 100 24" stroke={c.dark} strokeWidth="4" />
          <ellipse cx="80" cy="44" rx="22" ry="10" fill={c.mid} transform="rotate(-30 80 44)" />
          <ellipse cx="120" cy="36" rx="22" ry="10" fill={c.light} transform="rotate(28 120 36)" />
          <ellipse cx="82" cy="66" rx="20" ry="9" fill={c.light} transform="rotate(-18 82 66)" />
          <ellipse cx="120" cy="62" rx="20" ry="9" fill={c.mid} transform="rotate(20 120 62)" />
          <ellipse cx="100" cy="20" rx="8" ry="16" fill={c.mid} />
          <path d="M70 76 h60 l-8 38 h-44 z" fill={c.dark} />
          <rect x="66" y="72" width="68" height="10" rx="3" fill={c.mid} />
          <g transform="rotate(14 156 86)">
            <path d="M138 76 h30 l10 11 -10 11 h-30 z" fill={c.accent} />
            <circle cx="144" cy="87" r="3" fill={c.bg} />
            <path d="M152 83 h14 M152 90 h10" stroke={c.dark} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>
      );
  }
}

export function ProjectCover({
  art,
  title,
  index,
  period,
  featured = false,
}: {
  art: ProjectArt;
  title: string;
  index: number;
  period: string;
  featured?: boolean;
}) {
  const c = PALETTES[index % PALETTES.length];
  return (
    <div className="grain relative h-full w-full overflow-hidden" style={{ backgroundColor: c.bg }}>
      {/* soft blue light behind the illustration */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3/4"
        style={{ background: `radial-gradient(ellipse at 50% 75%, ${c.mid}88, transparent 65%)` }}
      />
      <div className="relative z-10 flex h-full flex-col p-5">
        <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase">
          <span>No. {String(index + 1).padStart(2, "0")}</span>
          <span>{period}</span>
        </div>
        <p className={`title-yellow mt-2 text-center ${featured ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"}`}>
          {title}
        </p>
        <svg
          aria-hidden
          viewBox="0 0 200 120"
          className={`mx-auto mt-auto w-full drop-shadow-[0_10px_18px_rgba(10,10,34,0.45)] ${featured ? "max-w-[26rem]" : "max-w-[22rem]"}`}
        >
          <Illustration art={art} c={c} />
        </svg>
      </div>
    </div>
  );
}
