export function getLocaleForCurrency(currency: string): string {
    switch (currency) {
        case "JPY":
            return "ja-JP";
        case "INR":
            return "en-IN";
        case "USD":
            return "en-US";
        case "EUR":
            return "de-DE";
        case "GBP":
            return "en-GB";
        default:
            return "en-US";
    }
}

export function formatCurrency(
    value: number,
    currency: string = "INR",
    minimumFractionDigits?: number,
    maximumFractionDigits?: number
): string {
    const defaultFractionDigits = currency === "JPY" ? 0 : 2;
    
    return new Intl.NumberFormat(getLocaleForCurrency(currency), {
        style: "currency",
        currency,
        minimumFractionDigits: minimumFractionDigits ?? defaultFractionDigits,
        maximumFractionDigits: maximumFractionDigits ?? defaultFractionDigits,
    }).format(value);
}