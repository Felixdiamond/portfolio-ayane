"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import HeroScene from "./HeroScene";
import HeroEffects from "./HeroEffects";
import { Preload } from "@react-three/drei";

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        dpr={[1, 2]} // Optimize pixel ratio
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 10], fov: 45 }}
      >
        <Suspense fallback={null}>
          <HeroScene />
          <HeroEffects />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
