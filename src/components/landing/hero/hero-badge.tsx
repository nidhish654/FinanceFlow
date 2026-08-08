"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Badge 
        variant="secondary" 
        className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-default"
      >
        <Sparkles className="h-4 w-4 mr-2" />
        Personal Finance Reimagined
      </Badge>
    </motion.div>
  );
}
