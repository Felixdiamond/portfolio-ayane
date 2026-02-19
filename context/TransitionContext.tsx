"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface TransitionContextType {
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
  timeline: gsap.core.Timeline | null;
  setTimeline: (tl: gsap.core.Timeline) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
    }
  }, []);

  return (
    <TransitionContext.Provider value={{ isLoaded, setIsLoaded, timeline, setTimeline }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};
