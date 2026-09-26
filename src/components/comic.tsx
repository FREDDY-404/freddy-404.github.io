/*
 * Hand-drawn cartoon pieces: ink-outlined clouds, an explosion burst, and a
 * little plane towing a banner. Original SVG; CSS animations are transform-only
 * and stop under prefers-reduced-motion.
 */

// Star-burst polygon points (deterministic, so SSR matches the client)
function burstPoints(spikes: number, outer: number, inner: number, jitter = 0) {
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer - ((i * 7) % 5) * jitter : inner;
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    pts.push(`${(100 + Math.cos(a) * r).toFixed(1)},${(100 + Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(" ");
}

export function Burst({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className}>
      <polygon points={burstPoints(16, 98, 66, 4)} fill="#f2c53d" stroke="#16130f" strokeWidth="3" strokeLinejoin="round" />
      <polygon points={burstPoints(12, 70, 46, 3)} fill="#ec5a2a" stroke="#16130f" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points={burstPoints(10, 44, 28)} fill="#d8342a" />
    </svg>
  );
}

// Ink outline of the union: stroked circles underneath, filled circles on top
const CLOUD_BUMPS = [
  [52, 70, 30], [92, 48, 38], [138, 54, 34], [176, 74, 26], [28, 84, 20], [110, 84, 30],
];
export function InkCloud({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 210 118" className={className}>
      <g fill="#16130f" stroke="#16130f" strokeWidth="7">
        {CLOUD_BUMPS.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <g fill="#fbf7ec">
        {CLOUD_BUMPS.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      {/* doodle shading */}
      <path d="M40 96 q20 8 44 2 M120 102 q24 6 50 -4" stroke="#16130f" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function BannerPlane({ text, className = "" }: { text: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 420 90" className={className}>
      <g className="plane-bob" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {/* banner */}
        <path d="M10 22 Q70 12 130 22 Q190 32 250 22 L250 66 Q190 76 130 66 Q70 56 10 66 Z" fill="#fbf7ec" stroke="#16130f" strokeWidth="3" strokeLinejoin="round" />
        <text x="130" y="53" textAnchor="middle" fontFamily="var(--font-luckiest), sans-serif" fontSize="24" fill="#d8342a" letterSpacing="1">
          {text}
        </text>
        {/* tow rope */}
        <path d="M250 30 L300 42 M250 58 L300 46" stroke="#16130f" strokeWidth="2" />
        {/* plane */}
        <path d="M300 44 Q300 30 330 30 L380 32 Q398 34 400 44 Q398 54 380 56 L330 58 Q300 58 300 44Z" fill="#d8342a" stroke="#16130f" strokeWidth="3" />
        <path d="M312 30 L304 14 L318 14 L330 30Z" fill="#f2c53d" stroke="#16130f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M338 50 L352 76 L368 76 L362 50Z" fill="#f2c53d" stroke="#16130f" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="368" cy="40" r="6" fill="#86c5e6" stroke="#16130f" strokeWidth="2.5" />
        <ellipse cx="404" cy="44" rx="3" ry="16" fill="#16130f" opacity="0.55" />
      </g>
    </svg>
  );
}

/* The hero sky: drifting ink clouds + the banner plane */
export function ComicSky() {
  const clouds = [
    { left: 42, top: 10, w: 130, dur: 18, delay: -6 },
    { left: 86, top: 8, w: 150, dur: 14, delay: 0 },
    { left: 44, top: 78, w: 120, dur: 16, delay: -3 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {clouds.map((c, i) => (
        <div
          key={i}
          className="cloud absolute hidden sm:block"
          style={{ left: `${c.left}%`, top: `${c.top}%`, width: c.w, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
        >
          <InkCloud className="h-auto w-full" />
        </div>
      ))}
      <div className="plane absolute top-3 left-0 w-72 sm:w-96">
        <BannerPlane text="OPEN TO WORK!" className="h-auto w-full" />
      </div>
    </div>
  );
}
