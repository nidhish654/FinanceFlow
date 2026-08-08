"use client";

import { motion } from "framer-motion";

export function StepConnector() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      className="hidden lg:block absolute top-[4.5rem] left-[calc(50%+140px)] w-[calc(100%-280px)] h-[2px] bg-border/80 z-0"
    />
  );
}
