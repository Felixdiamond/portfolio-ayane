"use client";

import { motion } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

export default function HeroScrollIndicator() {
  const { isLoaded } = useTransition();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none mix-blend-difference"
    >
      <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-light">
        Scroll
      </span>
      <div className="relative w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 overflow-hidden">
        <div className="absolute top-0 w-full h-1/2 bg-white/80 blur-[1px] animate-scroll-down" />
      </div>
      <style jsx>{`
        @keyframes scroll-down {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
        }
        .animate-scroll-down {
            animation: scroll-down 2s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}
