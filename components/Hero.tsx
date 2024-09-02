"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect, TextGenerateEffectWord } from "./ui/text-generate-effect";
import Button from "./ui/Button";
import { Navigation } from "lucide-react";

const Hero = () => {
  const [currentWord, setCurrentWord] = useState('Innovations');
  const [showKeyword, setShowKeyword] = useState(false);
  const words = ['Innovations', 'Interfaces', 'Solutions', 'User Experiences'];
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowKeyword(true), 500);

    const interval = setInterval(() => {
      setCurrentWord(prevWord => {
        const currentIndex = words.indexOf(prevWord);
        const nextWord = words[(currentIndex + 1) % words.length];
        setKey(prevKey => prevKey + 1);
        return nextWord;
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="-top-10 -left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Elevating Web Experiences with Code
          </h2>
          <div className="text-center text-[40px] md:text-5xl lg:text-6xl py-6">
            <TextGenerateEffect
              words="Transforming Concepts into Seamless"
              className="mr-1"
            />
            {showKeyword && (
              <TextGenerateEffectWord
                key={key}
                word={currentWord}
              />
            )}
          </div>
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi, I&apos;m Felix, a Full-stack Developer. I specialize in building
            high-quality websites and applications with a focus on <span className='text-[#4e4e94] font-semibold'>performance</span>,
            <span className='text-[#4e4e94] font-semibold'> accessibility</span>, and <span className='text-[#4e4e94] font-semibold'>user experience</span>.
          </p>
          <Link href="#about" className='mt-4'>
            <Button
              title="Explore My Work"
              icon={<Navigation size={16} />}
              position="right"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;