"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SESSION = `$ whoami

 _____  _____  _      ___ __  __
|  ___|| ____|| |    |_ _|\\ \\/ /
| |_   |  _|  | |     | |  \\  /
|  _|  | |___ | |___  | |  /  \\
|_|    |_____||_____||___|/_/\\_\\

felix - full-stack & systems engineer, lagos ng

$ journalctl --unit=career --no-pager
[2022-2023]  full-stack developer @ lomosoft / chainkoffee
             -> modular microservices & REST APIs
             -> data throughput up 30%

[2023-now ]  freelance systems engineer @ independent
             -> school biometrics: scanner driver, face rec, web
             -> GPU dubbing pipeline + reverse-engineered AI gateway
             -> CLI automation cutting client workflows 90%

[2026-now ]  IoT engineering intern @ koolboks, lagos
             -> solar-freezer door sensors on the production line
             -> the I2C wire-colour lesson, permanently burned in

$ systemctl status availability
● open-to-work.service - active (running)

$ crontab -l
@weekly  explain one complex thing, simply -> @ayanesenpai_

$ echo $STATUS
still in school. still building.

$ cd /hardware && ls
descending to L0 ...`;

// The one place phosphor green is allowed to exist.
const PHOSPHOR = "#33ff66";

/**
 * L1 — TERMINAL. The threshold beat: the polished runtime world power-cuts
 * to a shell, and the career history types itself out as you scroll.
 * Scrubbing controls the typing — scroll back and it untypes.
 */
export default function TerminalLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLPreElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const screen = screenRef.current;
      if (!container || !screen) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        screen.textContent = SESSION;
        return;
      }

      screen.textContent = "";
      const state = { chars: 0 };

      // The power cut is a page-wide event: one inverted frame, then black.
      let cutFired = false;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=280%",
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (cutFired) return;
            cutFired = true;
            document.body.classList.add("power-cut");
            setTimeout(() => document.body.classList.remove("power-cut"), 140);
          },
        },
      });

      // Power cut: a bright line collapses, then the shell takes over
      tl.fromTo(
        flashRef.current,
        { scaleY: 1, opacity: 0 },
        { opacity: 1, duration: 0.02, ease: "none" }
      )
        .to(flashRef.current, { scaleY: 0.004, duration: 0.06, ease: "power2.in" })
        .to(flashRef.current, { opacity: 0, duration: 0.03, ease: "none" })
        // Typing, scrubbed: progress maps directly to characters on screen
        .to(state, {
          chars: SESSION.length,
          duration: 0.81,
          ease: "none",
          onUpdate: () => {
            screen.textContent = SESSION.slice(0, Math.round(state.chars));
          },
        })
        // Burn-out: the phosphor cools to copper as the descent continues —
        // the dead screen hands its light to L0
        .to(preRef.current, {
          color: "#b87333",
          textShadow: "0 0 8px rgba(184,115,51,0.35)",
          duration: 0.08,
          ease: "none",
        })
        .to(ambientRef.current, { opacity: 0.25, duration: 0.08, ease: "none" }, "<");
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black z-30">
      {/* CRT power-cut flash line */}
      <div
        ref={flashRef}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full origin-center pointer-events-none opacity-0"
        style={{ background: PHOSPHOR, mixBlendMode: "screen" }}
        aria-hidden
      />

      {/* CRT dress: phosphor dot-matrix + scanlines + ambient tube glow + vignette */}
      <div
        ref={ambientRef}
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden
        style={{
          background: "radial-gradient(75% 60% at 50% 42%, rgba(51,255,102,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(rgba(51,255,102,0.09) 1px, transparent 1.3px)",
          backgroundSize: "6px 6px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, rgba(51,255,102,0.5) 0px, transparent 2px, transparent 4px)",
        }}
      />
      {/* Slow CRT refresh sweep */}
      <div className="terminal-sweep absolute inset-x-0 h-24 pointer-events-none" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(120% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="relative h-full max-w-5xl mx-auto px-5 md:px-14 pt-24 pb-32 md:pt-28 md:pb-36 flex flex-col">
        <div className="flex items-center justify-between mb-8 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em]" style={{ color: `${PHOSPHOR}99` }}>
          <span>tty0 · career.log</span>
          <span>[ L1 · TERMINAL ]</span>
        </div>

        <pre
          ref={preRef}
          className="flex-1 font-mono text-[11px] leading-[1.75] md:text-sm md:leading-[1.8] whitespace-pre-wrap"
          style={{ color: PHOSPHOR, textShadow: `0 0 8px ${PHOSPHOR}55` }}
        >
          <span ref={screenRef} />
          <span ref={cursorRef} className="inline-block w-[0.6em] h-[1.1em] align-text-bottom animate-pulse" style={{ background: "currentColor" }} aria-hidden />
        </pre>

        {/* Screen-reader users get the session as plain text */}
        <span className="sr-only">{SESSION}</span>
      </div>
    </div>
  );
}
