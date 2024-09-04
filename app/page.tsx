"use client";
import { Suspense, lazy } from 'react';
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

// import preloader using next dynamic import
import dynamic from 'next/dynamic';
const Preloader = dynamic(() => import('@/components/Preloader'), {ssr: false});

const Hero = lazy(() => import('@/components/Hero'));
const Grid = lazy(() => import('@/components/Grid'));
const RecentProjects = lazy(() => import('@/components/Projects'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const Experience = lazy(() => import('@/components/Experience'));
const Approach = lazy(() => import('@/components/Approach'));
const Footer = lazy(() => import('@/components/Footer'));
const Socials = lazy(() => import('@/components/Socials'));

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx:auto sm:px-10 px-5 overflow-clip">
      <FloatingNav navItems={navItems} />
      <Suspense fallback={<Preloader />}>
        <Hero />
        <Grid />
        <RecentProjects />
        <Testimonials />
        <Experience />
        <Approach />
        <Footer />
        <Socials />
      </Suspense>
    </main>
  );
}