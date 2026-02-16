"use client";

import React, { useRef } from "react";
import { workExperience } from "@/data";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({
  item,
  index,
  total,
  progress,
}: {
  item: typeof workExperience[0];
  index: number;
  total: number;
  progress: number;
}) => {
  return (
    <div
      className={cn(
        "experience-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "w-[85vw] max-w-4xl h-[60vh] md:h-[50vh]",
        "flex flex-col md:flex-row gap-8 p-8 md:p-12",
        "bg-neutral-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl",
        "shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]",
        "overflow-hidden"
      )}
      style={{
        zIndex: index,
      }}
    >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
          <div className="flex-shrink-0 flex items-start justify-center md:items-center">
             <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
               <span className="text-lg md:text-2xl font-bold text-white/80">
                  {(item.company || item.role).split(" ").map(word => word[0]).slice(0, 2).join("")}
               </span>
             </div>
          </div>

        <div className="flex flex-col justify-center gap-4 relative z-10">
            <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                    {item.role}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 uppercase tracking-widest">
                    {item.company} • {item.year}
                  </p>
                 <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
            </div>
            
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
                 {item.description}
            </p>
        </div>

        <div className="absolute bottom-4 right-6 text-9xl font-bold text-white/5 pointer-events-none select-none">
            0{index + 1}
        </div>
    </div>
  );
};

export default function WorkExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".experience-card");
    const totalCards = cards.length;
    
    gsap.set(cards, { y: window.innerHeight, scale: 0.9, opacity: 0 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalCards * 100}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalProgress = progress * totalCards;
        
        cards.forEach((card, i) => {
            const cardProgress = totalProgress - i;
            
            if (cardProgress < 0) {
               gsap.to(card, { 
                   y: window.innerHeight, 
                   scale: 0.8, 
                   autoAlpha: 0, 
                   overwrite: 'auto',
                   duration: 0
                });
            } else if (cardProgress >= 0 && cardProgress <= 1) {
                const yPos = gsap.utils.mapRange(0, 1, window.innerHeight, 0, cardProgress);
                const scale = gsap.utils.mapRange(0, 1, 0.8, 1, cardProgress);
              const opacity = gsap.utils.mapRange(0, 0.5, 0, 1, cardProgress);
                
                gsap.to(card, { 
                    y: yPos, 
                    scale: scale, 
                    autoAlpha: opacity,
                    overwrite: 'auto',
                    duration: 0 
                });
            } else {
                const overProgress = cardProgress - 1;
                const pushBack = Math.min(overProgress, 1); 
                
                const yPos = -50 * pushBack;
                const scale = 1 - (0.05 * pushBack);
                const brightness = 1 - (0.3 * pushBack);
                
                gsap.to(card, { 
                    y: yPos, 
                    scale: scale, 
                  autoAlpha: brightness,
                    overwrite: 'auto',
                    duration: 0
                });
            }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-20 bg-neutral-950 min-h-screen flex flex-col items-center justify-center">
      
      <div className="absolute inset-0 w-full h-full pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="absolute top-20 text-center z-10 mix-blend-difference">
         <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-neutral-500 mb-2">
            Professional Journey
         </h2>
         <p className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Work Experience
         </p>
      </div>

      <div ref={cardsRef} className="relative w-full h-screen flex items-center justify-center perspective-1000">
        {workExperience.map((item, index) => (
             <ExperienceCard 
             key={`${item.year}-${item.company}-${item.role}`} 
                item={item} 
                index={index} 
                total={workExperience.length}
             progress={0}
             />
         ))}
      </div>
      
    </div>
  );
}
