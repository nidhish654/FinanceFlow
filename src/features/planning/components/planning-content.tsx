"use client";

import { useMemo, useState } from "react";

import PlanningToolbar from "./planning-toolbar";

import BudgetPageContent from "../budget/components/budget-page-content";
import GoalPageContent from "../goal/components/goal-page-content";

import { BudgetView } from "../budget/types/budget-view";
import { GoalView } from "../goal/types/goal-view";

import { SelectOption } from "@/components/forms/SelectField";

interface PlanningContentProps {
    module: "budgets" | "goals" | "debts";

    budgetViews: BudgetView[];

    goalViews: GoalView[];

    currency: string;

    categoryOptions: SelectOption[];
}

export type PlanningViewState =
    | "active"
    | "archived";

export default function PlanningContent({
    module,
    budgetViews,
    goalViews,
    currency,
    categoryOptions,
}: PlanningContentProps) {
    const [view, setView] =
        useState<PlanningViewState>("active");

    const activeBudgets = useMemo(
        () =>
            budgetViews.filter(
                (budget) => !budget.archived
            ),
        [budgetViews]
    );

    const archivedBudgets = useMemo(
        () =>
            budgetViews.filter(
                (budget) => budget.archived
            ),
        [budgetViews]
    );

    const activeGoals = useMemo(
        () =>
            goalViews.filter(
                (goal) => !goal.archived
            ),
        [goalViews]
    );

    const archivedGoals = useMemo(
        () =>
            goalViews.filter(
                (goal) => goal.archived
            ),
        [goalViews]
    );

    return (
        <div className="space-y-4">

            <PlanningToolbar
                module={module}
                view={view}
                onViewChange={setView}
                activeCount={
                    module === "budgets"
                        ? activeBudgets.length
                        : activeGoals.length
                }
                archivedCount={
                    module === "budgets"
                        ? archivedBudgets.length
                        : archivedGoals.length
                }
                currency={currency}
                categoryOptions={categoryOptions}
            />

            {module === "budgets" && (
                <BudgetPageContent
                    budgets={
                        view === "active"
                            ? activeBudgets
                            : archivedBudgets
                    }
                    currency={currency}
                    categoryOptions={categoryOptions}
                />
            )}

            {module === "goals" && (
                <GoalPageContent
                    goals={
                        view === "active"
                            ? activeGoals
                            : archivedGoals
                    }
                />
            )}

            {module === "debts" && null}

        </div>
    );
}