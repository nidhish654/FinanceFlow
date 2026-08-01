import { TransactionType } from "@prisma/client";
import { TransactionDto } from "@/features/transactions/types/transaction";
import { AccountDto } from "@/features/accounts/types/account";
import {
    AnalyticsAccountAnalysis,
    AnalyticsAccountSummary,
    AnalyticsAccountDistribution,
    AnalyticsAccountGrowth,
    AnalyticsAccountUsage,
    AnalyticsTransfer,
    AnalyticsAccountPeriod,
} from "../types/analytics-view";
import { buildAccountPeriod } from "../lib/build-account-period";

interface BuildAccountAnalysisParams {
    accounts: AccountDto[];
    periodTransactions: TransactionDto[];
    startDate: Date;
    endDate: Date;
}

export function buildAccountAnalysis({
    accounts,
    periodTransactions,
    startDate,
    endDate,
}: BuildAccountAnalysisParams): AnalyticsAccountAnalysis {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.currentBalance, 0);

    const sortedAccounts = [...accounts].sort((a, b) => b.currentBalance - a.currentBalance);
    const largestAccount = sortedAccounts.length > 0 ? {
        id: sortedAccounts[0].id,
        name: sortedAccounts[0].name,
        balance: sortedAccounts[0].currentBalance,
    } : null;

    const summary: AnalyticsAccountSummary = {
        totalBalance,
        largestAccount,
        numberOfAccounts: accounts.length,
        averageBalance: accounts.length > 0 ? totalBalance / accounts.length : 0,
    };

    const distribution: AnalyticsAccountDistribution[] = sortedAccounts.map(acc => ({
        id: acc.id,
        name: acc.name,
        balance: acc.currentBalance,
        percentage: totalBalance > 0 ? (acc.currentBalance / totalBalance) * 100 : 0,
    }));

    const usage: AnalyticsAccountUsage[] = accounts.map(acc => {
        const accTransactions = periodTransactions.filter(t => t.accountId === acc.id);
        const inflow = accTransactions.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
        const outflow = accTransactions.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);

        return {
            id: acc.id,
            name: acc.name,
            balance: acc.currentBalance,
            inflow,
            outflow,
            transactionCount: accTransactions.length,
        };
    });

    const transferMap = new Map<string, AnalyticsTransfer>();
    periodTransactions.filter(t => t.type === TransactionType.TRANSFER && t.transferAccountId).forEach(t => {
        const sourceId = t.accountId;
        const destId = t.transferAccountId!;
        const key = `${sourceId}-${destId}`;

        const existing = transferMap.get(key);
        if (existing) {
            existing.amount += t.amount;
            existing.count += 1;
        } else {
            transferMap.set(key, {
                sourceAccountId: sourceId,
                sourceAccountName: t.account.name,
                destinationAccountId: destId,
                destinationAccountName: t.transferAccount!.name,
                amount: t.amount,
                count: 1,
            });
        }
    });

    const transfers = Array.from(transferMap.values()).sort((a, b) => b.amount - a.amount);

    const history: AnalyticsAccountPeriod[] = accounts.map(acc => {
        const netChange = periodTransactions.reduce((sum, t) => {
            if (t.accountId === acc.id) {
                if (t.type === TransactionType.INCOME) return sum + t.amount;
                if (t.type === TransactionType.EXPENSE) return sum - t.amount;
                if (t.type === TransactionType.TRANSFER) return sum - t.amount;
            }
            if (t.transferAccountId === acc.id && t.type === TransactionType.TRANSFER) {
                return sum + t.amount;
            }
            return sum;
        }, 0);

        const openingBalance = acc.currentBalance - netChange;
        
        // For history transactions, we just need the ones related to this account
        const accTransactions = periodTransactions.filter(t => t.accountId === acc.id || t.transferAccountId === acc.id);

        return buildAccountPeriod({
            id: acc.id,
            name: acc.name,
            transactions: accTransactions,
            openingBalance,
        });
    });

    const growth: AnalyticsAccountGrowth[] = [];
    const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

    // Track running balances for each account
    const currentBalances = new Map<string, number>();
    accounts.forEach(acc => {
        const netChange = periodTransactions.reduce((sum, t) => {
            if (t.accountId === acc.id) {
                if (t.type === TransactionType.INCOME) return sum + t.amount;
                if (t.type === TransactionType.EXPENSE || t.type === TransactionType.TRANSFER) return sum - t.amount;
            }
            if (t.transferAccountId === acc.id && t.type === TransactionType.TRANSFER) {
                return sum + t.amount;
            }
            return sum;
        }, 0);
        currentBalances.set(acc.id, acc.currentBalance - netChange);
    });

    while (cursor <= endDate) {
        const monthStart = new Date(cursor);
        const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
        
        const monthTransactions = periodTransactions.filter(t => {
            const date = new Date(t.transactionDate);
            return date >= monthStart && date < monthEnd;
        });

        monthTransactions.forEach(t => {
            if (t.type === TransactionType.INCOME || t.type === TransactionType.EXPENSE || t.type === TransactionType.TRANSFER) {
                if (t.accountId) {
                    const current = currentBalances.get(t.accountId) || 0;
                    if (t.type === TransactionType.INCOME) currentBalances.set(t.accountId, current + t.amount);
                    else currentBalances.set(t.accountId, current - t.amount); // EXPENSE or TRANSFER outflow
                }
                if (t.type === TransactionType.TRANSFER && t.transferAccountId) {
                    const destCurrent = currentBalances.get(t.transferAccountId) || 0;
                    currentBalances.set(t.transferAccountId, destCurrent + t.amount); // TRANSFER inflow
                }
            }
        });

        const point: AnalyticsAccountGrowth = {
            date: cursor.toLocaleString("en-US", { month: "short", year: "2-digit" }),
        };
        
        accounts.forEach(acc => {
            point[acc.name] = currentBalances.get(acc.id) || 0;
        });

        growth.push(point);
        cursor.setMonth(cursor.getMonth() + 1);
    }

    const insights: string[] = [];
    if (largestAccount && totalBalance > 0) {
        const percentage = ((largestAccount.balance / totalBalance) * 100).toFixed(0);
        insights.push(`${largestAccount.name} contains ${percentage}% of your money.`);
    }

    const mostUsed = [...usage].sort((a, b) => b.transactionCount - a.transactionCount)[0];
    if (mostUsed && mostUsed.transactionCount > 0) {
        insights.push(`${mostUsed.name} handled the most transactions (${mostUsed.transactionCount}).`);
    }

    if (transfers.length > 0) {
        const largestTransfer = transfers[0];
        insights.push(`Largest transfer path: ${largestTransfer.sourceAccountName} → ${largestTransfer.destinationAccountName} (₹${largestTransfer.amount})`);
    }

    return {
        summary,
        distribution,
        growth,
        usage,
        transfers,
        history,
        insights,
    };
}
