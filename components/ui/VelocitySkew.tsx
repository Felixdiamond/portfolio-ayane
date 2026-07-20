"use client";

import { useEffect } from "react";

/**
 * Velocity-reactive type: elements tagged [data-vskew] lean with scroll
 * speed and settle when it stops. Direct style writes, one rAF loop.
 */
export default function VelocitySkew() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-vskew]"));
    if (!els.length) return;

    let lastY = window.scrollY;
    let skew = 0;
    let raf = 0;

    const loop = () => {
      const y = window.scrollY;
      const velocity = y - lastY;
      lastY = y;
      const target = Math.max(-2.5, Math.min(2.5, velocity * 0.06));
      skew += (target - skew) * 0.12;
      if (Math.abs(skew) > 0.02) {
        for (const el of els) el.style.transform = `skewY(${skew.toFixed(3)}deg)`;
      } else {
        for (const el of els) el.style.transform = "";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
