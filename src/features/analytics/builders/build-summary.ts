import { TransactionType } from "@prisma/client";

import { TransactionDto } from "@/features/transactions/types/transaction";

import { AnalyticsSummary } from "../types/analytics-view";

interface BuildSummaryParams {
    periodTransactions: TransactionDto[];

    previousTransactions: TransactionDto[];
}

function calculatePercentageChange(
    current: number,
    previous: number
): number | null {
    if (previous === 0) {
        return null;
    }

    return (
        ((current - previous) /
            previous) *
        100
    );
}

function getTransactionTotal(
    transactions: TransactionDto[],
    type: TransactionType
): number {
    return transactions
        .filter(
            (transaction) =>
                transaction.type ===
                type
        )
        .reduce(
            (total, transaction) =>
                total +
                transaction.amount,
            0
        );
}

export function buildSummary({
    periodTransactions,
    previousTransactions,
}: BuildSummaryParams): AnalyticsSummary {
    const income =
        getTransactionTotal(
            periodTransactions,
            TransactionType.INCOME
        );

    const expense =
        getTransactionTotal(
            periodTransactions,
            TransactionType.EXPENSE
        );

    const previousIncome =
        getTransactionTotal(
            previousTransactions,
            TransactionType.INCOME
        );

    const previousExpense =
        getTransactionTotal(
            previousTransactions,
            TransactionType.EXPENSE
        );

    return {
        income,

        expense,

        netCashFlow:
            income - expense,

        savingsRate:
            income === 0
                ? null
                : (
                    ((income -
                        expense) /
                        income) *
                    100
                ),

        incomeChange:
            calculatePercentageChange(
                income,
                previousIncome
            ),

        expenseChange:
            calculatePercentageChange(
                expense,
                previousExpense
            ),
    };
}