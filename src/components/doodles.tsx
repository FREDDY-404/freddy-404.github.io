/* Pen doodles in the notebook margins (decorative, hidden on small screens) */

const INK = "#2f5f8a";

const DOODLES: { top: string; side: "left" | "right"; rotate: number; el: React.ReactNode }[] = [
  {
    top: "4%",
    side: "left",
    rotate: -8,
    el: (
      <text x="0" y="40" fontSize="44" fontWeight="700" fontFamily="monospace" fill={INK}>
        {"{ }"}
      </text>
    ),
  },
  {
    top: "14%",
    side: "right",
    rotate: 10,
    el: <path d="M40 4l9 24h25l-20 15 8 25-22-15-22 15 8-25L6 28h25z" fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="round" />,
  },
  {
    top: "30%",
    side: "left",
    rotate: 6,
    el: <path d="M6 50C20 20 40 70 56 36s24-6 20 10" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />,
  },
  {
    top: "44%",
    side: "right",
    rotate: -6,
    el: (
      <text x="0" y="40" fontSize="40" fontWeight="700" fontFamily="monospace" fill={INK}>
        {"</>"}
      </text>
    ),
  },
  {
    top: "58%",
    side: "left",
    rotate: -12,
    el: <path d="M44 4L16 44h22l-6 32 30-44H40z" fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="round" />,
  },
  {
    top: "72%",
    side: "right",
    rotate: 8,
    el: (
      <g fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round">
        <path d="M8 40h52" />
        <path d="M44 24l16 16-16 16" />
      </g>
    ),
  },
  {
    top: "86%",
    side: "left",
    rotate: 4,
    el: (
      <text x="0" y="40" fontSize="34" fontWeight="700" fontFamily="monospace" fill={INK}>
        {"git ✓"}
      </text>
    ),
  },
];

export function Doodles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
      {DOODLES.map((d, i) => (
        <svg
          key={i}
          viewBox="0 0 110 80"
          className="absolute w-24 opacity-45"
          style={{ top: d.top, [d.side]: "1.5%", transform: `rotate(${d.rotate}deg)` }}
        >
          {d.el}
        </svg>
      ))}
    </div>
  );
}
