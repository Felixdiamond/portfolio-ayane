"use client";

import { Suspense, lazy, useEffect, useState } from 'react';
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { TransitionProvider } from "@/context/TransitionContext";

// Lazy imports
const RecentProjects = lazy(() => import('@/components/Projects'));
const ClientFeedback = lazy(() => import('@/components/ClientFeedback'));
const Experience = lazy(() => import('@/components/Experience'));
const Construct = lazy(() => import('@/components/Construct'));
const Contact = lazy(() => import('@/components/Contact'));
const Socials = lazy(() => import('@/components/Socials'));

// Static/Dynamic imports
import dynamic from 'next/dynamic';
import Philosophy from "@/components/Philosophy";
import ParallaxSection from "@/components/ui/ParallaxSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import { HeroSection } from '@/components/hero';

const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });

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

          {/* Dynamic WebGL Background Noise */}
          <div className="noise mix-blend-overlay opacity-20 pointer-events-none fixed inset-0 z-40" />
          
          <main className="relative flex justify-center items-center flex-col mx-auto overflow-clip">
            
            <Suspense fallback={null}>
              {/* Awwwards Level Interactive 3D Hero */}
              <HeroSection />

              {/* Awwwards Level About Section - Pinned Reveal */}
              <ParallaxSection zIndex={10}>
                  <Philosophy />
              </ParallaxSection>

              {/* Horizontal Scroll Projects Section */}
              <FeaturedProjects />

              {/* Awwwards Level Client Feedback Section */}
              <ClientFeedback />

              {/* Work Experience Section */}
              <Experience />

              {/* The Construct - Creative Labs Section */}
              <Construct />

              {/* Contact / Footer */}
              <Contact />
              
            </Suspense>
          </main>
        </SmoothScroll>
    </TransitionProvider>
  );
}