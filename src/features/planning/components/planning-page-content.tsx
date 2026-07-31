import {
    CategoryType,
} from "@prisma/client";

import { Separator } from "@/components/ui/separator";

import PlanningWorkspace from "./planning-workspace";

import { getBudgetViews } from "../budget/services/get-budget-views";
import { getGoalViews } from "../goal/services/get-goal-views";

import { getBudgets } from "../budget/queries/get-budgets";
import { getGoals } from "../goal/queries/get-goals";

import { getTransactions } from "@/features/transactions/services/get-transactions";
import { getCategories } from "@/features/categories/services/get-categories";
import { getActiveFinanceProfile } from "@/features/finance-profile/services";

export default async function PlanningPageContent() {
    const financeProfile =
        await getActiveFinanceProfile();

    if (!financeProfile) {
        return null;
    }

    const [
        budgets,
        goals,
        transactions,
        categories,
    ] = await Promise.all([
        getBudgets({
            financeProfileId:
                financeProfile.id,
        }),

        getGoals({
            financeProfileId:
                financeProfile.id,
        }),

        getTransactions(),

        getCategories(),
    ]);

    const expenseCategories =
        categories.filter(
            (category) =>
                category.type ===
                CategoryType.EXPENSE
        );

    const categoryOptions =
        expenseCategories.map(
            (category) => ({
                label: category.name,
                value: category.id,
            })
        );

    const budgetViews =
        getBudgetViews({
            budgets,
            transactions,
            currency:
                financeProfile.baseCurrency,
        });

    const goalViews =
        getGoalViews({
            goals,
            currency:
                financeProfile.baseCurrency,
        });

    return (
        <main className="space-y-4">

            <PlanningWorkspace
                budgetViews={budgetViews}
                goalViews={goalViews}
                currency={
                    financeProfile.baseCurrency
                }
                categoryOptions={
                    categoryOptions
                }
            />

        </main>
    );
}