"use client";

import { ReactNode } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface DashboardChartCardProps {
    title: string;

    description?: string;

    children: ReactNode;

    actions?: ReactNode;

    className?: string;

    chartHeight?: number;
}

export default function DashboardChartCard({
    title,
    description,
    children,
    actions,
    className,
    chartHeight = 320,
}: DashboardChartCardProps) {
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
            <CardHeader
                className="
                    flex
                    flex-row
                    items-start
                    justify-between
                    gap-4
                    pb-3
                "
            >
                <div className="space-y-1">

                    <CardTitle className="text-lg">

                        {title}

                    </CardTitle>

                    {description && (

                        <CardDescription>

                            {description}

                        </CardDescription>

                    )}

                </div>

                {actions && (

                    <div className="shrink-0">

                        {actions}

                    </div>

                )}

            </CardHeader>

            <CardContent className="min-w-0">

                <div
                    style={{
                        height: chartHeight,
                    }}
                    className="w-full"
                >
                    {children}
                </div>

            </CardContent>

        </Card>
    );
}
