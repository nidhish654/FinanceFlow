"use client";

import { ReactNode } from "react";

import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface DashboardSummaryCardProps {
    title: string;

    value: string;

    icon: ReactNode;

    iconColor: string;

    description?: string;

    className?: string;
}

export default function DashboardSummaryCard({
    title,
    value,
    icon,
    iconColor,
    description,
    className,
}: DashboardSummaryCardProps) {
    return (
        <Card
            className={cn(
                `
                rounded-2xl
                border
                relative
                min-h-40
                overflow-hidden
                bg-gradient-to-br
                from-card
                to-muted/30
                shadow-sm
                transition-all
                duration-300
                hover:border-primary/20
                hover:-translate-y-0.5
                hover:shadow-lg
                `,
                className
            )}
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />

            <div className="px-5 py-4">

                {/* ================= Header ================= */}

                <div className="flex items-center justify-between">

                    <p
                        className="
                            text-sm
                            font-medium
                            text-muted-foreground
                        "
                    >
                        {title}
                    </p>

                    <div
                        className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-xl bg-muted/80 ring-1 ring-foreground/5 transition-transform duration-300 group-hover/card:scale-105",
                            iconColor
                        )}
                    >
                        {icon}
                    </div>

                </div>

                {/* ================= Value ================= */}

                <div className="mt-1">

                    <h2
                        className="
                            text-3xl
                            font-bold
                            leading-none
                            tracking-tight
                            tabular-nums
                        "
                    >
                        {value}
                    </h2>

                </div>

                {/* ================= Footer ================= */}

                {description && (

                    <p
                        className="
                            mt-3
                            text-xm
                            text-muted-foreground
                        "
                    >
                        {description}
                    </p>

                )}

            </div>

        </Card>
    );
}
