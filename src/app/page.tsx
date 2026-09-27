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
import { Burst, ComicSky } from "@/components/comic";
import { Nav } from "@/components/nav";
import { ProfileCard } from "@/components/profile-card";
import { Projects } from "@/components/projects";
import { Reveal } from "@/components/reveal";

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

const btn =
  "inline-flex items-center gap-2 rounded-full border-3 border-ink px-6 py-3 font-extrabold shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_var(--ink)]";

/* Section: label chip, a plain-language heading in a tilted caption box */
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
    <section id={id} aria-labelledby={`${id}-h`} className="py-12 sm:py-16">
      <Reveal className="mb-8">
        <span className="inline-block rounded border-2 border-ink bg-paper px-2 py-0.5 text-[11px] font-extrabold tracking-[0.18em] uppercase">
          {label}
        </span>
        <h2
          id={`${id}-h`}
          className="mt-3 block w-fit -rotate-1 rounded-md border-3 border-ink bg-mustard px-4 py-1.5 font-display text-4xl leading-none tracking-wide shadow-[5px_5px_0_var(--ink)] sm:text-5xl"
        >
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-lg font-semibold">{intro}</p>}
      </Reveal>
      {id === "projects" ? children : <Reveal delay={120}>{children}</Reveal>}
    </section>
  );
}

/* Date on the left, the entry on the right */
function DatedRow({ when, children }: { when: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-2 border-b-2 border-dashed border-ink/20 py-6 last:border-0 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <p className="h-fit w-fit self-start rounded-full border-2 border-ink bg-mustard px-3 py-0.5 text-sm font-extrabold whitespace-nowrap tabular-nums sm:mt-0.5">
        {when}
      </p>
      <div>{children}</div>
    </li>
  );
}

