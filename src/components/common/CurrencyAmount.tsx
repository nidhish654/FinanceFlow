interface CurrencyAmountProps {
    amount: number;
    currency: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

export default function CurrencyAmount({
    amount,
    currency,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
}: CurrencyAmountProps) {
    const formattedAmount = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(amount);

    return (
        <span className="tabular-nums">
            {formattedAmount}
        </span>
    );
}