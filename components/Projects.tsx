"use client";

import { projects } from "@/data";
import { IoNavigate } from "react-icons/io5";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import LiquidText from "./ui/LiquidText";
import Magnetic from "./ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const RecentProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const projects = gsap.utils.toArray<HTMLElement>(".project-card");
    
    projects.forEach((project) => {
        gsap.fromTo(project.querySelector(".project-image"), 
            {
                y: -50,
                scale: 1.1
            },
            {
                y: 50,
                scale: 1,
                scrollTrigger: {
                    trigger: project,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            }
        );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-20 w-full relative z-10" id="projects">
      <div className="mb-20">
         <LiquidText 
            text="SELECTED" 
            className="text-[10vw] font-bold leading-[0.8] tracking-tighter text-white/5 opacity-50 text-center"
         />
         <LiquidText 
            text="WORKS" 
            className="text-[10vw] font-bold leading-[0.8] tracking-tighter text-white text-center -mt-[5vw] mix-blend-difference"
         />
      </div>

      <div className="flex flex-col gap-32 px-5 md:px-10 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center justify-center`}
          >
            <div className="w-full lg:w-3/5 h-[40vh] md:h-[60vh] relative overflow-hidden rounded-md border border-white/10 group">
                <div className="project-image absolute inset-0 w-full h-[120%] -top-[10%]">
                     <div className="absolute inset-0 bg-[#13162d] opacity-50 z-0"/>
                     <Image 
                        src={project.img} 
                        alt={project.title} 
                        fill 
                        className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                     />
                </div>
            </div>

            <div className="w-full lg:w-2/5 flex flex-col gap-6">
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                    {project.title}
                </h2>
                <div className="h-1 w-20 bg-white/20" />
                
                <p className="text-neutral-400 leading-relaxed">
                    {project.des}
                </p>

                <div className="flex items-center gap-4 mt-4">
                    {project.iconLists.map((icon, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/50 overflow-hidden p-2">
                             <img src={icon} alt="tech" className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-6">
                    <Magnetic>
                         <a href={project.id === 3 ? 'https://odohs-bookstore.vercel.app' : `https://${project.link}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-purple transition-colors">
                            <span>Live Site</span>
                            <IoNavigate />
                         </a>
                    </Magnetic>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
