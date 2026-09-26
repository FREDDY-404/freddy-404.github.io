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
import { Projects } from "@/components/projects";
import { Hills, Sky, Sunflowers, SunflowerIcon } from "@/components/scene";

const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
].filter((n) => n.id !== "certificates" || certificates.length > 0);

const btnPrimary =
  "inline-block rounded-full bg-cap px-6 py-3 font-bold text-cloud shadow-[0_6px_0_#145c3c] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_#145c3c]";
const btnSecondary =
  "inline-block rounded-full bg-cloud px-6 py-3 font-bold text-ink shadow-[0_6px_0_rgb(74_44_18/0.35)] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_rgb(74_44_18/0.35)]";

function Pill({ children, className = "bg-cream text-ink" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${className}`}>{children}</span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-8 sm:py-10">
      <div className="cloud-card p-6 sm:p-10">
        <div className="mb-8 flex items-center gap-4">
          <SunflowerIcon className="size-12 shrink-0 sm:size-14" />
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-leaf">{eyebrow}</p>
            <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">{title}</h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="meadow flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-40 bg-sky-top/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="font-display text-xl text-cloud">
            {profile.name}
          </a>
          <nav className="flex gap-4 overflow-x-auto text-sm font-bold text-cloud/90 sm:gap-6">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="whitespace-nowrap hover:text-sun">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero — standing in the sunflower field */}
      <section id="top" className="sunset-sky relative overflow-hidden">
        <Sky />
        <Hills className="absolute inset-x-0 bottom-0 h-[42%] w-full" />

        <div className="relative mx-auto grid max-w-5xl gap-6 px-5 pt-12 md:grid-cols-2 md:gap-10 md:pt-16">
          <div className="relative z-20 self-center md:order-2 md:pb-40">
            <Pill>{profile.title}</Pill>
            <h1 className="sky-title mt-4 font-display text-6xl leading-[1.05] sm:text-7xl">
              Built to <span className="text-sun">bloom.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg font-semibold leading-relaxed text-ink">{profile.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#projects" className={btnPrimary}>
                View projects
              </a>
              {profile.resumeUrl && (
                <a href={asset(profile.resumeUrl)} className={btnSecondary}>
                  Résumé
                </a>
              )}
              <a href="#contact" className={btnSecondary}>
                Contact
              </a>
            </div>
          </div>

          {profile.avatar && (
            <div className="relative z-10 self-end md:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(profile.avatar)}
                alt={profile.name}
                className="mx-auto w-[min(420px,85%)] drop-shadow-[0_12px_18px_rgba(60,20,5,0.35)]"
              />
            </div>
          )}
        </div>

        <Sunflowers className="absolute inset-x-0 bottom-0 z-20 h-40 w-full sm:h-52" />
      </section>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pt-6">
        <Section id="about" eyebrow="Hello there" title="About">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 text-lg leading-relaxed text-ink/90">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="space-y-6">
              {skills.map((s, gi) => (
                <div key={s.group}>
                  <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wider text-leaf">{s.group}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${gi === 0 ? "bg-sun text-ink" : "bg-cream text-ink"}`}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wider text-leaf">Spoken languages</h3>
                <ul className="space-y-1.5">
                  {spokenLanguages.map((l) => (
                    <li key={l.name} className="flex justify-between border-b border-ink/10 pb-1.5">
                      <span className="font-bold">{l.name}</span>
                      <span className="text-sm text-ink-muted">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {experience.length > 0 && (
            <div className="mt-12 border-t border-ink/10 pt-8">
              <h3 className="mb-5 text-sm font-extrabold uppercase tracking-wider text-leaf">Experience</h3>
              <ol className="space-y-6 border-l-4 border-sun pl-6">
                {experience.map((e) => (
                  <li key={e.company + e.title} className="relative">
                    <span className="absolute -left-8.5 top-1 size-5 rounded-full border-4 border-cloud bg-cap" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-xl font-extrabold text-ink">
                        {e.title} <span className="font-semibold text-ink-muted">· {e.company}</span>
                      </p>
                      <p className="text-sm font-semibold text-ink-muted">{e.period}</p>
                    </div>
                    <p className="mt-1 text-ink/85">{e.summary}</p>
                    {e.highlights && (
                      <ul className="mt-3 space-y-1.5 text-ink/80">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className="text-petal">✿</span>
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

        <Section id="projects" eyebrow={`${projects.length} projects`} title="Projects">
          <Projects projects={projects} />
        </Section>

        {certificates.length > 0 && (
          <Section id="certificates" eyebrow={`${certificates.length} earned`} title="Certificates">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((c) => (
                <article key={c.name} className="flex flex-col overflow-hidden rounded-3xl bg-cream">
                  <div className="h-2 bg-linear-to-r from-sky-mid via-petal to-cap" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-extrabold leading-snug">{c.name}</h3>
                    <dl className="mt-3 space-y-1 text-sm">
                      <div className="flex gap-2">
                        <dt className="w-14 shrink-0 text-ink-muted">Issuer</dt>
                        <dd className="font-semibold">{c.issuer}</dd>
                      </div>
                      {c.date && (
                        <div className="flex gap-2">
                          <dt className="w-14 shrink-0 text-ink-muted">Date</dt>
                          <dd className="font-semibold">{c.date}</dd>
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
                        className="mt-auto self-start pt-5 font-bold text-cap underline underline-offset-4 hover:text-leaf"
                      >
                        Verify credential ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Section>
        )}

        <Section id="education" eyebrow="Where I grew" title="Education">
          <ol className="space-y-8">
            {education.map((e) => (
              <li
                key={e.school + e.degree}
                className="grid gap-2 border-b border-ink/10 pb-8 last:border-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <div className="sm:pt-1">
                  <Pill className="bg-sun text-ink">{e.period}</Pill>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold">{e.degree}</h3>
                  <p className="font-semibold text-ink-muted">{e.school}</p>
                  {e.details && (
                    <ul className="mt-2 space-y-1 text-ink/80">
                      {e.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="text-petal">✿</span>
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

        <section id="contact" className="py-14 text-center sm:py-20">
          <SunflowerIcon className="mx-auto size-20" />
          <h2 className="mt-4 font-display text-5xl leading-tight text-cloud sm:text-6xl">
            Let&apos;s grow <span className="text-sun">something.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg font-semibold text-cloud/90">
            Open to full-time AI and full-stack developer roles, and freelance projects. Drop me a line.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            {[profile.email, profile.workEmail].map((e) => (
              <a key={e} href={`mailto:${e}`} className={`${btnSecondary} break-all`}>
                {e}
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {profile.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className={btnPrimary}>
                {s.label} ↗
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#1f4222] py-6 text-center text-sm font-semibold text-cloud/80">
        © {new Date().getFullYear()} {profile.name} · Designed &amp; built by {profile.name}
      </footer>
    </div>
  );
}
