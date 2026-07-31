"use client";

import { History } from "lucide-react";

import GoalHistoryItem from "./goal-history-item";

import { GoalHistoryView } from "../types/goal-history-view";

interface GoalHistoryListProps {
    history: GoalHistoryView[];
}

export default function GoalHistoryList({
    history,
}: GoalHistoryListProps) {
    if (history.length === 0) {
        return (
            <div
                className="
                    flex
                    min-h-[420px]
                    flex-col
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-dashed
                    bg-background
                    px-8
                    text-center
                "
            >
                <div
                    className="
                        mb-6
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/10
                    "
                >
                    <History
                        className="
                            h-8
                            w-8
                            text-primary
                        "
                    />
                </div>

                <h3
                    className="
                        text-xl
                        font-semibold
                    "
                >
                    No Transactions Yet
                </h3>

                <p
                    className="
                        mt-3
                        max-w-sm
                        text-sm
                        leading-relaxed
                        text-muted-foreground
                    "
                >
                    Deposits and withdrawals will
                    appear here as you start saving
                    towards this goal.
                </p>
            </div>
        );
    }

    return (
        <div
            className="
                mx-auto
                flex
                max-w-3xl
                flex-col
                gap-3
                pb-2
            "
        >
            {history.map((entry) => (
                <GoalHistoryItem
                    key={entry.id}
                    entry={entry}
                />
            ))}
        </div>
    );
}