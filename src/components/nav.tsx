"use client";

import { useEffect, useState } from "react";

// Sticky nav: inline links on large screens, a hamburger menu below that.
// Highlights the section currently in view.
export function Nav({
  name,
  items,
  cta,
}: {
  name: string;
  items: { id: string; label: string }[];
  cta: React.ReactNode;
}) {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  // Close the menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const link = (n: { id: string; label: string }, big = false) => (
    <a
      key={n.id}
      href={`#${n.id}`}
      onClick={() => setOpen(false)}
      aria-current={active === n.id ? "true" : undefined}
      className={`whitespace-nowrap rounded-full font-extrabold transition-colors ${
        big ? "block px-4 py-3 text-lg" : "px-3 py-1.5 text-sm"
      } ${active === n.id ? "bg-ink text-mustard" : "text-ink hover:bg-mustard"}`}
    >
      {n.label}
    </a>
  );

  return (
    <header className="sticky top-0 z-40 border-b-3 border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5">
        <a href="#top" className="shrink-0 font-display text-xl leading-none tracking-wide text-ink sm:text-2xl">
          {name}
        </a>

        <nav aria-label="Sections" className="hidden gap-1 lg:flex">
          {items.map((n) => link(n))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{cta}</div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 cursor-pointer place-items-center rounded-full border-3 border-ink bg-mustard shadow-[3px_3px_0_var(--ink)] lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Sections" className="border-t-3 border-ink bg-paper px-5 pt-3 pb-5 lg:hidden">
          <div className="mx-auto max-w-6xl space-y-1">
            {items.map((n) => link(n, true))}
            <div className="pt-3 sm:hidden">{cta}</div>
          </div>
        </nav>
      )}
    </header>
  );
}
