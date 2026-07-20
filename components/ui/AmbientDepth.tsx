"use client";

import { useEffect, useRef } from "react";

/**
 * The continuous descent, felt: a fixed backdrop whose temperature
 * shifts from glass-white sheen to copper glow as you go deeper.
 * Direct style writes on scroll — React renders this exactly once.
 */
export default function AmbientDepth() {
  const coolRef = useRef<HTMLDivElement>(null);
  const warmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (coolRef.current) coolRef.current.style.opacity = String(1 - p);
      if (warmRef.current) warmRef.current.style.opacity = String(p * 0.9);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <div
        ref={coolRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 70% at 70% 10%, rgba(232,228,220,0.05) 0%, transparent 60%)",
        }}
      />
      <div
        ref={warmRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(90% 70% at 30% 95%, rgba(184,115,51,0.09) 0%, transparent 60%)," +
            "radial-gradient(60% 40% at 85% 80%, rgba(212,162,78,0.05) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
