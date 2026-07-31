"use client";

import GoalCard from "./goal-card";

import { GoalPreview as GoalPreviewType } from "../types/goal-preview";

interface GoalPreviewProps {
    goal: GoalPreviewType;
}

export default function GoalPreview({
    goal,
}: GoalPreviewProps) {
    return (
        <div className="w-full space-y-6">

            <div>

                <h3 className="text-lg font-semibold tracking-tight">
                    Goal Preview
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                    Review how your goal will appear before saving.
                </p>

            </div>

            <GoalCard
                goal={goal}
                preview
            />

        </div>
    );
}