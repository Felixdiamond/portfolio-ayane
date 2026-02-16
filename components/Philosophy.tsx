"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

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

const ServiceItem = ({ 
  service, 
  index, 
  activeIndex, 
  setActiveIndex 
}: { 
  service: typeof services[0], 
  index: number, 
  activeIndex: number | null, 
  setActiveIndex: (i: number | null) => void 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div 
      ref={ref}
      className={cn(
        "group relative border-t border-border-subtle py-12 md:py-20 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-all duration-700",
        activeIndex !== null && activeIndex !== index ? "opacity-30 blur-[2px]" : "opacity-100 blur-0"
      )}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <span className="text-sm md:text-base font-mono text-text-muted mb-4 md:mb-0 md:w-24">
        0{index + 1}/
      </span>

      <h3 className="text-5xl md:text-8xl font-bold text-text-primary uppercase tracking-tighter z-10 mix-blend-difference group-hover:translate-x-4 transition-transform duration-500 origin-left">
        {service.title}
      </h3>
      
      <div className={cn(
          "flex flex-col items-end gap-3 z-10 transition-all duration-500 transform",
           activeIndex === index 
             ? "opacity-100 translate-x-0 translate-y-0" 
             : "opacity-0 translate-x-10 md:opacity-100 md:translate-x-0" 
      )}>
        <p className="max-w-xs text-right text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed text-sm md:text-base">
          {service.description}
        </p>
        <div className="flex gap-2">
            {service.tags.map((tag, i) => (
                <span key={i} className="text-[10px] md:text-xs uppercase border border-border px-3 py-1 rounded-full text-text-muted group-hover:border-accent group-hover:text-accent transition-colors">
                    {tag}
                </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGSAP(() => {
    gsap.fromTo(".philosophy-text-1", 
      { x: "-10%", opacity: 0.5 },
      { 
        x: "5%", 
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      }
    );

    gsap.fromTo(".philosophy-text-2", 
      { x: "10%", opacity: 0.5 },
      { 
        x: "-10%", 
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      }
    );
     gsap.fromTo(".philosophy-text-3", 
      { x: "-10%", opacity: 0 },
      { 
        x: "5%",
        opacity: 0.8, 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section 
        ref={containerRef} 
        className="py-40 w-full relative z-30 min-h-screen flex flex-col justify-center"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 bg-abyss transition-opacity duration-700 ${activeIndex === null ? 'opacity-100' : 'opacity-0'}`} />

          {services.map((service, index) => (
               <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-40' : 'opacity-0'}`}
               >
                   <Image 
                      src={service.img} 
                      alt={service.title} 
                      fill 
                      className="object-cover object-center grayscale opacity-60 scale-105" 
                      priority={index === 0}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/80 to-transparent" />
               </div>
          ))}
          <div className="absolute inset-0 bg-transparent z-[1] mix-blend-overlay opacity-30" 
               style={{ backgroundImage: 'url("/noise.png")' }} 
          />
      </div>

      <div className="max-w-7xl mx-auto px-5 relative z-10 w-full">
        <div className="mb-24 overflow-hidden mix-blend-color-dodge opacity-90 flex flex-col gap-0 select-none pointer-events-none">
            <h2 className="philosophy-text-1 text-[10vw] leading-[0.8] font-black text-text-faint uppercase tracking-tighter whitespace-nowrap">
                Digital Experience
            </h2>
            <h2 className="philosophy-text-2 text-[10vw] leading-[0.8] font-black text-text-secondary uppercase tracking-tighter whitespace-nowrap ml-20 mix-blend-difference">
                Digital Experience
            </h2>
             <h2 className="philosophy-text-3 text-[10vw] leading-[0.8] font-black text-text-faint uppercase tracking-tighter whitespace-nowrap -ml-10">
                Digital Experience
            </h2>
        </div>

        <div className="flex flex-col">
            {services.map((service, index) => (
                <ServiceItem 
                    key={index}
                    service={service}
                    index={index}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            ))}
            <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="border-t border-border-subtle origin-left" 
            />
        </div>
      </div>
    </section>
  );
}
