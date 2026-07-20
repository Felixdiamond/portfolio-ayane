"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Type that bends under the cursor: each letter's variable-font width
 * flexes with pointer proximity. Direct DOM writes in one rAF loop —
 * React never re-renders for this. No-ops on touch / reduced motion.
 */
export default function FlexText({
  text,
  className = "",
  delay = 0,
  instant = false,
  active = true,
  resting = 96,
  peak = 125,
}: {
  text: string;
  className?: string;
  delay?: number;
  instant?: boolean;
  active?: boolean;
  resting?: number;
  peak?: number;
}) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const widths = useRef<number[]>([]);

  useEffect(() => {
    if (instant || !active) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = mouse.x - (r.left + r.width / 2);
        const dy = mouse.y - (r.top + r.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pressure = Math.max(0, 1 - dist / 300);
        const target = resting + pressure * (peak - resting);
        const current = widths.current[i] ?? resting;
        const next = current + (target - current) * 0.16;
        widths.current[i] = next;
        if (Math.abs(next - current) > 0.01) {
          el.style.fontVariationSettings = `"wdth" ${next.toFixed(2)}`;
        }
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [instant, active, resting, peak]);

  return (
    <span className={`flex overflow-hidden ${className}`} aria-label={text}>
      <span className="sr-only">{text}</span>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          aria-hidden
          initial={instant ? false : { y: "110%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.045,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ fontVariationSettings: `"wdth" ${resting}` }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
