"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EverythingCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  featured?: boolean;
}

export function EverythingCard({ title, description, icon: Icon, className, featured }: EverythingCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "group relative flex flex-col gap-4 rounded-3xl border border-border/50 bg-card p-6 md:p-8 shadow-sm overflow-hidden transition-colors hover:border-primary/50",
        featured ? "bg-muted/30" : "",
        className
      )}
    >
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
      )}
      
      <div className={cn(
        "flex shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 relative z-10",
        featured ? "h-14 w-14 bg-primary text-primary-foreground" : "h-12 w-12 bg-primary/10 text-primary"
      )}>
        <Icon className={cn(featured ? "h-7 w-7" : "h-6 w-6")} />
      </div>
      
      <div className="relative z-10 mt-auto space-y-2">
        <h3 className={cn("font-semibold text-foreground", featured ? "text-xl md:text-2xl" : "text-lg")}>
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
