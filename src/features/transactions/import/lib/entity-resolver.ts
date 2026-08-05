import { AccountOption } from "../../components/transaction-toolbar";
import { CategoryOption } from "../../../categories/lib/category-utils";
import { ParsedImportRow, UnknownAccount, UnknownCategory, ResolutionMap } from "../types/import-types";

import { normalizeName } from "./normalize-name";


export function extractUnknownAccounts(
    rows: ParsedImportRow[],
    existingAccounts: AccountOption[]
): UnknownAccount[] {
    const csvNames = new Set<string>();
    
    rows.forEach((row) => {
        if (row.transaction.account && (row.status === "valid" || row.status === "warning")) {
            csvNames.add(row.transaction.account.trim());
        }
    });

    const unknownAccounts: UnknownAccount[] = [];

    Array.from(csvNames).forEach((csvName) => {
        const normalizedCsv = normalizeName(csvName);
        
        // Exact normalized match
        const exactMatch = existingAccounts.find((acc) => normalizeName(acc.name) === normalizedCsv);
        
        if (!exactMatch) {
            // Find a suggested match using a simple includes (could be improved)
            const suggestedMatch = existingAccounts.find((acc) => 
                normalizeName(acc.name).includes(normalizedCsv) || 
                normalizedCsv.includes(normalizeName(acc.name))
            );

            unknownAccounts.push({
                csvName,
                matchedAccountId: suggestedMatch?.id,
            });
        }
    });

    return unknownAccounts;
}

export function extractUnknownCategories(
    rows: ParsedImportRow[],
    existingCategories: CategoryOption[]
): UnknownCategory[] {
    const categoryMap = new Map<string, "income" | "expense">();
    
    rows.forEach((row) => {
        if (row.transaction.category && (row.status === "valid" || row.status === "warning")) {
            const name = row.transaction.category.trim();
            const type = row.transaction.type === "income" ? "income" : "expense";
            // If a category appears as both income and expense in the same CSV, this takes the last seen type.
            // But ideally they map to different types. We'll store it as what it appeared as last.
            categoryMap.set(name, type);
        }
    });

    const unknownCategories: UnknownCategory[] = [];

    Array.from(categoryMap.entries()).forEach(([csvName, transactionType]) => {
        const normalizedCsv = normalizeName(csvName);
        const targetType = transactionType === "income" ? "INCOME" : "EXPENSE";
        
        // Exact normalized match + exact type match (and no parent)
        const exactMatch = existingCategories.find((cat) => 
            normalizeName(cat.name) === normalizedCsv && 
            cat.type === targetType && 
            !cat.parentCategoryId
        );
        
        if (!exactMatch) {
            // Find a suggested match
            const suggestedMatch = existingCategories.find((cat) => 
                cat.type === targetType && 
                !cat.parentCategoryId &&
                (normalizeName(cat.name).includes(normalizedCsv) || 
                normalizedCsv.includes(normalizeName(cat.name)))
            );

            unknownCategories.push({
                csvName,
                transactionType,
                matchedCategoryId: suggestedMatch?.id,
            });
        }
    });

    return unknownCategories;
}
