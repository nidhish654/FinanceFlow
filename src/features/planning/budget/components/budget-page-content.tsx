"use client";

import { useMemo, useState } from "react";

import CardSelector from "@/components/common/CardSelector";
import { SelectOption } from "@/components/forms/SelectField";

import BudgetCardList from "./budget-card-list";

import { BudgetView } from "../types/budget-view";
import { Separator } from "@/components/ui/separator";

interface BudgetPageContentProps {
    budgets: BudgetView[];

    currency: string;

    categoryOptions: SelectOption[];
}

export default function BudgetPageContent({
    budgets,
    currency,
    categoryOptions,
}: BudgetPageContentProps) {
    const [view, setView] = useState<
        "active" | "archived"
    >("active");
    const activeBudgets = useMemo(
        () =>
            budgets.filter(
                (budget) => !budget.archived
            ),
        [budgets]
    );

    const archivedBudgets = useMemo(
        () =>
            budgets.filter(
                (budget) => budget.archived
            ),
        [budgets]
    );

    const visibleBudgets =
        view === "active"
            ? activeBudgets
            : archivedBudgets;

    return (
        <div className="space-y-4">

            <Separator />

            {visibleBudgets.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">

                    <h3 className="text-lg font-semibold">
                        {view === "active"
                            ? "No Active Budgets"
                            : "No Archived Budgets"}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {view === "active"
                            ? "Create your first budget to start tracking your spending."
                            : "Archived budgets will appear here."}
                    </p>

                </div>
            ) : (
                <BudgetCardList
                    budgets={visibleBudgets}
                    currency={currency}
                    categoryOptions={categoryOptions}
                />
            )}

        </div>
    );
}