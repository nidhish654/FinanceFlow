"use client";

import { cn } from "@/lib/utils";

export type BudgetFilterValue = "Current" | "Completed" | "Weekly" | "Monthly" | "Yearly" | "Custom";

interface BudgetFilterProps {
    value: BudgetFilterValue;
    onChange: (value: BudgetFilterValue) => void;
}

const OPTIONS: BudgetFilterValue[] = ["Current", "Completed", "Weekly", "Monthly", "Yearly", "Custom"];

const DESCRIPTIONS: Record<BudgetFilterValue, string> = {
    Current: "Budgets active today",
    Completed: "Budgets completed",
    Weekly: "Weekly budgets",
    Monthly: "Monthly budgets",
    Yearly: "Yearly budgets",
    Custom: "Custom period budgets",
};

export default function BudgetFilter({ value, onChange }: BudgetFilterProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
                <div className="flex overflow-x-auto no-scrollbar gap-1 rounded-xl border bg-muted/40 p-1">
                    {OPTIONS.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => onChange(opt)}
                            className={cn(
                                "whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium transition-all",
                                value === opt
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground hidden sm:block">
                    {DESCRIPTIONS[value]}
                </p>
            </div>
        </div>
    );
}
