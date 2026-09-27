"use client";

import { useEffect, useRef, useState } from "react";
import { TechChip } from "@/components/tech-icon";
import { ProjectCover } from "@/components/project-art";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight, Star } from "@/components/icons";
import type { Project } from "@/data/portfolio";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
      {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  // Only offer filters for technologies used in 2+ projects — keeps the bar short
  const counts = new Map<string, number>();
  projects.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  const tags = [...counts].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([t]) => t);

  const [active, setActive] = useState<string | null>(null);
  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  // Horizontal track: arrows, progress, and which ends are reachable
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
  };

  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  const chip = (label: string, value: string | null) => {
    const on = active === value;
    return (
      <button
        key={label}
        onClick={() => setActive(value)}
        aria-pressed={on}
        className={`cursor-pointer rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-extrabold transition-transform hover:-translate-y-0.5 ${
          on ? "bg-ink text-mustard" : "bg-paper text-ink"
        }`}
      >
        {label}
      </button>
    );
  };

  const arrowBtn =
    "grid size-12 cursor-pointer place-items-center rounded-full border-3 border-ink bg-paper shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-40 disabled:hover:translate-y-0";

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div role="group" aria-label="Filter projects by technology" className="flex flex-wrap gap-2">
          {chip("All", null)}
          {tags.map((t) => chip(t, t))}
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous project" className={arrowBtn}>
            <Arrow dir="left" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next project" className={arrowBtn}>
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {projects.length} projects
      </p>

      {/* Scroll-snapping row of portrait cards */}
      <div
        ref={track}
        onScroll={update}
        tabIndex={0}
        aria-label="Projects, scroll sideways"
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pt-2 pb-8"
      >
        {shown.map((p, i) => {
          const live = p.links && p.links.length > 0;
          const n = projects.indexOf(p) + 1;
          return (
            <Reveal key={p.title} delay={i * 90} className="w-[82%] shrink-0 snap-start sm:w-84">
              <article data-card className="panel group flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-1.5 hover:-rotate-1">
                <div aria-hidden className="relative aspect-4/5 overflow-hidden border-b-3 border-ink">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                    <ProjectCover art={p.art} title={p.title} index={n - 1} period={p.period} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  {live && (
                    <span className="mb-2 w-fit rounded-full border-2 border-ink bg-grass px-2.5 py-0.5 text-xs font-extrabold">● Live</span>
                  )}
                  <h3 className="font-display text-2xl leading-tight tracking-wide">{p.title}</h3>
                  <p className="mt-0.5 text-sm font-extrabold text-boom">{p.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/85">{p.summary}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {p.tags.slice(0, 4).map((t) => (
                      <TechChip key={t} name={t} />
                    ))}
                    {p.tags.length > 4 && <li className="px-1 py-0.5 text-xs font-bold text-ink-muted">+{p.tags.length - 4}</li>}
                  </ul>

                  {p.highlights && (
                    <details className="group/d mt-4">
                      <summary className="cursor-pointer list-none text-sm font-extrabold underline decoration-2 underline-offset-4 hover:text-boom">
                        <span className="group-open/d:hidden">Read more</span>
                        <span className="hidden group-open/d:inline">Show less</span>
                      </summary>
                      <ul className="mt-3 space-y-1.5 text-sm text-ink/85">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5">
                            <Star className="mt-1 size-3 shrink-0 text-boom" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  {live && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {p.links!.map((l, li) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-full border-3 border-ink px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none ${
                            li === 0 ? "bg-mustard" : "bg-paper"
                          }`}
                        >
                          {l.label}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* scroll progress */}
      <div aria-hidden className="h-3 overflow-hidden rounded-full border-2 border-ink bg-paper">
        <div className="h-full bg-boom transition-[width] duration-150" style={{ width: `${Math.max(progress, 0.08) * 100}%` }} />
      </div>
    </>
  );
}
