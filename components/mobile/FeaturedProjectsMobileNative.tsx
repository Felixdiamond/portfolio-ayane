"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  PanInfo,
  useVelocity,
    AnimatePresence,
    Variants
} from "framer-motion";
import Image from "next/image";
import { projects } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";
import { cn } from "@/utils/cn";

export default function FeaturedProjectsMobileNative() {
  const [items, setItems] = useState(projects);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleProjects = [
    items[activeIndex % items.length],
    items[(activeIndex + 1) % items.length],
  ];

  return (
    <section className="relative w-full h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden">
       <div className="absolute top-8 left-6 z-10 w-full pointer-events-none select-none">
        <h2 className="text-4xl font-black uppercase text-text-primary tracking-tighter leading-none mb-2 mix-blend-difference">
          Selected
          <br />
          <span className="text-text-secondary">Works</span>
        </h2>
        <p className="text-xs text-text-muted uppercase tracking-widest mt-4">
            {activeIndex + 1} <span className="text-white/20">/</span> {projects.length}
        </p>
      </div>

      <div className="relative w-full h-full max-h-[600px] flex items-center justify-center perspective-1000">
          {items.map((project, index) => {
              if (index < activeIndex) return null; 

              const isTop = index === activeIndex;
              
              return (
                <Card
                  key={project.id}
                  project={project}
                  index={index}
                  activeIndex={activeIndex}
                  total={items.length}
                  onSwipe={(direction: number) => {
                    setActiveIndex(prev => (prev + 1));
                    if (index === items.length - 1) {
                         setTimeout(() => setActiveIndex(0), 500); 
                    }
                  }}
                  isTop={isTop}
                />
              )
          }).reverse()} 
      </div>
      
        <div className="absolute bottom-10 text-white/20 text-xs uppercase tracking-[0.2em] animate-pulse pointer-events-none">
            Swipe to Explore
        </div>

    </section>
  );
}

type CardProps = {
    project: typeof projects[number];
    index: number;
    activeIndex: number;
    total: number;
    onSwipe: (direction: number) => void;
    isTop: boolean;
};

function Card({ project, index, activeIndex, total, onSwipe, isTop }: CardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
    
    const dragScale = useTransform(x, (v) => 1 - Math.abs(v) * 0.0005);

    const xVelocity = useVelocity(x);
    const skewX = useSpring(useTransform(xVelocity, [-1000, 1000], [10, -10]), {
        stiffness: 400,
        damping: 30
    });
    const imageX = useTransform(x, [-200, 200], [100, -100]); 

    const offsetIndex = index - activeIndex;
    const isVisible = offsetIndex >= 0 && offsetIndex < 3;
    
    const cardScale = isTop ? 1 : 1 - offsetIndex * 0.05;
    const cardY = isTop ? 0 : offsetIndex * 15;
    const cardZ = isTop ? 0 : -offsetIndex * 50;
    const cardOpacity = isTop ? 1 : 1 - offsetIndex * 0.2;
    
    const variants: Variants = {
        top: {
            x: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            zIndex: total - index,
            transition: { type: "spring" as const, stiffness: 300, damping: 30 }
        },
        stacked: (i: number) => ({
            scale: 1 - i * 0.05,
            y: i * 15,
            z: -i * 50,
            opacity: 1 - i * 0.2,
            zIndex: total - index,
            transition: { type: "spring" as const, stiffness: 300, damping: 30 }
        }),
        exit: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } 
        })
    };
    
    const [exitDirection, setExitDirection] = useState(0);

    const handleDragEnd = (e: any, info: PanInfo) => {
        if (!isTop) return;
        
        const swipeThreshold = 100;
        if (info.offset.x > swipeThreshold) {
            setExitDirection(1);
            onSwipe(1);
        } else if (info.offset.x < -swipeThreshold) {
            setExitDirection(-1);
            onSwipe(-1);
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
            style={{
                x: isTop ? x : 0,
                     y: isTop ? y : cardY,
                zIndex: total - index,
                skewX: isTop ? skewX : 0, 
                     scale: isTop ? dragScale : cardScale,
                rotate: isTop ? rotate : 0,
            }}
            initial={isTop ? "top" : "stacked"}
            animate={exitDirection !== 0 ? "exit" : (isTop ? "top" : "stacked")}
            custom={exitDirection !== 0 ? exitDirection : offsetIndex}
            variants={variants}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
            className="absolute w-[85vw] h-[60vh] max-w-sm rounded-[32px] overflow-hidden shadow-2xl origin-bottom"
        >
           <div className="relative w-full h-full bg-[#1a1a1a] border border-white/10 rounded-[32px] overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                        className="w-[150%] h-full absolute left-[-25%]"
                        style={{ x: isTop ? imageX : 0 }}
                    >
                         <div className="relative w-full h-full">
                            <Image
                                src={project.img}
                                alt={project.title}
                                fill
                                className="object-cover pointer-events-none"
                                priority={isTop}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                         </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-3 select-none pointer-events-none">
                    <div className="flex gap-2 mb-1">
                        {project.iconLists.map((icon: string, i: number) => (
                             <div key={i} className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center p-1.5">
                                 <img src={icon} alt="icon" className="w-full h-full" />
                             </div>
                        ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white leading-tight">
                        {project.title}
                    </h3>
                    
                    <p className="text-sm text-white/70 line-clamp-2">
                        {project.des}
                    </p>

                    <div className="flex items-center gap-2 mt-2 pt-4 border-t border-white/10">
                         <span className="text-violet-400 text-sm font-semibold">View Case Study</span>
                         <FaLocationArrow className="text-violet-400 text-xs" />
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 pointer-events-none mix-blend-overlay" />
           </div>
        </motion.div>
    );
}

