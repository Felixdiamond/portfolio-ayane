"use client";

import { useRef, useState } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";

const STATEMENT = [
  { text: "Most developers stop at the framework." },
  { text: "I keep going." },
  { text: "Through the runtime. Past the API." },
  { text: "Down to the metal.", copper: true },
];

const DEPTHS = [
  {
    marker: "▓░░",
    title: "Interface",
    description: "High-performance UIs that feel engineered, not decorated.",
    tags: ["Next.js", "TypeScript", "GSAP", "R3F"],
  },
  {
    marker: "▓▓░",
    title: "Infrastructure",
    description: "AI pipelines, APIs, and backends that stay up under load.",
    tags: ["Python", "FastAPI", "Docker", "CI/CD"],
  },
  {
    marker: "▓▓▓",
    title: "Metal",
    description: "Firmware, drivers, edge AI. Hardware for when software isn't enough.",
    tags: ["ESP32", "Termux", "Linux", "C++"],
  },
];

function StatementLine({
  text,
  copper,
  progress,
  index,
  total,
  instant,
}: {
  text: string;
  copper?: boolean;
  progress: MotionValue<number>;
  index: number;
  total: number;
  instant: boolean;
}) {
  // Each line resolves as the visitor descends through the section
  const start = (index / total) * 0.6;
  const end = start + 0.35;
  const opacity = useTransform(progress, [start, end], [0.13, 1]);
  const y = useTransform(progress, [start, end], [24, 0]);

  return (
    <motion.span
      style={instant ? undefined : { opacity, y }}
      className={cn(
        "block text-[7.5vw] md:text-[3.6vw] leading-[1.12] font-semibold tracking-tight",
        copper ? "text-accent" : "text-text-primary"
      )}
    >
      {text}
    </motion.span>
  );
}

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const POWER4_OUT: [number, number, number, number] = [0.19, 1, 0.22, 1];

function DepthRow({
  depth,
  index,
  activeIndex,
  setActiveIndex,
}: {
  depth: (typeof DEPTHS)[0];
  index: number;
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
}) {
  const dimmed = activeIndex !== null && activeIndex !== index;

  // Three-beat entrance: rule draws → title surfaces from the mask → detail settles
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      className={cn(
        "group relative py-10 md:py-14",
        "grid grid-cols-[auto_1fr] md:grid-cols-[8rem_1fr_auto] gap-x-6 gap-y-4 items-baseline md:items-center",
        "transition-opacity duration-500",
        dimmed ? "opacity-35" : "opacity-100"
      )}
    >
      <motion.span
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 0.6, ease: POWER4_OUT }}
        className="absolute top-0 left-0 right-0 h-px bg-border-subtle origin-left"
        aria-hidden
      />

      <motion.span
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="font-mono text-[11px] tracking-[0.2em] text-text-muted"
      >
        {depth.marker}
      </motion.span>

      <span className="block overflow-hidden">
        <motion.h3
          variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
          transition={{ duration: 0.9, delay: 0.12, ease: EXPO_OUT }}
          className="text-[7.5vw] md:text-[clamp(2.25rem,3.4vw,3.75rem)] font-bold uppercase tracking-tight text-text-primary transition-transform duration-500 md:group-hover:translate-x-3"
        >
          {depth.title}
        </motion.h3>
      </span>

      <motion.div
        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.8, delay: 0.3, ease: EXPO_OUT }}
        className="col-span-2 md:col-span-1 flex flex-col md:items-end gap-3"
      >
        <p className="max-w-xs text-sm md:text-base text-text-secondary md:text-right leading-relaxed">
          {depth.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {depth.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] border border-border px-2.5 py-1 text-text-muted transition-colors duration-300 group-hover:border-border-accent group-hover:text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * L2 — RUNTIME · point of view. The "how deep does he go" beat: a
 * statement that resolves as you descend, then capability rows ordered
 * by stack depth.
 */
export default function PointOfView() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.2"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-abyss z-20 -mt-10 rounded-t-[2.5rem] md:rounded-t-[3rem] border-t border-white/[0.06] shadow-[0_-30px_60px_rgba(0,0,0,0.65)]"
      aria-label="Point of view"
    >
      {/* Runtime layer: the grid becomes visible beneath the glass */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(232,228,220,0.035) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(232,228,220,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-14">
        <div className="flex items-center justify-between mb-16 md:mb-24">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-text-muted/70">
            Point of view
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-text-muted/50">
            [ L2 · RUNTIME ]
          </span>
        </div>

        <h2 className="mb-24 md:mb-32 max-w-5xl" data-vskew>
          {STATEMENT.map((line, i) => (
            <StatementLine
              key={i}
              text={line.text}
              copper={line.copper}
              progress={scrollYProgress}
              index={i}
              total={STATEMENT.length}
              instant={reduceMotion}
            />
          ))}
        </h2>

        <div className="flex flex-col">
          {DEPTHS.map((depth, index) => (
            <DepthRow
              key={depth.title}
              depth={depth}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
          <div className="border-t border-border-subtle" />
        </div>
      </div>
    </section>
  );
}
