"use client";

import { useState } from "react";
import type { Project } from "@/data/portfolio";

export function Projects({ projects }: { projects: Project[] }) {
  const tags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(projects[0]?.title ?? null);
  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  const chip = (label: string, value: string | null) => (
    <button
      key={label}
      onClick={() => setActive(value)}
      className={`border px-3 py-1 font-type text-xs uppercase tracking-wider transition-colors ${
        active === value
          ? "border-bone bg-bone text-ink"
          : "border-bone/30 text-bone-muted hover:border-bone hover:text-bone"
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
      <ol className="divide-y divide-bone/10 border-y border-bone/10">
        {shown.map((p) => {
          const n = projects.indexOf(p) + 1;
          const isOpen = open === p.title;
          return (
            <li key={p.title}>
              <button
                onClick={() => setOpen(isOpen ? null : p.title)}
                aria-expanded={isOpen}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-5 text-left"
              >
                <span className="font-type text-sm text-blood-bright">
                  {String(n).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-2xl uppercase tracking-wide group-hover:text-blood-bright sm:text-3xl">
                    {p.title}
                  </span>
                  <span className="font-type text-xs uppercase tracking-wider text-bone-muted">
                    feat. {p.role}
                  </span>
                </span>
                <span className="font-type text-sm text-bone-muted">
                  {p.period} <span aria-hidden>{isOpen ? "−" : "+"}</span>
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-6 pb-8 pl-14 sm:grid-cols-[1fr_auto]">
                  <div>
                    <p className="max-w-prose leading-relaxed text-bone/85">{p.summary}</p>
                    {p.highlights && (
                      <ul className="mt-4 space-y-1.5 text-sm text-bone-muted">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className="text-blood-bright">▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="bg-blood px-2 py-0.5 font-type text-[11px] uppercase tracking-wider text-bone"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.links && (
                      <div className="mt-5 flex gap-5 font-type text-sm uppercase tracking-wider">
                        {p.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="border-b border-blood-bright hover:text-blood-bright"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {p.image && (
                    <a
                      href={p.links?.[0]?.href ?? p.image}
                      target="_blank"
                      rel="noreferrer"
                      className="noir-frame block w-full max-w-xs self-start p-1.75 transition-transform hover:-rotate-1"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
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
