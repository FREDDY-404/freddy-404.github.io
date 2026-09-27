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
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
].filter((n) => n.id !== "certificates" || certificates.length > 0);

// Opens the visitor's email app with a message to me, subject pre-filled
const mailTo = (email: string) =>
  `mailto:${email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent("Hi Min Khant Kyaw,\n\n")}`;

const btn =
  "inline-flex items-center gap-2 rounded-full border-3 border-ink px-6 py-3 font-extrabold shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_var(--ink)]";

/* Section: heading in a tilted caption box */
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
    <section id={id} aria-labelledby={`${id}-h`} className="py-12 sm:py-16">
      <Reveal className="mb-8">
        <h2
          id={`${id}-h`}
          className="block w-fit -rotate-1 rounded-md border-3 border-ink bg-mustard px-4 py-1.5 font-display text-4xl leading-none tracking-wide shadow-[5px_5px_0_var(--ink)] sm:text-5xl"
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

      {/* ── Hero: cartoon sky, bubbly name, numbers on a burst ── */}
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
          </div>

          {/* Numbers on the explosion burst */}
          <div className="relative mx-auto w-full max-w-xs py-10">
            <Burst className="burst-spin absolute top-1/2 left-1/2 size-[150%] max-w-none -translate-x-1/2 -translate-y-1/2" />
            <dl className="relative space-y-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`panel flex flex-col-reverse items-center px-5 py-4 text-center ${i % 2 ? "rotate-2" : "-rotate-2"}`}
                >
                  <dt className="mt-1 text-xs font-extrabold tracking-[0.18em] text-ink-muted uppercase">{s.label}</dt>
                  <dd className="font-display text-5xl leading-none">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <main id="main" className="halftone flex-1 bg-sky">
        <div className="mx-auto max-w-6xl px-5">
          <Section
            id="projects"
            title="Projects"
            intro="Swipe or use the arrows to see more."
          >
            <Projects projects={projects} />
          </Section>

          <Section id="experience" title="Experience">
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
                  {e.links && e.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper-2 px-3 py-1 text-sm font-extrabold transition-colors hover:bg-mustard"
                        >
                          {socialIcon(l.label, "size-3.5")}
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </DatedRow>
              ))}
            </ol>
          </Section>

          <Section id="education" title="Education">
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

          <Section id="about" title="About">
            <div className="panel max-w-3xl space-y-4 p-6 text-lg leading-relaxed sm:p-8">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Section>

          <Section id="skills" title="Skills">
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
            <Section id="certificates" title="Certificates">
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
            <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
            <div className="panel relative px-6 py-12 text-center sm:px-12">
              <Burst className="absolute -top-14 -left-10 size-28 rotate-12 sm:size-36" />
              <h2 id="contact-h" className="cartoon-title relative font-display text-5xl leading-none sm:text-6xl">
                Let&apos;s work together
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
              <div>
                <ProfileCard
                  photo={profile.avatar}
                  name={profile.name}
                  title={profile.title}
                  location={profile.location}
                  stack={["TypeScript", "Next.js", "React", "Node.js", "Supabase", "PostgreSQL"]}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t-3 border-ink bg-ink py-6 text-center text-sm font-bold text-paper/80">
        © {new Date().getFullYear()} {profile.name} · Designed &amp; built by {profile.name}
      </footer>
    </div>
  );
}
