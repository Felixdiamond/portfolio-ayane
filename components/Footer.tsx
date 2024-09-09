import Link from "next/link";
import Button from "./ui/Button";
import { FaLocationArrow } from "react-icons/fa6";

import Image from "next/image";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { useEffect, useState } from "react";

const Footer = () => {
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
    <footer className="w-full relative -top-80 min-h-screen" id="contact">
      <div className="flex flex-col items-center w-full absolute left-[50%] translate-x-[-50%]">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl heading lg:max-w-[45vw]"
          >
            Ready to take{" "}
            <span className="text-[#6a6abf]"> your digital presence </span> to the
            next level?
          </motion.h1>
          <p className="text-white-200 md:mt-10 my-5 text-center">
            Reach out to me today and let&apos;s discuss how I can help you
            achieve your goals.
          </p>
        </LampContainer>
        <Link href={"mailto:diamondfelix006@gmail.com"}>
          <Button
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </Link>
      </div>
      <ShootingStars />
      {!isMobile && (
        <div className="absolute bottom-1 flex items-center justify-end w-full">
          <Image
            src="/yachiru_bye.png"
            alt="smth to take space"
            width={300}
            height={300}
            className="opacity-30"
          />
        </div>
      )}
    </footer>
  );
};

export default Footer;
