"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { landingFeatures } from "@/constants/landing";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50 hover:shadow-md"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
