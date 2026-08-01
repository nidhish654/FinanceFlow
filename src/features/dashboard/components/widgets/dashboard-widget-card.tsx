"use client";

import { ReactNode } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface DashboardWidgetCardProps {
    title: string;

    description?: string;

    children: ReactNode;

    actions?: ReactNode;

    className?: string;
}

export default function DashboardWidgetCard({
    title,
    description,
    children,
    actions,
    className,
}: DashboardWidgetCardProps) {
    return (
        <Card
            className={cn(
                `
                rounded-2xl
                h-full
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

            <CardContent className="min-w-0 flex-1">

                {children}

            </CardContent>

        </Card>
    );
}
