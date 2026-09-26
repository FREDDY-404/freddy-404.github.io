import { asset } from "@/lib/asset";
import { MailIcon, MapPin, socialIcon } from "@/components/icons";
import type { Link } from "@/data/portfolio";

/* Profile card: photo, identity, core stack, and quick links */
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
    <article className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-3xl border border-white/10 bg-night-2 shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)] sm:max-w-sm">
      {/* photo */}
      <div className="relative aspect-[4/3.4] overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#ffffff_0%,#e9eaef_55%,#c7cad6_100%)]">
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(photo)}
            alt={name}
            className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2"
          />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-night/85 px-2.5 py-1 text-xs font-medium text-text backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-[#4ade80]" />
          </span>
          Available for work
        </span>
      </div>

      {/* identity */}
      <div className="p-5 sm:p-6">
        <p className="font-display text-3xl tracking-wide text-text uppercase">{name}</p>
        <p className="mt-0.5 font-medium text-yellow">{title}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-subtle">
          <MapPin />
          {location}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Core stack">
          {stack.map((s) => (
            <li key={s} className="rounded-md bg-night-3 px-2 py-0.5 text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>

        {/* quick links */}
        <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
          <a
            href={email}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-yellow px-3 py-2 text-sm font-semibold text-night transition-colors hover:bg-[#ffd84a]"
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
              className="grid size-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-blue-soft hover:text-text"
            >
              {socialIcon(s.label, "size-4")}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
