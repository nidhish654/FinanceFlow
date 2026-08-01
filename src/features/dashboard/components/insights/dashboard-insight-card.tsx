"use client";

import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    Info,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

import {
    DashboardInsight,
} from "../../types/dashboard-view";

interface DashboardInsightCardProps {
    insight: DashboardInsight;

    className?: string;
}

export default function DashboardInsightCard({
    insight,
    className,
}: DashboardInsightCardProps) {
    const Icon =
        insight.type === "success"
            ? CheckCircle2
            : insight.type === "warning"
                ? AlertTriangle
                : insight.type === "error"
                    ? AlertCircle
                    : Info;

    const iconClass =
        insight.type === "success"
            ? `
                text-emerald-600
                dark:text-emerald-400
              `
            : insight.type === "warning"
                ? `
                    text-amber-600
                    dark:text-amber-400
                  `
                : insight.type === "error"
                    ? `
                        text-red-600
                        dark:text-red-400
                      `
                    : `
                        text-blue-600
                        dark:text-blue-400
                      `;

    const backgroundClass =
        insight.type === "success"
            ? `
                bg-emerald-50
                dark:bg-emerald-500/10
              `
            : insight.type === "warning"
                ? `
                    bg-amber-50
                    dark:bg-amber-500/10
                  `
                : insight.type === "error"
                    ? `
                        bg-red-50
                        dark:bg-red-500/10
                      `
                    : `
                        bg-blue-50
                        dark:bg-blue-500/10
                      `;

    return (
        <Card
            className={cn(
                `
                rounded-2xl
                border
                shadow-sm
                transition-all
                duration-300
                hover:border-primary/15
                hover:shadow-md
                `,
                className
            )}
        >
            <CardContent
                className="
                    flex
                    items-start
                    gap-4
                    p-5
                "
            >
                <div
                    className={cn(
                        `
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        `,
                        backgroundClass
                    )}
                >
                    <Icon
                        className={cn(
                            "h-5 w-5",
                            iconClass
                        )}
                    />
                </div>

                <div className="min-w-0 flex-1">

                    <h3
                        className="
                            text-sm
                            font-semibold
                        "
                    >
                        {insight.title}
                    </h3>

                    <p
                        className="
                            mt-1
                            text-sm
                            leading-6
                            text-muted-foreground
                        "
                    >
                        {insight.description}
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}
