"use client";

import { useEffect, useRef } from "react";

const POOL = "abcdefghjkmnpqrstuvwxyz01_./-";

/**
 * Scrambles briefly whenever `trigger` changes — the text "re-attaches".
 * Writes to the DOM directly; renders once.
 */
export default function ScrambleText({ text, trigger }: { text: string; trigger: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (trigger === 0 || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    let frame = 0;
    const total = 9;
    const interval = setInterval(() => {
      frame++;
      const settled = Math.floor((frame / total) * text.length);
      el.textContent = text
        .split("")
        .map((c, i) =>
          i < settled || c === " " || c === "."
            ? c
            : POOL[Math.floor(Math.random() * POOL.length)]
        )
        .join("");
      if (frame >= total) {
        el.textContent = text;
        clearInterval(interval);
      }
    }, 38);

    return () => {
      clearInterval(interval);
      el.textContent = text;
    };
  }, [trigger, text]);

  return <span ref={ref}>{text}</span>;
}
