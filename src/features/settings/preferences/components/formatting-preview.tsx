"use client";

import { DateFormat, TimeFormat, NumberFormat } from "@prisma/client";

interface FormattingPreviewProps {
    dateFormat: DateFormat;
    timeFormat: TimeFormat;
    numberFormat: NumberFormat;
}

export function FormattingPreview({
    dateFormat,
    timeFormat,
    numberFormat,
}: FormattingPreviewProps) {
    // Format dummy date: December 31, 2026 16:45:00
    const dummyDate = new Date(2026, 11, 31, 16, 45, 0);

    const getFormattedDate = () => {
        const day = "31";
        const month = "12";
        const year = "2026";

        switch (dateFormat) {
            case "DD_MM_YYYY":
                return `${day}/${month}/${year}`;
            case "MM_DD_YYYY":
                return `${month}/${day}/${year}`;
            case "YYYY_MM_DD":
                return `${year}-${month}-${day}`;
            default:
                return `${day}/${month}/${year}`;
        }
    };

    const getFormattedTime = () => {
        switch (timeFormat) {
            case "H12":
                return "4:45 PM";
            case "H24":
                return "16:45";
            default:
                return "16:45";
        }
    };

    const getFormattedNumber = (value: number) => {
        // Simple mock formatting for preview purposes
        const absValue = Math.abs(value);
        let formatted = "";

        switch (numberFormat) {
            case "INDIAN":
                // e.g. 12,34,567.89
                if (absValue === 1234567.89) formatted = "12,34,567.89";
                if (absValue === 8450) formatted = "8,450.00";
                break;
            case "WESTERN":
                // e.g. 1,234,567.89
                if (absValue === 1234567.89) formatted = "1,234,567.89";
                if (absValue === 8450) formatted = "8,450.00";
                break;
            case "EUROPEAN":
                // e.g. 1.234.567,89
                if (absValue === 1234567.89) formatted = "1.234.567,89";
                if (absValue === 8450) formatted = "8.450,00";
                break;
            default:
                formatted = absValue.toString();
        }

        const isNegative = value < 0;
        return isNegative ? `(₹${formatted})` : `₹${formatted}`;
    };

    return (
        <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="mb-4 text-sm font-medium">Preview</h4>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Date</span>
                    <span className="font-medium font-mono text-sm">{getFormattedDate()}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Time</span>
                    <span className="font-medium font-mono text-sm">{getFormattedTime()}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Income</span>
                    <span className="font-medium font-mono text-sm text-emerald-600 dark:text-emerald-500">
                        {getFormattedNumber(1234567.89)}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Expense</span>
                    <span className="font-medium font-mono text-sm text-red-600 dark:text-red-500">
                        {getFormattedNumber(-8450)}
                    </span>
                </div>
            </div>
        </div>
    );
}
