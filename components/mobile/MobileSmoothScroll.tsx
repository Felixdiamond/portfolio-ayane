"use client";
import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/utils/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function MobileSmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });
    
    lenisRef.current = lenis;
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);
    
    document.documentElement.classList.add('lenis-mobile');

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const element = document.querySelector(anchor.hash);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
             offset: 0,
             duration: 1.5,
             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.classList.remove('lenis-mobile');
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="mobile-smooth-scroll-wrapper" style={{ width: '100%' }}>
      <style jsx global>{`
        html.lenis-mobile {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }
      `}</style>
      {children}
    </div>
  );
}
