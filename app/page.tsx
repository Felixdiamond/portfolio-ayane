"use client";
import { Suspense, lazy } from 'react';
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";
// import Hero from '@/components/Hero';
// import RecentProjects from '@/components/Projects';
// import Experience from "@/components/Experience";
// import Approach from "@/components/Approach";
// import Grid from "@/components/Grid";
// import Testimonials from "@/components/Testimonials";

// import preloader using next dynamic import
import dynamic from 'next/dynamic';
const Preloader = dynamic(() => import('@/components/Preloader'), {ssr: false});

const Hero = lazy(() => import('@/components/Hero'));
const Grid = lazy(() => import('@/components/Grid'));
const RecentProjects = lazy(() => import('@/components/Projects'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const Experience = lazy(() => import('@/components/Experience'));
const Approach = lazy(() => import('@/components/Approach'));

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx:auto sm:px-10 px-5">
      <FloatingNav navItems={navItems} />
      <Suspense fallback={<Preloader />}>
        <Hero />
        <Grid />
        <RecentProjects />
        <Testimonials />
        <Experience />
        <Approach />
      </Suspense>
    </main>
  );
}