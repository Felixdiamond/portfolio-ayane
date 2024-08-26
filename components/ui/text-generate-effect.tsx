"use client";
import { useEffect } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0px)",
      },
      {
        duration: 0.5,
        delay: stagger(0.2),
      }
    );
  }, [animate]);

  const renderWords = () => {
    return (
      <motion.span ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="opacity-0 dark:text-white text-black"
            style={{
              filter: "blur(10px)",
              display: 'inline',
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <span className={cn("font-bold", className)}>
      {renderWords()}
    </span>
  );
};

export const TextGenerateEffectWord = ({
  word,
  className,
}: {
  word: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span",
      {
        opacity: [0, 1],
        filter: ["blur(10px)", "blur(0px)"],
      },
      {
        duration: 0.5,
      }
    );
  }, [animate, word]);

  return (
    <motion.span ref={scope} className={cn("font-bold", className)}>
      <motion.span
        className="opacity-0 text-purple"
        style={{
          filter: "blur(10px)",
          display: 'inline',
        }}
      >
        {word}
      </motion.span>
    </motion.span>
  );
};