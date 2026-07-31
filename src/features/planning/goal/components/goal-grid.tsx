"use client";

import GoalCard from "./goal-card";
import GoalActionsDropdown from "./goal-actions-dropdown";

import { GoalView } from "../types/goal-view";
import { GoalFormData } from "../types/goal";

interface GoalGridProps {
    goals: GoalView[];
}

export default function GoalGrid({
    goals,
}: GoalGridProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {goals.map((goal) => (

                <GoalCard
                    key={goal.id}
                    goal={goal}
                    actions={
                        <GoalActionsDropdown
                            goalId={goal.id}
                            goalName={goal.name}
                            archived={goal.archived}
                            currency={goal.currency}
                            defaultValues={{
                                name: goal.name,
                                icon: goal.icon ?? "",
                                targetAmount: goal.targetAmount,
                                targetDate:
                                    goal.targetDate ??
                                    undefined,
                                notes:
                                    goal.notes ??
                                    undefined,
                            } satisfies Partial<GoalFormData>}
                        />
                    }
                />

            ))}

        </div>
    );
}