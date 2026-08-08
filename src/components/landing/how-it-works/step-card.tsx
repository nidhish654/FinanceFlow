"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export function StepCard({ step, title, description, icon: Icon, index }: StepCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex flex-col gap-4 text-center items-center p-6 bg-card rounded-3xl border border-border/50 shadow-sm z-10 w-full max-w-[280px]"
    >
      <div className="text-sm font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full mb-2">
        {step}
      </div>
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-lg text-foreground mt-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
