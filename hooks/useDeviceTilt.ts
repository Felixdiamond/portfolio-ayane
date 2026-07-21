"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Tilt = { x: number; y: number };

/**
 * Normalized device tilt: x = left/right (-1..1), y = toward/away (-1..1),
 * centered on a natural handheld angle. iOS requires a user-gesture
 * permission request — `needsPermission` is true until granted.
 */
export function useDeviceTilt(onTilt: (tilt: Tilt) => void, enabled = true) {
  const [needsPermission, setNeedsPermission] = useState(false);
  const [granted, setGranted] = useState(false);
  const cb = useRef(onTilt);
  useEffect(() => {
    cb.current = onTilt;
  }, [onTilt]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const DOE = window.DeviceOrientationEvent as any;
    if (!DOE) return;
    /* capability detection must run client-side, post-hydration */
    if (typeof DOE.requestPermission === "function") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- iOS 13+: wait for a tap
      setNeedsPermission(true);
    } else {
       
      setGranted(true);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !granted) return;
    // Calibrate to however the phone is being held — the first reading is "rest"
    let rest: { beta: number; gamma: number } | null = null;
    const handler = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      if (!rest) rest = { beta: e.beta, gamma: e.gamma };
      const x = Math.max(-1, Math.min(1, (e.gamma - rest.gamma) / 25));
      const y = Math.max(-1, Math.min(1, (e.beta - rest.beta) / 25));
      cb.current({ x, y });
    };
    window.addEventListener("deviceorientation", handler, { passive: true });
    return () => window.removeEventListener("deviceorientation", handler);
  }, [enabled, granted]);

  const request = useCallback(async () => {
    try {
      const DOE = window.DeviceOrientationEvent as any;
      const result = await DOE.requestPermission();
      if (result === "granted") {
        setGranted(true);
        setNeedsPermission(false);
      }
    } catch {
      setNeedsPermission(false);
    }
  }, []);

  return { needsPermission, granted, request };
}
