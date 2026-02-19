"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

const services = [
  {
    title: "Develop",
    description: "Robust, scalable backends and low-level system architecture.",
    img: "/images/developp.jpg",
    tags: ["Python", "C++", "TypeScript", "Microservices"]
  },
  {
    title: "Design",
    description: "High-performance, interactive UIs driven by modern component architecture.",
    img: "/images/designn.jpg",
    tags: ["Next.js", "GSAP", "Tailwind", "Framer Motion"]
  },
  {
    title: "Deploy",
    description: "Automated, containerized infrastructure for cloud and edge environments.",
    img: "/images/deployy.jpg",
    tags: ["AWS", "Docker", "GitHub Actions", "Linux"]
  }
];

const ServiceCard = ({ 
  service, 
  index 
}: { 
  service: typeof services[0], 
  index: number
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isInReadingZone = useInView(ref, { 
    amount: 0.4,
    margin: "-25% 0px -35% 0px"
  });

  return (
    <motion.div 
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-surface/30 backdrop-blur-sm will-change-transform"
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 30,
        scale: isInReadingZone ? 1.02 : 1,
        boxShadow: isInReadingZone 
          ? "0 0 30px rgba(168,85,247,0.4)" 
          : "0 0 0px rgba(168,85,247,0)"
      }}
      transition={{ 
        opacity: { duration: 0.6, delay: index * 0.15 },
        y: { duration: 0.6, delay: index * 0.15 },
        scale: { duration: 0.5, ease: "easeOut" },
        boxShadow: { duration: 0.5, ease: "easeOut" }
      }}
    >
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none",
          isInReadingZone ? "opacity-100" : "opacity-30"
        )}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)",
          backgroundSize: "200% 100%",
          animation: isInReadingZone ? "borderFlow 3s linear infinite" : "none",
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          willChange: isInReadingZone ? "background-position" : "auto"
        }}
      />
      
      <div className={cn(
        "absolute inset-0 rounded-2xl border transition-colors duration-500 pointer-events-none",
        isInReadingZone ? "border-accent/50" : "border-border-subtle"
      )} />
      <div className="relative h-48 w-full overflow-hidden z-10">
        <Image 
          src={service.img} 
          alt={service.title} 
          fill 
          className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        
        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <span className="text-xs font-mono text-text-primary">0{index + 1}</span>
        </div>
      </div>

      <div className="p-6 space-y-4 relative z-10">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between group"
        >
          <h3 className="text-4xl font-bold text-text-primary uppercase tracking-tighter group-active:text-accent transition-colors">
            {service.title}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-text-muted group-active:text-accent"
          >
            <ChevronDown size={24} />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-2 space-y-4">
            <p className="text-text-secondary leading-relaxed text-sm">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="text-xs uppercase border border-border px-3 py-1.5 rounded-full text-text-muted bg-surface/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {!isExpanded && (
          <p className="text-xs text-text-muted opacity-50">
            Tap to expand
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default function PhilosophyMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const x1 = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  return (
    <section 
      id="about"
      ref={containerRef} 
      className="py-20 w-full relative z-30 min-h-screen bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-5 relative z-10 w-full">
        <motion.div 
          ref={headerRef}
          className="mb-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col gap-1 select-none pointer-events-none">
            <motion.h2 
              style={{ x: x1 }}
              className="text-[15vw] leading-[0.85] font-black text-text-primary/20 uppercase tracking-tighter whitespace-nowrap will-change-transform"
            >
              Digital Experience
            </motion.h2>
            
            <motion.h2 
              style={{ x: x2 }}
              className="text-[15vw] leading-[0.85] font-black text-text-primary uppercase tracking-tighter whitespace-nowrap will-change-transform"
            >
              Digital Experience
            </motion.h2>
            
            <motion.h2 
              style={{ x: x1 }}
              className="text-[15vw] leading-[0.85] font-black text-text-primary/20 uppercase tracking-tighter whitespace-nowrap will-change-transform"
            >
              Digital Experience
            </motion.h2>
          </div>
          <motion.p 
            className="text-text-secondary text-sm max-w-md mx-auto text-center mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Full-stack expertise across development, design, and deployment
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>

      <div 
        className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("/noise.png")' }} 
      />
      
      <style jsx>{`
        @keyframes borderFlow {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </section>
  );
}
