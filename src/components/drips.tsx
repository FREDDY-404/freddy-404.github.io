"use client";

import { useEffect, useRef } from "react";

/*
 * Liquid drips rendered as SVG metaballs.
 * A blur + alpha-threshold filter ("goo") makes nearby shapes merge like
 * fluid; a specular-lighting pass on the same alpha adds a wet highlight.
 * Each strand's tip swells until it's too heavy, then pinches off into a
 * falling drop that stretches with speed while the strand springs back.
 */

const W = 600;
const H = 800;
const BAND = 36; // pooled liquid along the top edge

// x, strand width, resting length, bulb growth (px/s). Fixed so SSR matches.
const STRANDS = [
  { x: 28, w: 20, base: 120, grow: 3.2 },
  { x: 78, w: 12, base: 60, grow: 2.1 },
  { x: 128, w: 26, base: 260, grow: 4.4 },
  { x: 186, w: 14, base: 110, grow: 2.6 },
  { x: 236, w: 22, base: 190, grow: 3.6 },
  { x: 290, w: 10, base: 48, grow: 1.8 },
  { x: 334, w: 28, base: 340, grow: 4.8 },
  { x: 396, w: 16, base: 150, grow: 2.9 },
  { x: 448, w: 24, base: 230, grow: 4 },
  { x: 506, w: 12, base: 80, grow: 2.2 },
  { x: 556, w: 20, base: 170, grow: 3.4 },
];

// Bumps along the pooled edge so it reads as liquid, not a ruler line
const LIP = [
  [10, 16], [52, 12], [100, 18], [158, 11], [210, 15], [262, 13],
  [312, 17], [366, 12], [420, 16], [476, 11], [528, 15], [584, 14],
];

const POOL = 20; // reusable falling drops
const GRAVITY = 2100;

const restBulb = (w: number) => w * 0.55;

export function Drips({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const strandEls = useRef<(SVGRectElement | null)[]>([]);
  const bulbEls = useRef<(SVGCircleElement | null)[]>([]);
  const dropEls = useRef<(SVGEllipseElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const strands = STRANDS.map((s, i) => ({
      // stagger so they don't all fall together
      bulb: restBulb(s.w) + ((i * 7) % 5) * 0.08 * s.w,
      t: i * 0.9,
      recoil: 0,
      recoilV: 0,
    }));
    const drops = Array.from({ length: POOL }, () => ({
      active: false,
      x: 0,
      y: 0,
      v: 0,
      r: 0,
    }));

    let raf = 0;
    let last = performance.now();
    let running = false;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      STRANDS.forEach((s, i) => {
        const st = strands[i];
        st.t += dt;
        // uneven feed: liquid arrives in slow pulses
        st.bulb += s.grow * dt * (0.55 + 0.45 * Math.sin(st.t * 1.1 + i));

        // damped spring: the strand bounces after a drop lets go
        st.recoilV += (-70 * st.recoil - 8 * st.recoilV) * dt;
        st.recoil += st.recoilV * dt;

        // heavier tip sags the strand further
        const sag = (st.bulb - restBulb(s.w)) * 2.2;
        const len = s.base + Math.sin(st.t * 0.45 + i * 2) * 6 + sag + st.recoil;

        if (st.bulb > s.w * 1.05) {
          const d = drops.find((d) => !d.active);
          if (d) {
            d.active = true;
            d.x = s.x;
            d.y = BAND + len;
            d.v = 40;
            d.r = st.bulb * 0.92;
          }
          st.bulb = restBulb(s.w) * 0.9;
          st.recoilV = -260; // snap up
        }

        const tipY = BAND + len;
        strandEls.current[i]?.setAttribute("height", String(tipY));
        const b = bulbEls.current[i];
        if (b) {
          b.setAttribute("cy", String(tipY));
          b.setAttribute("r", String(st.bulb));
        }
      });

      drops.forEach((d, j) => {
        const el = dropEls.current[j];
        if (!el || !d.active) return;
        d.v += GRAVITY * dt;
        d.y += d.v * dt;
        // teardrop stretch grows with speed
        const k = Math.min(d.v / 2400, 0.65);
        const ry = d.r * (1 + k);
        const rx = d.r * (1 - k * 0.3);
        if (d.y - ry > H) {
          d.active = false;
          el.setAttribute("rx", "0");
          el.setAttribute("ry", "0");
          return;
        }
        el.setAttribute("cx", String(d.x));
        el.setAttribute("cy", String(d.y));
        el.setAttribute("rx", String(rx));
        el.setAttribute("ry", String(ry));
      });

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only animate while visible on screen and the tab is active
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !document.hidden) start();
      else stop();
    });
    if (svgRef.current) io.observe(svgRef.current);
    const onVis = () => (document.hidden || !onScreen ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMin slice"
      className={`pointer-events-none absolute top-0 [mask-image:linear-gradient(to_right,transparent,black_14%)] ${className}`}
    >
      <defs>
        <linearGradient id="blood-fill" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={H}>
          <stop offset="0" stopColor="#3d0204" />
          <stop offset="0.3" stopColor="#86070c" />
          <stop offset="1" stopColor="#5c0408" />
        </linearGradient>

        <filter
          id="liquid"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={W}
          height={H}
          colorInterpolationFilters="sRGB"
        >
          {/* metaball merge */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11"
            result="goo"
          />
          {/* wet highlight from the upper-left */}
          <feGaussianBlur in="goo" stdDeviation="3.5" result="height" />
          <feSpecularLighting
            in="height"
            surfaceScale="7"
            specularConstant="1.3"
            specularExponent="36"
            lightingColor="#fff4f0"
            result="spec"
          >
            <feDistantLight azimuth="225" elevation="40" />
          </feSpecularLighting>
          <feComposite in="spec" in2="goo" operator="in" result="gloss" />
          {/* darker rim on the shadow side for volume */}
          <feOffset in="height" dx="-5" dy="-3" result="shifted" />
          <feComposite in="goo" in2="shifted" operator="out" result="rim" />
          <feFlood floodColor="#1f0102" floodOpacity="0.75" />
          <feComposite in2="rim" operator="in" result="rimShade" />
          <feMerge>
            <feMergeNode in="goo" />
            <feMergeNode in="rimShade" />
            <feMergeNode in="gloss" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#liquid)" fill="url(#blood-fill)">
        <rect x="0" y="-20" width={W} height={BAND + 20} />
        {LIP.map(([x, r]) => (
          <circle key={x} cx={x} cy={BAND} r={r} />
        ))}
        {STRANDS.map((s, i) => (
          <g key={s.x}>
            <rect
              ref={(el) => {
                strandEls.current[i] = el;
              }}
              x={s.x - s.w / 2}
              y="0"
              width={s.w}
              height={BAND + s.base}
            />
            <circle
              ref={(el) => {
                bulbEls.current[i] = el;
              }}
              cx={s.x}
              cy={BAND + s.base}
              r={restBulb(s.w)}
            />
          </g>
        ))}
        {Array.from({ length: POOL }, (_, j) => (
          <ellipse
            key={j}
            ref={(el) => {
              dropEls.current[j] = el;
            }}
            rx="0"
            ry="0"
          />
        ))}
      </g>
    </svg>
  );
}
