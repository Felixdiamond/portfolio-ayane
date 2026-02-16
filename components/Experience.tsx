"use client";
import React, { useRef, useEffect } from "react";
import { workExperience } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FallingAsterisks = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
        let h = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
        
        const symbols = "*";
        const fontSize = 14;
        const columns = w / fontSize;
        const drops: number[] = [];

        for(let x = 0; x < columns; x++) drops[x] = 1;

        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, w, h);
            
            ctx.fillStyle = '#333';
            ctx.font = fontSize + 'px monospace';

            for(let i = 0; i < drops.length; i++) {
                const text = symbols;
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if(drops[i] * fontSize > h && Math.random() > 0.975)
                    drops[i] = 0;
                
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        
        const handleResize = () => {
             w = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
             h = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-overlay" />;
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".exp-item");

    items.forEach((item, i) => {
        gsap.fromTo(item, 
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            }
        );
        
        const line = item.querySelector('.exp-line');
        if(line) {
             gsap.fromTo(line,
                { height: '0%' },
                { 
                    height: '100%', 
                    duration: 1,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: item,
                        start: "top center+=100",
                        end: "bottom center",
                        scrub: 0.5
                    }
                }
             )
        }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-40 bg-abyss z-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <FallingAsterisks />
          <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-accent-glow/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10 pt-20">
          
          <div className="mb-32 pl-0 md:pl-10 border-l border-border md:border-none">
              <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-text-muted mb-6">
                  (2021 — PRESENT)
              </h2>
              <div className="overflow-hidden">
                  <h1 className="text-6xl md:text-9xl font-black text-text-primary uppercase tracking-tighter mix-blend-difference leading-[0.85]">
                      Career<span className="text-text-faint">path</span>
                  </h1>
              </div>
          </div>

          <div className="flex flex-col gap-2 relative">
                 {workExperience.map((item, index) => (
                      <div 
                          key={`${item.year}-${item.company}-${item.role}`} 
                    className="exp-item group relative grid grid-cols-1 md:grid-cols-12 gap-8 py-16 md:py-24 border-t border-border-subtle hover:bg-elevated/20 transition-colors duration-500 px-4 md:px-8"
                 >
                    <div className="md:col-span-2 flex flex-col justify-between h-full">
                         <span className="text-sm font-mono text-text-muted">0{index + 1}</span>
                         <span className="text-xs font-bold uppercase tracking-widest text-text-muted mt-10 md:mt-0 rotate-0 md:-rotate-90 origin-top-left translate-y-full md:translate-y-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             {item.year}
                         </span>
                    </div>

                    <div className="md:col-span-10 flex flex-col gap-8 md:gap-12 pl-4 md:pl-10 border-l border-border-subtle relative">
                        <div className="exp-line absolute left-0 top-0 w-[2px] bg-accent h-0" />
                        
                        <div className="flex flex-col gap-2">
                             <h3 className="text-4xl md:text-7xl font-bold text-text-secondary uppercase tracking-tighter leading-[0.9] group-hover:text-text-primary transition-colors duration-300">
                                 {item.role}
                             </h3>
                             <p className="text-lg md:text-xl font-medium text-text-muted group-hover:text-text-secondary transition-colors uppercase tracking-tight">
                                  {item.company}
                             </p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl group-hover:text-text-secondary transition-colors">
                                {item.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 justify-end">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 rounded-full border border-border text-xs uppercase text-text-muted group-hover:border-accent/50 group-hover:text-accent transition-colors bg-surface/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                 </div>
             ))}
             <div className="w-full h-px bg-border-subtle" />
          </div>
      </div>
    </section>
  );
}
