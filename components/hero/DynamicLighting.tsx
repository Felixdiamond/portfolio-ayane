"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useCursorPosition } from "./hooks/useCursorPosition";

export default function DynamicLighting() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { smoothMouse } = useCursorPosition();

  useFrame((state, delta) => {
    if (lightRef.current) {
      // Lerp light position to follow mouse
      const x = smoothMouse.current.x * 5;
      const y = smoothMouse.current.y * 5;
      lightRef.current.position.lerp(new THREE.Vector3(x, y, 5), delta * 5);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight 
        ref={lightRef} 
        position={[0, 0, 5]} 
        intensity={20} 
        color="#818cf8" 
        distance={20}
        decay={2}
      />
      <pointLight position={[-5, 5, -5]} intensity={10} color="#c084fc" />
    </group>
  );
}
