export const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
});

export function formatCurrency(value: number): string {
    return currencyFormatter.format(value);
}