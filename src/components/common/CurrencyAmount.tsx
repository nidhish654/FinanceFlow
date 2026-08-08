import { formatCurrency } from "@/lib/formatters";

interface CurrencyAmountProps {
    amount: number;
    currency: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

export default function CurrencyAmount({
    amount,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
}: CurrencyAmountProps) {
    const formattedAmount = formatCurrency(
        amount,
        currency,
        minimumFractionDigits,
        maximumFractionDigits
    );

    return (
        <span className="tabular-nums">
            {formattedAmount}
        </span>
    );
}