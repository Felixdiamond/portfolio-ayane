"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroContent from "./HeroContent";
import HeroScrollIndicator from "./HeroScrollIndicator";
import HeroMobileFallback from "./HeroMobileFallback";
import { HeroInteractionProvider } from "./HeroInteractionContext";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { 
  ssr: false,
  loading: () => <HeroMobileFallback />
});

export default function HeroSection() {
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
