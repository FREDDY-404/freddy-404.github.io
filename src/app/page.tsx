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
import { ArrowDown, ArrowUpRight, MailIcon, MapPin, socialIcon } from "@/components/icons";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";

const nav = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "certificates", label: "Certificates" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
].filter((n) => n.id !== "certificates" || certificates.length > 0);

// Opens the visitor's email app with a message to me, subject pre-filled
const mailTo = (email: string) =>
  `mailto:${email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent("Hi Min Khant Kyaw,\n\n")}`;

const btnPrimary =
  "inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover";
const btnSecondary =
  "inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2";

function Section({
  id,
  index,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-20 sm:py-24">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-sm text-accent">{index}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const liveCount = projects.filter((p) => p.links?.length).length;
  const stats = [
    { value: projects.length, label: "Projects shipped" },
    { value: liveCount, label: "Live in production" },
    { value: certificates.length, label: "Certificates" },
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Nav
        name={profile.name}
        items={nav}
        cta={
          <a href={mailTo(profile.email)} className={`${btnPrimary} px-4 py-2`}>
            <MailIcon />
            Get in touch
          </a>
        }
      />

      {/* ── Hero ─────────────────────────────── */}
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="dot-grid absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1.3fr_1fr] md:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              Available for work
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
            <p className="mt-3 text-2xl font-medium tracking-tight text-muted sm:text-3xl">{profile.title}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>

            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-subtle">
              <MapPin />
              {profile.location}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className={btnPrimary}>
                View my work
                <ArrowDown />
              </a>
              <a href={mailTo(profile.email)} className={btnSecondary}>
                <MailIcon />
                Get in touch
              </a>
              <div className="ml-1 flex items-center gap-1">
                {profile.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    {socialIcon(s.label, "size-5")}
                  </a>
                ))}
              </div>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse px-4 py-4 first:pl-0">
                  <dt className="mt-1 text-sm text-subtle">{s.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {profile.avatar && (
            <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-4xl bg-linear-to-br from-accent/25 via-transparent to-transparent blur-2xl"
              />
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border bg-linear-to-b from-accent-soft to-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(profile.avatar)}
                  alt={profile.name}
                  className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-5">
        {/* ── Work ─────────────────────────────── */}
        <Section
          id="projects"
          index="01 — Work"
          title="Selected projects"
          intro="Products I've designed, built, and shipped — from e-commerce to IoT dashboards."
        >
          <Projects projects={projects} />
        </Section>

        {/* ── About ─────────────────────────────── */}
        <Section id="about" index="02 — About" title="About me">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="space-y-4 text-lg leading-relaxed text-muted">
                {profile.about.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h3 className="mt-12 text-sm font-medium tracking-wide text-subtle uppercase">Experience</h3>
              <ol className="mt-5 space-y-8">
                {experience.map((e) => (
                  <li key={e.company + e.title} className="relative border-l border-border pl-6">
                    <span aria-hidden className="absolute top-1.5 -left-1.25 size-2.5 rounded-full border-2 border-bg bg-accent" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-semibold">{e.title}</h4>
                      <span className="font-mono text-xs text-subtle">{e.period}</span>
                    </div>
                    <p className="text-sm text-muted">{e.company}</p>
                    {e.highlights && (
                      <ul className="mt-3 space-y-1.5 text-muted">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5">
                            <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-subtle" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div className="h-fit rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold">Skills</h3>
              <div className="mt-5 space-y-5">
                {skills.map((s) => (
                  <div key={s.group}>
                    <p className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">{s.group}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {s.items.map((it) => (
                        <li key={it} className="rounded-md border border-border px-2.5 py-1 text-sm text-muted">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">Languages spoken</p>
                  <ul className="divide-y divide-border">
                    {spokenLanguages.map((l) => (
                      <li key={l.name} className="flex justify-between py-2 text-sm">
                        <span>{l.name}</span>
                        <span className="text-subtle">{l.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Certificates ─────────────────────────────── */}
        {certificates.length > 0 && (
          <Section id="certificates" index="03 — Certificates" title="Certificates">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((c) => (
                <article key={c.name} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
                  <p className="font-mono text-xs text-subtle">{c.date ?? "Completed"}</p>
                  <h3 className="mt-2 font-semibold leading-snug">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-1 self-start pt-5 text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      Verify credential
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </Section>
        )}

        {/* ── Education ─────────────────────────────── */}
        <Section id="education" index="04 — Education" title="Education">
          <ol className="divide-y divide-border rounded-2xl border border-border bg-surface">
            {education.map((e) => (
              <li key={e.school + e.degree} className="grid gap-1 p-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                <div>
                  <h3 className="font-semibold">{e.degree}</h3>
                  <p className="text-muted">{e.school}</p>
                  {e.details && <p className="mt-1 text-sm text-subtle">{e.details.join(" · ")}</p>}
                </div>
                <p className="font-mono text-sm text-subtle">{e.period}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── Contact ─────────────────────────────── */}
        <section id="contact" className="border-t border-border py-20 sm:py-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12">
            <div aria-hidden className="dot-grid absolute inset-0" />
            <div className="relative">
              <p className="font-mono text-sm text-accent">05 — Contact</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Let&apos;s work together</h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
                Open to full-time full-stack developer roles and freelance projects. I usually reply within a day.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={mailTo(profile.email)} className={`${btnPrimary} px-6 py-3 text-base`}>
                  <MailIcon className="size-5" />
                  Get in touch
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                {[profile.email, profile.workEmail].map((e) => (
                  <a key={e} href={mailTo(e)} className="text-muted underline-offset-4 hover:text-fg hover:underline">
                    {e}
                  </a>
                ))}
                {profile.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted hover:text-fg"
                  >
                    {socialIcon(s.label)}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-6 text-sm text-subtle">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
