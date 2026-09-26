/*
 * Hero sky scene: drifting clouds, launch rings, floating graduation caps,
 * and twinkling sparkles. Pure CSS animation (transform/opacity only) so it
 * stays cheap; everything stops under prefers-reduced-motion.
 */

// Fixed values so server and client render identically.
const CLOUDS = [
  { top: 4, w: 340, dur: 95, delay: -10, color: "#e06aa8", opacity: 0.55 },
  { top: 16, w: 240, dur: 70, delay: -45, color: "#b24a9e", opacity: 0.6 },
  { top: 34, w: 420, dur: 120, delay: -80, color: "#f08cb4", opacity: 0.35 },
  { top: 52, w: 280, dur: 85, delay: -20, color: "#ff9f8a", opacity: 0.45 },
  { top: 70, w: 360, dur: 110, delay: -60, color: "#ffb58e", opacity: 0.5 },
  { top: 84, w: 220, dur: 75, delay: -35, color: "#ffc9a0", opacity: 0.55 },
];

const CAPS = [
  { left: 58, top: 10, size: 56, r: -14, dur: 6, delay: 0 },
  { left: 80, top: 18, size: 40, r: 18, dur: 7.5, delay: -2 },
  { left: 92, top: 6, size: 30, r: -30, dur: 5.5, delay: -1 },
  { left: 70, top: 32, size: 28, r: 24, dur: 8, delay: -3.5 },
  { left: 88, top: 44, size: 46, r: -8, dur: 6.5, delay: -4 },
];

const SPARKLES = [
  { left: 52, top: 22, size: 18, color: "#ffd23f", delay: 0 },
  { left: 66, top: 8, size: 14, color: "#fff7e8", delay: -0.8 },
  { left: 96, top: 30, size: 16, color: "#2ec4f1", delay: -1.6 },
  { left: 76, top: 56, size: 12, color: "#ffd23f", delay: -2.2 },
  { left: 6, top: 12, size: 14, color: "#fff7e8", delay: -1.2 },
  { left: 40, top: 6, size: 10, color: "#ffd23f", delay: -0.4 },
];

function Cloud({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 80" className="h-auto w-full" fill={color}>
      <circle cx="48" cy="52" r="26" />
      <circle cx="86" cy="36" r="34" />
      <circle cx="130" cy="44" r="30" />
      <circle cx="164" cy="56" r="20" />
      <rect x="26" y="50" width="156" height="28" rx="14" />
    </svg>
  );
}

function Cap() {
  return (
    <svg viewBox="0 0 64 52" className="h-auto w-full drop-shadow-[3px_3px_0_rgba(34,18,56,0.35)]">
      <path d="M14 22v11c0 5 8 9 18 9s18-4 18-9V22l-18 7z" fill="#1a0d2e" />
      <polygon points="32,4 62,16 32,28 2,16" fill="#2b1650" stroke="#221238" strokeWidth="1.5" />
      <path d="M32 16 L52 22 V36" stroke="#ffd23f" strokeWidth="2.2" fill="none" />
      <circle cx="52" cy="38" r="3.4" fill="#ffd23f" />
    </svg>
  );
}

function Sparkle({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" className="h-full w-full" fill={color}>
      <path d="M10 0 C11 7 13 9 20 10 C13 11 11 13 10 20 C9 13 7 11 0 10 C7 9 9 7 10 0Z" />
    </svg>
  );
}

// Colored rings trailing up-left from the portrait, like a launch shockwave
export function LaunchRings({ className = "" }: { className?: string }) {
  const rings = [
    { cx: 150, cy: 40, rx: 26, ry: 10, stroke: "#fff7e8", w: 5 },
    { cx: 118, cy: 78, rx: 40, ry: 15, stroke: "#ff4fa3", w: 7 },
    { cx: 80, cy: 124, rx: 58, ry: 22, stroke: "#fff7e8", w: 9 },
    { cx: 40, cy: 176, rx: 78, ry: 30, stroke: "#7b4dff", w: 9 },
  ];
  return (
    <svg aria-hidden viewBox="-50 0 250 220" className={`pointer-events-none ${className}`}>
      {rings.map((r, i) => (
        <ellipse
          key={i}
          className="ring"
          style={{ animationDelay: `${-i * 0.9}s` }}
          cx={r.cx}
          cy={r.cy}
          rx={r.rx}
          ry={r.ry}
          fill="none"
          stroke={r.stroke}
          strokeWidth={r.w}
          transform={`rotate(-32 ${r.cx} ${r.cy})`}
        />
      ))}
    </svg>
  );
}

export function Sky() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="cloud absolute left-0"
          style={{
            top: `${c.top}%`,
            width: c.w,
            opacity: c.opacity,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <Cloud color={c.color} />
        </div>
      ))}

      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="sparkle absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        >
          <Sparkle color={s.color} />
        </div>
      ))}

      {CAPS.map((c, i) => (
        <div
          key={i}
          className="cap absolute opacity-70 sm:opacity-100"
          style={
            {
              left: `${c.left}%`,
              top: `${c.top}%`,
              width: c.size,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
              "--r": `${c.r}deg`,
            } as React.CSSProperties
          }
        >
          <Cap />
        </div>
      ))}
    </div>
  );
}
