import { useMemo } from "react";
import { DateRange } from "react-day-picker";
import {
    isSameDay,
    isSameMonth,
    isSameWeek,
    isSameYear,
    isWithinInterval,
    subMonths,
} from "date-fns";

import { TransactionDto } from "../types/transaction";
import { PeriodFilter } from "@/components/filters/filter-popover";
import { endOfDay } from "date-fns";

interface Filters {
    transactions: TransactionDto[];

    search: string;

    period: PeriodFilter;

    dateRange: DateRange | undefined;

    type: string;

    category: string;

    account: string;

    priority: string;
}

export function useTransactionFilters({
    transactions,
    search,
    period,
    dateRange,
    type,
    category,
    account,
    priority,
}: Filters) {
    return useMemo(() => {
        const now = new Date();

        return transactions.filter((transaction) => {
            // Search

            if (search.trim()) {
                const value = search.toLowerCase();

                const matches = [
                    transaction.description,
                    transaction.merchant,
                    transaction.notes,
                    transaction.referenceNumber,
                    transaction.category?.name,
                    transaction.account.name,
                ]
                    .filter(Boolean)
                    .some((field) =>
                        field!
                            .toLowerCase()
                            .includes(value)
                    );

                if (!matches) return false;
            }

            // Type

            if (
                type !== "all" &&
                transaction.type !== type
            ) {
                return false;
            }

            // Category

            // Category
            if (category !== "all") {
                const transactionCategory = transaction.category;

                if (!transactionCategory) {
                    return false;
                }

                const matchesCategory =
                    transactionCategory.id === category ||
                    transactionCategory.parent?.id === category;

                if (!matchesCategory) {
                    return false;
                }
            }

            // Account

            if (
                account !== "all" &&
                transaction.account.id !== account
            ) {
                return false;
            }

            // Priority

            if (
                priority !== "all" &&
                transaction.priority !== priority
            ) {
                return false;
            }

            // Date

            const date = new Date(
                transaction.transactionDate
            );

            switch (period) {
                case "today":
                    return isSameDay(date, now);

                case "week":
                    return isSameWeek(
                        date,
                        now,
                        {
                            weekStartsOn: 1,
                        }
                    );

                case "month":
                    return isSameMonth(date, now);

                case "last-month":
                    return isSameMonth(
                        date,
                        subMonths(now, 1)
                    );

                case "year":
                    return isSameYear(date, now);

                case "custom":
                    if (
                        !dateRange?.from ||
                        !dateRange?.to
                    ) {
                        return true;
                    }

                    return isWithinInterval(
                        date,
                        {
                            start: dateRange.from,
                            end: endOfDay(dateRange.to),
                        }
                    );

                default:
                    return true;
            }
        });
    }, [
        transactions,
        search,
        period,
        dateRange,
        type,
        category,
        account,
        priority,
    ]);
}