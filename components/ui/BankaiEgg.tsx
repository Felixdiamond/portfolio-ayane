"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { buzz } from "@/utils/haptics";

type Petal = {
  x: number;
  y: number;
  drift: number;
  fall: number;
  rot: number;
  scale: number;
  delay: number;
  duration: number;
};

/** Scatter blades along the cut. They read as petals; that is the point. */
function makePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => {
    // Spawn along the slash diagonal, then drift down-right like blossom
    const t = i / (count - 1);
    return {
      x: 8 + t * 84 + (Math.random() - 0.5) * 8,
      y: 62 - t * 44 + (Math.random() - 0.5) * 10,
      drift: (Math.random() - 0.3) * 26,
      fall: 24 + Math.random() * 30,
      rot: (Math.random() - 0.5) * 720,
      scale: 0.6 + Math.random() * 0.9,
      delay: 0.18 + Math.random() * 0.3,
      duration: 1.1 + Math.random() * 0.9,
    };
  });
}

/**
 * The board silkscreen doubles as a seal. Press it and the site briefly
 * releases: one slash across the screen, a scatter of blades along the
 * cut, 卍解. If you know, you know. Clients just see a part number.
 */
export default function BankaiEgg() {
  const [released, setReleased] = useState(0);
  const [active, setActive] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Fresh scatter each release, stable while animating
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const petals = useMemo(() => makePetals(16), [released]);

  const fire = () => {
    if (active) return;
    buzz([12, 40, 80]);
    setReleased((r) => r + 1);
    setActive(true);
    if (!reduceMotion) {
      document.body.classList.add("bankai-shake");
      setTimeout(() => document.body.classList.remove("bankai-shake"), 500);
    }
    timeout.current = setTimeout(() => setActive(false), reduceMotion ? 2000 : 2400);
  };

  return (
    <>
      <button
        onClick={fire}
        className="group/seal text-left font-mono text-[10px] text-text-muted tracking-[0.15em] transition-colors duration-300 hover:text-accent cursor-pointer"
        aria-label="Board signature. Press to release"
      >
        AYANE-01 · rev 5.0
        <span className="inline-block w-1.5 h-1.5 ml-2 rounded-full bg-text-faint group-hover/seal:bg-accent group-hover/seal:animate-pulse transition-colors duration-300 align-middle" />
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            key={released}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[300] pointer-events-none overflow-hidden"
            aria-hidden
          >
            {/* The world dims */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: reduceMotion ? 0.5 : [0, 0.85, 0.6] }}
              transition={{ duration: 0.5, times: [0, 0.3, 1] }}
              className="absolute inset-0 bg-black"
            />

            {!reduceMotion && (
              <>
                {/* The slash — one clean diagonal cut */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 1 }}
                  animate={{ scaleX: 1, opacity: [1, 1, 0] }}
                  transition={{ scaleX: { duration: 0.22, ease: [0.7, 0, 0.2, 1] }, opacity: { duration: 1.1, times: [0, 0.4, 1] } }}
                  className="absolute left-1/2 top-1/2 w-[160vmax] h-[3px] origin-left"
                  style={{
                    transform: "translate(-50%, -50%) rotate(-32deg)",
                    background:
                      "linear-gradient(to right, transparent, #e8e4dc 15%, #ffffff 50%, #b87333 85%, transparent)",
                    boxShadow: "0 0 24px rgba(232,228,220,0.9), 0 0 90px rgba(184,115,51,0.6)",
                  }}
                />
                {/* Pressure wave off the cut */}
                <motion.div
                  initial={{ opacity: 0.6, scale: 0.2 }}
                  animate={{ opacity: 0, scale: 1.6 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] rounded-full"
                  style={{ border: "1px solid rgba(184,115,51,0.7)" }}
                />
                {/* Senbonzakura: blades scattering off the cut */}
                {petals.map((p, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      opacity: 0,
                      rotate: 0,
                      scale: p.scale,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: `${p.drift}vw`,
                      y: `${p.fall}vh`,
                      rotate: p.rot,
                    }}
                    transition={{
                      duration: p.duration,
                      delay: p.delay,
                      ease: [0.2, 0.6, 0.4, 1],
                      opacity: { duration: p.duration, times: [0, 0.1, 0.7, 1] },
                    }}
                    className="absolute w-[9px] h-[13px]"
                    style={{
                      borderRadius: "70% 30% 70% 30% / 60% 40% 60% 40%",
                      background: "linear-gradient(140deg, #d4a24e 0%, #b87333 60%, #7a4a20 100%)",
                      boxShadow: "0 0 6px rgba(212,162,78,0.5)",
                    }}
                  />
                ))}
              </>
            )}

            {/* The declaration */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-[18%] flex flex-col items-center gap-3"
            >
              <span
                className="text-6xl md:text-7xl font-black text-glass-white"
                style={{ textShadow: "0 0 40px rgba(184,115,51,0.8)" }}
              >
                卍解
              </span>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-accent">
                bankai. you found it
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
