"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { ArrowUpRight } from "@/components/icons";
import type { Project } from "@/data/portfolio";

// One muted accent per panel, cycling like the four portraits
const ACCENTS = ["bg-plum", "bg-plaid", "bg-army", "bg-mauve"];
const ACCENT_TEXT = ["text-plum", "text-plaid", "text-army", "text-mauve"];

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
        className={`cursor-pointer border px-3.5 py-1.5 text-sm transition-colors ${
          on
            ? "border-on-frame bg-on-frame text-ink"
            : "border-white/25 text-on-frame-muted hover:border-on-frame hover:text-on-frame"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <div role="group" aria-label="Filter projects by technology" className="mb-6 flex flex-wrap gap-2">
        {chip("All", null)}
        {tags.map((t) => chip(t, t))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {projects.length} projects
      </p>

      {/* White panels on the navy frame, separated by thick gutters */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {shown.map((p, i) => {
          const featured = i === 0 && shown.length % 2 === 1 && shown.length > 1;
          const live = p.links && p.links.length > 0;
          const n = projects.indexOf(p);
          const accent = ACCENTS[n % ACCENTS.length];
          const accentText = ACCENT_TEXT[n % ACCENT_TEXT.length];
          return (
            <article
              key={p.title}
              className={`panel group flex flex-col ${featured ? "md:col-span-2 md:grid md:grid-cols-[1.3fr_1fr]" : ""}`}
            >
              <div className="relative aspect-video overflow-hidden bg-panel-2 md:aspect-auto md:min-h-64">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(p.image)}
                    alt={`Screenshot of ${p.title}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className={`absolute inset-0 grid place-items-center ${accent}`}>
                    <span className="cover-title px-6 text-center text-2xl text-white">{p.title}</span>
                  </div>
                )}
                {featured && (
                  <span className="cover-title absolute top-0 left-0 bg-frame px-3 py-1.5 text-xs text-on-frame">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-ink-subtle">
                  <span aria-hidden className={`h-3 w-3 ${accent}`} />
                  <span className="cover-title">No. {String(n + 1).padStart(2, "0")}</span>
                  <span aria-hidden>·</span>
                  <span>{p.period}</span>
                  {live && (
                    <>
                      <span aria-hidden>·</span>
                      <span className="font-medium text-army">Live</span>
                    </>
                  )}
                </div>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">{p.title}</h3>
                <p className={`mt-0.5 text-sm font-medium ${accentText}`}>{p.role}</p>
                <p className="mt-3 leading-relaxed text-ink-muted">{p.summary}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {p.tags.slice(0, 5).map((t) => (
                    <li key={t} className="bg-panel-2 px-2 py-0.5 text-xs text-ink-muted">
                      {t}
                    </li>
                  ))}
                  {p.tags.length > 5 && <li className="px-1 py-0.5 text-xs text-ink-subtle">+{p.tags.length - 5}</li>}
                </ul>

                {p.highlights && (
                  <details className="group/d mt-4">
                    <summary className="cursor-pointer list-none text-sm font-medium text-ink underline underline-offset-4 hover:text-plaid">
                      <span className="group-open/d:hidden">Read more</span>
                      <span className="hidden group-open/d:inline">Show less</span>
                    </summary>
                    <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5">
                          <span aria-hidden className={`mt-2 size-1.5 shrink-0 ${accent}`} />
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
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                          li === 0 ? "bg-ink text-white hover:bg-frame-2" : "border border-line text-ink hover:bg-panel-2"
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
