import { AccountDto } from "@/features/accounts/types/account";

import { TransactionDto } from "@/features/transactions/types/transaction";

import { BudgetWithCategory } from "@/features/planning/budget/types/budget-query";
import { getBudgetViews } from "@/features/planning/budget/services/get-budget-views";

import { GoalWithHistoryCount } from "@/features/planning/goal/types/goal-query";
import { getGoalViews } from "@/features/planning/goal/services/get-goal-views";

import { DashboardWidgets } from "../types/dashboard-view";

interface GetDashboardWidgetsParams {
    accounts: AccountDto[];

    transactions: TransactionDto[];

    budgets: BudgetWithCategory[];

    goals: GoalWithHistoryCount[];

    currency: string;

    locale?: string;
}

export function getDashboardWidgets({
    accounts,
    transactions,
    budgets,
    goals,
    currency,
    locale = "en-IN",
}: GetDashboardWidgetsParams): DashboardWidgets {

    const recentTransactions =
        [...transactions]
            .sort(
                (a, b) =>
                    b.transactionDate.getTime() -
                    a.transactionDate.getTime()
            )
            .slice(0, 5);

    const budgetViews =
        getBudgetViews({
            budgets,
            transactions,
            currency,
            locale,
        });

    const goalViews =
        getGoalViews({
            goals,
            currency,
            locale,
        });

    return {
        recentTransactions,

        budgets: budgetViews,

        goals: goalViews,

        accounts,
    };
}