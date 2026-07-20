"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";
import { scrollToTarget } from "@/utils/lenis";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Work", href: "#runtime" },
    { name: "Experience", href: "#terminal" },
    { name: "Lab", href: "#copper" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-4 inset-x-0 mx-auto w-[95%] max-w-4xl z-[100]",
          "flex items-center justify-between px-6 py-3",
          "bg-white/5 backdrop-blur-md border border-white/10 rounded-full",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
        )}
      >
        <Link href="/" className="relative z-50" aria-label="Felix Dawodu — home">
           <Magnetic>
              <div>
                {/* Mobile shows a monogram — the hero right below carries the full name */}
                <div className="md:hidden font-mono font-bold text-lg tracking-tight text-white">
                  FD<span className="text-accent">.</span>
                </div>
                <div className="hidden md:flex flex-col leading-none font-bold text-xl tracking-tighter mix-blend-difference text-white">
                  <span>FELIX</span>
                  <span className="text-xs font-light text-white/70">DAWODU</span>
                </div>
              </div>
           </Magnetic>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Magnetic key={idx}>
              <Link
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(link.href);
                }}
                className="relative group text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            </Magnetic>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#050505] z-[90] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 items-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                >
                    <Link
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          scrollToTarget(link.href);
                        }}
                        className="text-5xl font-bold text-white/50 hover:text-white transition-all duration-300 tracking-tighter"
                    >
                    {link.name}
                    </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div
                  className="absolute top-[15%] left-[5%] w-80 h-80 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(184,115,51,0.25) 0%, transparent 70%)" }}
                />
                <div
                  className="absolute bottom-[15%] right-[5%] w-96 h-96 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(232,228,220,0.12) 0%, transparent 70%)" }}
                />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
