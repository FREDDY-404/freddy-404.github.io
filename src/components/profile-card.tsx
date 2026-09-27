import { asset } from "@/lib/asset";

/*
 * Profile as a developer ID badge on a lanyard: strap and clip at the top,
 * then a badge with photo, name, role, details, stack, and a barcode.
 * The whole badge swings gently (off under prefers-reduced-motion).
 */

// Deterministic barcode bar widths from the name, so it looks unique but stable
function barcode(text: string) {
  return [...text.replace(/\s/g, "").toUpperCase()].flatMap((ch, i) => {
    const c = ch.charCodeAt(0);
    return [1 + (c % 3), 1 + ((c + i) % 2)];
  });
}

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
  const bars = barcode(name);
  const id = `DEV-${name
    .split(" ")
    .map((w) => w[0])
    .join("")}-2026`;

  return (
    <div className="badge-swing relative mx-auto w-full max-w-[19rem] pt-24 sm:max-w-xs">
      {/* lanyard strap */}
      <div aria-hidden className="absolute top-0 left-1/2 flex -translate-x-1/2 gap-10">
        <span className="h-24 w-4 -rotate-12 origin-bottom border-x-2 border-ink bg-boom [background-image:repeating-linear-gradient(0deg,transparent_0_10px,rgb(255_255_255/0.35)_10px_12px)]" />
        <span className="h-24 w-4 rotate-12 origin-bottom border-x-2 border-ink bg-boom [background-image:repeating-linear-gradient(0deg,transparent_0_10px,rgb(255_255_255/0.35)_10px_12px)]" />
      </div>
      {/* metal clip */}
      <div aria-hidden className="absolute top-[5.25rem] left-1/2 h-8 w-12 -translate-x-1/2 rounded-md border-3 border-ink bg-[linear-gradient(180deg,#e9edf0,#9aa4ab)]" />

      <article className="panel relative mt-4 overflow-hidden">
        {/* punch hole */}
        <span aria-hidden className="absolute top-2.5 left-1/2 h-2.5 w-12 -translate-x-1/2 rounded-full border-2 border-ink bg-[#fbf7ec]" />

        <div className="border-b-3 border-ink bg-mustard px-4 pt-7 pb-2 text-center">
          <p className="font-display text-2xl leading-none tracking-[0.2em]">Dev Pass</p>
          <p className="mt-1 text-[10px] font-extrabold tracking-[0.2em] text-ink-muted uppercase">Access: Full-Stack</p>
        </div>

        <div className="p-5">
          <div className="flex gap-4">
            <div className="relative aspect-3/4 w-28 shrink-0 overflow-hidden rounded-sm border-3 border-ink bg-sky">
              <div aria-hidden className="halftone absolute inset-0" />
              {photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset(photo)}
                  alt={name}
                  className="absolute bottom-0 left-1/2 h-[95%] w-auto max-w-none -translate-x-1/2"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-display text-2xl leading-[0.95] tracking-wide">{name}</p>
              <p className="mt-1.5 text-sm font-extrabold text-boom">{title}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-grass px-2 py-0.5 text-[11px] font-extrabold">
                <span className="size-1.5 rounded-full bg-ink" />
                Available
              </p>
            </div>
          </div>

          <dl className="mt-4 space-y-1.5 text-sm">
            {[
              ["Founder", sideQuest],
              ["Studying", training],
              ["Based in", location],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-2">
                <dt className="text-[11px] font-extrabold tracking-wider text-ink-muted uppercase">{k}</dt>
                <dd className="font-semibold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Core stack">
            {stack.map((s) => (
              <li key={s} className="rounded border-2 border-ink bg-paper-2 px-2 py-0.5 text-[11px] font-bold">
                {s}
              </li>
            ))}
          </ul>

          {/* barcode */}
          <div className="mt-5 border-t-2 border-dashed border-ink/25 pt-4">
            <div aria-hidden className="flex h-10 items-stretch justify-center gap-[2px]">
              {bars.map((w, i) => (
                <span key={i} className={i % 2 ? "bg-transparent" : "bg-ink"} style={{ width: `${w * 2}px` }} />
              ))}
            </div>
            <p className="mt-1 text-center font-mono text-[11px] tracking-[0.3em]">{id}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
