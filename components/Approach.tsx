import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { HiOutlineLightBulb, HiOutlinePencil, HiOutlineQrCode, HiOutlineRocketLaunch } from "react-icons/hi2";

const Approach = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="w-full py-20 min-h-screen flex flex-col justify-center">
      <h1 className="heading text-4xl md:text-5xl font-bold text-center mb-10">
        My <span className="text-purple-600">Approach</span>
      </h1>
      <div className="my-10 flex flex-col lg:flex-row items-stretch justify-center gap-4 px-4">
        {approachSteps.map((step, index) => (
          <Card
            key={index}
            {...step}
            isExpanded={expandedCard === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </section>
  );
};

const Card = ({ title, icon: Icon, description, skills, bgColor, isExpanded, onClick }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`border border-black/[0.2] dark:border-white/[0.2] rounded-lg overflow-hidden cursor-pointer
                  ${isExpanded ? 'flex-grow' : 'flex-shrink'}`}
      style={{ backgroundColor: bgColor }}
      initial={{ borderRadius: 8 }}
      animate={{ 
        flex: isExpanded ? 1 : 0.5,
        transition: { duration: 0.5, ease: "easeInOut" }
      }}
    >
      <motion.div className="p-6 h-full flex flex-col justify-between">
        <motion.div>
          <motion.div className="flex items-center mb-4">
            <Icon className="w-8 h-8 text-white" />
            <h2 className="text-2xl font-bold ml-3 text-white">{title}</h2>
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white/90 mb-4">{description}</p>
                <h3 className="text-xl font-semibold text-white mb-2">Key Skills:</h3>
                <ul className="list-disc list-inside text-white/90">
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="absolute inset-0"
          colors={[[255, 255, 255, 0.1]]}
        />
      </motion.div>
    </motion.div>
  );
};

const approachSteps = [
  {
    title: "Discovery & Planning",
    icon: HiOutlineLightBulb,
    description: "I begin by deeply understanding your project goals, target audience, and technical requirements. This phase involves collaborative brainstorming, defining project scope, and creating a detailed roadmap.",
    skills: ["Requirements Gathering", "User Persona Creation", "Project Scoping", "Technology Stack Selection"],
    bgColor: "#4A5568" // Slate
  },
  {
    title: "Design & Prototyping",
    icon: HiOutlinePencil,
    description: "With a clear plan in place, I move on to designing intuitive user interfaces and creating interactive prototypes. This iterative process ensures we nail down the user experience before diving into development.",
    skills: ["UI/UX Design", "Wireframing", "Prototyping", "User Testing"],
    bgColor: "#38A169" // Green
  },
  {
    title: "Development & Testing",
    icon: HiOutlineQrCode,
    description: "This is where your project comes to life. I write clean, efficient code for both frontend and backend, continuously testing to ensure functionality, performance, and security meet the highest standards.",
    skills: ["Full Stack Development", "API Integration", "Database Design", "Automated Testing"],
    bgColor: "#2B6CB0" // Blue
  },
  {
    title: "Deployment & Maintenance",
    icon: HiOutlineRocketLaunch,
    description: "Once development is complete, I handle the deployment process, ensuring your project launches smoothly. I also provide ongoing support and maintenance to keep your application running flawlessly.",
    skills: ["CI/CD Implementation", "Cloud Deployment", "Performance Optimization", "Ongoing Support"],
    bgColor: "#9F7AEA" // Purple
  }
];

export default Approach;