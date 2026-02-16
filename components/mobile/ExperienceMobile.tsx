"use client";

import React, { useRef } from "react";
import { workExperience } from "@/data";
import { cn } from "@/utils/cn";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";

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
  const { gamma, beta } = useDeviceOrientation();
  
  const start = index / total;
  const end = (index + 1) / total;
  
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.95]); 
  const opacity = useTransform(scrollYProgress, [start, end], [1, 0.6]);
  const blur = useTransform(scrollYProgress, [start, end], [0, 4]);

  const rotateX = useSpring(beta * 5, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(gamma * 5, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={containerRef}
      className="h-[80vh] w-full flex items-center justify-center sticky top-[10vh]"
    >
      <motion.div
        style={{
          scale: index === total - 1 ? 1 : scale,
          opacity: index === total - 1 ? 1 : opacity,
          filter: index === total - 1 ? "blur(0px)" : `blur(${blur}px)`,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        className={cn(
          "relative flex flex-col gap-5 p-7 md:p-8 w-full max-w-[90vw] h-[62vh]",
          "rounded-[1.75rem] border border-white/[0.06] overflow-hidden",
          "bg-surface/60 backdrop-blur-2xl", 
          "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] origin-top",
          "hover:border-accent/30 transition-all duration-700"
        )}
      >
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
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
                transition={{ duration: 0.5 }}
            >
                {item.role}
            </motion.h3>

             <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <span className="text-base font-semibold text-accent tracking-wide">
                    @{item.company}
                </span>
            </motion.div>

            <motion.p 
                className="text-sm text-text-secondary leading-relaxed overflow-y-auto pr-2 custom-scrollbar mt-2 max-h-[140px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
    <section ref={containerRef} className="relative w-full bg-transparent pb-20 min-h-[150vh]">
      
      <div className="sticky top-0 z-50 w-full px-6 py-8 flex items-center justify-between bg-gradient-to-b from-abyss/90 via-abyss/50 to-transparent backdrop-blur-sm pointer-events-none h-[15vh]">
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

      <div className="relative z-10 flex flex-col gap-[20vh] pb-[20vh] px-5 -mt-[5vh]"> 
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
