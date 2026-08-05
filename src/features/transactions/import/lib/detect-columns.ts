import { COLUMN_ALIASES } from "./column-aliases";

export type ColumnMapping = Record<string, string | null>;

/**
 * Detects mapping from FinanceFlow fields to CSV headers based on aliases.
 * @param csvHeaders Array of headers found in the CSV.
 * @returns A mapping object where keys are FinanceFlow fields (e.g. 'date', 'amount') and values are the matched CSV headers.
 */
export function detectColumns(csvHeaders: string[]): ColumnMapping {
    const mapping: ColumnMapping = {
        date: null,
        description: null,
        account: null,
        category: null,
        credit: null,
        debit: null,
        priority: null,
        merchant: null,
        referenceNumber: null,
        notes: null,
    };

    const unmappedHeaders = new Set(csvHeaders);

    for (const [ffField, aliases] of Object.entries(COLUMN_ALIASES)) {
        for (const alias of aliases) {
            // Find a case-insensitive match in the available CSV headers
            const match = Array.from(unmappedHeaders).find(
                (header) => header.toLowerCase().trim() === alias
            );

            if (match) {
                mapping[ffField] = match;
                unmappedHeaders.delete(match);
                break; // Move to the next FinanceFlow field once mapped
            }
        }
    }

    return mapping;
}
