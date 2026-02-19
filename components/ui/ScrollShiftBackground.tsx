"use client";

import { useScroll, useTransform, useMotionValueEvent, useVelocity, useSpring } from "framer-motion";
import { useState } from "react";
import DarkVeil from "./DarkVeil";

export default function ScrollShiftBackground() {
  const { scrollYProgress, scrollY } = useScroll();
  const [hue, setHue] = useState(313); // Hero: deep indigo-purple entrance
  const [warp, setWarp] = useState(0);

  // Confirmed purple corridor: 310–348° (all brand-family)
  //   310° = deep cool blue-purple
  //   338° = brand violet (confirmed)
  //   348° = slightly warmer violet
  //
  // Section personalities within the corridor:
  //   Hero            313 — deep, cool, dramatic opening
  //   Philosophy      340 — pure brand violet, identity moment
  //   Selected Works  316 — indigo-technical, precise
  //   Client Stories  345 — warmer violet, human warmth
  //   Experience      335 — mid-violet, authority
  //   Construct       312 — darkest, raw, experimental
  //   Contact         330 — warm-grounded close

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
       <div className="md:hidden h-full w-full">
         <DarkVeil 
              hueShift={hue} 
              noiseIntensity={0.12} 
              scanlineIntensity={0.3} 
              speed={0.4}
              warpAmount={warp}
              resolutionScale={1}
         />
       </div>
       <div className="absolute inset-0 bg-void/20 pointer-events-none mix-blend-multiply" />
    </div>
  );
}

function DarkVeilWrapper() { return null; }
