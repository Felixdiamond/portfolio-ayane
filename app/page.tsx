"use client";
import { Suspense, lazy, useEffect, useState } from 'react';
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

// Dynamically import Preloader with ssr: false
import dynamic from 'next/dynamic';
const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });

// Lazy load the rest of the components
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Grid = dynamic(() => import('@/components/Grid'), { ssr: false });
const RecentProjects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const Approach = dynamic(() => import('@/components/Approach'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Socials = dynamic(() => import('@/components/Socials'), { ssr: false });

export default function Home() {
  // Prevents issues during SSR
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will run only on the client side, after the first render
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Preloader />;
  }

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
