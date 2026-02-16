"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import HeroScrollIndicator from "@/components/hero/HeroScrollIndicator";
import DarkVeil from "@/components/ui/DarkVeil";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation"; 
import { useTransition } from "@/context/TransitionContext";
import type { MotionValue } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";

interface KineticSplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  shouldAnimate: boolean;
  scrollProgress: MotionValue<number>;
  direction?: "up" | "down";
}

function KineticSplitText({ text, className = "", delay = 0, shouldAnimate, scrollProgress, direction = "up" }: KineticSplitTextProps) {
  const chars = text.split("");
  
  const letterSpacing = useTransform(scrollProgress, [0, 0.4], ["-0.05em", "0.2em"]);
  const opacity = useTransform(scrollProgress, [0, 0.3], [1, 0]);
  const yScroll = useTransform(scrollProgress, [0, 0.4], ["0%", direction === "up" ? "-50%" : "50%"]);
  const blur = useTransform(scrollProgress, [0, 0.25], ["0px", "10px"]);

  return (
    <motion.div 
      className={`flex overflow-hidden perspective-1000 ${className}`}
      style={{ letterSpacing, opacity, y: yScroll, filter: useTransform(blur, b => `blur(${b})`) }}
    >
      <span className="sr-only">{text}</span>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0, rotateX: 90 }}
          animate={shouldAnimate ? { y: "0%", opacity: 1, rotateX: 0 } : {}}
          transition={{
            duration: 1.2,
            delay: delay + i * 0.08, 
            ease: [0.2, 0.65, 0.3, 0.9], 
          }}
          className="inline-block origin-bottom will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

function AmbientBackground({ 
    touchX, 
    touchY,
    gamma, 
    beta, 
    isAvailable 
}: { 
    touchX: MotionValue<number>, 
    touchY: MotionValue<number>,
    gamma: number,
    beta: number,
    isAvailable: boolean
}) {
  
  const smoothX = useSpring(0, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (isAvailable) {
      smoothX.set(gamma * 30);
      smoothY.set(beta * 30);
    }
  }, [gamma, beta, isAvailable, smoothX, smoothY]);

  const touchOpacity = useTransform(touchX, (x) => x > 0 ? 0.4 : 0);

  return (
    <>
      <div className="absolute inset-0 bg-slate-950 z-0" />
      
      <motion.div 
        className="absolute inset-0 z-[1] opacity-60 mix-blend-soft-light pointer-events-none overflow-hidden"
        style={{ x: smoothX, y: smoothY }}
      >
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 h-[180vh]" fill="white" />
      </motion.div>

       <motion.div
            className="absolute z-[2] w-[300px] h-[300px] rounded-full blur-[80px] bg-indigo-500/30 mix-blend-screen pointer-events-none"
            style={{ 
                x: touchX, 
                y: touchY,
                translateX: "-50%",
                translateY: "-50%",
                opacity: touchOpacity
            }} 
       />

      <div className="absolute inset-0 z-[2] opacity-40 mix-blend-screen overflow-hidden pointer-events-none">
      </div>

       <div className="absolute inset-0 z-[3] opacity-[0.10] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
       />
       
       <div className="absolute inset-0 z-[4] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </>
  );
}

function TouchCTA({ isLoaded }: { isLoaded: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
            className="relative inline-flex group pointer-events-auto"
        >
             <a href="#projects" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none active:scale-95 transition-transform duration-200">
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-70" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-8 py-1 text-xs font-medium text-white backdrop-blur-3xl transition-colors group-hover:bg-slate-950/70 border border-white/10 uppercase tracking-[0.2em]">
                    View Work
                </span>
            </a>
        </motion.div>
    )
}

export default function HeroMobileNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useTransition(); 
  const { gamma, beta, isAvailable, requestPermission, permissionGranted } = useDeviceOrientation();

  const touchX = useMotionValue(-100);
  const touchY = useMotionValue(-100);

  const handleInteraction = (e: React.TouchEvent | React.MouseEvent) => {
      if (!permissionGranted) {
          requestPermission();
      }

      if ('touches' in e) {
          const touch = e.touches[0];
          touchX.set(touch.clientX);
          touchY.set(touch.clientY);
      }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const containerOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <motion.section 
        ref={containerRef} 
        style={{ opacity: containerOpacity }}
        className="relative w-full h-[100vh] overflow-hidden flex flex-col items-center justify-center bg-black"
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
        onClick={handleInteraction}
    >
        <AmbientBackground 
            touchX={touchX} 
            touchY={touchY} 
            gamma={gamma}
            beta={beta}
            isAvailable={isAvailable}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6 select-none pb-20">
            <div className="flex flex-col items-center leading-none mix-blend-difference w-full perspective-text gap-4">
                <h1 className="text-[17vw] font-bold tracking-tighter text-transparent text-stroke-white uppercase flex flex-col items-center leading-[0.8]">
                    <KineticSplitText 
                        text="FELIX" 
                        delay={0.2} 
                        shouldAnimate={isLoaded}
                        scrollProgress={scrollYProgress} 
                        className="text-white drop-shadow-2xl"
                    />
                </h1>
                
                <h1 className="text-[17vw] font-bold tracking-tighter text-white uppercase leading-[0.8]">
                     <KineticSplitText 
                        text="DAWODU" 
                        delay={0.5} 
                        shouldAnimate={isLoaded}
                        scrollProgress={scrollYProgress} 
                        direction="down"
                        className="text-white/90 drop-shadow-2xl"
                    />
                </h1>
            </div>

             <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: isLoaded ? 1 : 0 }}
               transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
               style={{ scaleX: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
               className="w-16 h-px bg-white/30 my-8"
            />

            <div className="h-12 flex items-center justify-center overflow-hidden">
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="flex flex-col items-center gap-2 text-[10px] md:text-xs font-mono text-blue-100/70 tracking-[0.25em] uppercase text-center"
                 > 
                    <span>Full Stack Engineer</span>
                    <span className="w-1 h-1 bg-white/40 rounded-full" />
                    <span>Systems Architect</span>
                 </motion.div>
            </div>

            <div className="mt-8">
                <TouchCTA isLoaded={isLoaded} />
            </div>

        </div>

        <motion.div 
            className="absolute bottom-10 left-0 right-0 z-20"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
             <HeroScrollIndicator />
        </motion.div>
    </motion.section>
  );
}
