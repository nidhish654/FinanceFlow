"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GitBranch, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LANDING_CONSTANTS } from "@/constants/landing";

export function HeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
        <Button size="lg" className="w-full sm:w-auto rounded-full text-base gap-2 group" asChild>
          <Link href={LANDING_CONSTANTS.links.register}>
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
        <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base gap-2" asChild>
          <Link href={LANDING_CONSTANTS.links.github} target="_blank" rel="noreferrer">
            <GitBranch className="h-4 w-4" />
            View on GitHub
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
