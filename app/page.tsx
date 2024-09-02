"use client";
import { Suspense, lazy } from 'react';
import Preloader from "@/components/Preloader";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

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