import { TransactionType } from "@prisma/client";
import { AnalyticsAccountPeriod } from "../types/analytics-view";
import { TransactionDto } from "@/features/transactions/types/transaction";

interface BuildAccountPeriodParams {
    id: string;
    name: string;
    transactions: TransactionDto[];
    openingBalance: number;
}

export function buildAccountPeriod({
    id,
    name,
    transactions,
    openingBalance,
}: BuildAccountPeriodParams): AnalyticsAccountPeriod {
    const income = transactions
        .filter((t) => t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0);

    return {
        id,
        name,
        openingBalance,
        income,
        expense,
        closingBalance: openingBalance + income - expense,
    };
}
