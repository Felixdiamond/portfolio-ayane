"use client";

import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate progress from 0 to 1 based on viewport height
      // Clamped between 0 and 1
      const currentProgress = Math.min(Math.max(scrollPosition / windowHeight, 0), 1);
      
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return progress;
}
