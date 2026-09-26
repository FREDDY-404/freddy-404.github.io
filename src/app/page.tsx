import {
  certificates,
  education,
  experience,
  profile,
  projects,
  skills,
  spokenLanguages,
} from "@/data/portfolio";
import { ArrowDown, ArrowUpRight, MailIcon, MapPin, Star, socialIcon } from "@/components/icons";
import { AlbumCover } from "@/components/album-cover";
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

const btnYellow =
  "inline-flex items-center gap-2 rounded-lg bg-yellow px-5 py-3 text-sm font-semibold text-night transition-colors hover:bg-[#ffd84a]";
const btnOutline =
  "inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10";

function Section({
  id,
  no,
  title,
  intro,
  children,
}: {
  id: string;
  no: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-24">
      <div className="mb-10 max-w-2xl">
        <p className="font-display text-lg tracking-widest text-red">{no}</p>
        <h2 className="title-yellow mt-1 text-5xl sm:text-6xl">{title}</h2>
        {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
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

      {/* ── Hero: red backdrop, giant yellow name, profile as a record sleeve ── */}
      <section id="top" className="grain overflow-hidden bg-red">
        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-10">
          <h1 className="title-yellow text-center text-[clamp(3.5rem,11.5vw,9.5rem)]">{profile.name}</h1>

          <div className="mt-6 grid items-end gap-0 md:grid-cols-[1fr_1fr] md:gap-8">
            <div className="pb-4 md:pb-20">
              <p className="inline-flex items-center gap-2 rounded-full bg-night/85 px-3 py-1 text-sm text-text">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-soft opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-blue-soft" />
                </span>
                Available for work
              </p>
              <p className="mt-6 font-display text-3xl tracking-wide text-white uppercase sm:text-4xl">{profile.title}</p>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white">{profile.tagline}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/85">
                <MapPin />
                {profile.location}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className={btnYellow}>
                  View my work
                  <ArrowDown />
                </a>
                <a href={mailTo(profile.email)} className={btnOutline}>
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
                      className="grid size-10 place-items-center rounded-lg text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {socialIcon(s.label, "size-5")}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="pb-14 md:pb-16">
              <AlbumCover
                photo={profile.avatar}
                artist={profile.name}
                title={profile.title}
                location={profile.location}
                sticker="Available for work"
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
        <Section id="projects" no="01" title="Selected work" intro="Products I've designed, built, and shipped.">
          <Projects projects={projects} />
        </Section>

        <Section id="about" no="02" title="About me">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="space-y-4 text-lg leading-relaxed text-muted">
                {profile.about.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h3 className="mt-12 font-display text-2xl tracking-wide text-text uppercase">Experience</h3>
              <ol className="mt-5 space-y-8">
                {experience.map((e) => (
                  <li key={e.company + e.title} className="border-l-2 border-blue pl-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-lg font-semibold">{e.title}</h4>
                      <span className="text-xs text-subtle">{e.period}</span>
                    </div>
                    <p className="text-sm text-yellow">{e.company}</p>
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
                  </li>
                ))}
              </ol>
            </div>

            <div className="h-fit rounded-2xl border border-line bg-night-2 p-6">
              <h3 className="font-display text-2xl tracking-wide uppercase">Skills</h3>
              <div className="mt-5 space-y-5">
                {skills.map((s) => (
                  <div key={s.group}>
                    <p className="mb-2 text-xs font-semibold tracking-widest text-red uppercase">{s.group}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {s.items.map((it) => (
                        <li key={it} className="rounded-md bg-night-3 px-2.5 py-1 text-sm text-muted">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-widest text-red uppercase">Languages spoken</p>
                  <ul className="divide-y divide-line">
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

        {certificates.length > 0 && (
          <Section id="certificates" no="03" title="Certificates">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((c) => (
                <article key={c.name} className="glow flex flex-col rounded-2xl border border-line bg-night-2 p-6 transition-shadow">
                  <Star className="size-5 text-yellow" />
                  <p className="mt-4 text-xs text-subtle">{c.date ?? "Completed"}</p>
                  <h3 className="mt-1 text-lg leading-snug font-semibold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-1 self-start pt-5 text-sm font-medium text-blue-soft hover:text-text"
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

        <Section id="education" no="04" title="Education">
          <ol className="divide-y divide-line rounded-2xl border border-line bg-night-2">
            {education.map((e) => (
              <li key={e.school + e.degree} className="grid gap-1 p-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                <div>
                  <h3 className="text-lg font-semibold">{e.degree}</h3>
                  <p className="text-yellow">{e.school}</p>
                  {e.details && <p className="mt-1 text-sm text-subtle">{e.details.join(" · ")}</p>}
                </div>
                <p className="text-sm text-subtle tabular-nums">{e.period}</p>
              </li>
            ))}
          </ol>
        </Section>
      </main>

      {/* ── Contact: back to the red ── */}
      <section id="contact" className="grain bg-red">
        <div className="relative z-10 mx-auto max-w-4xl px-5 py-20 text-center sm:py-24">
          <p className="font-display text-lg tracking-widest text-night">05</p>
          <h2 className="title-yellow mt-1 text-6xl sm:text-8xl">Let&apos;s work together</h2>
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
