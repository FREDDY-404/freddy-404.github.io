"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import type { Project } from "@/data/portfolio";

export function Projects({ projects }: { projects: Project[] }) {
  const tags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(projects[0]?.title ?? null);
  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  const chip = (label: string, value: string | null) => {
    const on = active === value;
    return (
      <button
        key={label}
        onClick={() => setActive(value)}
        aria-pressed={on}
        className={`cursor-pointer rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
          on ? "bg-cap text-cloud" : "bg-cream text-ink hover:bg-sun"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {chip("All", null)}
        {tags.map((t) => chip(t, t))}
      </div>

      <ol className="divide-y divide-ink/10">
        {shown.map((p) => {
          const n = projects.indexOf(p) + 1;
          const isOpen = open === p.title;
          return (
            <li key={p.title}>
              <button
                onClick={() => setOpen(isOpen ? null : p.title)}
                aria-expanded={isOpen}
                className="group grid w-full cursor-pointer grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 text-left"
              >
                {/* sunflower-center number badge */}
                <span className="grid size-12 place-items-center rounded-full bg-seed text-lg font-extrabold text-sun ring-4 ring-petal transition-transform group-hover:rotate-12">
                  {String(n).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-2xl font-extrabold text-ink group-hover:text-cap sm:text-3xl">
                    {p.title}
                  </span>
                  <span className="text-sm font-semibold text-ink-muted">{p.role}</span>
                </span>
                <span className="flex items-center gap-3 text-sm font-semibold text-ink-muted">
                  <span className="hidden sm:inline">{p.period}</span>
                  <span
                    aria-hidden
                    className="grid size-9 place-items-center rounded-full bg-cream text-xl leading-none text-ink"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-6 pb-8 sm:grid-cols-[1fr_auto] sm:pl-16">
                  <div>
                    <p className="max-w-prose text-lg leading-relaxed text-ink/90">{p.summary}</p>
                    {p.highlights && (
                      <ul className="mt-4 space-y-1.5 text-ink/80">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className="text-petal">✿</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-leaf px-2.5 py-0.5 text-xs font-bold text-cloud">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.links && p.links.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {p.links.map((l, i) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`rounded-full px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5 ${
                              i === 0 ? "bg-sky-mid text-cloud" : "bg-cream text-ink"
                            }`}
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {p.image && (
                    <a
                      href={p.links?.[0]?.href ?? asset(p.image)}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full max-w-xs self-start overflow-hidden rounded-2xl shadow-[0_14px_30px_-14px_rgba(60,20,5,0.6)] ring-4 ring-cream transition-transform hover:-rotate-1"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(p.image)}
                        alt={`Screenshot of ${p.title}`}
                        loading="lazy"
                        className="aspect-video w-full object-cover object-top"
                      />
                    </a>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
