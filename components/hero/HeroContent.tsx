"use client";

import { motion, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useBlobPosition } from "./HeroInteractionContext";
import { useTransition } from "@/context/TransitionContext";

// ============================================
// RevealText: Text that reveals outline when blob is near
// ============================================
interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { blobPosition } = useBlobPosition();
  const [revealAmount, setRevealAmount] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Distance from blob center to text center
    const dx = blobPosition.screenX - centerX;
    const dy = blobPosition.screenY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Reveal when within ~200px, smooth falloff
    const threshold = 250;
    const amount = Math.max(0, 1 - distance / threshold);
    setRevealAmount(amount);
  }, [blobPosition]);

  // Smooth the reveal
  const smoothReveal = useSpring(revealAmount, { stiffness: 100, damping: 20 });

  return (
    <motion.span
      ref={ref}
      // RevealText doesn't manage its own entrance opacity anymore, parent does
      className={`relative inline-block ${className}`}
      style={{
        // Interpolate between filled and outlined based on reveal
        color: `oklch(95% 0 0 / ${1 - revealAmount * 0.9})`,
        WebkitTextStroke: `${revealAmount * 2}px oklch(95% 0 0 / ${0.3 + revealAmount * 0.5})`,
        textShadow: revealAmount > 0.1 
          ? `0 0 ${revealAmount * 30}px oklch(60% 0.20 280 / ${revealAmount * 0.6})` 
          : "none",
      }}
    >
      {children}
    </motion.span>
  );
}

// ============================================
// MagneticButton: Subtle magnetic hover effect
// ============================================
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Main HeroContent Component
// ============================================
export default function HeroContent() {
  const { isLoaded } = useTransition();

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
      <div className="flex flex-col items-center justify-center max-w-[95vw] md:max-w-7xl mx-auto px-4 text-center">
        
        {/* Main Name - MASSIVE with blob reveal */}
        <div className="mix-blend-difference">
          <h1 
            className="text-[18vw] md:text-[14vw] leading-[0.85] font-bold tracking-[-0.04em] text-text-primary uppercase select-none"
          >
            <div className="overflow-hidden">
               <motion.div
                 initial={{ y: "100%" }}
                 animate={{ y: isLoaded ? "0%" : "100%" }}
                 transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
               >
                  <RevealText delay={0.3}>FELIX</RevealText>
               </motion.div>
            </div>
            <div className="overflow-hidden">
                <motion.div
                 initial={{ y: "100%" }}
                 animate={{ y: isLoaded ? "0%" : "100%" }}
                 transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
               >
                  <RevealText delay={0.5}>DAWODU</RevealText>
                </motion.div>
            </div>
          </h1>
        </div>

        {/* Role / Subtitle - Technical aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 md:mt-12 flex items-center gap-3 md:gap-6 text-xs font-mono tracking-[0.25em] text-text-secondary uppercase mix-blend-difference"
        >
          <span className="hidden md:inline-block w-8 h-[1px] bg-border" />
          <span>Full Stack Software Engineer</span>
          <span className="text-text-faint">//</span>
          <span>Systems Architect</span>
          <span className="hidden md:inline-block w-8 h-[1px] bg-border" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-14 md:mt-20 pointer-events-auto"
        >
          <MagneticButton className="group">
            <a
              href="#projects"
              className="relative flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-medium tracking-widest text-text-primary/90 uppercase border border-border-subtle rounded-full backdrop-blur-sm transition-all duration-300 hover:border-border-accent hover:bg-accent/5"
            >
              <span>View Work</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
