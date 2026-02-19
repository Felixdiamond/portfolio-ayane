"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope, FaCopy } from "react-icons/fa";
import { LuArrowUpRight, LuMapPin } from "react-icons/lu";
import Image from "next/image";
import Antigravity from "@/components/ui/Antigravity";

export default function ContactMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText("diamondfelix006@gmail.com");
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
    }
  };

  return (
    <div 
      id="contact"
      ref={containerRef} 
      className="relative z-0 w-full min-h-screen bg-transparent text-text-primary overflow-hidden flex flex-col pt-20 pb-10"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <Antigravity
                        count={80}
                        magnetRadius={10}
            ringRadius={5}
            waveSpeed={0.3}
            particleSize={1}
            color="#5227FF"
            autoAnimate
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={2}
            particleShape="sphere"
        />
      </div>

       <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-[1]">
        <svg className="w-full h-full">
            <filter id="noiseFilterMobile">
                <feTurbulence 
                    type="fractalNoise" 
                    baseFrequency="0.9" 
                    numOctaves="3" 
                    stitchTiles="stitch" 
                />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilterMobile)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-5 flex flex-col justify-between h-full flex-grow">
        
        <div className="flex flex-col gap-6">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-gradient-to-r from-white/10 to-transparent w-fit px-4 py-2 rounded-full backdrop-blur-md border border-white/20"
            >
                <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-[0_0_10px_#22c55e]" />
                <span className="text-xs uppercase tracking-widest font-medium text-white/90">Open to Work</span>
            </motion.div>

            <div className="flex flex-col">
                <motion.h2 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-[15vw] leading-[0.85] font-bold tracking-tighter"
                >
                    LET'S
                </motion.h2>
                <motion.h2 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-[15vw] leading-[0.85] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10"
                >
                    WORK
                </motion.h2>
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                >
                    <span className="text-[14vw] leading-[0.85] font-serif italic text-text-secondary mix-blend-difference">
                        TOGETHER
                    </span>
                 </motion.div>
            </div>
        </div>

        <div className="mt-12 flex flex-col gap-4">
            <motion.a 
                href="mailto:diamondfelix006@gmail.com"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                viewport={{ once: true }}
                className="group relative w-full aspect-[5/1] bg-text-primary text-void rounded-2xl flex items-center justify-between px-6 overflow-hidden shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
            >
                <span className="relative z-10 text-xl font-bold tracking-wide group-hover:tracking-wider transition-all">EMAIL ME</span>
                <span className="relative z-10 text-2xl bg-void/10 p-3 rounded-full group-hover:rotate-45 transition-transform duration-300">
                    <LuArrowUpRight />
                </span>
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </motion.a>

            <div className="grid grid-cols-2 gap-4">
                <motion.button
                    onClick={copyToClipboard}
                    whileTap={{ scale: 0.95 }}
                    className="h-16 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center gap-2 active:bg-success/20 transition-colors"
                >
                    <FaCopy className="text-text-secondary" />
                    <span className="text-sm font-medium">Copy Email</span>
                </motion.button>
                
                 <motion.a
                    href="https://wa.me/2348128939779"
                    whileTap={{ scale: 0.95 }}
                    className="h-16 rounded-xl border border-success/30 bg-success/10 backdrop-blur-sm flex items-center justify-center gap-2 text-success"
                >
                    <FaWhatsapp className="text-lg" />
                    <span className="text-sm font-medium">WhatsApp</span>
                </motion.a>
            </div>
        </div>

        <div className="mt-12">
            <h3 className="text-sm font-medium text-text-muted mb-6 uppercase tracking-wider pl-1">Socials</h3>
            <div className="grid grid-cols-3 gap-3">
                 {[
                    { icon: FaGithub, href: "https://github.com/Felixdiamond", label: "Github" },
                    { icon: FaLinkedin, href: "https://www.linkedin.com/in/felix-dawodu-ba2b08211", label: "LinkedIn" },
                    { icon: FaTwitter, href: "https://x.com/ayanesenpai_", label: "Twitter" },
                 ].map((social, idx) => (
                    <motion.a
                        key={idx}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * idx, type: "spring", stiffness: 200 }}
                        viewport={{ once: true }}
                        whileTap={{ scale: 0.9 }}
                        className="aspect-square rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 flex flex-col items-center justify-center gap-3 active:border-white/20 transition-colors backdrop-blur-sm"
                    >
                        <social.icon className="text-2xl text-text-secondary" />
                        <span className="text-xs text-text-muted font-medium">{social.label}</span>
                    </motion.a>
                 ))}
            </div>
        </div>

        <div className="mt-16 relative flex flex-col gap-4 text-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
            
            <div className="flex items-center justify-center gap-2 text-text-secondary">
                <LuMapPin className="text-primary animate-bounce duration-[3000ms]" />
                <span className="text-sm font-medium">Lagos, Nigeria</span>
            </div>

            <p className="text-xs text-text-muted/60 font-mono tracking-tight">
                {new Date().getFullYear()} © FELIX DAWODU <br />
                ENGINEERED FOR EXCELLENCE
            </p>
        </div>

      </div>

      <div className="absolute -bottom-10 -right-10 z-0 opacity-10 pointer-events-none">
        <Image
            src="/yachiru_bye.png" 
            alt="Character" 
            width={250} 
            height={250} 
            className="object-contain"
        />
      </div>
    </div>
  );
}
