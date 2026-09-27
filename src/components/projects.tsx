"use client";

import { useState } from "react";
import { ProjectCover } from "@/components/project-art";
import { ArrowUpRight, Star } from "@/components/icons";
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
          const featured = i === 0 && shown.length % 2 === 1 && shown.length > 1;
          const live = p.links && p.links.length > 0;
          const n = projects.indexOf(p) + 1;
          return (
            <article
              key={p.title}
              className={`panel group flex flex-col overflow-hidden transition-transform hover:-translate-y-1 ${
                featured ? "md:col-span-2 md:grid md:grid-cols-[1.3fr_1fr]" : ""
              }`}
            >
              {/* Original cover art for the project (decorative; the text below carries the content) */}
              <div
                aria-hidden
                className={`relative overflow-hidden border-ink ${
                  featured ? "aspect-4/3 border-b-3 md:aspect-auto md:min-h-96 md:border-r-3 md:border-b-0" : "aspect-4/3 border-b-3"
                }`}
              >
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                  <ProjectCover art={p.art} title={p.title} index={n - 1} period={p.period} featured={featured} />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                {(live || featured) && (
                  <div className="mb-2 flex items-center gap-3 text-xs">
                    {featured && (
                      <span className="-rotate-2 rounded-md border-2 border-ink bg-boom px-2.5 py-0.5 font-display text-sm text-paper">Featured</span>
                    )}
                    {live && (
                      <span className="rounded-full border-2 border-ink bg-grass px-2.5 py-0.5 font-extrabold">● Live</span>
                    )}
                  </div>
                )}
                <h3 className="font-display text-3xl leading-tight tracking-wide">{p.title}</h3>
                <p className="mt-0.5 text-sm font-extrabold text-boom">{p.role}</p>
                <p className="mt-3 leading-relaxed text-ink/85">{p.summary}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {p.tags.slice(0, 5).map((t) => (
                    <li key={t} className="rounded border-2 border-ink bg-paper-2 px-2 py-0.5 text-xs font-bold">
                      {t}
                    </li>
                  ))}
                  {p.tags.length > 5 && <li className="px-1 py-0.5 text-xs font-bold text-ink-muted">+{p.tags.length - 5}</li>}
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
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
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
          );
        })}
      </div>
    </>
  );
}
