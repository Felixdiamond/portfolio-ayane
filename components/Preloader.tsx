"use client";

import animationData from "@/data/plane.json";
import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import { useTransition } from "@/context/TransitionContext";

const Preloader = () => {
  const { setIsLoaded } = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAnimationComplete = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
        document.body.style.overflow = "";
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      }
    });

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    })
    .to(
      ".preloader-content",
      {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in"
      },
      "<"
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleAnimationComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
        <div className="preloader-content flex flex-col items-center">
            <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
                <Lottie 
                    lottieRef={lottieRef}
                    animationData={animationData} 
                    loop={true}
                    autoplay={true}
                />
            </div>
            <div className="mt-4 overflow-hidden">
                 <p className="text-white/40 font-mono text-sm uppercase tracking-[0.3em] animate-pulse">
                     Initializing System...
                 </p>
            </div>
        </div>
    </div>
  );
};

export default Preloader;
