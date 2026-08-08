"use client";

import { Month } from "@prisma/client";
import { SettingsSectionCard } from "../../components/settings-section-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FinancialCalendarCardProps {
    monthStart: number;
    fiscalYear: Month;
    onChange: (field: "monthStart" | "fiscalYear", value: any) => void;
}

const MONTHS = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

export function FinancialCalendarCard({
    monthStart,
    fiscalYear,
    onChange,
}: FinancialCalendarCardProps) {
    return (
        <SettingsSectionCard
            title="📅 Financial Calendar"
            description="Define when your financial month and fiscal year begins."
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="monthStart">Financial Month Starts On</Label>
                    <p className="text-sm text-muted-foreground">
                        The day of the month your reporting periods begin. Useful for people whose salary cycle starts mid-month.
                    </p>
                    <Select
                        value={monthStart.toString()}
                        onValueChange={(value) => onChange("monthStart", parseInt(value, 10))}
                    >
                        <SelectTrigger id="monthStart" className="w-full sm:max-w-xs">
                            <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                                <SelectItem key={day} value={day.toString()}>
                                    {day}{day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"} of the month
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="fiscalYear">Fiscal Year Starts In</Label>
                    <p className="text-sm text-muted-foreground">
                        The month your yearly reporting begins (e.g., April for India/UK, January for US).
                    </p>
                    <Select
                        value={fiscalYear}
                        onValueChange={(value) => onChange("fiscalYear", value as Month)}
                    >
                        <SelectTrigger id="fiscalYear" className="w-full sm:max-w-xs">
                            <SelectValue placeholder="Select a month" />
                        </SelectTrigger>
                        <SelectContent>
                            {MONTHS.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {month.charAt(0) + month.slice(1).toLowerCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </SettingsSectionCard>
    );
}
