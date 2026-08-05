import { ParsedCSVResult } from "./parse-csv";
import { ColumnMapping } from "./detect-columns";
import {
    ParsedImportRow,
    ImportRowStatus,
} from "../types/import-types";
import { ImportTransaction } from "../schemas/import-schema";

/**
 * Parses dates safely.
 *
 * Supported formats:
 * - DD-MM-YYYY
 * - DD/MM/YYYY
 * - YYYY-MM-DD
 * - Any valid ISO date
 */
function parseDate(value: string): Date | null {
    const input = value.trim();

    // DD-MM-YYYY
    let match = input.match(/^(\d{2})-(\d{2})-(\d{4})$/);

    if (!match) {
        // DD/MM/YYYY
        match = input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    }

    if (match) {
        const [, day, month, year] = match;

        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );

        if (
            date.getFullYear() !== Number(year) ||
            date.getMonth() !== Number(month) - 1 ||
            date.getDate() !== Number(day)
        ) {
            return null;
        }

        return date;
    }

    // Fallback (ISO etc.)
    const isoDate = new Date(input);

    if (isNaN(isoDate.getTime())) {
        return null;
    }

    return isoDate;
}

export function validateImport(
    parsedCSV: ParsedCSVResult,
    mapping: ColumnMapping
): ParsedImportRow[] {
    return parsedCSV.rows.map((row, index) => {
        const errors: string[] = [];
        const warnings: string[] = [];

        const transaction: Partial<ImportTransaction> = {};

        /**
         * Reads a mapped value from the CSV.
         */
        const getVal = (financeFlowField: string) => {
            const csvColumn = mapping[financeFlowField];

            if (!csvColumn) {
                return undefined;
            }

            const value = row[csvColumn];

            if (typeof value === "string") {
                return value.trim();
            }

            return value;
        };

        // -----------------------------
        // Date
        // -----------------------------

        const dateValue = getVal("date");

        if (!dateValue) {
            errors.push("Missing Date.");
        } else {
            const parsedDate = parseDate(String(dateValue));

            if (!parsedDate) {
                errors.push("Invalid Date format.");
            } else {
                transaction.date = parsedDate;
            }
        }

        // -----------------------------
        // Account
        // -----------------------------

        const account = getVal("account");

        if (!account) {
            errors.push("Missing Account.");
        } else {
            transaction.account = String(account);
        }

        // -----------------------------
        // Category
        // -----------------------------

        const category = getVal("category");

        if (!category) {
            errors.push("Missing Category.");
        } else {
            transaction.category = String(category);
        }

        // -----------------------------
        // Priority
        // -----------------------------

        const priority = getVal("priority");

        if (!priority) {
            errors.push("Missing Priority.");
        } else {
            const normalizedPriority = String(priority)
                .trim()
                .toLowerCase();

            if (
                normalizedPriority === "need" ||
                normalizedPriority === "want" ||
                normalizedPriority === "savings"
            ) {
                transaction.priority = normalizedPriority;
            } else {
                errors.push(
                    "Priority must be Need, Want or Savings."
                );
            }
        }

        // -----------------------------
        // Credit / Debit
        // -----------------------------

        const creditRaw = getVal("credit");
        const debitRaw = getVal("debit");

        const credit =
            creditRaw !== undefined &&
                creditRaw !== null &&
                creditRaw !== ""
                ? parseFloat(
                    String(creditRaw).replace(/,/g, "")
                )
                : null;

        const debit =
            debitRaw !== undefined &&
                debitRaw !== null &&
                debitRaw !== ""
                ? parseFloat(
                    String(debitRaw).replace(/,/g, "")
                )
                : null;

        const hasCredit =
            credit !== null && !Number.isNaN(credit);

        const hasDebit =
            debit !== null && !Number.isNaN(debit);

        if (hasCredit && hasDebit) {
            errors.push(
                "Both Credit and Debit contain values."
            );
        } else if (!hasCredit && !hasDebit) {
            errors.push(
                "Either Credit or Debit must contain a value."
            );
        } else if (hasCredit) {
            if (credit <= 0) {
                errors.push(
                    "Credit amount must be greater than zero."
                );
            }

            transaction.type = "income";
            transaction.amount = credit;
        } else if (hasDebit) {
            if (debit <= 0) {
                errors.push(
                    "Debit amount must be greater than zero."
                );
            }

            transaction.type = "expense";
            transaction.amount = debit;
        }

        // -----------------------------
        // Optional fields
        // -----------------------------

        transaction.description =
            getVal("description") || undefined;

        transaction.merchant =
            getVal("merchant") || undefined;

        transaction.referenceNumber =
            getVal("referenceNumber") || undefined;

        transaction.notes =
            getVal("notes") || undefined;

        // -----------------------------
        // Final Status
        // -----------------------------

        let status: ImportRowStatus = "valid";

        if (errors.length > 0) {
            status = "error";
        } else if (warnings.length > 0) {
            status = "warning";
        }

        return {
            originalIndex: index + 1,
            transaction,
            status,
            errors,
            warnings,
            rawData: row,
        };
    });
}