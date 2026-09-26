import {
  certificates,
  education,
  experience,
  profile,
  process,
  projects,
  skills,
  spokenLanguages,
} from "@/data/portfolio";
import { asset } from "@/lib/asset";
import { Projects } from "@/components/projects";
import { LaunchRings, Sky } from "@/components/sky";

const nav = [
  { id: "about", label: "About" },
  { id: "process", label: "How I work" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
].filter((n) => n.id !== "certificates" || certificates.length > 0);

// Candy colors rotated through chips, dots and badges
const CANDY = ["bg-yellow", "bg-pink", "bg-cyan", "bg-green", "bg-violet text-cream", "bg-red"];

const LETTER_COLORS = ["#ffd23f", "#ff4fa3", "#2ec4f1", "#4cc76a", "#ff5a4f", "#b99bff"];

/* Each letter in its own candy color */
function CandyWord({ text }: { text: string }) {
  return (
    <span className="candy-word inline-block" aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden style={{ color: LETTER_COLORS[i % LETTER_COLORS.length] }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/* Rounded pill label with an ink outline */
function Sticker({ children, color = "bg-yellow" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-ink px-3 py-1 font-type text-xs font-semibold uppercase leading-none tracking-wider text-ink shadow-[2px_2px_0_var(--ink)] ${color}`}
    >
      {children}
    </span>
  );
}

function Section({
  id,
  side,
  title,
  color,
  children,
}: {
  id: string;
  side: string;
  title: string;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-10 sm:py-14">
      <div className="pop-card p-6 sm:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">{title}</h2>
          <Sticker color={color}>{side}</Sticker>
        </div>
        {children}
      </div>
    </section>
  );
}

const btn =
  "rounded-full border-3 border-ink px-6 py-3 font-type text-sm font-semibold uppercase tracking-wider text-ink shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--ink)]";

export default function Home() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="sunset flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-20 border-b-3 border-ink bg-sky-1/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="font-display text-2xl text-cream">
            {profile.name}
          </a>
          <nav className="flex gap-4 overflow-x-auto font-type text-sm font-medium text-cream/80 sm:gap-6">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="whitespace-nowrap hover:text-yellow">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero — the album cover */}
      <div id="top" className="relative overflow-hidden">
        <Sky />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 py-16 sm:grid-cols-[minmax(0,19rem)_1fr] sm:py-24">
          {/* Portrait sticker */}
          <div className="relative mx-auto w-60 sm:w-full">
            <LaunchRings className="absolute -right-10 -top-24 w-44 sm:-right-16 sm:-top-28 sm:w-56" />
            <div className="relative aspect-3/4 -rotate-3 overflow-hidden rounded-[28px] border-4 border-ink bg-[radial-gradient(circle_at_50%_38%,var(--yellow)_0%,var(--sky-5)_28%,var(--pink)_62%,var(--violet)_100%)] shadow-[10px_10px_0_var(--pink-deep)]">
              {profile.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset(profile.avatar)}
                  alt={profile.name}
                  className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
                />
              ) : (
                <div className="grid h-full place-items-center bg-linear-to-b from-pink to-violet">
                  <span className="font-display text-8xl text-cream">{initials}</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rotate-2 whitespace-nowrap">
              <Sticker>{profile.location}</Sticker>
            </div>
          </div>

          <div className="relative">
            <Sticker color="bg-cyan">{profile.title}</Sticker>
            <h1 className="sky-title mt-5 font-display text-6xl leading-[0.95] sm:text-8xl">
              Ready for
              <br />
              <CandyWord text="liftoff." />
            </h1>
            <p className="mt-6 max-w-md font-type text-lg leading-relaxed text-cream">
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#projects" className={`${btn} bg-yellow`}>
                View projects
              </a>
              {profile.resumeUrl && (
                <a href={asset(profile.resumeUrl)} className={`${btn} bg-cream`}>
                  Résumé
                </a>
              )}
              <a href="#contact" className={`${btn} bg-cream`}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5">
        <Section id="about" side="Side A · Intro" title="About" color="bg-pink">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 text-lg leading-relaxed text-ink/85">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="space-y-6">
              {skills.map((s, gi) => (
                <div key={s.group}>
                  <h3 className="mb-2 font-type text-sm font-semibold uppercase tracking-wider text-pink-deep">
                    {s.group}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className={`rounded-full border-2 border-ink px-2.5 py-0.5 font-type text-xs font-medium text-ink ${gi === 0 ? "bg-yellow" : "bg-white"}`}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <h3 className="mb-2 font-type text-sm font-semibold uppercase tracking-wider text-pink-deep">
                  Spoken languages
                </h3>
                <ul className="space-y-1 text-sm">
                  {spokenLanguages.map((l) => (
                    <li key={l.name} className="flex justify-between border-b-2 border-dashed border-ink/15 pb-1">
                      <span className="font-medium">{l.name}</span>
                      <span className="font-type text-xs text-ink-muted">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {experience.length > 0 && (
            <div className="mt-12 border-t-3 border-dashed border-ink/15 pt-8">
              <h3 className="mb-5 font-type text-sm font-semibold uppercase tracking-wider text-pink-deep">
                Experience
              </h3>
              <ol className="space-y-6 border-l-4 border-pink pl-6">
                {experience.map((e) => (
                  <li key={e.company + e.title} className="relative">
                    <span className="absolute -left-9 top-1.5 size-5 rounded-full border-3 border-ink bg-yellow" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-display text-2xl text-ink">
                        {e.title} <span className="text-ink-muted">· {e.company}</span>
                      </p>
                      <p className="font-type text-sm text-ink-muted">{e.period}</p>
                    </div>
                    <p className="mt-1 text-ink/80">{e.summary}</p>
                    {e.highlights && (
                      <ul className="mt-3 space-y-1.5 text-sm text-ink/75">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className="text-pink">★</span>
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

        <Section id="process" side="Process" title="How I work" color="bg-yellow">
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <li
                key={p.step}
                className="relative rounded-3xl border-3 border-ink bg-white p-5 shadow-[4px_4px_0_var(--ink)]"
              >
                <span
                  className={`grid size-10 place-items-center rounded-full border-3 border-ink font-display text-lg text-ink ${CANDY[i % CANDY.length]}`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-3 font-display text-2xl leading-tight text-ink">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{p.detail}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" side={`${projects.length} projects`} title="Projects" color="bg-cyan">
          <Projects projects={projects} />
        </Section>

        {certificates.length > 0 && (
          <Section id="certificates" side={`${certificates.length} earned`} title="Certificates" color="bg-green">
            <p className="-mt-4 mb-8 font-type text-ink-muted">Certificates earned along the way.</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((c, i) => (
                <article
                  key={c.name}
                  className="relative flex flex-col rounded-3xl border-3 border-ink bg-white p-5 pt-7 text-ink shadow-[5px_5px_0_var(--ink)] transition-transform odd:-rotate-1 even:rotate-1 hover:rotate-0"
                >
                  {/* ribbon seal */}
                  <span
                    className={`absolute -right-3 -top-3 grid size-11 place-items-center rounded-full border-3 border-ink font-display text-lg text-ink ${CANDY[i % CANDY.length]}`}
                  >
                    {i + 1}
                  </span>
                  {c.image && (
                    <a href={asset(c.image)} target="_blank" rel="noreferrer" className="mb-4 block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(c.image)}
                        alt={`${c.name} certificate`}
                        loading="lazy"
                        className="aspect-4/3 w-full rounded-xl border-2 border-ink bg-cream object-contain p-1"
                      />
                    </a>
                  )}
                  <h3 className="font-display text-2xl leading-tight">{c.name}</h3>
                  <dl className="mt-3 space-y-1 font-type text-sm">
                    <div className="flex gap-2">
                      <dt className="w-14 text-ink-muted">Issuer</dt>
                      <dd className="font-medium">{c.issuer}</dd>
                    </div>
                    {c.date && (
                      <div className="flex gap-2">
                        <dt className="w-14 text-ink-muted">Date</dt>
                        <dd className="font-medium">{c.date}</dd>
                      </div>
                    )}
                    {c.credentialId && (
                      <div className="flex gap-2">
                        <dt className="w-14 shrink-0 text-ink-muted">ID</dt>
                        <dd className="break-all text-xs">{c.credentialId}</dd>
                      </div>
                    )}
                  </dl>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto self-start pt-5 font-type text-sm font-semibold text-pink-deep hover:underline"
                    >
                      Verify credential ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
          </Section>
        )}

        <Section id="education" side="Side B · Origins" title="Education" color="bg-violet text-cream">
          <ol className="space-y-8">
            {education.map((e, i) => (
              <li
                key={e.school + e.degree}
                className="grid gap-2 border-b-3 border-dashed border-ink/15 pb-8 last:border-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <div className="sm:pt-1.5">
                  <Sticker color={CANDY[(i + 2) % CANDY.length]}>{e.period}</Sticker>
                </div>
                <div>
                  <h3 className="font-display text-3xl text-ink">{e.degree}</h3>
                  <p className="font-type font-medium text-ink-muted">{e.school}</p>
                  {e.details && (
                    <ul className="mt-3 space-y-1 text-ink/80">
                      {e.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="text-pink">★</span>
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
          <div className="grid items-center gap-10 sm:grid-cols-[1fr_auto]">
            <div>
              <Sticker color="bg-pink">Get in touch</Sticker>
              <h2 className="sky-title mt-5 font-display text-6xl leading-[0.95] sm:text-8xl">
                Let&apos;s make
                <br />
                <CandyWord text="it big." />
              </h2>
              <p className="mt-6 max-w-md font-type text-lg text-ink">
                Open to full-time AI and full-stack developer roles, and freelance projects. Drop me a line.
              </p>
              <div className="mt-6 flex flex-col items-start gap-3">
                {[profile.email, profile.workEmail].map((e) => (
                  <a key={e} href={`mailto:${e}`} className={`${btn.replace("uppercase tracking-wider", "")} bg-cream`}>
                    {e}
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.socials.map((s, i) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${btn} px-5 py-2 ${CANDY[(i + 2) % CANDY.length]}`}
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Graduation seal */}
            <div className="mx-auto grid size-44 rotate-6 place-items-center rounded-full border-4 border-ink bg-yellow text-center text-ink shadow-[6px_6px_0_var(--ink)]">
              <div className="grid size-36 place-items-center rounded-full border-2 border-dashed border-ink">
                <div>
                  <p className="font-type text-xs font-semibold uppercase tracking-widest">Class of</p>
                  <p className="font-display text-5xl leading-none">2027</p>
                  <p className="font-type text-xs font-semibold uppercase tracking-widest">Computing</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-3 border-ink bg-sky-1 py-6 text-center font-type text-sm text-cream/80">
        © {new Date().getFullYear()} {profile.name} · Designed &amp; built by {profile.name}
      </footer>
    </div>
  );
}
