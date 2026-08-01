import { TransactionType } from "@prisma/client";

import { TransactionDto } from "@/features/transactions/types/transaction";

import {
    AnalyticsCategoryPoint,
    AnalyticsIncomePeriod,
} from "../types/analytics-view";

interface BuildIncomePeriodParams {
    id: string;

    label: string;

    transactions: TransactionDto[];
}

export function buildIncomePeriod({
    id,
    label,
    transactions,
}: BuildIncomePeriodParams): AnalyticsIncomePeriod {
    const incomeTransactions =
        transactions.filter(
            (transaction) =>
                transaction.type ===
                TransactionType.INCOME
        );

    const income =
        incomeTransactions.reduce(
            (total, transaction) =>
                total + transaction.amount,
            0
        );

    const expense =
        transactions
            .filter(
                (transaction) =>
                    transaction.type ===
                    TransactionType.EXPENSE
            )
            .reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );

    const sourceMap =
        new Map<
            string,
            AnalyticsCategoryPoint
        >();

    incomeTransactions.forEach(
        (transaction) => {
            const id =
                transaction.category?.id ??
                "uncategorized";

            const current =
                sourceMap.get(id);

            sourceMap.set(id, {
                id,

                name:
                    transaction.category
                        ?.name ??
                    "Uncategorized",

                amount:
                    (current?.amount ??
                        0) +
                    transaction.amount,
            });
        }
    );

    return {
        id,

        label,

        income,

        expense,

        netCashFlow:
            income - expense,

        sources:
            Array.from(
                sourceMap.values()
            ).sort(
                (a, b) =>
                    b.amount -
                    a.amount
            ),
    };
}