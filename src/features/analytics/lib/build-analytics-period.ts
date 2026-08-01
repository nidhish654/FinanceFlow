import { TransactionType } from "@prisma/client";

import { TransactionDto } from "@/features/transactions/types/transaction";

import {
    AnalyticsCategoryPoint,
    AnalyticsExpensePeriod,
} from "../types/analytics-view";

interface BuildAnalyticsPeriodParams {
    id: string;

    label: string;

    transactions: TransactionDto[];
}

export function buildAnalyticsPeriod({
    id,
    label,
    transactions,
}: BuildAnalyticsPeriodParams): AnalyticsExpensePeriod {
    const income = transactions
        .filter(
            (transaction) =>
                transaction.type ===
                TransactionType.INCOME
        )
        .reduce(
            (total, transaction) =>
                total + transaction.amount,
            0
        );

    const expenseTransactions =
        transactions.filter(
            (transaction) =>
                transaction.type ===
                TransactionType.EXPENSE
        );

    const expense =
        expenseTransactions.reduce(
            (total, transaction) =>
                total + transaction.amount,
            0
        );

    const categoryMap =
        new Map<
            string,
            AnalyticsCategoryPoint
        >();

    expenseTransactions.forEach(
        (transaction) => {
            const categoryId =
                transaction.category?.id ??
                "uncategorized";

            const current =
                categoryMap.get(
                    categoryId
                );

            categoryMap.set(
                categoryId,
                {
                    id: categoryId,

                    name:
                        transaction.category
                            ?.name ??
                        "Uncategorized",

                    amount:
                        (current?.amount ??
                            0) +
                        transaction.amount,
                }
            );
        }
    );

    return {
        id,

        label,

        income,

        expense,

        netCashFlow:
            income - expense,

        categories:
            Array.from(
                categoryMap.values()
            ).sort(
                (a, b) =>
                    b.amount -
                    a.amount
            ),
    };
}