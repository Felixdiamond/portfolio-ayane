"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { projects } from "@/data";
import { buzz } from "@/utils/haptics";

const TinderCard = dynamic(() => import("react-tinder-card"), { ssr: false });

/**
 * L2 — RUNTIME · process list, mobile. The swipe deck stays (it's the
 * most tactile way to browse four cards one-handed), but every card is
 * now a real link and the deck can be restacked once exhausted.
 */
export default function RunningSystemsMobile() {
  const [gone, setGone] = useState<Set<number>>(new Set());
  const remaining = projects.filter((p) => !gone.has(p.id));

  const swiped = (id: number) => {
    buzz(10);
    setGone((prev) => new Set(prev).add(id));
  };

  return (
    <section className="relative w-full h-svh bg-transparent flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-8 inset-x-6 z-10 flex items-start justify-between pointer-events-none select-none">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted/70 block mb-2">
            Process list · {remaining.length} running
          </span>
          <h2 className="text-4xl font-black uppercase text-text-primary tracking-tighter leading-none">
            Running
            <br />
            <span className="text-text-secondary">Systems</span>
          </h2>
        </div>
      </div>

      <div className="relative w-full h-full max-h-[600px] flex items-center justify-center">
        {remaining.length === 0 ? (
          <button
            onClick={() => setGone(new Set())}
            className="flex flex-col items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted active:scale-95 transition-transform"
          >
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            restart processes
          </button>
        ) : (
          remaining
            .map((project, index) => (
              <div
                key={project.id}
                className="absolute flex justify-center items-center w-full"
                style={{ zIndex: remaining.length - index }}
              >
                <TinderCard
                  className="swipe absolute cursor-grab active:cursor-grabbing"
                  onSwipe={() => swiped(project.id)}
                  preventSwipe={["up", "down"]}
                >
                  <div className="relative w-[85vw] h-[60vh] max-w-sm overflow-hidden shadow-2xl bg-surface border border-border-subtle select-none flex flex-col justify-between">
                    <div className="absolute inset-0">
                      {project.img ? (
                        <>
                          <Image
                            src={project.img}
                            alt=""
                            fill
                            sizes="85vw"
                            className="object-cover opacity-25 grayscale pointer-events-none"
                            priority={index === 0}
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/60 to-abyss/20" />
                        </>
                      ) : (
                        <div
                          className="absolute inset-0 opacity-[0.15]"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, rgba(184,115,51,0.35) 1px, transparent 1px)," +
                              "linear-gradient(to bottom, rgba(184,115,51,0.35) 1px, transparent 1px)",
                            backgroundSize: "36px 36px",
                            maskImage: "radial-gradient(85% 85% at 55% 35%, black 0%, transparent 75%)",
                          }}
                        />
                      )}
                    </div>

                    <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-border-subtle font-mono text-[9px] uppercase tracking-[0.18em] pointer-events-none">
                      <span className="text-text-muted">{project.proc}</span>
                      <span className="flex items-center gap-1.5 text-accent">
                        <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                        running
                      </span>
                    </div>

                    <div className="relative z-10 p-5 flex flex-col gap-3">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted pointer-events-none">
                        {project.stat}
                      </p>
                      <h3 className="text-2xl font-bold text-text-primary uppercase tracking-tight leading-tight pointer-events-none">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-2 pointer-events-none">
                        {project.des}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pointer-events-none">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[8px] uppercase tracking-[0.15em] border border-border px-2 py-0.5 text-text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* The one interactive element on the card — a real link */}
                      {project.link ? (
                        <a
                          href={`https://${project.link}`}
                          target="_blank"
                          rel="noreferrer"
                          onTouchStart={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="mt-2 pt-4 border-t border-border-subtle flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent active:opacity-70"
                        >
                          open
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8m9 0v9" />
                          </svg>
                        </a>
                      ) : (
                        <span className="mt-2 pt-4 border-t border-border-subtle flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted pointer-events-none">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          private · in production
                        </span>
                      )}
                    </div>
                  </div>
                </TinderCard>
              </div>
            ))
            .reverse()
        )}
      </div>

      <div className="absolute bottom-8 font-mono text-text-muted/40 text-[9px] uppercase tracking-[0.25em] pointer-events-none">
        {remaining.length > 0 ? "swipe to browse · tap open to launch" : ""}
      </div>
    </section>
  );
}
