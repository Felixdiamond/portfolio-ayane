"use client";

import { motion } from "framer-motion";

export default function HeroMobileFallback() {
  return (
    <div className="absolute inset-0 w-full h-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden z-0">
      <div className="absolute inset-0 w-full h-full opacity-30">
      </div>
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    </div>
  );
}
