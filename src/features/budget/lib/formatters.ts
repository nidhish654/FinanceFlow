export function formatCurrency(
    amount: number,
    currency: string,
    locale = "en-IN"
) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(amount);
}

export function formatShortDate(
    date: Date,
    locale = "en-IN"
) {
    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
    }).format(date);
}