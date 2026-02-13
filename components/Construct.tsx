"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGamepad, FaTerminal, FaBolt, FaMicrochip } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);



const experiments = [
    {
        id: "01",
        title: "ESP_DECK",
        type: "Embedded / C++",
        desc: "Portable gaming console built from scratch with ESP32, OLED display, and custom firmware.",
        icon: <FaGamepad />,
        status: "PROTOTYPE"
    },
    {
        id: "02",
        title: "PIPWATCH",
        type: "CLI / Automation",
        desc: "Intelligent CLI tool that automatically detects and installs missing Python dependencies via AST parsing.",
        icon: <FaTerminal />,
        status: "ONLINE"
    },
    {
        id: "03",
        title: "COIL_GUN",
        type: "High Voltage / Physics",
        desc: "Experimental resonant transformer and magnetic propulsion studies.",
        icon: <FaBolt />,
        status: "CONCEPT"
    },
    {
        id: "04",
        title: "1_BIT_CPU",
        type: "Architecture",
        desc: "Physical logic gate simulation and 1-bit full adder implementation.",
        icon: <FaMicrochip />,
        status: "ARCHIVED"
    }
];

export default function Construct() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".construct-card");
    
    // Scramble / Decode Text Effect for Header could go here
    
    // Staggered Entry
    gsap.fromTo(cards, 
        { y: 50, opacity: 0, rotateX: 10 },
        {
            y: 0, 
            opacity: 1, 
            rotateX: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center+=100",
            }
        }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-abyss z-20 overflow-hidden">
      
      {/* Digital Horizon Transition Mask */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-abyss to-transparent z-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-40 opacity-50" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-border pb-10">
              <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-accent mb-2">
                      R&D / Labs
                  </h2>
                  <h1 className="text-5xl md:text-8xl font-black text-text-primary uppercase tracking-tighter mix-blend-difference">
                      The<br />Construct
                  </h1>
              </div>
              <p className="text-text-muted max-w-sm text-right mt-10 md:mt-0 uppercase tracking-widest text-xs">
                  Experimental prototypes,<br />unfinished code, and digital artifacts.
              </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiments.map((item) => (
                  <div 
                    key={item.id} 
                    className="construct-card group relative bg-surface/30 border border-border p-8 h-80 flex flex-col justify-between overflow-hidden hover:bg-surface/50 transition-colors duration-500"
                  >
                      {/* Glitch Overlay on Hover (CSS based usually, simplified here) */}
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Top Bar */}
                      <div className="flex justify-between items-start relative z-10">
                          <span className="text-4xl text-text-faint group-hover:text-accent transition-colors duration-300">
                             {item.icon}
                          </span>
                          <span className="text-[10px] font-mono border border-border px-2 py-1 rounded text-text-muted">
                              {item.status}
                          </span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                          <span className="text-[10px] font-mono text-accent block mb-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                              ERR_SUCCESS: {item.id}
                          </span>
                          <h3 className="text-2xl font-bold text-text-primary uppercase tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300 whitespace-normal">
                              {item.title}
                          </h3>
                          <p className="text-sm text-text-muted leading-relaxed">
                              {item.desc}
                          </p>
                      </div>

                      {/* Corner Accents */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-border group-hover:w-full group-hover:h-full group-hover:border-accent/30 transition-all duration-500 active:bg-accent/10" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-border group-hover:w-full group-hover:h-full group-hover:border-accent/30 transition-all duration-500" />
                  </div>
              ))}
          </div>

      </div>
    </section>
  );
}
