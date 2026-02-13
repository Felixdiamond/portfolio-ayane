"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  zIndex?: number;
}

export default function ParallaxSection({ 
    children, 
    className = "",
    zIndex = 10
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
        trigger: containerRef.current,
        start: "bottom bottom",
        pin: true,
        pinSpacing: false,
        scrub: true,
    });
  }, { scope: containerRef });

  return (
    <div 
        ref={containerRef} 
        className={`relative w-full min-h-screen ${className}`}
        style={{ zIndex }}
    >
        {children}
    </div>
  );
}
