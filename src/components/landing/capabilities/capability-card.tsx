"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CapabilityCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href?: string;
    featured?: boolean;
    className?: string;
}

export function CapabilityCard({
    title,
    description,
    icon: Icon,
    href,
    featured = false,
    className,
}: CapabilityCardProps) {
    return (
        <motion.a
            href={href}
            variants={{
                hidden: {
                    opacity: 0,
                    y: 20,
                },
                visible: {
                    opacity: 1,
                    y: 0,
                },
            }}
            whileHover={{
                y: -4,
            }}
            transition={{
                duration: 0.25,
            }}
            className={cn(
                "group relative flex overflow-hidden rounded-3xl border border-border/60 bg-card transition-colors duration-300 hover:border-primary/40",
                featured
                    ? "min-h-[380px] flex-col"
                    : "min-h-[190px] flex-col p-6",
                className
            )}
        >
            {/* Dashboard background preview */}
            {featured && (
                <>
                    <div className="absolute inset-x-0 bottom-0 h-[65%] overflow-hidden">
                        <img
                            src="/dashboard.png"
                            alt=""
                            className="
                absolute
                bottom-0
                left-1/2
                w-[115%]
                max-w-none
                -translate-x-1/2
                opacity-25
                transition-all
                duration-500
                group-hover:scale-[1.02]
                group-hover:opacity-35
              "
                        />

                        {/* Fade image into card background */}
                        <div
                            className="
                absolute
                inset-0
                bg-gradient-to-b
                from-card
                via-card/80
                to-card/20
              "
                        />
                    </div>
                </>
            )}

            {/* Icon */}
            <div
                className={cn(
                    "relative z-20 flex shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                    featured
                        ? "ml-6 mt-6 h-12 w-12 bg-primary text-primary-foreground shadow-lg"
                        : "h-10 w-10 bg-primary/10 text-primary"
                )}
            >
                <Icon className="h-5 w-5" />
            </div>

            {/* Arrow */}
            <div
                className={cn(
                    "absolute right-6 top-6 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground transition-all duration-300",
                    "group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary"
                )}
            >
                <ArrowUpRight
                    className="
            h-4 w-4
            transition-transform
            duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
                />
            </div>

            {/* Text */}
            <div
                className={cn(
                    "relative z-20 mt-auto",
                    featured
                        ? "p-6 pt-20"
                        : "mt-auto"
                )}
            >
                {featured && (
                    <div className="absolute inset-x-0 bottom-0 -z-10 h-full bg-gradient-to-t from-card via-card/90 to-transparent" />
                )}

                <h3
                    className={cn(
                        "font-semibold tracking-tight text-foreground",
                        featured
                            ? "text-xl md:text-2xl"
                            : "text-base md:text-lg"
                    )}
                >
                    {title}
                </h3>

                <p
                    className={cn(
                        "mt-2 leading-relaxed text-muted-foreground",
                        featured ? "max-w-xl text-sm md:text-base" : "text-sm"
                    )}
                >
                    {description}
                </p>
            </div>
        </motion.a>
    );
}