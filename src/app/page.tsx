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

const btnDark =
  "inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-frame-2";
const btnLine =
  "inline-flex items-center gap-2 border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-panel-2";

/* Section: wide-tracked title on the navy frame, content in white panels below */
function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <div className="mb-8 text-center">
        <h2 className="cover-title text-3xl text-on-frame sm:text-4xl">{title}</h2>
        {intro && <p className="mx-auto mt-3 max-w-xl text-on-frame-muted">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

/* Small accent square + label used as a panel heading */
function PanelLabel({ children, color, className = "" }: { children: React.ReactNode; color: string; className?: string }) {
  return (
    <p className={`cover-title flex items-center gap-2 text-xs text-ink-subtle ${className}`}>
      <span aria-hidden className={`h-3 w-3 ${color}`} />
      {children}
    </p>
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
        className="sr-only z-50 bg-on-frame px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Nav
        name={profile.name}
        items={nav}
        cta={
          <a
            href={mailTo(profile.email)}
            className="inline-flex items-center gap-2 bg-on-frame px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            <MailIcon />
            Get in touch
          </a>
        }
      />

      {/* ── Hero: title above, 2×2 panel grid, subtitle below ── */}
      <section id="top" className="mx-auto w-full max-w-6xl px-5 pt-12 pb-10 sm:pt-16">
        <h1 className="cover-title text-center text-4xl text-on-frame sm:text-6xl">{profile.name}</h1>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:gap-5 md:grid-cols-2">
          {/* 1 — portrait */}
          <div className="panel relative aspect-square overflow-hidden">
            {profile.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset(profile.avatar)}
                alt={profile.name}
                className="absolute bottom-0 left-1/2 h-[90%] w-auto max-w-none -translate-x-1/2"
              />
            )}
          </div>

          {/* 2 — intro */}
          <div className="panel flex aspect-auto flex-col justify-center p-7 sm:p-9 md:aspect-square">
            <PanelLabel color="bg-plaid">Hello</PanelLabel>
            <p className="mt-5 font-display text-3xl leading-tight font-medium tracking-tight">
              {profile.tagline}
            </p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink-subtle">
              <MapPin />
              {profile.location}
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-army opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-army" />
              </span>
              Available for work
            </p>
          </div>

          {/* 3 — numbers (after the actions on phones) */}
          <div className="panel order-last flex flex-col justify-center md:order-none p-7 sm:p-9 md:aspect-square">
            <PanelLabel color="bg-army">In numbers</PanelLabel>
            <dl className="mt-5 space-y-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse border-b border-line pb-3 last:border-0">
                  <dt className="text-sm text-ink-subtle">{s.label}</dt>
                  <dd className="font-display text-5xl font-medium tracking-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 4 — actions */}
          <div className="panel flex flex-col justify-center p-7 sm:p-9 md:aspect-square">
            <PanelLabel color="bg-mauve">Next</PanelLabel>
            <p className="mt-5 font-display text-3xl leading-tight font-medium tracking-tight">
              See what I&apos;ve built, or start a conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={btnDark}>
                View my work
                <ArrowDown />
              </a>
              <a href={mailTo(profile.email)} className={btnLine}>
                <MailIcon />
                Get in touch
              </a>
            </div>
            <div className="mt-6 flex items-center gap-1">
              {profile.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center text-ink-muted transition-colors hover:bg-panel-2 hover:text-ink"
                >
                  {socialIcon(s.label, "size-5")}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="cover-title mt-8 text-center text-2xl text-on-frame sm:text-3xl">{profile.title}</p>
      </section>

      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-5">
        <Section id="projects" title="Selected work" intro="Products I've designed, built, and shipped.">
          <Projects projects={projects} />
        </Section>

        <Section id="about" title="About">
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1.4fr_1fr]">
            <div className="panel p-8 sm:p-10">
              <PanelLabel color="bg-plum">Profile</PanelLabel>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-muted">
                {profile.about.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-10">
                <PanelLabel color="bg-plaid">Experience</PanelLabel>
                <ol className="mt-5 space-y-6">
                  {experience.map((e) => (
                    <li key={e.company + e.title} className="border-l-2 border-plaid pl-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-display text-xl font-medium">{e.title}</h3>
                        <span className="text-xs text-ink-subtle">{e.period}</span>
                      </div>
                      <p className="text-sm text-ink-muted">{e.company}</p>
                      {e.highlights && (
                        <ul className="mt-3 space-y-1.5 text-ink-muted">
                          {e.highlights.map((h) => (
                            <li key={h} className="flex gap-2.5">
                              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-plaid" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="panel h-fit p-8 sm:p-10">
              <PanelLabel color="bg-army">Skills</PanelLabel>
              <div className="mt-5 space-y-5">
                {skills.map((s) => (
                  <div key={s.group}>
                    <p className="mb-2 text-xs font-medium text-ink-subtle">{s.group}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {s.items.map((it) => (
                        <li key={it} className="bg-panel-2 px-2.5 py-1 text-sm text-ink-muted">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <p className="mb-2 text-xs font-medium text-ink-subtle">Languages spoken</p>
                  <ul className="divide-y divide-line">
                    {spokenLanguages.map((l) => (
                      <li key={l.name} className="flex justify-between py-2 text-sm">
                        <span>{l.name}</span>
                        <span className="text-ink-subtle">{l.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {certificates.length > 0 && (
          <Section id="certificates" title="Certificates">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {certificates.map((c, i) => (
                <article key={c.name} className="panel flex flex-col p-7">
                  <PanelLabel color={["bg-plum", "bg-plaid", "bg-army", "bg-mauve"][i % 4]}>
                    {c.date ?? "Completed"}
                  </PanelLabel>
                  <h3 className="mt-4 font-display text-xl leading-snug font-medium">{c.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{c.issuer}</p>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-1 self-start pt-5 text-sm font-medium underline underline-offset-4 hover:text-plaid"
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

        <Section id="education" title="Education">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {education.map((e, i) => (
              <article key={e.school + e.degree} className="panel p-7">
                <PanelLabel color={i === 0 ? "bg-mauve" : "bg-plum"}>{e.period}</PanelLabel>
                <h3 className="mt-4 font-display text-2xl font-medium">{e.degree}</h3>
                <p className="text-ink-muted">{e.school}</p>
                {e.details && <p className="mt-2 text-sm text-ink-subtle">{e.details.join(" · ")}</p>}
              </article>
            ))}
          </div>
        </Section>

        <section id="contact" className="py-14 sm:py-20">
          <div className="panel px-6 py-14 text-center sm:px-12">
            <PanelLabel color="bg-plaid" className="justify-center">
              Contact
            </PanelLabel>
            <h2 className="cover-title mt-5 text-3xl sm:text-5xl">Let&apos;s work together</h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-ink-muted">
              Open to full-time full-stack developer roles and freelance projects. I usually reply within a day.
            </p>
            <a href={mailTo(profile.email)} className={`${btnDark} mt-8 px-7 py-3.5 text-base`}>
              <MailIcon className="size-5" />
              Get in touch
            </a>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {[profile.email, profile.workEmail].map((e) => (
                <a key={e} href={mailTo(e)} className="text-ink-muted underline-offset-4 hover:text-ink hover:underline">
                  {e}
                </a>
              ))}
              {profile.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
                >
                  {socialIcon(s.label)}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-6 text-sm text-on-frame-muted">
          <p className="cover-title text-xs">© {new Date().getFullYear()} {profile.name}</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
