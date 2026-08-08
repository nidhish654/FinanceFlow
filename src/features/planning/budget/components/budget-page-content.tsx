"use client";

import { useMemo, useState } from "react";
import { HandCoins } from "lucide-react";

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
                        <HandCoins className="h-10 w-10 text-primary" />
                    </div>

                    <h2 className="text-xl font-semibold">
                        Create your budget
                    </h2>

                    <p
                        className="
                            mt-2
                            max-w-md
                            text-sm
                            text-muted-foreground
                        "
                    >

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