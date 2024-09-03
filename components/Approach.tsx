"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { IoExtensionPuzzle } from "react-icons/io5";
import { MdDesignServices } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { HiRocketLaunch } from "react-icons/hi2";

const Approach = () => {
  return (
    <section className="w-full py-20">
      <h1 className="heading">
        My <span className="text-purple">Approach</span>
      </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center gap-4">
        <Card
          title="Discovery & Planning"
          icon={<IoExtensionPuzzle size={40} />}
          order="Phase 1"
          description="I begin by deeply understanding your project goals, target audience, and technical requirements. This phase involves collaborative brainstorming, defining project scope, and creating a detailed roadmap."
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
        <Card
          title="Design & Prototyping"
          icon={<MdDesignServices size={40} />}
          order="Phase 2"
          description="With a clear plan in place, I move on to designing intuitive user interfaces and creating interactive prototypes. This iterative process ensures we nail down the user experience before diving into development."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card
          title="Development & Testing"
          icon={<FaCode size={40} />}
          order="Phase 3"
          description="This is where your project comes to life. I write clean, efficient code for both frontend and backend, continuously testing to ensure functionality, performance, and security meet the highest standards."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />
        </Card>
        <Card
          title="Deployment & Maintenance"
          icon={<HiRocketLaunch size={40} />}
          order="Phase 4"
          description="Once development is complete, I handle the deployment process, ensuring your project launches smoothly. I also provide ongoing support and maintenance to keep your application running flawlessly."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-purple-900"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

const Card = ({
  title,
  icon,
  order,
  description,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  order: string;
  description: string;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] lg:h-[35rem] rounded-[1rem]"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          <div className="flex items-center justify-center flex-col gap-5 text-purple">
            {icon}
            <span className="text-xl md:text-2xl lg:text:3xl font-semibold text-white">
              {order}
            </span>
          </div>
        </div>
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        <h2
          className="text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center"
          style={{ color: "#e4ecff" }}
        >
          {description}
        </h2>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-3">
      <svg
        width="66"
        height="65"
        viewBox="0 0 66 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
      >
        <path
          d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
          stroke="currentColor"
          strokeWidth="15"
          strokeMiterlimit="3.86874"
          strokeLinecap="round"
          style={{ mixBlendMode: "darken" }}
        />
      </svg>
      <span className="text-xl md:text-2xl lg:text:3xl font-semibold">
        {order}
      </span>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default Approach;
