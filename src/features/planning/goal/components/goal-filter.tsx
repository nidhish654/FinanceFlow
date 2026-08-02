"use client";

import { cn } from "@/lib/utils";

export type GoalFilterValue =
    | "All"
    | "Pending"
    | "Completed";

interface GoalFilterProps {
    value: GoalFilterValue;

    onChange: (
        value: GoalFilterValue
    ) => void;
}

const OPTIONS: GoalFilterValue[] = [
    "All",
    "Pending",
    "Completed",
];

const DESCRIPTIONS: Record<
    GoalFilterValue,
    string
> = {
    All: "All savings goals",

    Pending:
        "Goals still in progress",

    Completed:
        "Completed savings goals",
};

export default function GoalFilter({
    value,
    onChange,
}: GoalFilterProps) {
    return (
        <div className="flex flex-col gap-1.5">

            <div className="flex items-center gap-2">

                <div
                    className="
                        flex
                        gap-1
                        overflow-x-auto
                        rounded-xl
                        border
                        bg-muted/40
                        p-1
                        no-scrollbar
                    "
                >
                    {OPTIONS.map((option) => (
                        <button
                            key={option}
                            onClick={() =>
                                onChange(option)
                            }
                            className={cn(
                                "whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium transition-all",

                                value === option
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <p className="hidden text-xs text-muted-foreground sm:block">
                    {
                        DESCRIPTIONS[
                        value
                        ]
                    }
                </p>

            </div>

        </div>
    );
}