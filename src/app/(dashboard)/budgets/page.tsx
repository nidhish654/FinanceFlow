import { BudgetStatus } from "@prisma/client";

import PageHeader from "@/components/common/PageHeader";

import CreateBudgetDialog from "@/features/budget/components/create-budget-dialog";
import BudgetCardList from "@/features/budget/components/budget-card-list";

import { buildBudgetPreview } from "@/features/budget/lib/budget-preview";

import { getBudgets } from "@/features/budget/queries/get-budgets";

import { getCategories } from "@/features/categories/services/get-categories";

import { getActiveFinanceProfile } from "@/features/finance-profile/services";

export default async function BudgetsPage() {
    const financeProfile =
        await getActiveFinanceProfile();

    if (!financeProfile) {
        return null;
    }

    const [budgets, categories] =
        await Promise.all([
            getBudgets({
                financeProfileId:
                    financeProfile.id,
            }),

            getCategories(),
        ]);

    const budgetViews = budgets.map(
        (budget) => {
            const preview =
                buildBudgetPreview({
                    categoryId:
                        budget.categoryId,

                    categoryName:
                        budget.category
                            ?.name ??
                        "Overall Budget",

                    amount: Number(
                        budget.amount
                    ),

                    currency:
                        financeProfile.baseCurrency,

                    period:
                        budget.period,

                    startDate:
                        budget.startDate,

                    endDate:
                        budget.endDate,

                    notes:
                        budget.notes ??
                        undefined,
                });

            return {
                ...preview,

                id: budget.id,

                archived:
                    budget.status ===
                    BudgetStatus.ARCHIVED,
            };
        }
    );

    return (
        <main className="space-y-8">

            <PageHeader
                title="Budgets"
                description="Create and manage your spending budgets."
            >

                <CreateBudgetDialog
                    currency={
                        financeProfile.baseCurrency
                    }
                    categoryOptions={categories.map(
                        (
                            category
                        ) => ({
                            label:
                                category.name,

                            value:
                                category.id,
                        })
                    )}
                />

            </PageHeader>

            <BudgetCardList
                budgets={budgetViews}
                currency={
                    financeProfile.baseCurrency
                }
                categoryOptions={categories.map(
                    (category) => ({
                        label:
                            category.name,

                        value:
                            category.id,
                    })
                )}
            />

        </main>
    );
}