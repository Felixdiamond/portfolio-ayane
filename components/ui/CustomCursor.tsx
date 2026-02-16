"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isTouchDevice } from "@/hooks/useIsMobile";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  useGSAP(() => {
    if (isTouch) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
         setIsHovering(true);
       }
    };
     const handleMouseOut = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
         setIsHovering(false);
       }
    };


    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
    }, [isTouch]);
  
  useGSAP(() => {
      if (isTouch) return;
      if(!cursorRef.current) return;
      
      if(isHovering) {
          gsap.to(cursorRef.current, {scale: 4, opacity: 0.2, duration: 0.3})
      } else {
          gsap.to(cursorRef.current, {scale: 1, opacity: 1, duration: 0.3})
      }
    }, [isHovering, isTouch]);

    if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999] -translate-x-1/2 -translate-y-1/2"
    />
  );
}
