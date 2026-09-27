"use client";

import { useEffect, useState } from "react";

// Sticky nav that highlights the section currently in view
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

  return (
    <header className="sticky top-0 z-40 border-b-3 border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5">
        <a href="#top" className="shrink-0 font-display text-2xl leading-none tracking-wide text-ink">
          {name}
        </a>
        <nav aria-label="Sections" className="flex gap-1 overflow-x-auto">
          {items.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-extrabold transition-colors ${
                active === n.id ? "bg-ink text-mustard" : "text-ink hover:bg-mustard"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden shrink-0 md:block">{cta}</div>
      </div>
    </header>
  );
}
