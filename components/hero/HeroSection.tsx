"use client";

import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HeroContent from "./HeroContent";
import HeroScrollIndicator from "./HeroScrollIndicator";
import HeroMobileFallback from "./HeroMobileFallback";
import HeroMobileNative from "@/components/mobile/HeroMobileNative";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { HeroInteractionProvider } from "./HeroInteractionContext";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { 
  ssr: false,
  loading: () => <HeroMobileFallback />
});

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile || prefersReducedMotion) {
    return <HeroMobileNative />;
  }

  return (
    <HeroInteractionProvider>
      <section className="relative w-full h-screen overflow-hidden bg-background">
        <Suspense fallback={<HeroMobileFallback />}>
          <HeroCanvas />
        </Suspense>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <HeroContent />
        </div>

        <HeroScrollIndicator />
      </section>
    </HeroInteractionProvider>
  );
}
