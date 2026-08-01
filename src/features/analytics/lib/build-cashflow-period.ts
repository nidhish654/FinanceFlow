import { TransactionType } from "@prisma/client";

import {
    AnalyticsCashFlowPeriod,
} from "../types/analytics-view";

import {
    TransactionDto,
} from "@/features/transactions/types/transaction";

interface BuildCashFlowPeriodParams {
    id: string;

    label: string;

    transactions: TransactionDto[];

    openingBalance: number;
}

export function buildCashFlowPeriod({
    id,
    label,
    transactions,
    openingBalance,
}: BuildCashFlowPeriodParams): AnalyticsCashFlowPeriod {

    const income =
        transactions
            .filter(
                (transaction) =>
                    transaction.type ===
                    TransactionType.INCOME
            )
            .reduce(
                (sum, transaction) =>
                    sum + transaction.amount,
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
                (sum, transaction) =>
                    sum + transaction.amount,
                0
            );

    const netCashFlow =
        income - expense;

    return {

        id,

        label,

        openingBalance,

        income,

        expense,

        closingBalance:
            openingBalance +
            netCashFlow,

        netCashFlow,
    };
}