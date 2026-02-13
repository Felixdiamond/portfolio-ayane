"use client";

import { Suspense } from "react";
import CentralGeometry from "./CentralGeometry";
import ParticleField from "./ParticleField";
import DynamicLighting from "./DynamicLighting";
import CameraController from "./CameraController";
import { PerspectiveCamera } from "@react-three/drei";

export default function HeroScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <CameraController />
      <DynamicLighting />
      
      <Suspense fallback={null}>
        <CentralGeometry />
        <ParticleField />
      </Suspense>
    </>
  );
}
