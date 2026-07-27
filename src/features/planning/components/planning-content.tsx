"use client";

import { useMemo, useState } from "react";

import PlanningToolbar from "./planning-toolbar";

import BudgetPageContent from "../budget/components/budget-page-content";

import { BudgetView } from "../budget/types/budget-view";
import { SelectOption } from "@/components/forms/SelectField";

interface PlanningContentProps {
    module: "budgets" | "goals" | "debts";

    budgetViews: BudgetView[];

    currency: string;

    categoryOptions: SelectOption[];
}

export type BudgetViewState =
    | "active"
    | "archived";

export default function PlanningContent({
    module,
    budgetViews,
    currency,
    categoryOptions,
}: PlanningContentProps) {
    const [budgetView, setBudgetView] =
        useState<BudgetViewState>("active");

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

    const visibleBudgets =
        budgetView === "active"
            ? activeBudgets
            : archivedBudgets;

    return (
        <div className="space-y-4">
            <PlanningToolbar
                module={module}
                budgetView={budgetView}
                onBudgetViewChange={setBudgetView}
                activeCount={activeBudgets.length}
                archivedCount={archivedBudgets.length}
                currency={currency}
                categoryOptions={categoryOptions}
            />

            {module === "budgets" && (
                <BudgetPageContent
                    budgets={visibleBudgets}
                    currency={currency}
                    categoryOptions={categoryOptions}
                />
            )}

            {module === "goals" && null}

            {module === "debts" && null}
        </div>
    );
}