import { TransactionType } from "@prisma/client";
import { TransactionDto } from "@/features/transactions/types/transaction";
import {
    AnalyticsSummary,
    AnalyticsMonthlyPoint,
    SummaryComparison,
} from "../types/analytics-view";

interface BuildSummaryParams {
    periodTransactions: TransactionDto[];
    previousTransactions: TransactionDto[];
    monthlyCashFlow: AnalyticsMonthlyPoint[];
}

function calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) {
        return current > 0 ? 100 : 0;
    }
    return ((current - previous) / Math.abs(previous)) * 100;
}

function buildComparison(current: number, previous: number): SummaryComparison {
    const change = current - previous;
    const percentage = calculatePercentageChange(current, previous);
    let trend: "up" | "down" | "neutral" = "neutral";
    if (change > 0) trend = "up";
    else if (change < 0) trend = "down";

    return {
        current,
        previous,
        change,
        percentage,
        trend,
    };
}

function getTransactionTotal(
    transactions: TransactionDto[],
    type: TransactionType
): number {
    return transactions
        .filter((transaction) => transaction.type === type)
        .reduce((total, transaction) => total + transaction.amount, 0);
}

export function buildSummary({
    periodTransactions,
    previousTransactions,
    monthlyCashFlow,
}: BuildSummaryParams): AnalyticsSummary {
    const income = getTransactionTotal(periodTransactions, TransactionType.INCOME);
    const expense = getTransactionTotal(periodTransactions, TransactionType.EXPENSE);
    
    const previousIncome = getTransactionTotal(previousTransactions, TransactionType.INCOME);
    const previousExpense = getTransactionTotal(previousTransactions, TransactionType.EXPENSE);

    const netCashFlow = income - expense;
    const previousNetCashFlow = previousIncome - previousExpense;

    const savingsRate = income === 0 ? 0 : ((income - expense) / income) * 100;
    const previousSavingsRate = previousIncome === 0 ? 0 : ((previousIncome - previousExpense) / previousIncome) * 100;

    const incomeComp = buildComparison(income, previousIncome);
    const expenseComp = buildComparison(expense, previousExpense);
    const cashFlowComp = buildComparison(netCashFlow, previousNetCashFlow);
    const savingsComp = buildComparison(savingsRate, previousSavingsRate);

    let highestIncomeMonth = "N/A";
    let highestIncomeAmount = 0;
    let highestExpenseMonth = "N/A";
    let highestExpenseAmount = 0;

    for (const month of monthlyCashFlow) {
        if (month.income > highestIncomeAmount) {
            highestIncomeAmount = month.income;
            highestIncomeMonth = month.month;
        }
        if (month.expense > highestExpenseAmount) {
            highestExpenseAmount = month.expense;
            highestExpenseMonth = month.month;
        }
    }

    const insights: string[] = [];

    if (incomeComp.percentage > 5) {
        insights.push(`Income increased by ${incomeComp.percentage.toFixed(0)}% compared to the previous period.`);
    } else if (incomeComp.percentage < -5) {
        insights.push(`Income decreased by ${Math.abs(incomeComp.percentage).toFixed(0)}%.`);
    }

    if (expenseComp.percentage > 5) {
        insights.push(`Expenses went up by ${expenseComp.percentage.toFixed(0)}% this period.`);
    } else if (expenseComp.percentage < -5) {
        insights.push(`Great job! Expenses dropped by ${Math.abs(expenseComp.percentage).toFixed(0)}%.`);
    }

    if (netCashFlow > 0 && previousNetCashFlow > 0) {
        insights.push("Positive cash flow maintained across periods.");
    } else if (netCashFlow < 0) {
        insights.push("You spent more than you earned this period.");
    }

    if (savingsRate > 20) {
        insights.push(`You saved ${savingsRate.toFixed(0)}% of your income.`);
    }

    return {
        income: incomeComp,
        expense: expenseComp,
        netCashFlow: cashFlowComp,
        savingsRate: savingsComp,
        highestIncomeMonth,
        highestIncomeAmount,
        highestExpenseMonth,
        highestExpenseAmount,
        insights,
    };
}