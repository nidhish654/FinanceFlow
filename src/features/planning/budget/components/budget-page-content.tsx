"use client";

import { useMemo, useState } from "react";

import CardSelector from "@/components/common/CardSelector";
import { SelectOption } from "@/components/forms/SelectField";

import BudgetCardList from "./budget-card-list";

import { BudgetView } from "../types/budget-view";
import { Separator } from "@/components/ui/separator";

type BudgetPeriodFilter =
    | "all"
    | "monthly"
    | "weekly"
    | "yearly"
    | "custom";

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
    const [periodFilter, setPeriodFilter] =
        useState<BudgetPeriodFilter>("all");

    const visibleBudgets = useMemo(() => {
        if (periodFilter === "all") {
            return budgets;
        }

        return budgets.filter(
            (budget) =>
                budget.period.toLowerCase() ===
                periodFilter
        );
    }, [budgets, periodFilter]);

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
                        value: "monthly",
                        label: "Monthly",
                    },
                    {
                        value: "weekly",
                        label: "Weekly",
                    },
                    {
                        value: "yearly",
                        label: "Yearly",
                    },
                    {
                        value: "custom",
                        label: "Custom",
                    },
                ]}
                value={periodFilter}
                onValueChange={setPeriodFilter}
            />

            {/* <Separator /> */}

            {visibleBudgets.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
                    <h3 className="text-lg font-semibold">
                        No Budgets Found
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        No budgets match the selected
                        period.
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