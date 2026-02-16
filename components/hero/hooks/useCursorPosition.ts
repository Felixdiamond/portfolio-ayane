"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function useCursorPosition(lerpFactor = 0.1) {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { mouse, smoothMouse };
}
