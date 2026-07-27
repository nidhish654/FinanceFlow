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
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {budgets.map((budget) => (
                <BudgetCard
                    key={budget.id}
                    budget={budget}
                    actions={
                        <BudgetActionsDropdown
                            budgetId={budget.id}
                            archived={budget.archived}
                            currency={currency}
                            categoryOptions={categoryOptions}
                            defaultValues={{
                                categoryId:
                                    budget.categoryId ?? "",

                                amount:
                                    budget.amount,

                                period:
                                    budget.period,

                                startDate:
                                    budget.startDate,

                                endDate:
                                    budget.endDate,

                                notes:
                                    budget.notes ??
                                    undefined,
                            } satisfies Partial<BudgetFormData>}
                        />
                    }
                />
            ))}

        </div>
    );
}