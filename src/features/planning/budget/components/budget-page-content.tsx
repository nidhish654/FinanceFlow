"use client";

import { useMemo, useState } from "react";

import { SelectOption } from "@/components/forms/SelectField";
import { Separator } from "@/components/ui/separator";

import BudgetCardList from "./budget-card-list";
import BudgetFilter, {
    BudgetFilterValue,
} from "./budget-filter";

import { BudgetView } from "../types/budget-view";

interface BudgetPageContentProps {
    budgets: BudgetView[];

    currency: string;

    categoryOptions: SelectOption[];
}

function isCurrentBudget(
    startDate: Date | string,
    endDate: Date | string
) {
    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const start = new Date(startDate);

    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return start <= today && end >= today;
}

export default function BudgetPageContent({
    budgets,
    currency,
    categoryOptions,
}: BudgetPageContentProps) {
    const [periodFilter, setPeriodFilter] =
        useState<BudgetFilterValue>("Current");

    const visibleBudgets = useMemo(() => {
        const today = new Date();

        return budgets.filter((budget) => {
            switch (periodFilter) {
                case "Current":
                    return isCurrentBudget(
                        budget.startDate,
                        budget.endDate
                    );

                case "Completed":
                    return (
                        new Date(budget.endDate) <
                        today
                    );

                case "Weekly":
                    return (
                        budget.period ===
                        "WEEKLY"
                    );

                case "Monthly":
                    return (
                        budget.period ===
                        "MONTHLY"
                    );

                case "Yearly":
                    return (
                        budget.period ===
                        "YEARLY"
                    );

                case "Custom":
                    return (
                        budget.period ===
                        "CUSTOM"
                    );

                default:
                    return true;
            }
        });
    }, [budgets, periodFilter]);

    return (
        <div className="space-y-4">
            <Separator />

            <BudgetFilter
                value={periodFilter}
                onChange={setPeriodFilter}
            />

            {visibleBudgets.length === 0 ? (
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-dashed
                        py-20
                        text-center
                    "
                >
                    <h3 className="text-lg font-semibold">
                        No Budgets Found
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        No budgets match the selected
                        filter.
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