"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { testimonials } from "@/data";
import { cn } from "@/utils/cn";
import { FaQuoteLeft } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function ClientFeedback() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: ".content-wrapper",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const total = testimonials.length;
        const index = Math.min(
          Math.floor(progress * total),
          total - 1
        );
        setActiveIndex(index);
      },
    });
  }, { scope: containerRef });

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div ref={containerRef} className="relative z-20 w-full min-h-[300vh] bg-abyss">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-abyss to-transparent z-30 pointer-events-none" />

      <div className="content-wrapper sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-abyss">
        
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] bg-accent-glow/40 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[20%] right-[20%] w-[25vw] h-[25vw] bg-accent-muted/40 rounded-full blur-[100px] animate-pulse delay-1000" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" /> 
        </div>

        <div className="absolute top-10 left-10 md:left-20 z-10 mix-blend-difference">
             <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-text-muted">
                / Testimonials
             </h2>
        </div>

        <div className="absolute bottom-10 right-10 md:right-20 z-10 flex gap-2">
             {testimonials.map((_, idx) => (
                <div 
                    key={idx} 
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        idx === activeIndex ? "bg-text-primary scale-150" : "bg-surface"
                    )}
                />
             ))}
        </div>

        <div className="relative z-10 max-w-5xl w-full px-6 md:px-10 flex flex-col items-center justify-center text-center">
            
            <FaQuoteLeft className="text-4xl md:text-6xl text-text-faint mb-10 opacity-50" />

            <div className="min-h-[30vh] md:min-h-[40vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-8"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-text-primary leading-[1.3]">
                            &quot;{activeTestimonial.quote}&quot;
                        </p>

                        <div className="flex flex-col items-center gap-2 mt-4">
                            <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-hover">
                                {activeTestimonial.name}
                            </h3>
                            <p className="text-sm md:text-base text-text-muted uppercase tracking-widest bg-surface/50 px-3 py-1 rounded-full border border-border-subtle">
                                {activeTestimonial.title}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            
        </div>
        
        <div className="absolute -bottom-[5vh] left-1/2 -translate-x-1/2 z-0 font-black text-[15vw] leading-none text-text-faint pointer-events-none whitespace-nowrap opacity-20 select-none">
            FEEDBACK
        </div>

      </div>
    </div>
  );
}
