"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import type { PanInfo } from "framer-motion";
import { testimonials } from "@/data";
import { cn } from "@/utils/cn";

const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

export default function ClientFeedbackMobileNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-transparent flex flex-col items-center justify-center py-12"
    >
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[10%] right-[-10%] w-[200px] h-[200px] bg-purple-900/10 rounded-full blur-[80px]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
        </div>

        <div className="relative z-10 mb-8 px-6 w-full text-center shrink-0">
             <div className="inline-flex items-center justify-center gap-2 mb-2">
               <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
               <span className="text-[10px] font-medium tracking-[0.3em] text-accent/80 uppercase">Testimonials</span>
           </div>
           <h2 className="text-3xl font-bold tracking-tight text-white">
            Client <span className="text-purple-200">Stories</span>
           </h2>
        </div>

        <div className="relative w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
             <InfiniteVerticalScroll items={duplicatedTestimonials} />
        </div>
    </section>
  );
}

function InfiniteVerticalScroll({ items }: { items: typeof testimonials }) {
    return (
        <div className="h-full w-full relative flex flex-col items-center justify-center overflow-hidden">
             <ParallaxText baseVelocity={-25}>
                {items.map((item, idx) => (
                    <TestimonialCard key={`${idx}-${item.name}-${idx}`} item={item} />
                ))}
            </ParallaxText>
        </div>
    );
}


function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
    return (
        <div className="w-[85vw] max-w-sm mx-auto mb-8 p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md relative group transition-colors duration-500 hover:bg-white/[0.06]">
            <div className="absolute -top-4 -right-2 text-6xl text-white/[0.03] font-serif font-bold group-hover:text-white/[0.08] transition-colors leading-none pointer-events-none select-none">
                &rdquo;
            </div>
            
            <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-6 relative z-10">
                &ldquo;{item.quote}&rdquo;
            </p>

            <div className="flex items-center gap-4 border-t border-white/[0.05] pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                    {item.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white tracking-wide">
                        {item.name}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                        {item.title}
                    </span>
                </div>
            </div>
        </div>
    );
}

function ParallaxText({ children, baseVelocity = -20 }: { children: React.ReactNode, baseVelocity: number }) {
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const velocity = useMotionValue(baseVelocity);
  
  useEffect(() => {
    if (contentRef.current) {
        setContentHeight(contentRef.current.offsetHeight);
    }
  }, [children]);

  useEffect(() => {
    if (!isDragging) {
      velocity.set(baseVelocity);
    }
  }, [baseVelocity, isDragging, velocity]);

  useAnimationFrame((t, delta) => {
    if (!contentRef.current || contentHeight === 0) return;

    const wrapHeight = contentHeight / 2;
    let currentY = y.get();

    if (!isDragging) {
        const currentVelocity = velocity.get();
        const newVelocity = currentVelocity * 0.95 + baseVelocity * 0.05; 
        velocity.set(newVelocity);
        
        const moveBy = newVelocity * (delta / 1000);
        currentY += moveBy;
        
        y.set(currentY);
    }

    if (currentY <= -wrapHeight) {
      y.set(currentY + wrapHeight);
    } else if (currentY >= 0) {
      y.set(currentY - wrapHeight);
    }
  });

  const handlePanStart = () => {
     setIsDragging(true);
  };

    const handlePanEnd = (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
     setIsDragging(false);
     const throwVelocity = info.velocity.y;
     
     if (Math.abs(throwVelocity) > 50) {
        velocity.set(throwVelocity);
     } else {
        velocity.set(baseVelocity);
     }
  };

  const handlePan = (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
     y.set(y.get() + info.delta.y);
  };

  return (
    <div 
        className="w-full h-full overflow-hidden flex flex-col items-center cursor-grab active:cursor-grabbing touch-none select-none" 
        ref={containerRef}
    >
      <motion.div 
        className="flex flex-col items-center w-full"
        style={{ y }}
        ref={contentRef}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {children}
      </motion.div>
    </div>
  );
}
