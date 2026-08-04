import { TransactionType } from "@prisma/client";
import { TransactionDto } from "@/features/transactions/types/transaction";
import {
    CategoryPeriodAnalysis,
    CategoryPoint,
    CategorySummary,
    SubcategoryPoint,
    CategoryConcentration,
    CategoryGrowth,
} from "../types/analytics-view";

function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function generateInsights(
    categories: CategoryPoint[],
    topSubcategories: SubcategoryPoint[],
    growth: CategoryGrowth,
    currency: string
): string[] {
    const insights: string[] = [];

    if (categories.length > 0) {
        const top = categories[0];
        insights.push(
            `${top.name} accounts for ${Math.round(top.percentage)}% of your spending in this period.`
        );

        if (top.subcategories.length > 0) {
            const topSub = top.subcategories[0];
            const subPct = (topSub.amount / top.amount) * 100;
            insights.push(
                `${topSub.name} contributes ${Math.round(subPct)}% of your ${top.name} expenses.`
            );
        }

        const uncategorizedPct = (top.generalAmount / top.amount) * 100;
        if (uncategorizedPct > 50 && top.subcategories.length > 0) {
            insights.push(
                `Most ${top.name} transactions are not categorized into subcategories.`
            );
        }
    }

    if (topSubcategories.length >= 3) {
        insights.push(
            `Your spending is spread across ${topSubcategories.length} active subcategories.`
        );
    }

    if (growth.mostIncreased) {
        insights.push(
            `${growth.mostIncreased.name} spending increased by ${Math.round(
                growth.mostIncreased.percentage
            )}% compared to the previous period.`
        );
    }

    if (growth.mostDecreased) {
        insights.push(
            `${growth.mostDecreased.name} spending decreased significantly by ${Math.abs(
                Math.round(growth.mostDecreased.percentage)
            )}%.`
        );
    }

    return insights.slice(0, 6);
}

export function buildCategoryAnalysis(
    transactions: TransactionDto[],
    previousTransactions: TransactionDto[],
    currency: string
): CategoryPeriodAnalysis {
    const periodTransactions = transactions.filter(t => t.type === TransactionType.EXPENSE);
    const prevExpenseTransactions = previousTransactions.filter(t => t.type === TransactionType.EXPENSE);

    let totalAmount = 0;
    const categoryMap = new Map<string, CategoryPoint>();
    const allSubcategoriesMap = new Map<string, SubcategoryPoint>();

    periodTransactions.forEach(t => {
        totalAmount += t.amount;
        const category = t.category;
        const isSubcategory = !!category?.parent;
        const parentKey = isSubcategory ? category!.parent!.id : (category?.id ?? "uncategorized");
        const parentName = isSubcategory ? category!.parent!.name : (category?.name ?? "Uncategorized");
        const icon = isSubcategory ? category!.parent!.icon : (category?.icon ?? null);
        const color = isSubcategory ? category!.parent!.color : (category?.color ?? null);

        let current = categoryMap.get(parentKey);
        if (!current) {
            current = {
                id: parentKey,
                name: parentName,
                icon,
                color,
                amount: 0,
                transactionCount: 0,
                subcategories: [],
                generalAmount: 0,
                generalTransactionCount: 0,
                percentage: 0,
                recentTransactions: [],
            };
            categoryMap.set(parentKey, current);
        }

        current.amount += t.amount;
        current.transactionCount += 1;
        
        if (current.recentTransactions.length < 10) {
            current.recentTransactions.push(t);
        }

        if (isSubcategory) {
            const subKey = category!.id;
            let sub = current.subcategories.find(s => s.id === subKey);
            if (!sub) {
                sub = { id: subKey, name: category!.name, amount: 0, transactionCount: 0 };
                current.subcategories.push(sub);
            }
            sub.amount += t.amount;
            sub.transactionCount += 1;

            let globalSub = allSubcategoriesMap.get(subKey);
            if (!globalSub) {
                globalSub = { id: subKey, name: category!.name, amount: 0, transactionCount: 0 };
                allSubcategoriesMap.set(subKey, globalSub);
            }
            globalSub.amount += t.amount;
            globalSub.transactionCount += 1;
        } else {
            current.generalAmount += t.amount;
            current.generalTransactionCount += 1;
        }
    });

    const categories = Array.from(categoryMap.values()).map(c => {
        c.percentage = totalAmount > 0 ? (c.amount / totalAmount) * 100 : 0;
        c.subcategories.sort((a, b) => b.amount - a.amount);
        c.recentTransactions.sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
        return c;
    }).sort((a, b) => b.amount - a.amount);

    const topSubcategories = Array.from(allSubcategoriesMap.values()).sort((a, b) => b.amount - a.amount);

    const summary: CategorySummary = {
        categoriesUsed: categories.length,
        subcategoriesUsed: topSubcategories.length,
        topCategory: categories.length > 0 ? { name: categories[0].name, amount: categories[0].amount } : null,
        topSubcategory: topSubcategories.length > 0 ? { name: topSubcategories[0].name, amount: topSubcategories[0].amount } : null,
    };

    let top3Amt = 0;
    let top5Amt = 0;
    categories.forEach((c, idx) => {
        if (idx < 3) top3Amt += c.amount;
        if (idx < 5) top5Amt += c.amount;
    });

    const concentration: CategoryConcentration = {
        top3Percentage: totalAmount > 0 ? (top3Amt / totalAmount) * 100 : 0,
        top5Percentage: totalAmount > 0 ? (top5Amt / totalAmount) * 100 : 0,
        remainingPercentage: totalAmount > 0 ? ((totalAmount - top5Amt) / totalAmount) * 100 : 0,
    };

    const prevCategoryMap = new Map<string, number>();
    prevExpenseTransactions.forEach(t => {
        const isSub = !!t.category?.parent;
        const parentKey = isSub ? t.category!.parent!.id : (t.category?.id ?? "uncategorized");
        prevCategoryMap.set(parentKey, (prevCategoryMap.get(parentKey) ?? 0) + t.amount);
    });

    let mostIncreased: CategoryGrowth["mostIncreased"] = null;
    let mostDecreased: CategoryGrowth["mostDecreased"] = null;

    categories.forEach(c => {
        const prevAmount = prevCategoryMap.get(c.id) ?? 0;
        if (prevAmount > 0) {
            const percentage = ((c.amount - prevAmount) / prevAmount) * 100;
            if (percentage > 0) {
                if (!mostIncreased || percentage > mostIncreased.percentage) {
                    mostIncreased = { name: c.name, percentage, oldAmount: prevAmount, newAmount: c.amount };
                }
            } else if (percentage < 0) {
                if (!mostDecreased || percentage < mostDecreased.percentage) {
                    mostDecreased = { name: c.name, percentage, oldAmount: prevAmount, newAmount: c.amount };
                }
            }
        } else if (c.amount > 0) {
            if (!mostIncreased || 100 > mostIncreased.percentage) {
                mostIncreased = { name: c.name, percentage: 100, oldAmount: 0, newAmount: c.amount };
            }
        }
    });

    const growth: CategoryGrowth = { mostIncreased, mostDecreased };
    const insights = generateInsights(categories, topSubcategories, growth, currency);

    return {
        summary,
        categories,
        topSubcategories,
        concentration,
        growth,
        insights,
    };
}
