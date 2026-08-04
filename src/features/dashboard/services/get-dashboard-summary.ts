import { AccountType, TransactionType } from "@prisma/client";

import { AccountDto } from "@/features/accounts/types/account";
import { TransactionDto } from "@/features/transactions/types/transaction";

import { calculateTotalBalance } from "@/features/finance/services/balance.service";

import { DashboardSummary } from "../types/dashboard-view";

import {
    formatCurrency,
    getCurrencyLocale,
} from "../lib/dashboard-formatters";

import { getFinancialMonthRange } from "@/lib/finance/financial-period";
import { SettingsState } from "@/features/settings/types/settings";

interface GetDashboardSummaryParams {
    accounts: AccountDto[];
    transactions: TransactionDto[];
    currency: string;
    locale?: string;
    settings: SettingsState | null;
}


export function getDashboardSummary({
    accounts,
    transactions,
    currency,
    locale = getCurrencyLocale(currency),
    settings,
}: GetDashboardSummaryParams): DashboardSummary {

    const now = new Date();
    const monthStart = settings?.monthStart || 1;
    const { start, end } = getFinancialMonthRange(now, monthStart);

    const monthlyTransactions =
        transactions.filter((transaction) => {
            const date = new Date(transaction.transactionDate);
            return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
        });

    const monthlyIncome =
        monthlyTransactions
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

    const monthlyExpense =
        monthlyTransactions
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

    const totalBalance =
        calculateTotalBalance(
            accounts.map(
                (account) =>
                    account.currentBalance
            )
        );

    const totalSavings =
        calculateTotalBalance(
            accounts
                .filter(
                    (account) =>
                        account.type ===
                        AccountType.SAVINGS
                )
                .map(
                    (account) =>
                        account.currentBalance
                )
        );

    const netCashFlow =
        monthlyIncome -
        monthlyExpense;

    return {
        totalBalance,

        formattedTotalBalance:
            formatCurrency(
                totalBalance,
                currency,
                locale
            ),

        monthlyIncome,

        formattedMonthlyIncome:
            formatCurrency(
                monthlyIncome,
                currency,
                locale
            ),

        monthlyExpense,

        formattedMonthlyExpense:
            formatCurrency(
                monthlyExpense,
                currency,
                locale
            ),

        netCashFlow,

        formattedNetCashFlow:
            formatCurrency(
                netCashFlow,
                currency,
                locale
            ),

        totalSavings,

        formattedTotalSavings:
            formatCurrency(
                totalSavings,
                currency,
                locale
            ),
    };
}