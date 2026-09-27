import {
  certificates,
  education,
  experience,
  profile,
  projects,
  skills,
  spokenLanguages,
} from "@/data/portfolio";
import { ArrowDown, ArrowUpRight, MailIcon, Star, socialIcon } from "@/components/icons";
import { ProfileCard } from "@/components/profile-card";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";

const nav = [
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Toolkit" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
].filter((n) => n.id !== "certificates" || certificates.length > 0);

// Opens the visitor's email app with a message to me, subject pre-filled
const mailTo = (email: string) =>
  `mailto:${email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent("Hi Min Khant Kyaw,\n\n")}`;

const btnYellow =
  "inline-flex items-center gap-2 rounded-lg bg-yellow px-5 py-3 text-sm font-semibold text-night transition-colors hover:bg-[#ffd84a]";
const btnOutline =
  "inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10";

/* Section: small label chip, a plain-language heading, then a rule */
function Section({
  id,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="py-16 sm:py-20">
      <div className="mb-10 border-b border-line pb-6">
        <span className="inline-block rounded bg-yellow px-2 py-0.5 text-[11px] font-bold tracking-[0.18em] text-night uppercase">
          {label}
        </span>
        <h2 id={`${id}-h`} className="title-yellow mt-3 text-5xl sm:text-6xl">
          {title}
        </h2>
        {intro && <p className="mt-3 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

/* Date on the left, the entry on the right */
function DatedRow({ when, children }: { when: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-1 border-b border-line py-6 last:border-0 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <p className="text-sm text-subtle tabular-nums sm:pt-1">{when}</p>
      <div>{children}</div>
    </li>
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
        className="sr-only z-50 rounded-md bg-yellow px-4 py-2 text-sm font-semibold text-night focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Nav
        name={profile.name}
        items={nav}
        cta={
          <a href={mailTo(profile.email)} className={`${btnYellow} px-4 py-2`}>
            <MailIcon />
            Get in touch
          </a>
        }
      />

      {/* ── Hero: red backdrop, giant yellow name, profile card ── */}
      <section id="top" className="grain overflow-hidden bg-red">
        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-10">
          <h1 className="title-yellow text-center text-[clamp(3.5rem,11.5vw,9.5rem)]">{profile.name}</h1>

          <div className="mt-8 grid items-center gap-10 pb-14 md:grid-cols-[1fr_1fr] md:gap-8 md:pb-16">
            <div>
              <p className="font-display text-3xl tracking-wide text-white uppercase sm:text-4xl">{profile.title}</p>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white">{profile.tagline}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className={btnYellow}>
                  View my work
                  <ArrowDown />
                </a>
                <a href={mailTo(profile.email)} className={btnOutline}>
                  <MailIcon />
                  Get in touch
                </a>
              </div>
            </div>

            <div>
              <ProfileCard
                photo={profile.avatar}
                name={profile.name}
                title={profile.title}
                location={profile.location}
                stack={["TypeScript", "Next.js", "React", "Node.js", "Supabase", "PostgreSQL"]}
                email={mailTo(profile.email)}
                socials={profile.socials}
              />
            </div>
          </div>
        </div>
      </section>

      {/* numbers strip where the red meets the dark */}
      <div className="border-y border-line bg-night-2">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-line px-5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-4 py-6 text-center">
              <dt className="mt-1 text-sm text-subtle">{s.label}</dt>
              <dd className="font-display text-4xl text-yellow sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-5">
        <Section
          id="projects"
          label="Work"
          title="What I've built"
          intro="Real projects, newest first. Each card links to the live site or code where one exists."
        >
          <Projects projects={projects} />
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-line p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-red uppercase">Up next</p>
              <p className="mt-1 text-xl font-semibold">Your team&apos;s project?</p>
            </div>
            <a href={mailTo(profile.email)} className={btnYellow}>
              <MailIcon />
              Get in touch
            </a>
          </div>
        </Section>

        <Section id="experience" label="Experience" title="Where I've worked">
          <ol>
            {experience.map((e) => (
              <DatedRow key={e.company + e.title} when={e.period}>
                <h3 className="text-lg font-semibold">
                  {e.title} <span className="text-yellow">· {e.company}</span>
                </h3>
                <p className="mt-1 text-muted">{e.summary}</p>
                {e.highlights && (
                  <ul className="mt-3 space-y-1.5 text-muted">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <Star className="mt-1.5 size-3 shrink-0 text-yellow" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </DatedRow>
            ))}
          </ol>
        </Section>

        <Section id="education" label="Education" title="Where I study">
          <ol>
            {education.map((e) => (
              <DatedRow key={e.school + e.degree} when={e.period}>
                <h3 className="text-lg font-semibold">
                  {e.degree} <span className="text-yellow">· {e.school}</span>
                </h3>
                {e.details && <p className="mt-1 text-muted">{e.details.join(" · ")}</p>}
              </DatedRow>
            ))}
          </ol>
        </Section>

        <Section id="about" label="About" title="A bit about me">
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="skills" label="Toolkit" title="What I work with">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <div key={s.group}>
                <h3 className="text-sm font-bold tracking-[0.15em] text-red uppercase">{s.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <li key={it} className="rounded-md bg-night-2 px-2.5 py-1 text-sm text-muted ring-1 ring-line">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-sm font-bold tracking-[0.15em] text-red uppercase">Languages spoken</h3>
              <ul className="mt-3 divide-y divide-line">
                {spokenLanguages.map((l) => (
                  <li key={l.name} className="flex justify-between py-1.5 text-sm">
                    <span>{l.name}</span>
                    <span className="text-subtle">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {certificates.length > 0 && (
          <Section id="certificates" label="Certificates" title="Courses I've finished">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {[...new Set(certificates.map((c) => c.group))].map((group) => (
                <div key={group}>
                  <h3 className="text-sm font-bold tracking-[0.15em] text-red uppercase">{group}</h3>
                  <ul className="mt-3 space-y-3">
                    {certificates
                      .filter((c) => c.group === group)
                      .map((c) => (
                        <li key={c.name} className="leading-snug">
                          <span className="font-medium text-text">{c.name}</span>
                          <span className="text-muted">
                            , {c.issuer}
                            {c.date && ` (${c.date})`}
                          </span>
                          {c.url && (
                            <>
                              {" · "}
                              <a
                                href={c.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-0.5 font-medium text-blue-soft underline-offset-4 hover:text-text hover:underline"
                              >
                                verify
                                <ArrowUpRight className="size-3" />
                              </a>
                            </>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>

      {/* ── Contact: back to the red ── */}
      <section id="contact" className="grain bg-red">
        <div className="relative z-10 mx-auto max-w-4xl px-5 py-20 text-center sm:py-24">
          <span className="inline-block rounded bg-night px-2 py-0.5 text-[11px] font-bold tracking-[0.18em] text-yellow uppercase">
            Contact
          </span>
          <h2 className="title-yellow mt-3 text-5xl sm:text-7xl">Hiring a full-stack developer? Let&apos;s talk.</h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white">
            Open to full-time full-stack developer roles and freelance projects. I usually reply within a day.
          </p>
          <a href={mailTo(profile.email)} className={`${btnYellow} mt-8 px-7 py-3.5 text-base`}>
            <MailIcon className="size-5" />
            Get in touch
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {[profile.email, profile.workEmail].map((e) => (
              <a key={e} href={mailTo(e)} className="text-white/90 underline-offset-4 hover:text-white hover:underline">
                {e}
              </a>
            ))}
            {profile.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-white/90 hover:text-white"
              >
                {socialIcon(s.label)}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-night">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-6 text-sm text-subtle">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
