"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import * as THREE from "three";

interface BlobPosition {
  x: number; // Screen coordinates
  y: number;
  screenX: number;
  screenY: number;
}

interface HeroInteractionContextType {
  blobPosition: BlobPosition;
  setBlobPosition: (pos: BlobPosition) => void;
}

const HeroInteractionContext = createContext<HeroInteractionContextType | null>(null);

export function HeroInteractionProvider({ children }: { children: ReactNode }) {
  const [blobPosition, setBlobPosition] = useState<BlobPosition>({
    x: 0,
    y: 0,
    screenX: 0,
    screenY: 0,
  });

  return (
    <HeroInteractionContext.Provider value={{ blobPosition, setBlobPosition }}>
      {children}
    </HeroInteractionContext.Provider>
  );
}

export function useBlobPosition() {
  const context = useContext(HeroInteractionContext);
  if (!context) {
    throw new Error("useBlobPosition must be used within HeroInteractionProvider");
  }
  return context;
}
