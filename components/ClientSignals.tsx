"use client";

import { testimonials } from "@/data";

const HANDLES: Record<string, string> = {
  "Omonike Blessing": "elijah-graphics",
  "Emmanuel Oye": "og-creations",
  "Ebisintei Dennis": "lomosoft",
};

/**
 * L2 — RUNTIME · stdout. Client testimonials as a live log stream —
 * one marquee row instead of the old 300vh pinned section.
 */
export default function ClientSignals() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative w-full py-16 md:py-20 bg-abyss border-y border-border-subtle overflow-hidden" aria-label="Client feedback">
      <div className="max-w-7xl mx-auto px-5 md:px-14 mb-8 flex items-center justify-between">
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-text-muted/70">
          stdout — client signals
        </span>
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-text-muted/40">
          3 messages
        </span>
      </div>

      <div
        className="marquee-row flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        {doubled.map((t, i) => (
          <blockquote
            key={i}
            aria-hidden={i >= testimonials.length}
            className="flex items-baseline gap-3 pr-16 md:pr-24 whitespace-nowrap"
          >
            <span className="font-mono text-[10px] md:text-xs text-accent shrink-0">
              [{HANDLES[t.name] ?? "client"}]
            </span>
            <span className="text-sm md:text-lg text-text-secondary">
              “{t.quote.length > 110 ? t.quote.slice(0, 107).trimEnd() + "…" : t.quote}”
            </span>
            <cite className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-text-muted not-italic shrink-0">
              — {t.name} · {t.title}
            </cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
