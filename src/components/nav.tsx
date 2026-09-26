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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-frame/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="cover-title shrink-0 text-sm text-on-frame">
          {name}
        </a>
        <nav aria-label="Sections" className="flex gap-1 overflow-x-auto">
          {items.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              className={`whitespace-nowrap border-b-2 px-3 py-1.5 text-sm transition-colors ${
                active === n.id
                  ? "border-on-frame text-on-frame"
                  : "border-transparent text-on-frame-muted hover:text-on-frame"
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
