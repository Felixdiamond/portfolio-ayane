"use client";

import animationData from "@/data/plane.json";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const Preloader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set the initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-inherit flex items-center justify-center">
      {isMobile ? (
        <Lottie 
          animationData={animationData} 
          loop 
          autoplay 
          style={{ width: 150, height: 150 }}
        />
      ) : (
        <Lottie 
          animationData={animationData} 
          loop 
          autoplay 
          style={{ width: 200, height: 200 }}
        />
      )}
    </div>
  );
};

export default Preloader;
