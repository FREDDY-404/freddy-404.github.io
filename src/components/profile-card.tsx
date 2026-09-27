import { asset } from "@/lib/asset";

/*
 * Profile told as a three-panel comic strip:
 *   1. photo on sunburst rays with a "POW!" burst
 *   2. speech bubble: what I do
 *   3. wide caption panel: name, role, facts, stack, status
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
  const panel = "relative overflow-hidden rounded-sm border-3 border-ink";

  return (
    <figure className="mx-auto w-full max-w-md -rotate-1 rounded-md border-3 border-ink bg-ink p-2 shadow-[6px_6px_0_var(--ink)]">
      <div className="grid grid-cols-[1.1fr_1fr] gap-2">
        {/* Panel 1 — photo */}
        <div className={`${panel} aspect-4/5 bg-mustard`}>
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 size-[190%] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[spin_50s_linear_infinite]"
            style={{ background: "repeating-conic-gradient(#f2c53d 0deg 11deg, #ec5a2a 11deg 22deg)" }}
          />
          <div aria-hidden className="halftone absolute inset-0" />
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={asset(photo)}
              alt={name}
              className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 drop-shadow-[4px_0_0_#16130f]"
            />
          )}
          <span
            aria-hidden
            className="cartoon-title-sm absolute top-2 left-2 -rotate-12 font-display text-3xl text-paper"
          >
            POW!
          </span>
        </div>

        {/* Panel 2 — speech bubble */}
        <div className={`${panel} halftone flex flex-col justify-between bg-sky p-3`}>
          <p className="w-fit rounded bg-paper px-1.5 py-0.5 text-[10px] font-extrabold tracking-[0.18em] uppercase ring-2 ring-ink">
            Meanwhile…
          </p>
          <div className="relative rounded-2xl border-3 border-ink bg-paper p-3">
            <p className="font-display text-lg leading-tight">
              I build full-stack apps — from the database to the UI!
            </p>
            <span
              aria-hidden
              className="absolute -bottom-2.5 left-2 size-4 rotate-45 border-r-3 border-b-3 border-ink bg-paper"
            />
          </div>
          <p className="self-end rounded border-2 border-ink bg-grass px-1.5 py-0.5 text-[10px] font-extrabold uppercase">
            ● Available
          </p>
        </div>

        {/* Panel 3 — caption */}
        <figcaption className={`${panel} col-span-2 bg-paper p-4`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-3xl leading-none tracking-wide">{name}</p>
            <span className="-rotate-2 rounded-md border-2 border-ink bg-mustard px-2 py-0.5 text-xs font-extrabold">
              {title}
            </span>
          </div>

          <ul className="mt-3 space-y-1 text-sm">
            {[
              ["Founder", sideQuest],
              ["Studying", training],
              ["Based in", location],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-2">
                <span className="w-18 shrink-0 font-extrabold text-boom">{k}</span>
                <span className="font-semibold">{v}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-3 flex flex-wrap gap-1.5 border-t-2 border-dashed border-ink/25 pt-3" aria-label="Core stack">
            {stack.map((s) => (
              <li key={s} className="rounded border-2 border-ink bg-paper-2 px-2 py-0.5 text-xs font-bold">
                {s}
              </li>
            ))}
          </ul>
        </figcaption>
      </div>
    </figure>
  );
}
