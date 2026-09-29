import { asset } from "@/lib/asset";

/* About: bio in a speech-bubble panel with a cartoon laptop, plus quick-fact cards */

function Laptop({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 220 150" className={className}>
      {/* screen */}
      <rect x="34" y="10" width="152" height="100" rx="8" fill="#16130f" />
      <rect x="42" y="18" width="136" height="84" rx="3" fill="#1d2b3a" />
      {/* code lines */}
      <g strokeLinecap="round" strokeWidth="5">
        <path d="M52 32h26" stroke="#ec5a2a" />
        <path d="M84 32h40" stroke="#86c5e6" />
        <path d="M62 46h34" stroke="#f2c53d" />
        <path d="M102 46h28" stroke="#fbf7ec" />
        <path d="M62 60h52" stroke="#6fae57" />
        <path d="M52 74h22" stroke="#ec5a2a" />
        <path d="M80 74h46" stroke="#86c5e6" />
        <path d="M52 88h36" stroke="#f2c53d" />
      </g>
      <rect x="94" y="84" width="7" height="10" fill="#fbf7ec">
        <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
      </rect>
      {/* base */}
      <path d="M14 116h192l-12 20H26z" fill="#f2c53d" stroke="#16130f" strokeWidth="4" strokeLinejoin="round" />
      <path d="M92 116h36l-4 6h-28z" fill="#16130f" />
      {/* coffee */}
      <path d="M186 90h22l-3 24h-16z" fill="#fbf7ec" stroke="#16130f" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M207 96q9 1 7 8t-9 6" fill="none" stroke="#16130f" strokeWidth="3.5" />
      <path d="M192 84q-3-6 1-10M200 84q-3-6 1-10" fill="none" stroke="#16130f" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  pin: <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  store: <path d="M4 9h16l-1.5 11h-13zM8 9V7a4 4 0 0 1 8 0v2" />,
  cap: <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5" />,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  team: <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.5a3 3 0 0 1 0 5.5M18 14.5c1.8.8 3 2.9 3 5.5" />,
};

export type Fact = {
  icon: keyof typeof icons;
  label: string;
  value: string;
  color: string;
  logo?: string; // image from /public, shown instead of the icon
  popup?: { title: string; body: string[] }; // opens a comic pop-up panel
};

export function About({ paragraphs, facts }: { paragraphs: string[]; facts: Fact[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
      <div className="relative">
        {/* speech-bubble panel */}
        <div className="panel relative p-6 text-lg leading-relaxed sm:p-8">
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <span
            aria-hidden
            className="absolute -bottom-[18px] left-14 size-8 rotate-45 border-r-3 border-b-3 border-ink bg-paper"
          />
        </div>
        <Laptop className="mt-8 ml-4 w-56 drop-shadow-[4px_4px_0_#16130f] sm:w-64" />
      </div>

      <div>
        <p className="mb-4 inline-block -rotate-2 rounded-md border-3 border-ink bg-boom px-3 py-1 font-display text-xl tracking-wide text-paper shadow-[3px_3px_0_var(--ink)]">
          Quick facts
        </p>
        <ul className="space-y-4">
          {facts.map((f, i) => (
            <li
              key={f.label}
              className={`panel flex items-center gap-4 p-4 transition-transform hover:rotate-0 ${i % 2 ? "rotate-1" : "-rotate-1"}`}
            >
              {f.logo ? (
                <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border-3 border-ink bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                  <img src={asset(f.logo)} alt="" className="w-[86%]" />
                </span>
              ) : (
                <span className={`grid size-12 shrink-0 place-items-center rounded-full border-3 border-ink ${f.color}`}>
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="#16130f" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
                    {icons[f.icon]}
                  </svg>
                </span>
              )}
              <div>
                <p className="text-xs font-extrabold tracking-[0.15em] text-ink-muted uppercase">{f.label}</p>
                <p className="font-extrabold leading-snug">{f.value}</p>
                {f.popup && (
                  <>
                    <button
                      type="button"
                      popoverTarget={`fact-${i}`}
                      className="mt-1.5 cursor-pointer rounded-full border-2 border-ink bg-mustard px-2.5 py-0.5 text-xs font-extrabold transition-transform hover:-translate-y-0.5"
                    >
                      {f.popup.title} →
                    </button>
                    <div
                      id={`fact-${i}`}
                      popover="auto"
                      className="fact-pop panel m-auto w-[min(32rem,calc(100%-2rem))] p-0"
                    >
                      <div className="flex items-center justify-between gap-4 border-b-3 border-ink bg-grass px-5 py-3">
                        <div className="flex items-center gap-3">
                          {f.logo && (
                            <span className="grid h-12 w-18 shrink-0 place-items-center rounded-md border-3 border-ink bg-black p-1 shadow-[3px_3px_0_var(--ink)]">
                              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                              <img src={asset(f.logo)} alt={`${f.value.split(" · ")[0]} logo`} className="max-h-full" />
                            </span>
                          )}
                          <h3 className="font-display text-2xl tracking-wide">{f.popup.title}</h3>
                        </div>
                        <button
                          type="button"
                          popoverTarget={`fact-${i}`}
                          popoverTargetAction="hide"
                          aria-label="Close"
                          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border-3 border-ink bg-paper font-extrabold hover:bg-mustard"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-3 p-5 leading-relaxed">
                        {f.popup.body.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
