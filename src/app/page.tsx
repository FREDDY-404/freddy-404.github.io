import {
  certificates,
  education,
  experience,
  profile,
  projects,
  skills,
  spokenLanguages,
} from "@/data/portfolio";
import { asset } from "@/lib/asset";
import { Drips } from "@/components/drips";
import { Projects } from "@/components/projects";

const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Tracklist" },
  { id: "certificates", label: "Evidence" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
].filter((n) => n.id !== "certificates" || certificates.length > 0);

/* Cream label with black type, like the "STEREO" sticker on the sleeve */
function Sticker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-bone px-2 py-1 font-type text-[11px] uppercase leading-none tracking-widest text-ink">
      {children}
    </span>
  );
}

function Section({
  id,
  side,
  title,
  children,
}: {
  id: string;
  side: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <div className="noir-frame p-6 sm:p-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
            {title}
          </h2>
          <Sticker>{side}</Sticker>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="grain vignette flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-20 border-b border-blood-bright/40 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="font-display text-xl uppercase tracking-wider">
            {profile.name}
          </a>
          <nav className="flex gap-4 overflow-x-auto font-type text-xs uppercase tracking-widest text-bone-muted sm:gap-6">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="whitespace-nowrap hover:text-blood-bright"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero — the album cover */}
      <div id="top" className="relative overflow-hidden">
        <Drips className="left-auto right-0 h-full w-full opacity-50 sm:w-1/2 sm:opacity-100" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 sm:grid-cols-[minmax(0,20rem)_1fr] sm:py-24">
          {/* Portrait in the black frame */}
          <div className="noir-frame relative mx-auto aspect-3/4 w-56 overflow-hidden sm:w-full">
            {profile.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset(profile.avatar)}
                alt={profile.name}
                className="absolute inset-1.75 h-[calc(100%-14px)] w-[calc(100%-14px)] object-cover object-[center_35%] contrast-105 saturate-110"
              />
            ) : (
              <div className="absolute inset-1.75 grid place-items-center bg-linear-to-b from-ink-soft to-ink">
                <span className="font-display text-8xl text-bone/90">{initials}</span>
              </div>
            )}
            {profile.avatar && (
              /* soft vignette so the photo sits inside the frame */
              <div
                aria-hidden
                className="absolute inset-1.75 bg-[radial-gradient(ellipse_at_50%_40%,transparent_50%,rgb(11_10_10/0.55)_100%)] shadow-[inset_0_-80px_60px_-30px_rgb(11_10_10/0.9)]"
              />
            )}
            <div className="absolute bottom-4 left-4">
              <Sticker>Stereo · {profile.location}</Sticker>
            </div>
          </div>

          <div className="relative">
            <p className="font-type text-sm uppercase tracking-[0.3em] text-bone/80">
              {profile.title}
            </p>
            <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-wide sm:text-8xl">
              Code to be
              <br />
              <span className="bloody-word">Hired</span> by
            </h1>
            <p className="mt-6 max-w-md font-type text-lg leading-relaxed text-bone/90">
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="bg-ink px-5 py-3 font-type text-sm uppercase tracking-widest text-bone ring-1 ring-bone/30 hover:bg-bone hover:text-ink"
              >
                ▶ Play tracklist
              </a>
              {profile.resumeUrl && (
                <a
                  href={asset(profile.resumeUrl)}
                  className="border border-bone/60 px-5 py-3 font-type text-sm uppercase tracking-widest hover:border-bone hover:bg-bone hover:text-ink"
                >
                  Résumé
                </a>
              )}
              <a
                href="#contact"
                className="border border-bone/60 px-5 py-3 font-type text-sm uppercase tracking-widest hover:border-bone hover:bg-bone hover:text-ink"
              >
                Contact
              </a>
            </div>
            <p className="mt-8 font-type text-xs uppercase tracking-[0.3em] text-bone/70">
              — {profile.name} —
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5">
        <Section id="about" side="Side A · Intro" title="About">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 text-lg leading-relaxed text-bone/85">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="space-y-6">
              {skills.map((s) => (
                <div key={s.group}>
                  <h3 className="mb-2 font-type text-xs uppercase tracking-widest text-blood-bright">
                    {s.group}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="border border-bone/20 px-2 py-1 text-xs text-bone-muted"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <h3 className="mb-2 font-type text-xs uppercase tracking-widest text-blood-bright">
                  Spoken languages
                </h3>
                <ul className="space-y-1 text-sm">
                  {spokenLanguages.map((l) => (
                    <li key={l.name} className="flex justify-between border-b border-bone/10 pb-1">
                      <span>{l.name}</span>
                      <span className="font-type text-xs text-bone-muted">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {experience.length > 0 && (
            <div className="mt-12 border-t border-bone/10 pt-8">
              <h3 className="mb-5 font-type text-xs uppercase tracking-widest text-blood-bright">
                Experience
              </h3>
              <ol className="space-y-6 border-l-2 border-blood pl-6">
                {experience.map((e) => (
                  <li key={e.company + e.title} className="relative">
                    <span className="absolute -left-7.75 top-2 size-3 rounded-full bg-blood-bright ring-4 ring-ink" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-display text-2xl uppercase tracking-wide">
                        {e.title} <span className="text-bone-muted">· {e.company}</span>
                      </p>
                      <p className="font-type text-xs text-bone-muted">{e.period}</p>
                    </div>
                    <p className="mt-1 text-bone/80">{e.summary}</p>
                    {e.highlights && (
                      <ul className="mt-3 space-y-1.5 text-sm text-bone-muted">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className="text-blood-bright">▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Section>

        <Section id="projects" side={`${projects.length} tracks`} title="Tracklist">
          <Projects projects={projects} />
        </Section>

        {certificates.length > 0 && (
        <Section id="certificates" side="Exhibit B" title="Evidence">
          <p className="-mt-4 mb-8 font-type text-sm text-bone-muted">
            Certificates, bagged and tagged.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c, i) => (
              <article
                key={c.name}
                className="relative flex flex-col bg-bone p-5 pt-8 text-ink shadow-[4px_4px_0_var(--blood)] transition-transform even:rotate-1 odd:-rotate-1 hover:rotate-0"
              >
                {/* hole punch + string */}
                <span className="absolute left-5 top-3 size-3 rounded-full bg-ink ring-2 ring-ink/30" />
                <p className="absolute right-4 top-3 font-type text-[11px] uppercase tracking-widest text-blood">
                  Evidence #{String(i + 1).padStart(2, "0")}
                </p>
                {c.image && (
                  <a href={asset(c.image)} target="_blank" rel="noreferrer" className="mb-4 block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(c.image)}
                      alt={`${c.name} certificate`}
                      loading="lazy"
                      className="aspect-4/3 w-full bg-ink object-contain p-1 ring-1 ring-ink/20"
                    />
                  </a>
                )}
                <h3 className="font-display text-2xl uppercase leading-tight tracking-wide">
                  {c.name}
                </h3>
                <dl className="mt-3 space-y-1 font-type text-xs">
                  <div className="flex gap-2">
                    <dt className="w-14 text-ink/60">ISSUER</dt>
                    <dd>{c.issuer}</dd>
                  </div>
                  {c.date && (
                    <div className="flex gap-2">
                      <dt className="w-14 text-ink/60">DATE</dt>
                      <dd>{c.date}</dd>
                    </div>
                  )}
                  {c.credentialId && (
                    <div className="flex gap-2">
                      <dt className="w-14 text-ink/60">ID</dt>
                      <dd>{c.credentialId}</dd>
                    </div>
                  )}
                </dl>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto self-start pt-5 font-type text-xs uppercase tracking-widest text-blood hover:underline"
                  >
                    Verify credential ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </Section>
        )}

        <Section id="education" side="Side B · Origins" title="Education">
          <ol className="space-y-8">
            {education.map((e) => (
              <li
                key={e.school + e.degree}
                className="grid gap-1 border-b border-bone/10 pb-8 last:border-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <p className="font-type text-sm text-blood-bright sm:pt-2">{e.period}</p>
                <div>
                  <h3 className="font-display text-3xl uppercase tracking-wide">{e.degree}</h3>
                  <p className="font-type text-sm uppercase tracking-wider text-bone-muted">
                    {e.school}
                  </p>
                  {e.details && (
                    <ul className="mt-3 space-y-1 text-bone/80">
                      {e.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="text-blood-bright">▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <section id="contact" className="py-14 sm:py-20">
          <div className="grid items-end gap-10 sm:grid-cols-[1fr_auto]">
            <div>
              <Sticker>Bonus track</Sticker>
              <h2 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-wide sm:text-8xl">
                Let&apos;s make
                <br />
                <span className="bloody-word">a hit</span>.
              </h2>
              <p className="mt-6 max-w-md font-type text-bone/90">
                Open to full-time backend and full-stack developer roles, and freelance projects. Drop me a line.
              </p>
              <p className="mt-6 font-type text-xl">
                <a
                  href={`mailto:${profile.email}`}
                  className="border-b-2 border-bone hover:text-ink hover:bg-bone"
                >
                  {profile.email}
                </a>
              </p>
              <div className="mt-6 flex flex-wrap gap-5 font-type text-sm uppercase tracking-widest">
                {profile.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-bone/80 hover:text-bone"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Advisory-style badge */}
            <div className="w-40 self-end border-4 border-ink bg-bone text-center text-ink">
              <p className="px-2 pt-2 font-display text-lg uppercase leading-none tracking-wide">
                Portfolio
              </p>
              <p className="mx-1 my-1 bg-ink py-1.5 font-display text-2xl uppercase leading-none tracking-wider text-bone">
                Advisory
              </p>
              <p className="px-2 pb-2 font-display text-sm uppercase leading-none tracking-wide">
                Serious skills
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-blood-bright/40 bg-ink py-6 text-center font-type text-xs uppercase tracking-widest text-bone-muted">
        © {new Date().getFullYear()} {profile.name} · All tracks written &amp; produced by {profile.name}
      </footer>
    </div>
  );
}
