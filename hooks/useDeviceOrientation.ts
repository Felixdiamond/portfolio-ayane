"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface OrientationData {
  /** Left-right tilt (-1 to 1) */
  gamma: number;
  /** Front-back tilt (-1 to 1) */
  beta: number;
  /** Whether gyroscope data is available */
  isAvailable: boolean;
  /** Request permission (needed on iOS Safari) */
  requestPermission: () => Promise<boolean>;
  /** Whether permission has been granted */
  permissionGranted: boolean;
}

/**
 * Hook for DeviceOrientationEvent with iOS permission handling.
 * Returns normalized tilt values (-1 to 1) for use in animations.
 * Falls back gracefully when gyroscope is unavailable.
 */
export function useDeviceOrientation(): OrientationData {
  const [gamma, setGamma] = useState(0); // Left-right tilt
  const [beta, setBeta] = useState(0);   // Front-back tilt
  const [isAvailable, setIsAvailable] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const smoothGamma = useRef(0);
  const smoothBeta = useRef(0);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    // gamma: -90 to 90 (left-right tilt)
    // beta: -180 to 180 (front-back tilt)
    const rawGamma = event.gamma ?? 0;
    const rawBeta = event.beta ?? 0;

    // Normalize to -1 to 1 range
    const normalizedGamma = Math.max(-1, Math.min(1, rawGamma / 45));
    const normalizedBeta = Math.max(-1, Math.min(1, (rawBeta - 45) / 45)); // Offset by 45 for natural holding angle

    // Smooth with lerp
    smoothGamma.current += (normalizedGamma - smoothGamma.current) * 0.1;
    smoothBeta.current += (normalizedBeta - smoothBeta.current) * 0.1;

    setGamma(smoothGamma.current);
    setBeta(smoothBeta.current);
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    // Check if DeviceOrientationEvent is available at all
    if (typeof DeviceOrientationEvent === "undefined") {
        return false;
    }
    
    // Check if permission API exists (iOS 13+)
    if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
        try {
            const permissionState = await (
                DeviceOrientationEvent as any
            ).requestPermission();
            
            if (permissionState === "granted") {
                window.addEventListener("deviceorientation", handleOrientation);
                setPermissionGranted(true);
                setIsAvailable(true);
                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    // Android/Non-iOS doesn't need permission request usually (but start listening)
    window.addEventListener("deviceorientation", handleOrientation);
    setIsAvailable(true);
    setPermissionGranted(true);
    return true;
  }, [handleOrientation]);

  useEffect(() => {
    // Mount the listener immediately.
    // On iOS 13+, this will be silent until permission runs.
    // On Android/Desktop, this works immediately.
    if (typeof window !== 'undefined') {
        window.addEventListener("deviceorientation", handleOrientation);
        setIsAvailable(true); // Optimistically assume available until we know otherwise
    }
    
    return () => {
        if (typeof window !== 'undefined') {
             window.removeEventListener("deviceorientation", handleOrientation);
        }
    };
  }, [handleOrientation]);

  return { gamma, beta, isAvailable, requestPermission, permissionGranted };
}
