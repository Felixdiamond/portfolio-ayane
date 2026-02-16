"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExpandableSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  className?: string;
}

export default function ExpandableSection({ 
    children, 
    backgroundImage,
    className = "" 
}: ExpandableSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "center center", 
            end: "+=150%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        }
    });

    tl.to(innerRef.current, {
      width: "100%",
        height: "100vh",
        borderRadius: 0,
      backgroundColor: "#000000",
        duration: 1,
        ease: "power2.inOut"
    });

    if (contentRef.current) {
        tl.to(contentRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        }, "<0.5");
    }

  }, { scope: containerRef });

  return (
    <div 
        ref={containerRef} 
        className={`w-full h-screen flex items-center justify-center overflow-hidden relative z-50 ${className}`} 
    >
      <div 
        ref={innerRef}
        className="relative w-[300px] md:w-[500px] h-[400px] bg-neutral-900 overflow-hidden rounded-2xl border border-white/10 mx-auto flex items-center justify-center transform-gpu will-change-transform"
        style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        
        <div ref={contentRef} className="relative z-10 w-full h-full flex items-center justify-center opacity-0 scale-90">
             {children}
        </div>
      </div>
    </div>
  );
}
