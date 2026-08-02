"use client";

import { useMemo, useState } from "react";

import CardSelector from "@/components/common/CardSelector";

import GoalFilter, {
    GoalFilterValue,
} from "./goal-filter";

import GoalGrid from "./goal-grid";
import GoalEmptyState from "./goal-empty-state";

import { GoalView } from "../types/goal-view";

import { Separator } from "@/components/ui/separator";

type GoalFilter = GoalFilterValue;

interface GoalPageContentProps {
    goals: GoalView[];

    archived?: boolean;
}

export default function GoalPageContent({
    goals,
    archived = false,
}: GoalPageContentProps) {
    const [filter, setFilter] =
        useState<GoalFilterValue>("All");

    const visibleGoals = useMemo(() => {
        switch (filter) {
            case "Pending":
                return goals.filter(
                    (goal) => !goal.completed
                );

            case "Completed":
                return goals.filter(
                    (goal) => goal.completed
                );

            case "All":
            default:
                return goals;
        }
    }, [goals, filter]);

    return (
        <div className="space-y-4">

            <Separator />

            <GoalFilter
                value={filter}
                onChange={setFilter}
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