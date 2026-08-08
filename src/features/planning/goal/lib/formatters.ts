import { formatCurrency } from "@/lib/formatters";

/**
 * Formats a currency amount.
 */
export function formatGoalAmount(
    amount: number,
    currency: string,
    locale = "en-IN"
): string {
    return formatCurrency(amount, currency);
}

/**
 * Formats a progress percentage.
 */
export function formatGoalProgress(
    progress: number
): string {
    return `${progress.toFixed(1)}%`;
}

/**
 * Formats the target date.
 */
export function formatGoalDate(
    date: Date | null,
    locale = "en-IN"
): string | null {
    if (!date) {
        return null;
    }

    return new Intl.DateTimeFormat(
        locale,
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    ).format(date);
}