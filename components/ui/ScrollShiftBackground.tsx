"use client";

import { useScroll, useTransform, useMotionValueEvent, useVelocity, useSpring } from "framer-motion";
import { useState } from "react";
import DarkVeil from "./DarkVeil";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ScrollShiftBackground() {
  const isMobile = useIsMobile();
  const { scrollYProgress, scrollY } = useScroll();
  const [hue, setHue] = useState(313);
  const [warp, setWarp] = useState(0);

  const hueShift = useTransform(scrollYProgress, 
    [0,   0.15, 0.30, 0.45, 0.62, 0.78, 1.0 ], 
    [313,  340,  316,  345,  335,  312,  330 ]
  );

  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const warpAmount = useTransform(smoothVelocity, [-2000, 0, 2000], [0.5, 0, 0.5]);

  useMotionValueEvent(hueShift, "change", (latest) => {
    setHue(latest);
  });

  useMotionValueEvent(warpAmount, "change", (latest) => {
    setWarp(latest);
  });
  
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none bg-abyss transition-colors duration-500">
       {isMobile && (
         <div className="h-full w-full">
           <DarkVeil
             hueShift={hue}
             noiseIntensity={0.12}
             scanlineIntensity={0.3}
             speed={0.4}
             warpAmount={warp}
             resolutionScale={1}
           />
         </div>
       )}
       <div className="absolute inset-0 bg-void/20 pointer-events-none mix-blend-multiply" />
    </div>
  );
}

