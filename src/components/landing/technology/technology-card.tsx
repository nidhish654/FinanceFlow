"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TechnologyCardProps {
  category: string;
  icon: LucideIcon;
  items: { name: string; description: string }[];
  index: number;
}

export function TechnologyCard({ category, icon: Icon, items, index }: TechnologyCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col gap-6 p-6 md:p-8 bg-card border border-border/50 rounded-3xl"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-lg text-foreground">{category}</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col">
            <span className="font-medium text-foreground">{item.name}</span>
            <span className="text-sm text-muted-foreground">{item.description}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
