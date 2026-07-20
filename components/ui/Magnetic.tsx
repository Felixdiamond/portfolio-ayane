"use client";
import React, { useEffect, useRef, ReactElement } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticProps {
  children: ReactElement;
  amount?: number;
}

export default function Magnetic({ children, amount = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const xTo = gsap.quickTo(ref.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(ref.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * amount);
      yTo(y * amount);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    ref.current.addEventListener("mousemove", handleMouseMove);
    ref.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ref.current?.removeEventListener("mousemove", handleMouseMove);
      ref.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: ref });

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}
