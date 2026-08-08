"use client";

import { motion } from "framer-motion";
import {
  Activity,
  IndianRupee,
  PieChart,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";

type FloatingCardIcon =
  | "wallet"
  | "pie-chart"
  | "rupee"
  | "activity";

interface FloatingCardProps {
  title: string;
  value: string;
  icon: FloatingCardIcon;
  colorClass: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const iconMap = {
  wallet: Wallet,
  "pie-chart": PieChart,
  rupee: IndianRupee,
  activity: Activity,
} as const;

export function FloatingCard({
  title,
  value,
  icon,
  colorClass,
  className,
  delay = 0,
  duration = 4,
}: FloatingCardProps) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      className={cn(
        "absolute z-20 flex items-center gap-3 rounded-2xl border border-border/50 bg-background/60 p-3 pr-5 shadow-xl backdrop-blur-xl",
        className
      )}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay % 2,
        }}
        className="flex w-full items-center gap-3"
      >
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            colorClass
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground">
            {title}
          </span>

          <span className="text-sm font-bold text-foreground">
            {value}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}