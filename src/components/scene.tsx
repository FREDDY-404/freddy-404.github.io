/*
 * Hero landscape: sunset sky, painted clouds, a faint rainbow, rolling hills,
 * a sunflower field, and bumblebees. All original SVG; animation is CSS
 * transform-only and switches off under prefers-reduced-motion.
 */

// Fixed values so server and client render identically.
const CLOUDS = [
  { left: 3, top: 9, w: 220, dur: 22, delay: 0 },
  { left: 30, top: 3, w: 150, dur: 26, delay: -8 },
  { left: 88, top: 4, w: 170, dur: 24, delay: -5 },
];

const BEES = [
  { left: 6, top: 30, size: 58, dur: 9, delay: 0, flip: false },
  { left: 32, top: 8, size: 38, dur: 11, delay: -3, flip: true },
  { left: 38, top: 50, size: 44, dur: 10, delay: -6, flip: false },
  { left: 88, top: 28, size: 60, dur: 12, delay: -2, flip: true },
  { left: 90, top: 60, size: 34, dur: 8, delay: -4, flip: false },
];

// [x, y, scale] in a 1200×240 box; back row first so the front overlaps it
const FLOWERS_BACK = [
  [40, 120, 0.55], [150, 105, 0.5], [270, 125, 0.6], [520, 110, 0.5], [640, 128, 0.55],
  [760, 108, 0.5], [880, 122, 0.6], [1010, 104, 0.5], [1130, 118, 0.55],
];
const FLOWERS_FRONT = [
  [-10, 175, 0.95], [95, 190, 0.8], [210, 180, 1.05], [330, 200, 0.85], [450, 185, 1],
  [580, 205, 0.9], [700, 180, 1.1], [830, 198, 0.85], [950, 178, 1.05], [1070, 195, 0.9],
  [1190, 182, 1],
];

function Cloud() {
  return (
    <svg viewBox="0 0 220 110" className="h-auto w-full drop-shadow-[0_10px_12px_rgba(120,40,10,0.25)]">
      <defs>
        <linearGradient id="cloud-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#fff6ea" />
          <stop offset="1" stopColor="#e7d6c6" />
        </linearGradient>
      </defs>
      <g fill="url(#cloud-shade)">
        <circle cx="60" cy="68" r="32" />
        <circle cx="98" cy="46" r="38" />
        <circle cx="140" cy="52" r="34" />
        <circle cx="176" cy="70" r="26" />
        <circle cx="34" cy="80" r="20" />
        <rect x="30" y="68" width="170" height="34" rx="17" />
      </g>
    </svg>
  );
}

function Bee({ flip }: { flip: boolean }) {
  return (
    <svg viewBox="0 0 80 60" className="h-auto w-full" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      {/* wings */}
      <ellipse className="wing" cx="34" cy="16" rx="11" ry="15" fill="#fffaf0" fillOpacity="0.75" stroke="#ffffff" strokeWidth="1" />
      <ellipse className="wing" cx="48" cy="17" rx="9" ry="13" fill="#fffaf0" fillOpacity="0.6" stroke="#ffffff" strokeWidth="1" />
      {/* body */}
      <ellipse cx="40" cy="38" rx="24" ry="15" fill="#ffc93c" />
      <path d="M30 24 Q26 38 30 52" stroke="#2a1a0e" strokeWidth="6" fill="none" />
      <path d="M44 23 Q40 38 44 53" stroke="#2a1a0e" strokeWidth="6" fill="none" />
      <path d="M58 28 Q55 38 58 48" stroke="#2a1a0e" strokeWidth="5" fill="none" />
      {/* head + stinger */}
      <circle cx="16" cy="36" r="10" fill="#2a1a0e" />
      <circle cx="13" cy="33" r="2" fill="#fffaf0" />
      <path d="M63 38 L72 40 L63 42 Z" fill="#2a1a0e" />
      {/* fuzz highlight */}
      <ellipse cx="40" cy="31" rx="16" ry="4" fill="#fff1c9" opacity="0.45" />
    </svg>
  );
}

