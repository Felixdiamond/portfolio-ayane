"use client";
import animationData from "@/data/plane.json";
import Lottie from "react-lottie";

const Preloader = () => {
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
      <Lottie options={defaultOptions} width={200} height={200} />
    </div>
  );
};

export default Preloader;
