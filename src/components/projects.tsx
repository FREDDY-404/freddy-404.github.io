"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import type { Project } from "@/data/portfolio";

const TRACK_COLORS = ["bg-yellow", "bg-pink", "bg-cyan", "bg-green", "bg-violet text-cream", "bg-red"];

export function Projects({ projects }: { projects: Project[] }) {
  const tags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(projects[0]?.title ?? null);
  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  const chip = (label: string, value: string | null) => (
    <button
      key={label}
      onClick={() => setActive(value)}
      aria-pressed={active === value}
      className={`cursor-pointer rounded-full border-2 border-ink px-3 py-1 font-type text-xs font-medium transition-colors ${
        active === value ? "bg-ink text-cream" : "bg-white text-ink hover:bg-yellow"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {chip("All tracks", null)}
        {tags.map((t) => chip(t, t))}
      </div>

      {/* Tracklist */}
      <ol className="divide-y-3 divide-dashed divide-ink/15">
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
                <span
                  className={`grid size-11 place-items-center rounded-full border-3 border-ink font-display text-lg text-ink transition-transform group-hover:-rotate-12 ${TRACK_COLORS[(n - 1) % TRACK_COLORS.length]}`}
                >
                  {String(n).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-2xl text-ink group-hover:text-pink-deep sm:text-3xl">
                    {p.title}
                  </span>
                  <span className="font-type text-sm text-ink-muted">feat. {p.role}</span>
                </span>
                <span className="flex items-center gap-3 font-type text-sm text-ink-muted">
                  <span className="hidden sm:inline">{p.period}</span>
                  <span
                    aria-hidden
                    className="grid size-8 place-items-center rounded-full border-2 border-ink bg-white text-lg leading-none text-ink"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-6 pb-8 sm:grid-cols-[1fr_auto] sm:pl-16">
                  <div>
                    <p className="max-w-prose leading-relaxed text-ink/85">{p.summary}</p>
                    {p.highlights && (
                      <ul className="mt-4 space-y-1.5 text-sm text-ink/75">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className="text-pink">★</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-ink px-2.5 py-0.5 font-type text-xs font-medium text-cream"
                        >
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
                            className={`rounded-full border-2 border-ink px-4 py-1.5 font-type text-sm font-semibold text-ink shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 ${i === 0 ? "bg-yellow" : "bg-white"}`}
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
                      className="block w-full max-w-xs self-start overflow-hidden rounded-2xl border-3 border-ink shadow-[5px_5px_0_var(--pink-deep)] transition-transform hover:-rotate-1"
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
