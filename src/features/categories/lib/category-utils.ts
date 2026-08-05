import { TransactionType, CategoryType } from "@prisma/client";

export interface CategoryOption {
    id: string;
    name: string;
    type: CategoryType;
    parentCategoryId: string | null;
}

export function filterCategoriesByTransactionType(
    categories: CategoryOption[],
    transactionType: TransactionType
): CategoryOption[] {
    const targetType = transactionType === TransactionType.INCOME ? CategoryType.INCOME : CategoryType.EXPENSE;
    
    return categories.filter(
        (category) =>
            category.type === targetType && !category.parentCategoryId
    );
}

// Will be used if needed
export function isSameCategory(c1: string, c2: string): boolean {
    return c1.trim().toLowerCase() === c2.trim().toLowerCase();
}
