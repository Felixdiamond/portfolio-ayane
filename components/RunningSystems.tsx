"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projects } from "@/data";
import ScrambleText from "./ui/ScrambleText";

gsap.registerPlugin(ScrollTrigger);

/** Process header that "re-attaches" when the card is hovered — it boots for you. */
function ProcHeader({ index, proc }: { index: number; proc: string }) {
  const [boots, setBoots] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = ref.current?.closest("a");
      if (!card) return;
      const onEnter = () => setBoots((b) => b + 1);
      card.addEventListener("mouseenter", onEnter);
      return () => card.removeEventListener("mouseenter", onEnter);
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-b border-border-subtle font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em]"
    >
      <span className="text-text-muted">
        pid 0x0{index + 1} · <ScrambleText text={proc} trigger={boots} />
      </span>
      <span className="flex items-center gap-2 text-accent">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        running
      </span>
    </div>
  );
}

/**
 * L2 — RUNTIME · process list. Desktop projects gallery: a pinned
 * horizontal scroll through the systems Felix has in production.
 */
export default function RunningSystems() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Editorial image treatment: each card's image settles from 1.15 → 1
      // as the card traverses the viewport inside the horizontal scroll
      gsap.utils.toArray<HTMLElement>(".sys-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: tween,
              start: "left 90%",
              end: "left 30%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-abyss z-30">
      <div className="absolute top-10 left-10 md:left-14 z-10 pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted/70 block mb-3">
          Process list · {projects.length} running
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase text-text-primary tracking-tighter" data-vskew>
          Running Systems
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex h-full items-center w-fit px-10 md:px-20 gap-10 md:gap-32 pt-16"
      >
        <div className="w-[10vw] md:w-[18vw] shrink-0" />

        {projects.map((item, index) => (
          <a
            key={item.id}
            href={item.link ? `https://${item.link}` : undefined}
            target={item.link ? "_blank" : undefined}
            rel={item.link ? "noreferrer" : undefined}
            aria-disabled={item.link ? undefined : true}
            className={`group relative w-[76vw] md:w-[55vw] h-[57vh] md:h-[64vh] flex-shrink-0 flex flex-col justify-between border border-border-subtle overflow-hidden bg-surface/60 hover:border-border-accent transition-colors duration-500 ${
              item.link ? "" : "cursor-default"
            }`}
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              {item.img ? (
                <>
                  <Image
                    src={item.img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 76vw, 55vw"
                    className="sys-img object-cover object-center opacity-25 group-hover:opacity-15 grayscale transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/60 to-abyss/20" />
                </>
              ) : (
                // Backend/system projects have no screenshot — they get a schematic
                <div
                  className="absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(184,115,51,0.35) 1px, transparent 1px)," +
                      "linear-gradient(to bottom, rgba(184,115,51,0.35) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                    maskImage: "radial-gradient(80% 80% at 60% 40%, black 0%, transparent 75%)",
                  }}
                />
              )}
            </div>

            {/* Process header — the card is a running service; hover re-attaches */}
            <ProcHeader index={index} proc={item.proc} />

            <div className="relative z-10 px-6 md:px-10 pb-8 md:pb-10">
              <p className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-text-muted mb-3">
                {item.stat}
              </p>
              <h3 className="text-3xl md:text-6xl font-bold text-text-primary uppercase tracking-tighter mb-3">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm md:text-base max-w-xl leading-relaxed mb-6">
                {item.des}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] border border-border px-2.5 py-1 text-text-muted group-hover:border-border-accent transition-colors duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {item.link ? (
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent flex items-center gap-2 shrink-0">
                    open
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8m9 0v9" />
                    </svg>
                  </span>
                ) : (
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted flex items-center gap-2 shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    private
                  </span>
                )}
              </div>
            </div>

            <div className="absolute top-14 right-6 md:right-10 font-mono text-[70px] md:text-[140px] font-black text-text-primary/[0.04] leading-none pointer-events-none select-none">
              0{index + 1}
            </div>
          </a>
        ))}

        <div className="w-[28vw] shrink-0" />
      </div>

      <div className="absolute bottom-10 right-10 z-20 hidden md:block pointer-events-none">
        <span className="font-mono text-text-primary/40 uppercase text-[10px] tracking-[0.25em]">
          Scroll · traversing processes
        </span>
      </div>
    </div>
  );
}
