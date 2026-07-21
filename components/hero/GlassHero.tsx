"use client";

import { Component, ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useDeviceTilt, type Tilt } from "@/hooks/useDeviceTilt";
import { scrollToTarget } from "@/utils/lenis";

const GlassCanvas = dynamic(() => import("./GlassCanvas"), { ssr: false });

const NAME_LINES = [
  { text: "FELIX", className: "text-[20vw] text-text-primary", delay: 0.1 },
  { text: "DAWODU", className: "text-[13vw] text-text-secondary", delay: 0.28 },
];

/**
 * Mobile hero: a holo-foil nameplate. The name is printed on a physical
 * plate you turn in the light — tilt rakes a copper holographic sheen
 * across extruded 3D type. Pure CSS blend modes + transforms; the gyro
 * (or a thumb) writes custom properties in one rAF loop.
 */
function MobileGlass({
  inView,
  reduceMotion,
}: {
  inView: boolean;
  reduceMotion: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const tilt = useRef<Tilt>({ x: 0, y: 0 });
  const smooth = useRef<Tilt>({ x: 0, y: 0 });

  const { needsPermission, request } = useDeviceTilt((t) => {
    tilt.current = t;
  }, !reduceMotion);

  // Thumb fallback: touch position acts as the light source
  useEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    if (!root) return;
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = root.getBoundingClientRect();
      tilt.current = {
        x: ((touch.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((touch.clientY - rect.top) / rect.height) * 2 - 1,
      };
    };
    root.addEventListener("touchmove", onTouch, { passive: true });
    root.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      root.removeEventListener("touchmove", onTouch);
      root.removeEventListener("touchstart", onTouch);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let raf = 0;
    const loop = () => {
      const s = smooth.current;
      s.x += (tilt.current.x - s.x) * 0.09;
      s.y += (tilt.current.y - s.y) * 0.09;
      const plate = plateRef.current;
      if (plate) {
        const mag = Math.min(1, Math.hypot(s.x, s.y));
        plate.style.transform = `rotateY(${(s.x * 10).toFixed(2)}deg) rotateX(${(-s.y * 8).toFixed(2)}deg)`;
        plate.style.setProperty("--gx", (50 + s.x * 38).toFixed(1));
        plate.style.setProperty("--gy", (45 + s.y * 30).toFixed(1));
        plate.style.setProperty("--foil", (mag * 0.75).toFixed(3));
        plate.style.setProperty("--hue", (s.x * 16).toFixed(1));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, inView]);

  const nameBlock = (depth: "back" | "mid" | "front") => (
    <h2
      aria-hidden={depth !== "front" ? true : undefined}
      className={
        depth === "front"
          ? "relative uppercase font-black leading-[0.85] tracking-[-0.03em]"
          : "absolute inset-0 uppercase font-black leading-[0.85] tracking-[-0.03em] pointer-events-none select-none"
      }
      style={
        depth === "back"
          ? { transform: "translateZ(-16px)", color: "rgba(184,115,51,0.35)" }
          : depth === "mid"
            ? { transform: "translateZ(-8px)", color: "rgba(184,115,51,0.18)" }
            : undefined
      }
    >
      {NAME_LINES.map((line) => (
        <span
          key={line.text}
          className={`flex overflow-hidden ${depth === "front" ? line.className : line.className.replace(/text-text-\S+/, "text-transparent").concat(" text-inherit")}`}
          style={depth === "front" ? undefined : { color: "inherit" }}
        >
          {line.text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.9,
                delay: (depth === "front" ? line.delay : line.delay + 0.15) + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h2>
  );

  return (
    <div ref={rootRef} className="relative" style={{ perspective: "900px" }}>
      <div
        ref={plateRef}
        className="relative rounded-2xl border border-white/[0.09] px-5 py-8 overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(150deg, rgba(232,228,220,0.055) 0%, rgba(232,228,220,0.015) 45%, rgba(184,115,51,0.05) 100%)",
        }}
      >
        {/* Plate silkscreen */}
        <div className="flex items-center justify-between mb-6 font-mono text-[8px] tracking-[0.25em] text-text-muted/50 uppercase" aria-hidden>
          <span>fdw-l3 · glass</span>
          <span>rev 5.0</span>
        </div>

        {/* Extruded name: two copper depth layers behind the face */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {nameBlock("back")}
          {nameBlock("mid")}
          {nameBlock("front")}
        </div>

        <div className="mt-6 flex items-center justify-between font-mono text-[8px] tracking-[0.25em] text-text-muted/40 uppercase" aria-hidden>
          <span>lagos · utc+1</span>
          <span>tilt to catch the light</span>
        </div>

        {/* Holo foil — appears as you tilt */}
        {!reduceMotion && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl holo-foil"
            aria-hidden
          />
        )}
        {/* Glare tracking the light source */}
        {!reduceMotion && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl holo-glare"
            aria-hidden
          />
        )}
      </div>

      {needsPermission && (
        <button
          onClick={request}
          className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted border border-border-subtle px-3 py-1.5 rounded-full active:scale-95 transition-transform"
        >
          <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
          enable tilt
        </button>
      )}
    </div>
  );
}

/** If WebGL is unavailable, the hero silently falls back to its CSS backdrop. */
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Live depth readout — the HUD tells you how far down the stack you are. */
function DepthMeter() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!ref.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const depth = Math.round(p * 0xffff);
      ref.current.textContent = `DEPTH 0x${depth.toString(16).padStart(4, "0").toUpperCase()}`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <span ref={ref}>DEPTH 0x0000</span>;
}

/**
 * L3 — GLASS. On desktop the name lives inside the WebGL scene, refracted
 * through a slab of real glass; scroll pushes the camera through it.
 * Mobile gets the holo-foil nameplate.
 */
export default function GlassHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [canvasOn, setCanvasOn] = useState(false);
  const [inView, setInView] = useState(true);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability detection must run client-side, post-hydration
    if (desktop && !rm) setCanvasOn(true);

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh overflow-hidden bg-carbon"
      aria-label="Introduction: Felix Dawodu"
    >
      {/* Accessible name for all viewports; visually replaced by the scene on desktop */}
      <h1 className="sr-only">Felix Dawodu, full-stack and systems engineer</h1>

      {/* Backdrop: faint sheen, hairline depth rules */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 72% 18%, rgba(232,228,220,0.05) 0%, transparent 55%)," +
              "radial-gradient(80% 60% at 12% 88%, rgba(184,115,51,0.055) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-[8%] h-px bg-white/[0.04]" />
        <div className="absolute inset-x-0 bottom-[4%] h-px bg-white/[0.03]" />
      </div>

      {canvasOn && (
        <div className="absolute inset-0 z-0">
          <CanvasBoundary>
            <GlassCanvas active={inView} progress={scrollYProgress} />
          </CanvasBoundary>
        </div>
      )}

      {/* Spotlit-installation vignette over the scene */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 90% 75% at 50% 45%, transparent 45%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col px-5 md:px-14"
      >
        {/* HUD: meta row */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="hidden md:flex items-center justify-between pt-24 md:pt-28 font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-text-muted/70 uppercase"
        >
          <span>Lagos, NG · UTC+1</span>
          <span className="text-text-muted/50">[ L3 · GLASS ]</span>
        </motion.div>

        {/* Mobile name — the scene carries it on desktop */}
        <div className="flex-1 flex flex-col justify-center select-none md:justify-end md:pb-6">
          <div className="md:hidden">
            <MobileGlass inView={inView} reduceMotion={reduceMotion} />
          </div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 md:mt-0 max-w-md text-sm md:text-base text-text-secondary leading-relaxed"
          >
            I build the whole stack,{" "}
            <span className="text-text-primary">glass to copper</span>. Most weeks
            that means AI infrastructure. Some weeks it means a soldering iron.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-4 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-accent/80">
              Accepting new connections
            </span>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <a
              href="#runtime"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#runtime");
              }}
              className="group inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-medium tracking-widest uppercase text-text-primary/90 border border-border-subtle rounded-full transition-all duration-300 hover:border-border-accent hover:bg-accent/5 active:scale-95"
            >
              <span>See the work</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l-6-6m6 6l6-6" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* HUD: descent cue + live depth meter */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="pb-8 md:pb-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="relative w-px h-10 bg-white/10 overflow-hidden">
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/3 bg-accent/70"
                  animate={{ y: ["-100%", "300%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted/60">
              Scroll · descend to L2
            </span>
          </div>
          <span className="hidden md:block font-mono text-[9px] tracking-[0.25em] text-accent/60">
            <DepthMeter />
          </span>
        </motion.div>
      </motion.div>

      {/* HUD: corner ticks */}
      <div className="absolute inset-0 z-[6] pointer-events-none hidden md:block" aria-hidden>
        <span className="absolute top-20 left-8 w-4 h-px bg-accent/30" />
        <span className="absolute top-20 left-8 w-px h-4 bg-accent/30" />
        <span className="absolute bottom-24 right-8 w-4 h-px bg-accent/30" />
        <span className="absolute bottom-24 right-8 w-px h-4 bg-accent/30 -translate-y-3 translate-x-4" />
      </div>
    </section>
  );
}
