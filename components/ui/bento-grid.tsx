"use client";

import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => null 
})

import { cn } from "@/utils/cn";

import animationData from "@/data/confetti.json";
import Button from "./Button";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { GridGlobe } from "../GridGlobe";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["TypeScript", "MongoDB", "AWS"];
  const rightLists = ["Next.js", "Express", "PostgreSQL"];

  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = () => {
    if (typeof window !== "undefined" && window.navigator) {
      const text = "diamondfelix006@gmail.com";
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  if (!isClient) {
    return null; 
  }

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-md border border-white/10 group/bento transition duration-500 justify-between flex flex-col space-y-4 bg-neutral-950",
        "hover:border-white/30",
        className
      )}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
            {img && id !== 5 && (
              <div className="relative w-full h-full select-none">
                 <Image
                    src={img}
                    alt={img}
                    fill={true}
                    className={cn(imgClassName, "object-cover object-center opacity-40 grayscale group-hover/bento:grayscale-0 transition-all duration-500")}
                />
              </div>
            )}
             {!img && img && (
                 <img
                   src={img}
                   alt={img}
                   className={cn(imgClassName, "object-cover object-center opacity-40 grayscale group-hover/bento:grayscale-0 transition-all duration-500")}
                 />
             )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full opacity-50 contrast-125"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
             <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-500 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 z-20"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10 uppercase tracking-widest">
            {description}
          </div>
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10 leading-tight uppercase`}
          >
            {title}
          </div>

          {id === 2 && (
             <div className="opacity-50 mix-blend-screen scale-75">
                <GridGlobe />
             </div>
          )}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2 opacity-50">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-sm text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-sm text-center bg-[#10132E]"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-sm text-center bg-[#10132E]"></span>
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-sm text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && isClient && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                <Lottie 
                  animationData={animationData}
                  loop={copied}
                  autoplay={copied}
                  style={{ width: 400, height: 200 }}
                />
              </div>

              <Button
                title={copied ? "Email Copied" : "Copy Email"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-black border border-white/20 uppercase tracking-widest text-xs"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
