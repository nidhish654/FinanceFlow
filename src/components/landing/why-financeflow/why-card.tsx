"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WhyCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export function WhyCard({ title, description, icon: Icon }: WhyCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="group flex flex-col gap-4 rounded-3xl border border-transparent p-6 hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-lg md:text-xl text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
