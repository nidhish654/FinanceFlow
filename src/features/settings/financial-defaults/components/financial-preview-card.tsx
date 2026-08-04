"use client";

import { Month } from "@prisma/client";
import { format } from "date-fns";
import { getFinancialMonthRange, getFiscalYearRange } from "@/lib/finance/financial-period";

interface FinancialPreviewCardProps {
    defaultAccountId: string | null;
    accounts: { id: string; name: string }[];
    monthStart: number;
    fiscalYear: Month;
}

export function FinancialPreviewCard({
    defaultAccountId,
    accounts,
    monthStart,
    fiscalYear,
}: FinancialPreviewCardProps) {
    const defaultAccount = accounts.find((a) => a.id === defaultAccountId);
    const today = new Date();
    
    const currentMonthRange = getFinancialMonthRange(today, monthStart);
    const currentFiscalRange = getFiscalYearRange(today, fiscalYear, monthStart);

    return (
        <div className="rounded-lg border bg-muted/30 p-4">
            <h4 className="mb-4 text-sm font-medium">Live Preview</h4>
            <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Default Account</span>
                    <span className="font-medium text-sm">
                        {defaultAccount ? defaultAccount.name : "None selected"}
                    </span>
                </div>
                
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Current Financial Month</span>
                    <span className="font-medium text-sm text-primary">
                        {format(currentMonthRange.start, "d MMM yyyy")} - {format(currentMonthRange.end, "d MMM yyyy")}
                    </span>
                </div>
                
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Current Fiscal Year</span>
                    <span className="font-medium text-sm text-primary">
                        {format(currentFiscalRange.start, "d MMM yyyy")} - {format(currentFiscalRange.end, "d MMM yyyy")}
                    </span>
                </div>
            </div>
        </div>
    );
}
