"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { ArrowUpRight } from "@/components/icons";
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
        className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
          on ? "border-fg bg-fg text-white" : "border-border bg-surface/70 text-muted hover:border-subtle hover:text-fg"
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

      <div className="grid gap-6 md:grid-cols-2">
        {shown.map((p, i) => {
          // With an odd count, the first card spans the row as a featured project
          const featured = i === 0 && shown.length % 2 === 1 && shown.length > 1;
          const live = p.links && p.links.length > 0;
          const n = projects.indexOf(p) + 1;
          return (
            <article
              key={p.title}
              className={`case group relative flex flex-col overflow-hidden p-2 transition-transform hover:-translate-y-1 ${
                featured ? "md:col-span-2 md:grid md:grid-cols-[1.3fr_1fr]" : ""
              }`}
            >
              <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-surface-2 md:aspect-auto md:min-h-64">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(p.image)}
                    alt={`Screenshot of ${p.title}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="iridescent absolute inset-0 opacity-35" />
                )}
                {!p.image && (
                  <span className="absolute inset-0 grid place-items-center font-mono text-xs tracking-[0.3em] text-fg/60 uppercase">
                    {p.title}
                  </span>
                )}
                {featured && (
                  <span className="absolute top-3 right-0">
                    <span className="tape inline-block px-4 py-1 font-marker text-sm">featured</span>
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-subtle uppercase">
                  <span>Track {String(n).padStart(2, "0")}</span>
                  <span aria-hidden>·</span>
                  <span>{p.period}</span>
                  {live && (
                    <>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1.5 text-tape-deep">
                        <span className="size-1.5 rounded-full bg-tape" />
                        Live
                      </span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-0.5 text-sm text-subtle">{p.role}</p>
                <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {p.tags.slice(0, 5).map((t) => (
                    <li key={t} className="rounded-md border border-border bg-surface/80 px-2 py-0.5 font-mono text-xs text-muted">
                      {t}
                    </li>
                  ))}
                  {p.tags.length > 5 && (
                    <li className="px-1 py-0.5 font-mono text-xs text-subtle">+{p.tags.length - 5}</li>
                  )}
                </ul>

                {p.highlights && (
                  <details className="group/d mt-4">
                    <summary className="cursor-pointer list-none text-sm font-medium text-fg underline decoration-tape decoration-2 underline-offset-4 hover:text-tape-deep">
                      <span className="group-open/d:hidden">Read more</span>
                      <span className="hidden group-open/d:inline">Show less</span>
                    </summary>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5">
                          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-tape" />
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
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                          li === 0 ? "bg-fg text-white hover:bg-fg/85" : "border border-border bg-surface/70 hover:bg-surface"
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
