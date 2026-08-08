"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShowcaseTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function ShowcaseTabs({ tabs, activeTab, onTabChange }: ShowcaseTabsProps) {
  return (
    <div className="flex w-full overflow-x-auto pb-4 md:pb-0 hide-scrollbar justify-start md:justify-center">
      <div 
        role="tablist"
        aria-label="Product Showcase Tabs"
        className="inline-flex h-12 items-center justify-center rounded-full bg-muted/50 p-1 text-muted-foreground w-max"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isActive ? "text-foreground" : "hover:text-foreground/80 hover:bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-full bg-background shadow-sm border border-border/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
