import {
    CategoryType,
} from "@prisma/client";

import { getBudgetViews } from "../budget/services/get-budget-views";

import { getBudgets } from "../budget/queries/get-budgets";

import { getTransactions } from "@/features/transactions/services/get-transactions";

import { getCategories } from "@/features/categories/services/get-categories";

import { getActiveFinanceProfile } from "@/features/finance-profile/services";
import { Separator } from "@/components/ui/separator";
import PlanningWorkspace from "./planning-workspace";

export default async function PlanningPageContent() {
    const financeProfile =
        await getActiveFinanceProfile();

    if (!financeProfile) {
        return null;
    }

    const [
        budgets,
        transactions,
        categories,
    ] = await Promise.all([
        getBudgets({
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

    return (
        <main className="space-y-4">
            <PlanningWorkspace
                budgetViews={budgetViews}
                currency={financeProfile.baseCurrency}
                categoryOptions={categoryOptions}
            />
        </main>
    );
}