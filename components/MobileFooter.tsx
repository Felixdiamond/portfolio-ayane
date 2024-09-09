import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLocationArrow } from "react-icons/fa6";
import { WavyBackground } from "./ui/wavy-background";
import Button from "./ui/Button";

const MobileFooter = () => {
  return (
    <footer className="min-w-full relative overflow-hidden" id="contact">
      <WavyBackground className="absolute inset-0 flex items-center min-w-full">
        <div className="relative z-10 px-6 py-16 max-w-md mx-auto text-white pb-20">
          <motion.h1
            className="text-3xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to take{" "}
            <span className="text-[#6a6abf]">your digital presence</span> to the
            next level?
          </motion.h1>
          <motion.p
            className="text-gray-200 text-center mb-8 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Reach out to me today and let's discuss how I can help you achieve
            your goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link href="mailto:diamondfelix006@gmail.com">
              <Button
                title="Let's get in touch"
                icon={<FaLocationArrow />}
                position="right"
              />
            </Link>
          </motion.div>
        </div>
      </WavyBackground>
    </footer>
  );
};

export default MobileFooter;
