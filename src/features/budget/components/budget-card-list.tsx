"use client";

import BudgetCard from "./budget-card";
import BudgetActionsDropdown from "./budget-actions-dropdown";

import { BudgetView } from "../types/budget-view";
import { BudgetFormData } from "../types/budget";

import { SelectOption } from "@/components/forms/SelectField";

interface BudgetCardListProps {
    budgets: BudgetView[];

    currency: string;

    categoryOptions: SelectOption[];
}

export default function BudgetCardList({
    budgets,
    currency,
    categoryOptions,
}: BudgetCardListProps) {
    if (budgets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">

                <h3 className="text-lg font-semibold">
                    No Budgets Yet
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                    Create your first budget to start tracking your spending.
                </p>

            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {budgets.map((budget) => (
                <div
                    key={budget.id}
                    className="relative"
                >
                    <div className="absolute right-3 top-3 z-10">

                        <BudgetActionsDropdown
                            budgetId={budget.id}
                            archived={budget.archived}
                            currency={currency}
                            categoryOptions={categoryOptions}
                            defaultValues={
                                {
                                    categoryId:
                                        budget.categoryId,

                                    amount:
                                        budget.amount,

                                    period:
                                        budget.period,

                                    startDate:
                                        budget.startDate,

                                    endDate:
                                        budget.endDate,

                                    notes:
                                        budget.notes ?? undefined,
                                } satisfies Partial<BudgetFormData>
                            }
                        />

                    </div>

                    <BudgetCard
                        budget={budget}
                    />

                </div>
            ))}

        </div>
    );
}