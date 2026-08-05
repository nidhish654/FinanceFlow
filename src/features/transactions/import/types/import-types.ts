import { ImportTransaction } from "../schemas/import-schema";

export type ImportRowStatus = "valid" | "warning" | "error";

export interface ParsedImportRow {
    originalIndex: number;
    transaction: Partial<ImportTransaction>;
    status: ImportRowStatus;
    errors: string[];
    warnings: string[];
    rawData: Record<string, any>;
}

export interface ResolutionMap {
    [csvName: string]: {
        type: "create" | "existing";
        newName?: string; // If creating
        existingId?: string; // If mapping to existing
        transactionType?: "income" | "expense"; // Passed explicitly for categories
    };
}

export interface UnknownAccount {
    csvName: string;
    matchedAccountId?: string; // If we found a high-confidence match
}

export interface UnknownCategory {
    csvName: string;
    transactionType: "income" | "expense";
    matchedCategoryId?: string; // If we found a high-confidence match
}

