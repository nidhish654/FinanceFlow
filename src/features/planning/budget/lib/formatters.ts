export function formatShortDate(
    date: Date,
    locale = "en-IN"
) {
    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
    }).format(date);
}