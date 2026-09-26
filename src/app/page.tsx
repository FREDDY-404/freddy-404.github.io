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
import { Burst, ComicSky, InkCloud } from "@/components/comic";
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

const btn =
  "inline-flex items-center gap-2 rounded-full border-3 border-ink px-6 py-3 font-extrabold shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_var(--ink)]";

function MailIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/* Section: yellow comic caption box as the heading, content below */
function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-12 sm:py-16">
      <div className="mb-8 flex flex-wrap items-end gap-x-4 gap-y-2">
        <h2 className="-rotate-1 rounded-md border-3 border-ink bg-mustard px-4 py-1.5 font-display text-4xl leading-none tracking-wide shadow-[5px_5px_0_var(--ink)] sm:text-5xl">
          {title}
        </h2>
        {kicker && <p className="pb-1 text-lg font-bold text-ink">{kicker}</p>}
      </div>
      {children}
    </section>
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
            <MailIcon className="size-4" />
            Get in touch
          </a>
        }
      />

      {/* ── Hero ─────────────────────────────── */}
      <section id="top" className="relative overflow-hidden border-b-3 border-ink bg-sky">
        <ComicSky />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pt-24 pb-14 md:grid-cols-[1.15fr_1fr] md:pt-28 md:pb-20">
          <div>
            {/* speech bubble status */}
            <p className="relative inline-flex items-center gap-2 rounded-2xl border-3 border-ink bg-paper px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_var(--ink)]">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-grass opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2.5 rounded-full bg-grass" />
              </span>
              Open to work · {profile.location}
              <span aria-hidden className="absolute -bottom-3 left-6 size-4 rotate-45 border-r-3 border-b-3 border-ink bg-paper" />
            </p>

            <h1 className="cartoon-title mt-7 font-display text-6xl leading-[0.95] sm:text-8xl">
              {first}
              <br />
              {rest.join(" ")}
            </h1>

            <p className="mt-5 inline-block -rotate-1 rounded-md border-3 border-ink bg-paper px-3 py-1 font-display text-xl tracking-wide sm:text-2xl">
              {profile.title}
            </p>
            <p className="mt-5 max-w-lg text-lg font-semibold leading-relaxed">{profile.tagline}</p>

            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#projects" className={`${btn} bg-mustard`}>
                See my work ↓
              </a>
              <a href={mailTo(profile.email)} className={`${btn} bg-paper`}>
                <MailIcon />
                Get in touch
              </a>
            </div>

            <dl className="mt-9 grid max-w-md grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="panel px-3 py-2.5 text-center shadow-[4px_4px_0_var(--ink)]">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-4xl leading-none">{s.value}</dd>
                  <dd className="mt-1 text-xs font-extrabold uppercase tracking-wide text-ink-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait on an explosion burst */}
          <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm">
            <Burst className="burst-spin absolute inset-[-18%] h-[136%] w-[136%]" />
            <div className="panel relative rotate-2 overflow-hidden p-2.5">
              <div className="halftone relative aspect-4/5 overflow-hidden rounded-sm border-3 border-ink bg-sky">
                {profile.avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(profile.avatar)}
                    alt={profile.name}
                    className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2"
                  />
                )}
              </div>
            </div>
            <InkCloud className="absolute -bottom-8 -left-10 w-40 sm:w-48" />
          </div>
        </div>
      </section>

      <main id="main" className="halftone flex-1 bg-sky">
        <div className="mx-auto max-w-6xl px-5">
          {/* ── Work ─────────────────────────────── */}
          <Section id="projects" title="Selected work" kicker={`${projects.length} projects · ${liveCount} live`}>
            <Projects projects={projects} />
          </Section>

          {/* ── About ─────────────────────────────── */}
          <Section id="about" title="About me">
            <div className="grid gap-7 lg:grid-cols-[1.35fr_1fr]">
              <div className="panel p-6 sm:p-8">
                <div className="space-y-4 text-lg leading-relaxed">
                  {profile.about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {experience.map((e) => (
                  <div key={e.company + e.title} className="mt-8 rounded-md border-3 border-ink bg-paper-2 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-boom">Experience</p>
                    <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl tracking-wide">{e.title}</h3>
                      <span className="text-sm font-bold text-ink-muted">{e.period}</span>
                    </div>
                    <p className="font-extrabold">{e.company}</p>
                    {e.highlights && (
                      <ul className="mt-3 space-y-1.5 text-ink/85">
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className="text-boom">★</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="panel p-6 sm:p-8">
                <h3 className="font-display text-2xl tracking-wide">Toolbox</h3>
                <div className="mt-4 space-y-5">
                  {skills.map((s, gi) => (
                    <div key={s.group}>
                      <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-ink-muted">{s.group}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.items.map((it) => (
                          <span
                            key={it}
                            className={`rounded-full border-2 border-ink px-3 py-1 text-sm font-bold ${gi === 0 ? "bg-mustard" : "bg-paper"}`}
                          >
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div>
                    <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-ink-muted">Spoken languages</p>
                    <ul className="space-y-1.5">
                      {spokenLanguages.map((l) => (
                        <li key={l.name} className="flex justify-between border-b-2 border-dashed border-ink/20 pb-1.5">
                          <span className="font-extrabold">{l.name}</span>
                          <span className="text-sm font-semibold text-ink-muted">{l.level}</span>
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
            <Section id="certificates" title="Certificates" kicker={`${certificates.length} earned`}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((c, i) => (
                  <article key={c.name} className="panel relative flex flex-col p-6">
                    <span
                      aria-hidden
                      className="absolute -top-4 -right-3 grid size-11 rotate-12 place-items-center rounded-full border-3 border-ink bg-boom font-display text-lg text-paper"
                    >
                      ★
                    </span>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-ink-muted">
                      Certificate #{String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-2xl leading-tight tracking-wide">{c.name}</h3>
                    <p className="mt-2 font-extrabold">{c.issuer}</p>
                    {c.date && <p className="text-sm font-semibold text-ink-muted">{c.date}</p>}
                    {c.credentialId && <p className="mt-2 break-all text-xs text-ink-muted">ID {c.credentialId}</p>}
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto self-start pt-5 font-extrabold underline decoration-3 underline-offset-4 hover:text-boom"
                      >
                        Verify credential ↗
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </Section>
          )}

          {/* ── Education ─────────────────────────────── */}
          <Section id="education" title="Education">
            <div className="grid gap-6 md:grid-cols-2">
              {education.map((e) => (
                <article key={e.school + e.degree} className="panel p-6">
                  <span className="inline-block rounded-full border-2 border-ink bg-mustard px-3 py-0.5 text-sm font-extrabold">
                    {e.period}
                  </span>
                  <h3 className="mt-3 font-display text-3xl leading-tight tracking-wide">{e.degree}</h3>
                  <p className="font-extrabold text-ink-muted">{e.school}</p>
                  {e.details && (
                    <ul className="mt-3 space-y-1 text-ink/85">
                      {e.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="text-boom">★</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </Section>

          {/* ── Contact ─────────────────────────────── */}
          <section id="contact" className="py-14 sm:py-20">
            <div className="panel relative mx-auto max-w-3xl overflow-visible px-6 py-12 text-center sm:px-12">
              <Burst className="absolute -top-14 -left-10 size-28 rotate-12 sm:size-36" />
              <h2 className="cartoon-title relative font-display text-5xl leading-none sm:text-7xl">Let&apos;s talk!</h2>
              <p className="relative mx-auto mt-5 max-w-lg text-lg font-semibold">
                Open to full-time AI and full-stack developer roles, and freelance projects. I usually reply within a day.
              </p>
              <a href={mailTo(profile.email)} className={`${btn} relative mt-8 bg-mustard px-9 py-4 text-xl`}>
                <MailIcon className="size-6" />
                Get in touch
              </a>
              <p className="mt-7 text-xs font-extrabold uppercase tracking-widest text-ink-muted">or reach me directly</p>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                {[profile.email, profile.workEmail].map((e) => (
                  <a key={e} href={mailTo(e)} className="rounded-full border-2 border-ink bg-paper-2 px-4 py-2 font-bold break-all hover:bg-mustard">
                    {e}
                  </a>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                {profile.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border-2 border-ink bg-sky px-4 py-2 font-extrabold hover:bg-mustard"
                  >
                    {s.label} ↗
                  </a>
                ))}
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
