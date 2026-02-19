"use client";

import React, { useRef } from "react";
import { workExperience } from "@/data";
import { cn } from "@/utils/cn";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const ExperienceCard = ({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: typeof workExperience[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate dynamic scale/opacity based on scroll position
  // We want the card to stay fully visible until the next one covers it
  // So we use a range that starts *after* this card has stuck and the next is arriving
  const rangeStart = index * (1 / total);
  const rangeEnd = (index + 1) * (1 / total);
  
  const scale = useTransform(scrollYProgress, [rangeStart, rangeEnd], [1, 0.95]); 
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [1, 0.5]);
  
  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center"
      style={{ 
        top: `calc(10vh + ${index * 15}px)`, // Reduced offset to keep them tighter
        zIndex: index + 1
      }} 
    >
      <motion.div
        style={{
          scale: index === total - 1 ? 1 : scale, // Don't scale the last card
          // opacity: index === total - 1 ? 1 : opacity, // Optional: Keep opacity 1 for cleaner look or fade out
          transform: "translateZ(0)",
        }}
        className={cn(
          "relative flex flex-col gap-5 p-7 md:p-8 w-full max-w-[90vw] h-[60vh]", // Fixed height for card content
          "rounded-[1.75rem] border border-white/[0.06] overflow-hidden",
          "bg-black/40 backdrop-blur-md", // More transparent for glassmorphism feel
          "shadow-xl shadow-black/30", 
        )}
      >
        {/* Subtle gradient to ensure text readability without blocking DarkVeil */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none -z-10" />

        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex justify-between items-center z-10 w-full">
            <div className="px-4 py-2 rounded-full border border-white/[0.08] bg-elevated/40 backdrop-blur-md shadow-lg shadow-black/20">
                <span className="text-xs font-semibold text-text-secondary tracking-[0.15em] font-mono">
                    {item.year}
                </span>
            </div>
        </div>

        <div className="flex flex-col gap-4 z-10 flex-grow mt-6">
            
            <motion.h3 
                className="text-[2rem] font-bold text-text-primary leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ duration: 0.3 }}
            >
                {item.role}
            </motion.h3>

             <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                viewport={{ margin: "-50px" }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
            >
                <span className="text-base font-semibold text-accent tracking-wide">
                    @{item.company}
                </span>
            </motion.div>

            <motion.p 
                className="text-sm text-text-secondary leading-relaxed overflow-y-auto pr-2 custom-scrollbar mt-2 max-h-[140px]"
                initial={{ opacity: 0 }}
                viewport={{ margin: "-50px" }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                {item.description}
            </motion.p>
        </div>

        <div className="z-10 mt-auto pt-5 border-t border-white/[0.06]">
             <div className="flex flex-wrap gap-2">
                {item?.tags?.map((tag, i) => (
                    <span 
                        key={i} 
                        className="text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg bg-elevated/40 text-text-muted border border-white/[0.06] hover:bg-accent/20 hover:text-text-primary hover:border-accent/30 transition-all duration-300 cursor-default"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ExperienceMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative w-full bg-transparent min-h-[100vh]">
      
      <div className="sticky top-0 z-50 w-full px-6 py-6 flex items-center justify-between pointer-events-none h-[15vh]">
         {/* Slightly reduced header height and padding */}
         <div className="pointer-events-auto">
             <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent/60 mb-2">
                My Path
            </h2>
            <h1 className="text-3xl font-black text-text-primary tracking-tighter">
                CAREER
            </h1>
         </div>
         <div className="h-px flex-grow ml-8 bg-gradient-to-r from-accent/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col pb-20 px-5 -mt-[10vh]"> 
        {/* Removed negative margin stacking logic, relying on sticky position */}
        {workExperience.map((item, i) => (
            <ExperienceCard
              key={i}
              index={i}
              item={item}
              total={workExperience.length}
              scrollYProgress={scrollYProgress}
            />
        ))}
      </div>
        
    </section>
  );
}
