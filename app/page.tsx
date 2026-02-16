"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { TransitionProvider } from "@/context/TransitionContext";
import Philosophy from "@/components/Philosophy";
import PhilosophyMobile from "@/components/mobile/PhilosophyMobile";
import ParallaxSection from "@/components/ui/ParallaxSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import FeaturedProjectsMobile from "@/components/mobile/FeaturedProjectsMobileNative";
import { HeroSection } from "@/components/hero";
import ScrollShiftBackground from "@/components/ui/ScrollShiftBackground";

const RecentProjects = lazy(() => import("@/components/Projects"));
const ClientFeedback = lazy(() => import("@/components/ClientFeedback"));
const ClientFeedbackMobile = lazy(() => import("@/components/mobile/ClientFeedbackMobileNative"));
const Experience = lazy(() => import("@/components/Experience"));
const ExperienceMobile = lazy(() => import("@/components/mobile/ExperienceMobile"));
const Construct = lazy(() => import("@/components/Construct"));
const ConstructMobile = lazy(() => import("@/components/mobile/ConstructMobile"));
const Contact = lazy(() => import("@/components/Contact"));
const ContactMobile = lazy(() => import("@/components/mobile/ContactMobile"));
const Socials = lazy(() => import("@/components/Socials"));

const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <TransitionProvider>
        <SmoothScroll>
          <CustomCursor />
          
          <Preloader />

          <ScrollShiftBackground />
          
          <main className="relative flex justify-center items-center flex-col mx-auto overflow-visible z-10 w-full">
            
            <Suspense fallback={null}>
              <HeroSection />

              {isMobile ? (
                <PhilosophyMobile />
              ) : (
                <ParallaxSection zIndex={10}>
                  <Philosophy />
                </ParallaxSection>
              )}

              {isMobile ? (
                  <FeaturedProjectsMobile />
                ) : (
                  <FeaturedProjects />
              )}

              {isMobile ? (
                <ClientFeedbackMobile />
              ) : (
                <ClientFeedback />
              )}

              {isMobile ? (
                <ExperienceMobile />
              ) : (
                <Experience />
              )}

              {isMobile ? (
                <ConstructMobile />
              ) : (
                <Construct />
              )}

              {isMobile ? (
                <ContactMobile />
              ) : (
                <Contact />
              )}
              
            </Suspense>
          </main>
        </SmoothScroll>
    </TransitionProvider>
  );
}