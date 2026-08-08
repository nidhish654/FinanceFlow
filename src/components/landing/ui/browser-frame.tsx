import * as React from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function BrowserFrame({ children, className, ...props }: BrowserFrameProps) {
  return (
    <div 
      className={cn(
        "rounded-2xl border border-border/50 bg-background/40 backdrop-blur-3xl shadow-2xl overflow-hidden ring-1 ring-white/10 dark:ring-white/5",
        className
      )}
      {...props}
    >
      {/* Fake Browser/App Header */}
      <div className="h-10 border-b border-border/50 bg-muted/20 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto bg-background/50 rounded-md h-5 w-48 border border-border/30" />
      </div>
      
      {/* Content Area */}
      {children}
    </div>
  );
}