function SunflowerDefs() {
  return (
    <defs>
      <radialGradient id="seeds" cx="0.45" cy="0.4" r="0.6">
        <stop offset="0" stopColor="#7a4a1c" />
        <stop offset="0.7" stopColor="#4a2c12" />
        <stop offset="1" stopColor="#2e1a0a" />
      </radialGradient>
      <symbol id="sunflower" viewBox="-50 -50 100 100" overflow="visible">
        {Array.from({ length: 18 }, (_, i) => (
          <ellipse
            key={`a${i}`}
            rx="7"
            ry="21"
            cy="-26"
            transform={`rotate(${i * 20})`}
            fill={i % 2 ? "#f7b500" : "#ffc93c"}
            stroke="#d98a00"
            strokeWidth="0.8"
          />
        ))}
        {Array.from({ length: 18 }, (_, i) => (
          <ellipse
            key={`b${i}`}
            rx="6"
            ry="17"
            cy="-22"
            transform={`rotate(${i * 20 + 10})`}
            fill="#eea200"
            stroke="#c97a00"
            strokeWidth="0.6"
          />
        ))}
        <circle r="18" fill="url(#seeds)" />
        {Array.from({ length: 14 }, (_, i) => (
          <circle
            key={`s${i}`}
            r="1.4"
            cx={Math.cos((i / 14) * Math.PI * 2) * 11}
            cy={Math.sin((i / 14) * Math.PI * 2) * 11}
            fill="#8a5a26"
          />
        ))}
      </symbol>
    </defs>
  );
}

function Flower({ x, y, s, dim = false }: { x: number; y: number; s: number; dim?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={dim ? 0.85 : 1}>
      <g className="sway">
        <path d="M0 10 C4 60 -4 110 2 200" stroke="#2f6b2a" strokeWidth="7" fill="none" />
        <path d="M2 70 C22 56 38 62 46 72 C30 80 14 80 2 70Z" fill="#3f8a36" />
        <path d="M0 110 C-22 96 -38 102 -46 112 C-30 120 -14 120 0 110Z" fill="#357a2f" />
        <use href="#sunflower" x="-50" y="-50" width="100" height="100" />
      </g>
    </g>
  );
}

export function Sunflowers({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 240"
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none ${className}`}
    >
      <SunflowerDefs />
      {FLOWERS_BACK.map(([x, y, s], i) => (
        <Flower key={`b${i}`} x={x} y={y} s={s} dim />
      ))}
      {FLOWERS_FRONT.map(([x, y, s], i) => (
        <Flower key={`f${i}`} x={x} y={y} s={s} />
      ))}
    </svg>
  );
}

export function Hills({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 400" preserveAspectRatio="none" className={`pointer-events-none ${className}`}>
      <defs>
        <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fb35f" />
          <stop offset="1" stopColor="#4f8b44" />
        </linearGradient>
        <linearGradient id="hill-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a8a3f" />
          <stop offset="1" stopColor="#2c5a2e" />
        </linearGradient>
      </defs>
      <path d="M0 170 C240 80 480 150 720 115 S1200 55 1440 135 V400 H0Z" fill="url(#hill-back)" opacity="0.9" />
      <path d="M0 250 C300 190 600 285 900 235 S1300 195 1440 245 V400 H0Z" fill="url(#hill-front)" />
      <path d="M1010 400 C985 330 1120 300 1060 250 C1030 225 1080 205 1110 196" stroke="#d9b27a" strokeWidth="9" fill="none" opacity="0.8" strokeLinecap="round" />
    </svg>
  );
}

export function Sky() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* faint rainbow */}
      <svg viewBox="0 0 400 400" className="absolute -right-24 -top-10 w-[420px] opacity-35">
        {["#ff4b3e", "#ff9f1c", "#ffe066", "#7bd389", "#5bc0eb", "#9b5de5"].map((c, i) => (
          <circle key={c} cx="400" cy="400" r={330 - i * 9} fill="none" stroke={c} strokeWidth="9" />
        ))}
      </svg>

      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="cloud absolute hidden sm:block"
          style={{ left: `${c.left}%`, top: `${c.top}%`, width: c.w, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
        >
          <Cloud />
        </div>
      ))}

      {BEES.map((b, i) => (
        <div
          key={i}
          className="bee absolute z-10 hidden sm:block"
          style={{ left: `${b.left}%`, top: `${b.top}%`, width: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        >
          <Bee flip={b.flip} />
        </div>
      ))}
    </div>
  );
}

/* Small sunflower mark for section headings */
export function SunflowerIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="-50 -50 100 100" className={className}>
      <SunflowerDefs />
      <use href="#sunflower" x="-50" y="-50" width="100" height="100" />
    </svg>
  );
}
