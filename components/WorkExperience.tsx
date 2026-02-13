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
  // Calculate specific card state based on global progress
  // We want the card to slide up into view and then "stack"
  // The 'active' window for a card is roughly [index/total, (index+1)/total]
  
  // However, for a "stacking" deck, we often want them all to pile up.
  // Let's try a different approach:
  // As scroll progresses, cards enter from bottom.
  // Once they reach the center, they stay there (or move slightly up) while the next one covers them.
  // Previous cards scale down slightly.

  // We can't easily pass 'progress' to CSS modules for complex math, 
  // so we'll control the card styles via ref in the parent or use inline styles here if manageable.
  // Actually, GSAP is best for this. We'll leave the animation logic to the parent useGSAP.
  
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
        zIndex: index, // Higher index on top
      }}
    >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        {/* Thumbnail/Icon Area */}
        <div className="flex-shrink-0 flex items-start justify-center md:items-center">
             <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                <img src={item.thumbnail} alt={item.title} className="w-12 h-12 md:w-20 md:h-20 object-contain p-2" />
             </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-4 relative z-10">
            <div>
                 <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                    {item.title}
                 </h3>
                 {/* Decorative Line */}
                 <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
            </div>
            
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
                {item.desc}
            </p>
        </div>

        {/* Card Index Watermark */}
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
    
    // Initial State: All cards positioned way below
    gsap.set(cards, { y: window.innerHeight, scale: 0.9, opacity: 0 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalCards * 100}%`, // Scroll distance proportional to # of cards
      pin: true,
      scrub: 1, // Smooth interaction
      onUpdate: (self) => {
        const progress = self.progress;
        const totalProgress = progress * totalCards;
        
        cards.forEach((card, i) => {
            // Determine position of this card in the sequence
            // i = 0 (first card). It should arrive at progress 0->1 (relative to its segment)
            
            // We want card i to arrive and stick.
            // When card i+1 arrives, card i stays (or moves slightly up/scales down).
            
            // Logic: 
            // If totalProgress < i: Card is below view
            // If totalProgress >= i: Card is entering
            // If totalProgress > i + 1: Card is fully arrived and next one is coming
            
            const cardProgress = totalProgress - i; // 0 when we reach this card's start time
            
             // Entry Phase (0 -> 1)
            if (cardProgress < 0) {
               // Not yet reached
               gsap.to(card, { 
                   y: window.innerHeight, 
                   scale: 0.8, 
                   autoAlpha: 0, 
                   overwrite: 'auto',
                   duration: 0
                });
            } else if (cardProgress >= 0 && cardProgress <= 1) {
                // Entering
                // Map 0 -> 1 to y: Height -> 0
                const yPos = gsap.utils.mapRange(0, 1, window.innerHeight, 0, cardProgress);
                const scale = gsap.utils.mapRange(0, 1, 0.8, 1, cardProgress);
                const opacity = gsap.utils.mapRange(0, 0.5, 0, 1, cardProgress); // Fade in quickly
                
                gsap.to(card, { 
                    y: yPos, 
                    scale: scale, 
                    autoAlpha: opacity,
                    overwrite: 'auto',
                    duration: 0 
                });
            } else {
                // Already Arrived (stacking effect)
                // As cardProgress goes beyond 1 (next card coming), 
                // push this card slightly up and scale down for depth
                const overProgress = cardProgress - 1; // 0 -> ...
                // Cap the pushback so they don't disappear entirely
                const pushBack = Math.min(overProgress, 1); 
                
                const yPos = -50 * pushBack; // Move up 50px
                const scale = 1 - (0.05 * pushBack); // Scale down to 0.95
                const brightness = 1 - (0.3 * pushBack); // Darken slightly
                
                gsap.to(card, { 
                    y: yPos, 
                    scale: scale, 
                    autoAlpha: brightness, // Use autoAlpha for opacity for performance
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
      
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Header */}
      <div className="absolute top-20 text-center z-10 mix-blend-difference">
         <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-neutral-500 mb-2">
            Professional Journey
         </h2>
         <p className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Work Experience
         </p>
      </div>

      {/* Cards Container */}
      <div ref={cardsRef} className="relative w-full h-screen flex items-center justify-center perspective-1000">
         {workExperience.map((item, index) => (
             <ExperienceCard 
                key={item.id || index} 
                item={item} 
                index={index} 
                total={workExperience.length}
                progress={0} // Controlled by GSAP
             />
         ))}
      </div>
      
    </div>
  );
}
