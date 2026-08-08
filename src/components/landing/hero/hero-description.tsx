"use client";

import { motion } from "framer-motion";

export function HeroDescription() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="text-lg md:text-xl text-muted-foreground max-w-[650px] leading-relaxed mx-auto lg:mx-0 text-center lg:text-left"
    >
      FinanceFlow helps you track expenses, manage accounts, analyze spending,
      plan savings, and make smarter financial decisions from one intuitive
      dashboard.
    </motion.p>
  );
}
