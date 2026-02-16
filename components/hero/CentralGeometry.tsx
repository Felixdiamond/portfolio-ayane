"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useCursorPosition } from "./hooks/useCursorPosition";
import { useBlobPosition } from "./HeroInteractionContext";
import * as THREE from "three";

export default function CentralGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { smoothMouse, mouse } = useCursorPosition();
  const { setBlobPosition } = useBlobPosition();
  const { camera, size } = useThree();
  
  const velocity = useRef(new THREE.Vector2(0, 0));
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const lastMouse = useRef(new THREE.Vector2(0, 0));
  const mouseVelocity = useRef(0);
  
  const noiseOffset = useRef(Math.random() * 1000);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const mesh = meshRef.current;
    const material = materialRef.current;
    const time = state.clock.getElapsedTime();
    
    const dx = mouse.current.x - lastMouse.current.x;
    const dy = mouse.current.y - lastMouse.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    mouseVelocity.current = THREE.MathUtils.lerp(mouseVelocity.current, speed * 30, 0.1);
    lastMouse.current.copy(mouse.current);
    
    const targetX = smoothMouse.current.x * 2.5;
    const targetY = smoothMouse.current.y * 2;
    
    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, 0.015);
    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, 0.015);
    
    const idleX = Math.sin(time * 0.3 + noiseOffset.current) * 0.15;
    const idleY = Math.cos(time * 0.2 + noiseOffset.current) * 0.1;
    mesh.position.x += idleX;
    mesh.position.y += idleY;
    
    mesh.rotation.x += delta * 0.05;
    mesh.rotation.y += delta * 0.08;
    
    const velocityRotation = mouseVelocity.current * 0.15;
    mesh.rotation.z += delta * velocityRotation;
    
    const baseDistort = 0.3;
    const maxDistort = 0.7;
    const targetDistort = Math.min(baseDistort + mouseVelocity.current * 0.3, maxDistort);
    material.distort = THREE.MathUtils.lerp(material.distort, targetDistort, 0.08);
    
    const baseSpeed = 1.5;
    const maxSpeed = 4;
    const targetSpeed = Math.min(baseSpeed + mouseVelocity.current * 2, maxSpeed);
    material.speed = THREE.MathUtils.lerp(material.speed, targetSpeed, 0.08);
    
    const vector = new THREE.Vector3();
    mesh.getWorldPosition(vector);
    vector.project(camera);
    
    const screenX = (vector.x * 0.5 + 0.5) * size.width;
    const screenY = (-(vector.y * 0.5) + 0.5) * size.height;
    
    setBlobPosition({
      x: mesh.position.x,
      y: mesh.position.y,
      screenX,
      screenY,
    });
  });

  return (
    <Sphere args={[1.8, 128, 128]} ref={meshRef}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#4338ca"
        toneMapped={false}
        emissive="#1e1b4b"
        emissiveIntensity={0.3}
        distort={0.3}
        speed={1.5}
        roughness={0.15}
        metalness={0.85}
        clearcoat={1}
        clearcoatRoughness={0.1}
        radius={1}
      />
    </Sphere>
  );
}
