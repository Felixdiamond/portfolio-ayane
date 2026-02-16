"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projects } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!container || !sticky || !scrollContainer) return;

    const getScrollAmount = () => {
      return scrollContainer.scrollWidth - window.innerWidth;
    };

    const setHeight = () => {
      const scrollAmount = getScrollAmount();
      container.style.height = `${scrollAmount + window.innerHeight}px`;
    };
    setHeight();

    const tween = gsap.to(scrollContainer, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom", 
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: setHeight,
      },
    });

    const images = gsap.utils.toArray<HTMLElement>(".project-image-container");
    images.forEach((imgContainer) => {
        const image = imgContainer.querySelector("img");
        if(image) {
            gsap.fromTo(image, 
                { scale: 1.2, xPercent: -10 },
                { 
                    xPercent: 10,
                    scale: 1.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: imgContainer,
                        containerAnimation: tween,
                        start: "left right",
                        end: "right left",
                        scrub: true,
                    }
                }
            );
        }
    });

    const handleResize = () => {
      setHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      tween.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-abyss z-30">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        
        <div className="absolute top-10 left-10 md:left-20 z-10 mix-blend-difference pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-text-primary tracking-tighter">
            Selected Works
          </h2>
          <p className="text-text-secondary mt-2 text-sm uppercase tracking-widest">
            (2024 - Present)
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex h-full items-center w-fit px-10 md:px-20 gap-10 md:gap-40 mt-16"
        >
          <div className="w-[10vw] md:w-[20vw] shrink-0" />

          {projects.map((item, index) => (
            <div
              key={item.id}
              className="group relative w-[76vw] md:w-[57vw] h-[57vh] md:h-[66.5vh] flex-shrink-0 flex flex-col justify-end p-6 md:p-10 border border-border-subtle rounded-3xl overflow-hidden bg-surface/50 hover:border-border-accent transition-colors duration-500"
            >
              <div className="project-image-container absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover object-center opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    {item.iconLists.map((icon, i) => (
                      <div
                        key={i}
                        className="border border-border bg-void/50 rounded-full p-2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center backdrop-blur-sm"
                      >
                        <Image
                          src={icon}
                          alt="tech"
                          width={20}
                          height={20}
                          className="w-4 h-4 md:w-5 md:h-5"
                        />
                      </div>
                    ))}
                  </div>
                  <a
                    href={`https://${item.link}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-accent uppercase text-xs md:text-sm font-bold tracking-widest hover:text-accent-hover transition-colors"
                  >
                    Visit Site <FaLocationArrow />
                  </a>
                </div>

                <h3 className="text-3xl md:text-6xl font-bold text-text-primary uppercase tracking-tighter mb-2 mix-blend-difference">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm md:text-lg max-w-xl line-clamp-2 md:line-clamp-none">
                  {item.des}
                </p>
              </div>

              <div className="absolute top-4 right-6 md:top-10 md:right-10 text-[100px] md:text-[200px] font-black text-text-primary/5 leading-none pointer-events-none select-none">
                0{index + 1}
              </div>
            </div>
          ))}

          <div className="w-[30vw] shrink-0" />
        </div>

        <div className="absolute bottom-10 right-10 z-20 mix-blend-difference hidden md:block">
          <span className="text-text-primary/40 uppercase text-xs tracking-[0.2em] animate-pulse">
            Scroll to explore
          </span>
        </div>
      </div>
    </div>
  );
}