export default function Home() {
  const liveCount = projects.filter((p) => p.links?.length).length;
  const [first, ...rest] = profile.name.toUpperCase().split(" ");
  const stats = [
    { value: projects.length, label: "Projects" },
    { value: liveCount, label: "Live sites" },
    { value: certificates.length, label: "Certificates" },
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-ink px-4 py-2 font-bold text-mustard focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Nav
        name={profile.name}
        items={nav}
        cta={
          <a href={mailTo(profile.email)} className={`${btn} bg-mustard px-4 py-2 text-sm shadow-[3px_3px_0_var(--ink)]`}>
            <MailIcon />
            Get in touch
          </a>
        }
      />

      {/* ── Hero: cartoon sky, bubbly name, profile card on a burst ── */}
      <section id="top" className="relative overflow-hidden border-b-3 border-ink bg-sky">
        <ComicSky />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-24 pb-16 md:grid-cols-[1.15fr_1fr] md:pt-28 md:pb-20">
          <div>
            <p className="relative inline-flex items-center gap-2 rounded-2xl border-3 border-ink bg-paper px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_var(--ink)]">
              Hi! I&apos;m a {profile.title.toLowerCase()} in {profile.location.split(",")[0]}
              <span aria-hidden className="absolute -bottom-3 left-6 size-4 rotate-45 border-r-3 border-b-3 border-ink bg-paper" />
            </p>

            <h1 className="cartoon-title mt-7 font-display text-6xl leading-[0.95] sm:text-8xl">
              {first}
              <br />
              {rest.join(" ")}
            </h1>

            <p className="mt-6 max-w-lg text-lg font-semibold leading-relaxed">{profile.tagline}</p>

            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#projects" className={`${btn} bg-mustard`}>
                See my work
                <ArrowDown />
              </a>
              <a href={mailTo(profile.email)} className={`${btn} bg-paper`}>
                <MailIcon />
                Get in touch
              </a>
            </div>

            <dl className="mt-9 grid max-w-md grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="panel flex flex-col-reverse px-3 py-2.5 text-center shadow-[4px_4px_0_var(--ink)]">
                  <dt className="mt-1 text-xs font-extrabold tracking-wide text-ink-muted uppercase">{s.label}</dt>
                  <dd className="font-display text-4xl leading-none">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <Burst className="burst-spin absolute top-1/2 left-1/2 size-[130%] max-w-none -translate-x-1/2 -translate-y-1/2" />
            <div className="relative">
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

      <main id="main" className="halftone flex-1 bg-sky">
        <div className="mx-auto max-w-6xl px-5">
          <Section
            id="projects"
            label="Work"
            title="What I've built"
            intro="Swipe or use the arrows to flip through. Each card links to the live site or code where one exists."
          >
            <Projects projects={projects} />
            <div className="panel mt-7 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-extrabold tracking-[0.18em] text-boom uppercase">To be continued…</p>
                <p className="mt-1 font-display text-2xl tracking-wide">Next project: your team&apos;s?</p>
              </div>
              <a href={mailTo(profile.email)} className={`${btn} bg-mustard`}>
                <MailIcon />
                Get in touch
              </a>
            </div>
          </Section>

          <Section id="experience" label="Experience" title="Where I've worked">
            <ol className="panel px-6 sm:px-8">
              {experience.map((e) => (
                <DatedRow key={e.company + e.title} when={e.period}>
                  <h3 className="font-display text-2xl leading-tight tracking-wide">{e.title}</h3>
                  <p className="font-extrabold text-boom">{e.company}</p>
                  <p className="mt-2 text-ink/85">{e.summary}</p>
                  {e.highlights && (
                    <ul className="mt-3 space-y-1.5 text-ink/85">
                      {e.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5">
                          <Star className="mt-1.5 size-3 shrink-0 text-boom" />
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
            <ol className="panel px-6 sm:px-8">
              {education.map((e) => (
                <DatedRow key={e.school + e.degree} when={e.period}>
                  <h3 className="font-display text-2xl leading-tight tracking-wide">{e.degree}</h3>
                  <p className="font-extrabold text-boom">{e.school}</p>
                  {e.details && <p className="mt-2 text-ink/85">{e.details.join(" · ")}</p>}
                </DatedRow>
              ))}
            </ol>
          </Section>

          <Section id="about" label="About" title="A bit about me">
            <div className="panel max-w-3xl space-y-4 p-6 text-lg leading-relaxed sm:p-8">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Section>

          <Section id="skills" label="Toolkit" title="What I work with">
            <div className="panel grid gap-x-10 gap-y-8 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
              {skills.map((s) => (
                <div key={s.group}>
                  <h3 className="text-sm font-extrabold tracking-[0.15em] text-boom uppercase">{s.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="rounded-full border-2 border-ink bg-paper-2 px-3 py-1 text-sm font-bold">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h3 className="text-sm font-extrabold tracking-[0.15em] text-boom uppercase">Languages spoken</h3>
                <ul className="mt-3 space-y-1.5">
                  {spokenLanguages.map((l) => (
                    <li key={l.name} className="flex justify-between border-b-2 border-dashed border-ink/20 pb-1.5 text-sm">
                      <span className="font-extrabold">{l.name}</span>
                      <span className="font-semibold text-ink-muted">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {certificates.length > 0 && (
            <Section id="certificates" label="Certificates" title="Courses I've finished">
              <div className="panel grid gap-x-10 gap-y-8 p-6 sm:p-8 md:grid-cols-2 lg:grid-cols-3">
                {[...new Set(certificates.map((c) => c.group))].map((group) => (
                  <div key={group}>
                    <h3 className="text-sm font-extrabold tracking-[0.15em] text-boom uppercase">{group}</h3>
                    <ul className="mt-3 space-y-3">
                      {certificates
                        .filter((c) => c.group === group)
                        .map((c) => (
                          <li key={c.name} className="flex gap-2.5 leading-snug">
                            <Star className="mt-1 size-3.5 shrink-0 text-boom" />
                            <span>
                              <span className="font-extrabold">{c.name}</span>
                              <span className="text-ink-muted">
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
                                    className="inline-flex items-center gap-0.5 font-extrabold underline decoration-2 underline-offset-4 hover:text-boom"
                                  >
                                    verify
                                    <ArrowUpRight className="size-3" />
                                  </a>
                                </>
                              )}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <section id="contact" aria-labelledby="contact-h" className="py-14 sm:py-20">
            <div className="panel relative mx-auto max-w-3xl px-6 py-12 text-center sm:px-12">
              <Burst className="absolute -top-14 -left-10 size-28 rotate-12 sm:size-36" />
              <span className="relative inline-block rounded border-2 border-ink bg-paper-2 px-2 py-0.5 text-[11px] font-extrabold tracking-[0.18em] uppercase">
                To be continued…
              </span>
              <h2 id="contact-h" className="cartoon-title relative mt-4 font-display text-5xl leading-none sm:text-6xl">
                Hiring a full-stack developer? Let&apos;s talk!
              </h2>
              <p className="relative mx-auto mt-5 max-w-lg text-lg font-semibold">
                Open to full-time full-stack developer roles and freelance projects. I usually reply within a day.
              </p>
              <a href={mailTo(profile.email)} className={`${btn} relative mt-8 bg-mustard px-9 py-4 text-xl`}>
                <MailIcon className="size-6" />
                Get in touch
              </a>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {[profile.email, profile.workEmail].map((e) => (
                  <a key={e} href={mailTo(e)} className="rounded-full border-2 border-ink bg-paper-2 px-4 py-2 font-bold break-all hover:bg-mustard">
                    {e}
                  </a>
                ))}
                {profile.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-sky px-4 py-2 font-extrabold hover:bg-mustard"
                  >
                    {socialIcon(s.label)}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t-3 border-ink bg-ink py-6 text-center text-sm font-bold text-paper/80">
        © {new Date().getFullYear()} {profile.name} · Illustrations are original, inspired by comic art.
      </footer>
    </div>
  );
}
