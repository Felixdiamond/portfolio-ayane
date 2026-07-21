"use client";
/* eslint-disable react-hooks/immutability -- R3F useFrame mutates three.js objects imperatively by design */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial, RoundedBox, Text } from "@react-three/drei";
import type { MotionValue } from "framer-motion";

const DAMP = THREE.MathUtils.damp;

const GLASS_TINT = new THREE.Color("#f0e4d4");
const COPPER = new THREE.Color("#b87333");

/**
 * The money shot: the name lives inside the scene, and a slab of real
 * glass drifts over it, refracting the letters. Scrolling pushes the
 * camera THROUGH the glass — the first step of the descent.
 */
function NameAndGlass({ progress }: { progress: MotionValue<number> }) {
  const slab = useRef<THREE.Group>(null);
  const mat = useRef<any>(null);
  const pulse = useRef(0);
  const { pointer, camera } = useThree();

  // Press anywhere: the glass rings with a refraction pulse
  useEffect(() => {
    const onDown = () => {
      pulse.current = 1;
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  useFrame((state, delta) => {
    const p = progress.get();

    // Camera: resting dolly-in on load, then scroll pushes it through the slab
    const targetZ = 7.8 - p * 7.0;
    camera.position.z = DAMP(camera.position.z, targetZ, 2.2, delta);
    camera.position.y = DAMP(camera.position.y, pointer.y * 0.12, 2, delta);
    camera.position.x = DAMP(camera.position.x, pointer.x * 0.18, 2, delta);
    camera.lookAt(0, 0, -2);

    if (slab.current) {
      const g = slab.current;
      // The glass leans with the cursor — the surface acknowledges you
      g.rotation.y = DAMP(g.rotation.y, pointer.x * 0.24, 3.8, delta);
      g.rotation.x = DAMP(g.rotation.x, -pointer.y * 0.18, 3.8, delta);
      g.position.x = DAMP(g.position.x, pointer.x * 0.38, 3.2, delta);
      g.position.y = DAMP(
        g.position.y,
        pointer.y * 0.28 + Math.sin(state.clock.elapsedTime * 0.65) * 0.07,
        3.2,
        delta
      );
    }

    // Pulse decays fast; while alive it rings through the refraction
    pulse.current *= Math.pow(0.01, delta);

    if (mat.current) {
      // Slow breathing refraction; thickens as the camera dives through
      mat.current.ior =
        1.24 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + p * 0.35 + pulse.current * 0.22;
      mat.current.chromaticAberration = 0.045 + p * 0.12 + pulse.current * 0.08;

      // The narrative payoff: passing through the glass turns it to copper
      const t = THREE.MathUtils.smoothstep(p, 0.4, 0.95);
      mat.current.transmission = 1 - t * 0.85;
      mat.current.metalness = t;
      mat.current.roughness = 0.05 + t * 0.3;
      mat.current.color.lerpColors(GLASS_TINT, COPPER, t);
    }
  });

  return (
    <>
      {/* The name — refracted, not decorated */}
      <group position={[0, 0, -2]}>
        <Text
          font="/fonts/Archivo-Hero.ttf"
          fontSize={0.98}
          letterSpacing={-0.03}
          anchorX="center"
          anchorY="middle"
          position={[0, 0.56, 0]}
          color="#e8e4dc"
        >
          FELIX
        </Text>
        <Text
          font="/fonts/Archivo-Hero.ttf"
          fontSize={0.66}
          letterSpacing={-0.02}
          anchorX="center"
          anchorY="middle"
          position={[0, -0.38, 0]}
          color="#8a877f"
        >
          DAWODU
        </Text>
      </group>

      {/* One slab of glass — the top of the stack */}
      <group ref={slab} rotation={[0, 0, -0.06]}>
        <RoundedBox args={[3.7, 2.4, 0.3]} radius={0.1} smoothness={4}>
          <MeshTransmissionMaterial
            ref={mat}
            samples={8}
            resolution={384}
            transmission={1}
            roughness={0.05}
            thickness={1.6}
            ior={1.24}
            chromaticAberration={0.045}
            anisotropicBlur={0.4}
            distortion={0.22}
            distortionScale={0.6}
            temporalDistortion={0.06}
            color="#f0e4d4"
          />
        </RoundedBox>
      </group>
    </>
  );
}

export default function GlassCanvas({
  active,
  progress,
}: {
  active: boolean;
  progress: MotionValue<number>;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      aria-hidden
    >
      <NameAndGlass progress={progress} />

      {/* Spotlit installation: one warm copper key, faint fill */}
      <spotLight position={[-5, 4, 6]} angle={0.5} penumbra={1} intensity={14} color="#d4a24e" />
      <ambientLight intensity={0.25} />
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 4, 4]} scale={[9, 2, 1]} color="#e8e4dc" />
        <Lightformer intensity={1.6} position={[-5, -1, 3]} scale={[2, 5, 1]} color="#b87333" />
        <Lightformer intensity={0.7} position={[6, 1, 2]} scale={[1.5, 6, 1]} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
