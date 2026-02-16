"use client";

import HeroContent from "@/components/hero/HeroContent";
import HeroScrollIndicator from "@/components/hero/HeroScrollIndicator";
import { HeroInteractionProvider } from "@/components/hero/HeroInteractionContext";
import DarkVeil from "@/components/ui/DarkVeil";

export default function HeroMobile() {
  return (
    <HeroInteractionProvider>
      <section className="relative w-full h-screen overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <DarkVeil
            hueShift={-35}
            noiseIntensity={0.1}
            scanlineIntensity={0.5}
            speed={0.8}
            scanlineFrequency={0}
            warpAmount={0}
            resolutionScale={1.25}
          />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <HeroContent />
        </div>

        <HeroScrollIndicator />
      </section>
    </HeroInteractionProvider>
  );
}
