"use client";

import { BudgetView } from "../types/budget-view";

interface BudgetInsightCardProps {
    budget: BudgetView;
}

export default function BudgetInsightCard({
    budget,
}: BudgetInsightCardProps) {
    const {
        isTypical,
        title,
        message,
        period,
    } = budget;

    return (
        <div
            className={`
                rounded-2xl
                border
                p-5
                transition-all
                ${
                    isTypical
                        ? `
                            border-emerald-500/20
                            bg-emerald-500/5
                        `
                        : `
                            border-amber-500/20
                            bg-amber-500/5
                        `
                }
            `}
        >
            <div className="flex items-start gap-4">

                <div
                    className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-lg
                        font-semibold
                        ${
                            isTypical
                                ? `
                                    bg-emerald-500/10
                                    text-emerald-600
                                    dark:text-emerald-400
                                `
                                : `
                                    bg-amber-500/10
                                    text-amber-600
                                    dark:text-amber-400
                                `
                        }
                    `}
                >
                    {isTypical ? "✓" : "⚠"}
                </div>

                <div className="min-w-0 flex-1">

                    <h4
                        className={`
                            text-base
                            font-semibold
                            tracking-tight
                            ${
                                isTypical
                                    ? `
                                        text-emerald-700
                                        dark:text-emerald-300
                                    `
                                    : `
                                        text-amber-700
                                        dark:text-amber-300
                                    `
                            }
                        `}
                    >
                        {title}
                    </h4>

                    <p
                        className={`
                            mt-2
                            whitespace-pre-line
                            text-sm
                            leading-6
                            ${
                                isTypical
                                    ? `
                                        text-emerald-700/90
                                        dark:text-emerald-300/90
                                    `
                                    : `
                                        text-amber-700/90
                                        dark:text-amber-300/90
                                    `
                            }
                            `}
                        >
                        {isTypical
                            ? `This duration closely matches a standard ${period.toLowerCase()} budgeting cycle.`
                            : message}
                    </p>

                </div>

            </div>
        </div>
    );
}