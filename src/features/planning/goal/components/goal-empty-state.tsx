"use client";

import { Target } from "lucide-react";

interface GoalEmptyStateProps {
    archived?: boolean;
}

export default function GoalEmptyState({
    archived = false,
}: GoalEmptyStateProps) {
    return (
        <div
            className="
                flex
                min-h-[420px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                bg-muted/20
                px-6
                text-center
            "
        >
            <div
                className="
                    mb-6
                    rounded-full
                    bg-primary/10
                    p-4
                "
            >
                <Target className="h-10 w-10 text-primary" />
            </div>

            <h2 className="text-xl font-semibold">

                {archived
                    ? "No archived goals"
                    : "No goals yet"}

            </h2>

            <p
                className="
                    mt-2
                    max-w-md
                    text-sm
                    text-muted-foreground
                "
            >
                {archived
                    ? "Archived goals will appear here once you archive them."
                    : "Create your first savings goal and start tracking your progress toward it."}
            </p>

        </div>
    );
}