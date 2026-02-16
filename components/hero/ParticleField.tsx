"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 1000;
  
  const [positions, originalPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 10;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }
    
    return [positions, originalPositions];
  }, []);

  useFrame((state) => {
    const { clock } = state;
    const time = clock.getElapsedTime();
    
    if (pointsRef.current) {
        const positionsAttribute = pointsRef.current.geometry.attributes.position;
        
        for (let i = 0; i < count; i++) {
            const px = originalPositions[i * 3];
            const py = originalPositions[i * 3 + 1];
            const pz = originalPositions[i * 3 + 2];
            
            const noiseX = noise3D(px * 0.05, time * 0.1, 0) * 0.5;
            const noiseY = noise3D(py * 0.05, time * 0.1 + 100, 0) * 0.5;
            const noiseZ = noise3D(pz * 0.05, time * 0.1 + 200, 0) * 0.5;

            positionsAttribute.setXYZ(
                i,
                px + noiseX,
                py + noiseY,
                pz + noiseZ
            );
        }
        
        positionsAttribute.needsUpdate = true;
        
        pointsRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#818cf8"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
