"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroScrollIndicator from "@/components/hero/HeroScrollIndicator";
import { useTransition } from "@/context/TransitionContext";
import type { MotionValue } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";

function KineticSplitText({
  text,
  className = "",
  delay = 0,
  shouldAnimate,
  scrollProgress,
}: {
  text: string;
  className?: string;
  delay?: number;
  shouldAnimate: boolean;
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0, 0.35], [1, 0]);

  return (
    <motion.div className={`flex ${className}`} style={{ opacity }} aria-label={text}>
      <span className="sr-only">{text}</span>
      {text.split("").map((char, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            initial={{ y: "110%", rotateX: 80 }}
            animate={shouldAnimate ? { y: "0%", rotateX: 0 } : {}}
            transition={{
              duration: 1.0,
              delay: delay + i * 0.055,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="inline-block origin-bottom will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

function Ticker({ items }: { items: string[] }) {
  const full = items.join("  ·  ") + "  ·  ";
  return (
    <div className="overflow-hidden w-full border-t border-white/[0.07]">
      <motion.div
        className="flex whitespace-nowrap py-2.5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-[9px] font-mono uppercase tracking-[0.28em] text-text-muted/50 pr-10 shrink-0"
          >
            {full}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function GrainOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-2 opacity-[0.15] pointer-events-none mix-blend-overlay"
      aria-hidden
    >
      <filter id="grain-m">
        <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-m)" />
    </svg>
  );
}

export default function HeroMobileNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useTransition();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const containerOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: containerOpacity }}
      className="relative w-full h-dvh flex flex-col bg-transparent"
    >
      <div className="absolute inset-0 z-1 opacity-40 mix-blend-soft-light pointer-events-none overflow-hidden">
        <Spotlight className="-top-40 left-0 h-[180vh]" fill="white" />
      </div>

      <GrainOverlay />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-20 flex items-center justify-between px-6 pt-12 pb-0"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-text-muted/60">
          Lagos, NG
        </span>

        <span className="text-[9px] font-mono tracking-[0.25em] text-text-muted/40">[ 01 ]</span>
      </motion.div>

      <div className="relative z-10 flex flex-col justify-center flex-1 px-5 select-none">
        <h1 className="uppercase leading-[0.84] font-black tracking-[-0.04em]">
          <div className="overflow-hidden w-full">
            <KineticSplitText
              text="FELIX"
              delay={0.15}
              shouldAnimate={isLoaded}
              scrollProgress={scrollYProgress}
              className="text-[26vw] text-text-primary leading-none"
            />
          </div>
          <div className="overflow-hidden w-full">
            <KineticSplitText
              text="DAWODU"
              delay={0.36}
              shouldAnimate={isLoaded}
              scrollProgress={scrollYProgress}
              className="text-[17.5vw] text-text-secondary leading-none"
            />
          </div>
        </h1>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -16 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mt-7 flex items-center gap-3"
        >
          <div className="w-6 h-px bg-accent/50 shrink-0" />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-text-muted">
            Full Stack Engineer  ·  Systems Architect
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-4 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
          <span className="text-[9px] font-mono uppercase tracking-[0.28em] text-accent/70">
            Open to work
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 14 }}
          transition={{ delay: 1.8, duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mt-9 pointer-events-auto"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-medium tracking-widest text-text-primary/90 uppercase border border-border-subtle rounded-full backdrop-blur-sm transition-all duration-300 active:scale-95 hover:border-border-accent hover:bg-accent/5"
          >
            <span>View Work</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          className="mt-6"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
        >
          <HeroScrollIndicator />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="relative z-20 pb-safe-bottom"
      >
        <Ticker
          items={[
            "Full Stack Engineer",
            "Systems Architect",
            "React · Next.js · TypeScript",
            "Open to work",
            "Lagos, Nigeria",
          ]}
        />
      </motion.div>
    </motion.section>
  );
}
