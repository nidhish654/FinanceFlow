"use client";

import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";

interface GoalProgressProps {
    progress: number;

    completed: boolean;

    savedAmount: string;

    targetAmount: string;

    remainingAmount: string;

    className?: string;
}

export default function GoalProgress({
    progress,
    completed,
    savedAmount,
    targetAmount,
    remainingAmount,
    className,
}: GoalProgressProps) {
    const progressValue = Math.min(
        progress,
        100
    );

    const progressColor = completed
        ? "[&>div]:bg-green-500"
        : "[&>div]:bg-blue-500";

    const percentageColor = completed
        ? "text-green-600 dark:text-green-400"
        : "text-blue-600 dark:text-blue-400";

    return (
        <div
            className={cn(
                "space-y-3",
                className
            )}
        >
            <div className="flex items-center justify-between text-sm">

                <span className="font-medium">
                    Progress
                </span>

                <span
                    className={cn(
                        "font-semibold transition-colors",
                        percentageColor
                    )}
                >
                    {progress.toFixed(1)}%
                </span>

            </div>

            <Progress
                value={progressValue}
                className={progressColor}
            />

            <div className="grid grid-cols-3 gap-4 text-sm">

                <div className="space-y-1">

                    <p className="text-muted-foreground">
                        Saved
                    </p>

                    <p className="font-semibold">
                        {savedAmount}
                    </p>

                </div>

                <div className="space-y-1 text-center">

                    <p className="text-muted-foreground">
                        Target
                    </p>

                    <p className="font-semibold">
                        {targetAmount}
                    </p>

                </div>

                <div className="space-y-1 text-right">

                    <p className="text-muted-foreground">
                        Remaining
                    </p>

                    <p className="font-semibold">
                        {remainingAmount}
                    </p>

                </div>

            </div>

        </div>
    );
}