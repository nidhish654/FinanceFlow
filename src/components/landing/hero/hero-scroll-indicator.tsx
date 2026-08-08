"use client";

import { motion } from "framer-motion";
import { Mouse } from "lucide-react";
import Link from "next/link";

export function HeroScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
    >
      <Link 
        href="#features"
        className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center"
        aria-label="Scroll to features"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mouse className="h-6 w-6" />
        </motion.div>
      </Link>
    </motion.div>
  );
}
