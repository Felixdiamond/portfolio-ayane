
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import Antigravity from "./ui/Antigravity";
import { FaTwitter, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";
import Image from "next/image";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div 
      ref={containerRef} 
      className="relative z-0 w-full min-h-[80vh] bg-void text-text-primary overflow-hidden flex flex-col justify-end"
    >
      {/* Antigravity Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Antigravity
            count={300}
            magnetRadius={6}
            ringRadius={7}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={1.5}
            lerpSpeed={0.05}
            color="#5227FF"
            autoAnimate
            particleVariance={1}
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={3}
            particleShape="tetrahedron"
            fieldStrength={10}
        />
      </div>

      {/* Background Grain */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-[1]">
        <svg className="w-full h-full">
            <filter id="noiseFilter">
                <feTurbulence 
                    type="fractalNoise" 
                    baseFrequency="0.8" 
                    numOctaves="3" 
                    stitchTiles="stitch" 
                />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 0]) }}
        className="relative z-10 container mx-auto px-6 py-20 flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center gap-4"
            >
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="text-sm uppercase tracking-widest text-text-secondary">Open to Work</span>
            </motion.div>

            <div className="overflow-hidden">
                <motion.h2 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="text-[12vw] leading-[0.9] font-bold tracking-tighter mix-blend-difference"
                >
                    LET'S WORK <br />
                </motion.h2>
            </div>
            <div className="overflow-hidden">
                 <motion.h2 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className="text-[12vw] leading-[0.9] font-bold tracking-tighter mix-blend-difference"
                 >
                    <span className="text-text-muted italic font-serif">TOGETHER</span>
                 </motion.h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-20 border-t border-border">
            {/* Contact Info */}
            <div className="flex flex-col gap-6">
                <h3 className="text-xl font-medium text-text-secondary">Contact</h3>
                <MagneticButton 
                    title="diamondfelix006@gmail.com" 
                    icon={<LuArrowUpRight />} 
                    position="right"
                    handleClick={() => window.location.href = 'mailto:diamondfelix006@gmail.com'}
                    otherClasses="!bg-text-primary !text-void hover:!bg-text-secondary transition-colors"
                />
                <p className="text-text-muted">+2348128939779</p>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-6">
                <h3 className="text-xl font-medium text-text-secondary">Socials</h3>
                <div className="flex flex-col items-start gap-4">
                    <a href="https://github.com/Felixdiamond" className="group flex items-center gap-2 text-lg hover:text-text-secondary transition-colors">
                        <FaGithub /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/felix-dawodu-ba2b08211" className="group flex items-center gap-2 text-lg hover:text-text-secondary transition-colors">
                        <FaLinkedin /> LinkedIn
                    </a>
                    <a href="https://x.com/ayanesenpai_" className="group flex items-center gap-2 text-lg hover:text-text-secondary transition-colors">
                        <FaTwitter /> Twitter
                    </a>
                    <a href="https://wa.me/2348128939779" className="group flex items-center gap-2 text-lg hover:text-text-secondary transition-colors">
                        <FaWhatsapp /> Whatsapp
                    </a>
                </div>
            </div>

            {/* Location / Time */}
            <div className="flex flex-col gap-6 md:text-right">
                <h3 className="text-xl font-medium text-text-secondary">Location</h3>
                <p className="text-lg">Lagos, Nigeria</p>
                <p className="text-text-muted">{new Date().getFullYear()} © Felix's Portfolio</p>
            </div>
        </div>
      </motion.div>

      {/* Subtle Footer Image */}
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none mix-blend-luminosity opacity-20">
        <Image
            src="/yachiru_bye.png" 
            alt="Character" 
            width={300} 
            height={300} 
            className="object-contain translate-y-10 translate-x-10"
        />
      </div>
    </div>
  );
}
