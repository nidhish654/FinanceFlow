import { AccountType, TransactionType } from "@prisma/client";

import { AccountDto } from "@/features/accounts/types/account";
import { TransactionDto } from "@/features/transactions/types/transaction";

import { calculateTotalBalance } from "@/features/finance/services/balance.service";

import { DashboardSummary } from "../types/dashboard-view";

import {
    formatCurrency,
    getCurrencyLocale,
} from "../lib/dashboard-formatters";

interface GetDashboardSummaryParams {
    accounts: AccountDto[];

    transactions: TransactionDto[];

    currency: string;

    locale?: string;
}


export function getDashboardSummary({
    accounts,
    transactions,
    currency,
    locale = getCurrencyLocale(currency),
}: GetDashboardSummaryParams): DashboardSummary {

    const now = new Date();

    const currentMonth = now.getMonth();

    const currentYear = now.getFullYear();

    const monthlyTransactions =
        transactions.filter((transaction) => {

            const date =
                new Date(transaction.transactionDate);

            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
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