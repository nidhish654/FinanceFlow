import { BudgetView } from "../types/budget-view";
import { BudgetWithCategory } from "../types/budget-query";

import { TransactionDto } from "@/features/transactions/types/transaction";

import { buildBudgetPreview } from "../lib/budget-preview";

interface GetBudgetViewsParams {
    budgets: BudgetWithCategory[];

    transactions: TransactionDto[];

    currency: string;

    locale?: string;
}

export function getBudgetViews({
    budgets,
    transactions,
    currency,
    locale = "en-IN",
}: GetBudgetViewsParams): BudgetView[] {
    return budgets.map((budget) => {
        const amount = Number(budget.amount);

        const matchingTransactions =
            transactions.filter((transaction) => {
                // Ignore anything that's not an expense
                if (transaction.type !== "EXPENSE") {
                    return false;
                }

                // Ignore transactions outside the budget period
                if (
                    transaction.transactionDate <
                    budget.startDate ||
                    transaction.transactionDate >
                    budget.endDate
                ) {
                    return false;
                }

                // Overall Budget
                if (!budget.categoryId) {
                    return true;
                }

                // Category Budget
                return (
                    transaction.categoryId ===
                    budget.categoryId
                );
            });

        const spentAmount =
            matchingTransactions.reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );

        const remainingAmount =
            amount - spentAmount;

        const progress =
            amount > 0
                ? (spentAmount / amount) * 100
                : 0;

        const isExceeded =
            spentAmount > amount;

        const overBudgetAmount =
            isExceeded
                ? spentAmount - amount
                : 0;

        const preview =
            buildBudgetPreview({
                categoryId:
                    budget.categoryId,

                categoryName:
                    budget.category?.name ??
                    "Overall Budget",

                amount,

                currency,

                locale,

                period: budget.period,

                startDate:
                    budget.startDate,

                endDate: budget.endDate,

                notes:
                    budget.notes ??
                    undefined,
            });

        return {
            ...preview,

            id: budget.id,

            archived:
                budget.status ===
                "ARCHIVED",

            spentAmount,

            remainingAmount,

            progress,

            isExceeded,

            overBudgetAmount,
        };
    });
}