"use client";
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * SSR-safe hook to detect mobile viewport.
 * Returns `false` during SSR, then hydrates correctly on the client.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

/**
 * Detect if the device has touch capabilities.
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
