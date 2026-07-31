"use client";

import { useMemo, useState } from "react";

import CardSelector from "@/components/common/CardSelector";

import GoalGrid from "./goal-grid";
import GoalEmptyState from "./goal-empty-state";

import { GoalView } from "../types/goal-view";

import { Separator } from "@/components/ui/separator";

type GoalFilter =
    | "all"
    | "pending"
    | "completed";

interface GoalPageContentProps {
    goals: GoalView[];

    archived?: boolean;
}

export default function GoalPageContent({
    goals,
    archived = false,
}: GoalPageContentProps) {
    const [filter, setFilter] =
        useState<GoalFilter>("all");

    const visibleGoals = useMemo(() => {
        switch (filter) {
            case "pending":
                return goals.filter(
                    (goal) => !goal.completed
                );

            case "completed":
                return goals.filter(
                    (goal) => goal.completed
                );

            case "all":
            default:
                return goals;
        }
    }, [goals, filter]);

    return (
        <div className="space-y-4">

            <Separator />

            <CardSelector
                variant="compact"
                items={[
                    {
                        value: "all",
                        label: "All",
                    },
                    {
                        value: "pending",
                        label: "Pending",
                    },
                    {
                        value: "completed",
                        label: "Completed",
                    },
                ]}
                value={filter}
                onValueChange={setFilter}
            />

            {visibleGoals.length === 0 ? (

                <GoalEmptyState
                    archived={archived}
                />

            ) : (

                <GoalGrid
                    goals={visibleGoals}
                />

            )}

        </div>
    );
}