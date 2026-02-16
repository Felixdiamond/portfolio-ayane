"use client";
import React, { useRef, useId, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LiquidTextProps {
  text: string;
  className?: string;
}

export default function LiquidText({ text, className = "" }: LiquidTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [hovered, setHovered] = useState(false);
  
  const uniqueId = useId();
  const sanitizedText = text.replace(/[^a-zA-Z0-9-_]/g, "-");
  const filterId = `liquid-filter-${sanitizedText}-${uniqueId}`;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      const turbulenceElement = document.querySelector(`#${CSS.escape(filterId)} feTurbulence`);
      
      if (turbulenceElement) {
        tl.to(turbulenceElement, { attr: { baseFrequency: "0 0" }, duration: 2.5, ease: "slow(0.7, 0.7, false)" }, 0);
      }
      tl.to(textRef.current, { y: 0, opacity: 1, duration: 2, ease: "power3.out" }, 0.2);

      if (hovered && turbulenceElement) {
          gsap.to(turbulenceElement, {
             attr: { baseFrequency: "0.1 0.4" },
             duration: 0.5,
             ease: "power2.out"
          });
      } else if (!hovered && turbulenceElement) {
          gsap.to(turbulenceElement, {
             attr: { baseFrequency: "0 0" },
             duration: 1,
             ease: "elastic.out(1, 0.3)"
          });
      }
    },
    { scope: containerRef, dependencies: [hovered] }
  );

  return (
    <div 
        ref={containerRef} 
        className={`relative overflow-visible cursor-none ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
      <svg className="absolute w-0 h-0" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.2 0.05"
              numOctaves="2"
              result="warp"
            />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="30"
              in="SourceGraphic"
              in2="warp"
            />
          </filter>
        </defs>
      </svg>
      <h1
        ref={textRef}
        style={{ filter: `url(#${filterId})`, transform: 'translateY(100px)', opacity: 0 }}
        className="will-change-transform leading-tight block mix-blend-difference"
      >
        {text}
      </h1>
    </div>
  );
}
