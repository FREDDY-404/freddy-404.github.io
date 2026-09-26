"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import type { Project } from "@/data/portfolio";

export function Projects({ projects }: { projects: Project[] }) {
  // Only offer filters for technologies used in 2+ projects — keeps the bar short
  const counts = new Map<string, number>();
  projects.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  const tags = [...counts].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([t]) => t);

  const [active, setActive] = useState<string | null>(null);
  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;

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

  return (
    <>
      <div role="group" aria-label="Filter projects by technology" className="mb-8 flex flex-wrap gap-2">
        {chip("All", null)}
        {tags.map((t) => chip(t, t))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {projects.length} projects
      </p>

      <div className="grid gap-7 md:grid-cols-2">
        {shown.map((p, i) => {
          const n = projects.indexOf(p) + 1;
          // With an odd count, the first card spans the row as a featured project
          const featured = i === 0 && shown.length % 2 === 1 && shown.length > 1;
          return (
            <article
              key={p.title}
              className={`panel flex flex-col overflow-hidden ${featured ? "md:col-span-2 md:grid md:grid-cols-[1.25fr_1fr]" : ""}`}
            >
              {/* Screenshot, or an illustrated placeholder when there isn't one */}
              <div
                className={`relative aspect-video border-ink bg-sky ${featured ? "border-b-3 md:aspect-auto md:min-h-80 md:border-r-3 md:border-b-0" : "border-b-3"}`}
              >
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(p.image)}
                    alt={`Screenshot of ${p.title}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="halftone grid h-full place-items-center bg-mustard">
                    <span className="cartoon-title-sm font-display text-5xl text-paper">{p.title}</span>
                  </div>
                )}
                <span className="absolute top-3 left-3 rounded-md border-2 border-ink bg-paper px-2 py-0.5 font-display text-lg leading-none">
                  #{String(n).padStart(2, "0")}
                </span>
                {featured && (
                  <span className="absolute bottom-3 left-3 -rotate-2 rounded-md border-2 border-ink bg-boom px-2.5 py-0.5 font-display text-lg leading-none text-paper">
                    Featured
                  </span>
                )}
                {p.links && p.links.length > 0 && (
                  <span className="absolute top-3 right-3 rounded-full border-2 border-ink bg-grass px-2.5 py-0.5 text-xs font-extrabold text-ink">
                    ● Live
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl leading-tight tracking-wide sm:text-3xl">{p.title}</h3>
                  <span className="shrink-0 text-sm font-bold text-ink-muted">{p.period}</span>
                </div>
                <p className="mt-0.5 text-sm font-extrabold text-boom">{p.role}</p>
                <p className="mt-3 leading-relaxed text-ink/85">{p.summary}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 5).map((t) => (
                    <span key={t} className="rounded border-2 border-ink bg-paper-2 px-2 py-0.5 text-xs font-bold">
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 5 && (
                    <span className="px-1 py-0.5 text-xs font-bold text-ink-muted">+{p.tags.length - 5} more</span>
                  )}
                </div>

                {p.highlights && (
                  <details className="group mt-4">
                    <summary className="cursor-pointer list-none text-sm font-extrabold text-ink underline decoration-2 underline-offset-4 hover:text-boom">
                      <span className="group-open:hidden">Read more ↓</span>
                      <span className="hidden group-open:inline">Show less ↑</span>
                    </summary>
                    <ul className="mt-3 space-y-1.5 text-sm text-ink/85">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="text-boom">★</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {p.links && p.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-3 pt-5">
                    {p.links.map((l, i) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`rounded-full border-3 border-ink px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none ${
                          i === 0 ? "bg-mustard" : "bg-paper"
                        }`}
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
