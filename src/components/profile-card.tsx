import { asset } from "@/lib/asset";
import { MailIcon, MapPin, socialIcon } from "@/components/icons";
import type { Link } from "@/data/portfolio";

/* Profile card as a comic panel: photo, identity, core stack, and quick links */
export function ProfileCard({
  photo,
  name,
  title,
  location,
  stack,
  email,
  socials,
}: {
  photo?: string;
  name: string;
  title: string;
  location: string;
  stack: string[];
  email: string;
  socials: Link[];
}) {
  return (
    <article className="panel mx-auto w-full max-w-[20rem] rotate-1 overflow-hidden sm:max-w-sm">
      <div className="halftone relative aspect-[4/3.4] overflow-hidden border-b-3 border-ink bg-sky">
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(photo)}
            alt={name}
            className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2"
          />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-2.5 py-1 text-xs font-extrabold">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-grass opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-grass" />
          </span>
          Available for work
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="font-display text-3xl leading-none tracking-wide">{name}</p>
        <p className="mt-1 font-extrabold text-boom">{title}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted">
          <MapPin />
          {location}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Core stack">
          {stack.map((s) => (
            <li key={s} className="rounded border-2 border-ink bg-paper-2 px-2 py-0.5 text-xs font-bold">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-2 border-t-2 border-dashed border-ink/25 pt-4">
          <a
            href={email}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-3 border-ink bg-mustard px-3 py-2 text-sm font-extrabold shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
          >
            <MailIcon />
            Email me
          </a>
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid size-10 place-items-center rounded-full border-3 border-ink bg-paper transition-colors hover:bg-mustard"
            >
              {socialIcon(s.label, "size-4")}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
