"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BrowserFrame } from "@/components/landing/ui/browser-frame";

import Dashboard from "@/components/landing/hero/dashboard.png";

export function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotateY: 10 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        type: "spring",
        bounce: 0.2,
      }}
      className="relative w-full perspective-1000"
    >
      <BrowserFrame>
        <div className="relative w-full overflow-hidden">
          <Image
            src={Dashboard}
            alt="FinanceFlow Dashboard"
            width={1400}
            height={900}
            className="block h-auto w-full"
            priority
          />
        </div>
      </BrowserFrame>
    </motion.div>
  );
}
