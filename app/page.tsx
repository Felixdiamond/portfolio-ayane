"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import DepthGauge from "@/components/ui/DepthGauge";
import AmbientDepth from "@/components/ui/AmbientDepth";
import VelocitySkew from "@/components/ui/VelocitySkew";
import ConsoleSignature from "@/components/ui/ConsoleSignature";
import GlassHero from "@/components/hero/GlassHero";
import PointOfView from "@/components/PointOfView";
import RunningSystems from "@/components/RunningSystems";
import RunningSystemsMobile from "@/components/mobile/RunningSystemsMobile";
import ClientSignals from "@/components/ClientSignals";
import TerminalLayer from "@/components/TerminalLayer";
const CopperLab = lazy(() => import("@/components/CopperLab"));
const Workbench = lazy(() => import("@/components/Workbench"));

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <DepthGauge />
      <AmbientDepth />
      <VelocitySkew />
      <ConsoleSignature />
      {/* Film grain over everything — dark frames read as texture, not void */}
      <div className="noise" aria-hidden />

      <main className="relative flex justify-center items-center flex-col mx-auto overflow-visible z-10 w-full">
        {/* L3 — GLASS: the surface. Never suspended — this is the LCP. */}
        <section id="glass" data-layer="3" className="w-full">
          <GlassHero />
        </section>

        {/* L2 — RUNTIME: the systems at work */}
        <div id="runtime" data-layer="2" className="w-full">
          <PointOfView />
          {isMobile ? <RunningSystemsMobile /> : <RunningSystems />}
          <ClientSignals />
        </div>

        {/* L1 — TERMINAL: the threshold. Career history as a shell session. */}
        <div id="terminal" data-layer="1" className="w-full">
          <TerminalLayer />
        </div>

        {/* L0 — COPPER: bare metal, and the human at the bench */}
        <div id="copper" data-layer="0" className="w-full">
          <Suspense fallback={null}>
            <CopperLab />
            <div id="contact">
              <Workbench />
            </div>
          </Suspense>
        </div>
      </main>
    </SmoothScroll>
  );
}
