"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";

/*
 * Profile as a flip-able comic hero card.
 * Front: photo on sunburst rays, name lettering, founder sticker.
 * Back: "hero stats" — powers (stack), base, training, side quest, status.
 */
export function ProfileCard({
  photo,
  name,
  title,
  location,
  stack,
  training,
  sideQuest,
}: {
  photo?: string;
  name: string;
  title: string;
  location: string;
  stack: string[];
  training: string;
  sideQuest: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const [first, ...rest] = name.toUpperCase().split(" ");

  const face = "panel absolute inset-0 overflow-hidden [backface-visibility:hidden]";

  return (
    <div className="mx-auto w-full max-w-[20rem] sm:max-w-sm">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? "Show the front of my card" : "Flip my card to see my stats"}
        className="group block w-full cursor-pointer text-left perspective-[1400px]"
      >
        <div
          className="relative aspect-5/7 w-full transition-transform duration-700 ease-[cubic-bezier(0.3,1.4,0.5,1)] transform-3d group-hover:-rotate-1 motion-reduce:transition-none"
          style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
        >
          {/* ── Front ── */}
          <div className={face} aria-hidden={flipped}>
            <div className="flex items-center justify-between border-b-3 border-ink bg-ink px-4 py-2 text-[11px] font-extrabold tracking-[0.2em] text-mustard uppercase">
              <span>No. 001</span>
              <span>{title}</span>
            </div>

            <div className="relative h-[62%] overflow-hidden border-b-3 border-ink">
              {/* sunburst rays */}
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 size-[180%] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[spin_40s_linear_infinite]"
                style={{
                  background:
                    "repeating-conic-gradient(from 0deg, #f2c53d 0deg 12deg, #ec5a2a 12deg 24deg)",
                }}
              />
              <div aria-hidden className="halftone absolute inset-0" />
              {photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset(photo)}
                  alt={name}
                  className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 drop-shadow-[5px_0_0_#16130f]"
                />
              )}
              {/* speech bubble */}
              <span className="absolute top-4 right-4 rotate-6 rounded-2xl border-3 border-ink bg-paper px-3 py-1 font-display text-xl">
                Hi!
                <span aria-hidden className="absolute -bottom-2.5 left-3 size-4 rotate-45 border-r-3 border-b-3 border-ink bg-paper" />
              </span>
              {/* founder sticker */}
              <span className="absolute bottom-3 left-3 -rotate-6 rounded-md border-3 border-ink bg-sky px-2.5 py-1 text-xs font-extrabold shadow-[2px_2px_0_var(--ink)]">
                Founder @ Keuri
              </span>
            </div>

            <div className="flex h-[calc(38%-2.25rem)] flex-col items-center justify-center px-4 text-center">
              <p className="cartoon-title-sm font-display text-4xl leading-[0.95] text-mustard">
                {first} <br />
                {rest.join(" ")}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-ink-muted uppercase">
                <span className="inline-block transition-transform duration-500 group-hover:rotate-180">↻</span>
                Tap to flip
              </p>
            </div>
          </div>

          {/* ── Back ── */}
          <div
            className={`${face} transform-[rotateY(180deg)] flex flex-col`}
            aria-hidden={!flipped}
          >
            <div className="flex items-center justify-between border-b-3 border-ink bg-boom px-4 py-2 text-[11px] font-extrabold tracking-[0.2em] text-paper uppercase">
              <span>Hero stats</span>
              <span>No. 001</span>
            </div>
            <div className="halftone flex flex-1 flex-col gap-3.5 bg-paper p-5">
              <p className="font-display text-3xl leading-none tracking-wide">{name}</p>

              <div>
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-boom uppercase">Powers</p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {stack.map((s) => (
                    <li key={s} className="rounded border-2 border-ink bg-mustard px-2 py-0.5 text-xs font-extrabold">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {[
                ["Home base", location],
                ["Training", training],
                ["Side quest", sideQuest],
              ].map(([k, v]) => (
                <div key={k} className="border-t-2 border-dashed border-ink/25 pt-2.5">
                  <p className="text-[11px] font-extrabold tracking-[0.18em] text-boom uppercase">{k}</p>
                  <p className="font-extrabold leading-snug">{v}</p>
                </div>
              ))}

              <div className="mt-auto flex items-center justify-between rounded-md border-3 border-ink bg-grass px-3 py-2">
                <span className="text-[11px] font-extrabold tracking-[0.18em] uppercase">Status</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-extrabold">
                  <span className="size-2 rounded-full bg-ink" />
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
