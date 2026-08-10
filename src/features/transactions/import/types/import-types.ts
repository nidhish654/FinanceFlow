import { ImportTransaction } from "../schemas/import-schema";

export type ImportRowStatus =
    | "valid"
    | "warning"
    | "error";

export interface ParsedImportRow {
    originalIndex: number;
    transaction: Partial<ImportTransaction>;
    status: ImportRowStatus;
    errors: string[];
    warnings: string[];
    rawData: Record<string, any>;
}

export interface ResolutionMap {
    [csvName: string]:
    | {
        type: "create";
        newName: string;
        newDescription?: string;
        newIcon: string;
        transactionType?: "income" | "expense";
    }
    | {
        type: "existing";
        existingId: string;
        transactionType?: "income" | "expense";
    };
}

export interface UnknownAccount {
    csvName: string;
    matchedAccountId?: string;
}

export interface UnknownCategory {
    csvName: string;
    transactionType: "income" | "expense";
    matchedCategoryId?: string;
}