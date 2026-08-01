import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import { getAccounts } from "@/features/accounts/actions/getAccounts";

import { getTransactions } from "@/features/transactions/services/get-transactions";

import { getBudgets } from "@/features/planning/budget/queries/get-budgets";

import { getGoals } from "@/features/planning/goal/queries/get-goals";

export async function getDashboardData() {
    const financeProfile =
        await requireActiveFinanceProfile();

    const [
        accounts,
        transactions,
        budgets,
        goals,
    ] = await Promise.all([
        getAccounts(),

        getTransactions(),

        getBudgets({
            financeProfileId:
                financeProfile.id,
        }),

        getGoals({
            financeProfileId:
                financeProfile.id,
            archived: false,
        }),
    ]);

    return {
        accounts,
        transactions,
        budgets,
        goals,
        currency:
            financeProfile.baseCurrency,
    };
}