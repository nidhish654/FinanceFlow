"use client";

import { DateRange } from "react-day-picker";
import {
    CalendarDays,
    ChevronDown,
    Landmark,
    RotateCcw,
    Tag,
    Wallet,
    Flag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type PeriodFilter =
    | "all"
    | "today"
    | "week"
    | "month"
    | "last-month"
    | "year"
    | "custom";

interface CategoryOption {
    id: string;
    name: string;
}

interface AccountOption {
    id: string;
    name: string;
}

interface FilterPopoverProps {
    children: React.ReactNode;
    showPeriod?: boolean;
    showType?: boolean;
    showCategory?: boolean;
    showAccount?: boolean;
    showPriority?: boolean;
    showSavingsPriority?: boolean

    period: PeriodFilter;
    onPeriodChange: (
        value: PeriodFilter
    ) => void;

    type: string;
    onTypeChange: (
        value: string
    ) => void;

    category: string;
    onCategoryChange: (
        value: string
    ) => void;

    account: string;
    onAccountChange: (
        value: string
    ) => void;

    priority: string;
    onPriorityChange: (
        value: string
    ) => void;

    dateRange:
    | DateRange
    | undefined;

    onDateRangeChange: (
        value:
            | DateRange
            | undefined
    ) => void;

    categories: CategoryOption[];

    accounts: AccountOption[];
}

export default function FilterPopover({
    children,
    showCategory = true,
    showPeriod = true,
    showType = true,
    showAccount = true,
    showPriority = true,
    showSavingsPriority = true,

    period,
    onPeriodChange,
    type,
    onTypeChange,
    category,
    onCategoryChange,
    account,
    onAccountChange,
    priority,
    onPriorityChange,
    dateRange,
    onDateRangeChange,
    categories,
    accounts,
}: FilterPopoverProps) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const update = () => setIsMobile(mediaQuery.matches);

        update();

        mediaQuery.addEventListener("change", update);

        return () =>
            mediaQuery.removeEventListener(
                "change",
                update
            );
    }, []);

    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>

            <PopoverContent
                align="start"
                sideOffset={8}
                className="
                    w-auto
                    max-w-[95vw]
                    overflow-auto
                    p-5
                "
            >

                <div className="mb-5">

                    <h3 className="text-lg font-semibold">
                        Filters
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Narrow down your transactions.
                    </p>

                </div>
                <div className="flex flex-col gap-4">

                    {showPeriod && (
                        <Select
                            value={period}
                            onValueChange={(value) =>
                                onPeriodChange(
                                    value as PeriodFilter
                                )
                            }
                        >
                            <SelectTrigger className="h-10">
                                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="all">
                                    All Time
                                </SelectItem>

                                <SelectItem value="today">
                                    Today
                                </SelectItem>

                                <SelectItem value="week">
                                    This Week
                                </SelectItem>

                                <SelectItem value="month">
                                    This Month
                                </SelectItem>

                                <SelectItem value="last-month">
                                    Last Month
                                </SelectItem>

                                <SelectItem value="year">
                                    This Year
                                </SelectItem>

                                <SelectItem value="custom">
                                    Custom Range
                                </SelectItem>

                            </SelectContent>
                        </Select>
                    )}

                    <div className="flex flex-col gap-4">
                        {showType && (
                            <Select
                                value={type}
                                onValueChange={onTypeChange}
                            >
                                <SelectTrigger className="h-10">
                                    <Wallet className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="all">
                                        All Types
                                    </SelectItem>

                                    <SelectItem value="INCOME">
                                        Income
                                    </SelectItem>

                                    <SelectItem value="EXPENSE">
                                        Expense
                                    </SelectItem>

                                    <SelectItem value="TRANSFER">
                                        Transfer
                                    </SelectItem>

                                </SelectContent>

                            </Select>
                        )}
                    </div>

                    {showCategory && (
                        <Select
                            value={category}
                            onValueChange={
                                onCategoryChange
                            }
                        >
                            <SelectTrigger className="h-10">
                                <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>

                                {categories.map(
                                    (category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    )
                                )}

                            </SelectContent>

                        </Select>
                    )}

                    {showAccount && (
                        <Select
                            value={account}
                            onValueChange={
                                onAccountChange
                            }
                        >
                            <SelectTrigger className="h-10">
                                <Landmark className="mr-2 h-4 w-4 text-muted-foreground" />
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="all">
                                    All Accounts
                                </SelectItem>

                                {accounts.map(
                                    (account) => (
                                        <SelectItem
                                            key={account.id}
                                            value={account.id}
                                        >
                                            {account.name}
                                        </SelectItem>
                                    )
                                )}

                            </SelectContent>

                        </Select>
                    )}

                    {showPriority && (
                        <Select
                            value={priority}
                            onValueChange={
                                onPriorityChange
                            }
                        >
                            <SelectTrigger className="h-10">
                                <Flag className="mr-2 h-4 w-4 text-muted-foreground" />
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="all">
                                    All Priorities
                                </SelectItem>

                                <SelectItem value="NEED">
                                    Need
                                </SelectItem>

                                <SelectItem value="WANT">
                                    Want
                                </SelectItem>

                                {showSavingsPriority && (
                                    <SelectItem value="SAVINGS">
                                        Savings
                                    </SelectItem>
                                )}

                            </SelectContent>

                        </Select>
                    )}
                </div>
                {period === "custom" && (
                    <Popover>

                        <PopoverTrigger asChild>

                            <Button
                                variant="outline"
                                className="w-full justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4" />

                                    {dateRange?.from ? (
                                        dateRange.to ? (
                                            <>
                                                {format(dateRange.from, "dd MMM")} -{" "}
                                                {format(dateRange.to, "dd MMM")}
                                            </>
                                        ) : (
                                            format(dateRange.from, "dd MMM")
                                        )
                                    ) : (
                                        "Select Date Range"
                                    )}
                                </div>

                                <ChevronDown className="h-4 w-4 opacity-60" />

                            </Button>

                        </PopoverTrigger>

                        <PopoverContent
                            align="start"
                            className="w-auto p-0"
                        >

                            <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={onDateRangeChange}
                                numberOfMonths={isMobile ? 1 : 2}
                                captionLayout="dropdown"
                            />

                        </PopoverContent>

                    </Popover>
                )}
                <div className="mt-6 flex items-center justify-between border-t pt-4">

                    <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => {
                            if (showPeriod) {
                                onPeriodChange("all");
                                onDateRangeChange(undefined);
                            }

                            if (showType) {
                                onTypeChange("all");
                            }

                            if (showCategory) {
                                onCategoryChange("all");
                            }

                            if (showAccount) {
                                onAccountChange("all");
                            }

                            if (showPriority) {
                                onPriorityChange("all");
                            }
                        }}
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset Filters
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </Button>

                </div>

            </PopoverContent>

        </Popover>
    );
}