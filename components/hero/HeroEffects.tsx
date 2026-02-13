"use client";

import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function HeroEffects() {
  return (
    <EffectComposer>
      <Bloom 
        luminanceThreshold={0.2} 
        mipmapBlur 
        intensity={0.5} 
        radius={0.5}
      />
      <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
