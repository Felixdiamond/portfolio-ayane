"use client";

import animationData from "@/data/plane.json";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";

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
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-screen w-screen bg-inherit flex items-center justify-center">
      {/* <Lottie options={defaultOptions} width={200} height={200} /> */}
      {isMobile ? (
        <Lottie options={defaultOptions} width={150} height={150} />
      ) : (
        <Lottie options={defaultOptions} width={200} height={200} />
      )}
    </div>
  );
};

export default Preloader;
