"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToTarget } from "@/utils/lenis";
import { buzz } from "@/utils/haptics";

const LAYERS = [
  { id: "glass", index: "L3", name: "GLASS", hint: "surface" },
  { id: "runtime", index: "L2", name: "RUNTIME", hint: "systems" },
  { id: "terminal", index: "L1", name: "TERMINAL", hint: "shell" },
  { id: "copper", index: "L0", name: "COPPER", hint: "bare metal" },
];

/**
 * The site's signature nav: a stack-trace of the page. Tracks which
 * abstraction layer the visitor is in and doubles as anchor navigation.
 */
export default function DepthGauge() {
  const [active, setActive] = useState("glass");
  const [visible, setVisible] = useState(false);
  const spineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Fade the gauge in once the visitor starts moving; fill the spine
    // with overall descent progress
    const onScroll = () => {
      setVisible(window.scrollY > 40);
      if (spineRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        spineRef.current.style.transform = `scaleY(${p.toFixed(4)})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = LAYERS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            // The cursor (and anything else) can react to the current layer
            document.body.dataset.depth = entry.target.id;
          }
        }
      },
      // A narrow band around the viewport centre decides the current layer
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const activeLayer = LAYERS.find((l) => l.id === active) ?? LAYERS[0];

  return (
    <>
      {/* Desktop: left rail */}
      <nav
        aria-label="Depth navigation"
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-[80] hidden md:flex flex-col gap-5 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Descent spine: overall progress, tick to tick */}
        <span className="absolute -left-2 top-0 bottom-0 w-px bg-white/[0.07]" aria-hidden>
          <span
            ref={spineRef}
            className="absolute inset-0 origin-top bg-accent/60"
            style={{ transform: "scaleY(0)" }}
          />
        </span>
        {LAYERS.map((layer) => {
          const isActive = layer.id === active;
          return (
            <button
              key={layer.id}
              onClick={() => scrollToTarget(`#${layer.id}`)}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center gap-3 text-left"
            >
              <span
                className={`h-px transition-all duration-500 ${
                  isActive ? "w-8 bg-accent" : "w-4 bg-text-faint group-hover:w-6 group-hover:bg-text-muted"
                }`}
              />
              <span className="flex flex-col bg-void/70 rounded px-1.5 py-0.5 -ml-1.5">
                <span
                  className={`font-mono text-[10px] tracking-[0.25em] transition-colors duration-500 ${
                    isActive ? "text-accent" : "text-text-faint group-hover:text-text-muted"
                  }`}
                >
                  {layer.index} · {layer.name}
                </span>
                <span
                  className={`font-mono text-[8px] tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden ${
                    isActive ? "max-h-4 opacity-60 text-text-muted" : "max-h-0 opacity-0"
                  }`}
                >
                  {layer.hint}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile: compact depth readout, bottom-left */}
      <button
        aria-label={`Current layer ${activeLayer.index} ${activeLayer.name}. Tap to descend`}
        onClick={() => {
          buzz(6);
          const idx = LAYERS.findIndex((l) => l.id === active);
          const next = LAYERS[Math.min(idx + 1, LAYERS.length - 1)];
          scrollToTarget(`#${next.id}`);
        }}
        className={`fixed left-4 bottom-4 z-[80] md:hidden flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-carbon/80 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="flex gap-1">
          {LAYERS.map((layer) => (
            <span
              key={layer.id}
              className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                layer.id === active ? "bg-accent" : "bg-text-faint"
              }`}
            />
          ))}
        </span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted">
          {activeLayer.index}·{activeLayer.name}
        </span>
      </button>
    </>
  );
}
