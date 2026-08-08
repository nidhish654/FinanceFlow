"use client";

import { motion, Variants } from "framer-motion";

export function HeroTitle() {
  const words = "One Dashboard. Every Financial Decision. Simplified.".split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] md:leading-[1.1]"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2">
        {words.map((word, index) => {
          // Highlight "Dashboard" and "Simplified." with gradient
          const isGradient = word.includes("Dashboard") || word.includes("Simplified");
          return (
            <motion.span
              key={index}
              variants={child}
              className={isGradient ? "bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60" : ""}
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </motion.h1>
  );
}
