"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "./hooks/useScrollProgress";

gsap.registerPlugin(ScrollTrigger);

export default function CameraController() {
  const { camera } = useThree();
  const progress = useScrollProgress();
  // Using a ref to track if we've initialized the entry animation
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
        // Entry Animation
        gsap.fromTo(camera.position, 
            { z: 15, y: 5 }, 
            { 
                z: 8, 
                y: 0, 
                duration: 2.5, 
                ease: "power3.out",
                onComplete: () => {
                    isInitialized.current = true;
                }
            }
        );
    }
  }, [camera]);

  useFrame(() => {
    // Scroll interaction - move camera back as we scroll down
    if (isInitialized.current) {
        const targetZ = 8 + progress * 10; // Move from z=8 to z=18
        const targetY = progress * 5;      // Move up slightly
        
        // Smooth lerp for scroll movement
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);
        
        camera.lookAt(0, 0, 0);
    }
  });

  return null;
}
