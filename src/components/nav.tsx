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
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="shrink-0 font-semibold tracking-tight text-fg">
          {name}
        </a>
        <nav aria-label="Sections" className="flex gap-1 overflow-x-auto">
          {items.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors ${
                active === n.id ? "bg-surface-2 font-medium text-fg" : "text-muted hover:text-fg"
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
