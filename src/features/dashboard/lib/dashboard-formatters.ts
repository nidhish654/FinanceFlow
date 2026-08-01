/**
 * Returns the preferred locale
 * for a given currency.
 */
export function getCurrencyLocale(
    currency: string
): string {
    switch (currency) {
        case "JPY":
            return "ja-JP";

        case "INR":
            return "en-IN";

        default:
            return "en-US";
    }
}

/**
 * Formats a currency amount.
 */
export function formatCurrency(
    amount: number,
    currency: string,
    locale = getCurrencyLocale(
        currency
    )
): string {
    return new Intl.NumberFormat(
        locale,
        {
            style: "currency",

            currency,

            minimumFractionDigits: 0,

            maximumFractionDigits: 2,
        }
    ).format(amount);
}

/**
 * Formats a percentage value.
 */
export function formatPercentage(
    value: number,
    decimals = 1
): string {
    return `${value.toFixed(
        decimals
    )}%`;
}

/**
 * Formats a plain number using
 * the current locale.
 */
export function formatNumber(
    value: number,
    locale = "en-IN"
): string {
    return new Intl.NumberFormat(
        locale
    ).format(value);
}

/**
 * Formats a date for dashboard display.
 */
export function formatDashboardDate(
    date: Date,
    currency: string
): string {
    return new Intl.DateTimeFormat(
        getCurrencyLocale(currency),
        {
            day: "numeric",
            month: "short",
        }
    ).format(date);
}