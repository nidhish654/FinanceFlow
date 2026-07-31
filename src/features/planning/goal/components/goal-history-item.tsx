"use client";

import {
    ArrowDownLeft,
    ArrowUpRight,
    Calendar,
    FileText,
} from "lucide-react";

import { GoalHistoryType } from "@prisma/client";

import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { GoalHistoryView } from "../types/goal-history-view";

interface GoalHistoryItemProps {
    entry: GoalHistoryView;
}

export default function GoalHistoryItem({
    entry,
}: GoalHistoryItemProps) {
    const isDeposit =
        entry.type === GoalHistoryType.DEPOSIT;

    const formattedDate = new Intl.DateTimeFormat(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    ).format(new Date(entry.createdAt));

    return (
        <Card
            className="
                rounded-xl
                border
                bg-background
                transition-all
                duration-200
                hover:border-primary/30
                hover:shadow-sm
            "
        >
            <div className="p-4">

                {/* Header */}

                <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-3">

                        <div
                            className={cn(
                                `
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                `,
                                isDeposit
                                    ? "bg-emerald-500/10 text-emerald-600"
                                    : "bg-destructive/10 text-destructive"
                            )}
                        >
                            {isDeposit ? (
                                <ArrowDownLeft className="h-4.5 w-4.5" />
                            ) : (
                                <ArrowUpRight className="h-4.5 w-4.5" />
                            )}
                        </div>

                        <div className="min-w-0">

                            <h3 className="text-base sm:text-lg font-semibold">
                                {isDeposit
                                    ? "Deposit"
                                    : "Withdrawal"}
                            </h3>

                            <div
                                className="
                                    mt-1
                                    flex
                                    items-center
                                    gap-1.5
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                <Calendar className="h-3.5 w-3.5" />

                                <span>
                                    {formattedDate}
                                </span>

                            </div>

                        </div>

                    </div>

                    <p
                        className={cn(
                            `
                            shrink-0
                            text-right
                            text-xl
                            font-bold
                            tracking-tight
                            `,
                            isDeposit
                                ? "text-emerald-600"
                                : "text-destructive"
                        )}
                    >
                        {isDeposit ? "+" : "-"}
                        {entry.formattedAmount}
                    </p>

                </div>

                {/* Note */}

                {entry.note?.trim() && (
                    <div
                        className="
                            mt-4
                            flex
                            items-start
                            gap-2
                        "
                    >
                        <FileText
                            className="
                                mt-0.5
                                h-4
                                w-4
                                shrink-0
                                text-muted-foreground
                            "
                        />

                        <p
                            className="
                                text-sm
                                leading-relaxed
                                text-muted-foreground
                            "
                        >
                            {entry.note}
                        </p>

                    </div>
                )}

            </div>

        </Card>
    );
}