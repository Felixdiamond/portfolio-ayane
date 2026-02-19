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
import dynamic from "next/dynamic";

const TinderCard = dynamic(() => import('react-tinder-card'), { ssr: false });

export default function FeaturedProjectsMobileNative() {
  const [lastDirection, setLastDirection] = useState<string>();
  const [items, setItems] = useState(projects);

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    // console.log(name + ' left the screen!')
  };

  return (
    <section id="work" className="relative w-full h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden">
       <div className="absolute top-8 left-6 z-10 w-full pointer-events-none select-none">
        <h2 className="text-4xl font-black uppercase text-text-primary tracking-tighter leading-none mb-2 mix-blend-difference">
          Selected
          <br />
          <span className="text-text-secondary">Works</span>
        </h2>
        <p className="text-xs text-text-muted uppercase tracking-widest mt-4">
           SWIPE TO EXPLORE 
           <span className="text-white/20 ml-2">{items.length} PROJECTS</span>
        </p>
      </div>

      <div className="relative w-full h-full max-h-[600px] flex items-center justify-center">
          {items.map((project, index) => (
             <div 
                key={project.id}
                className="absolute flex justify-center items-center w-full"
                style={{ 
                    zIndex: items.length - index,
                }}
             >
                <TinderCard
                    className="swipe absolute cursor-grab active:cursor-grabbing"
                    onSwipe={(dir) => swiped(dir, project.title, index)}
                    onCardLeftScreen={() => outOfFrame(project.title)}
                    preventSwipe={['up', 'down']}
                >
                    <div className="relative w-[85vw] h-[60vh] max-w-sm rounded-[32px] overflow-hidden shadow-2xl bg-[#1a1a1a] border border-white/10 select-none">
                        <div className="absolute inset-0">
                             <div className="relative w-full h-full">
                                <Image
                                    src={project.img}
                                    alt={project.title}
                                    fill
                                    className="object-cover pointer-events-none"
                                    priority={index === 0}
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                             </div>
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
                    </div>
                </TinderCard>
             </div>
          )).reverse()}
      </div>
      
        <div className="absolute bottom-10 text-white/20 text-xs uppercase tracking-[0.2em] animate-pulse pointer-events-none">
            {lastDirection ? `Swiped ${lastDirection}` : "Swipe cards"}
        </div>
    </section>
  );
}

// Helper types/functions if needed but mostly replaced
type CardProps = any;
function Card(props: any) { return null; }

