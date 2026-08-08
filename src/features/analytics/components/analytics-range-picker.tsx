"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import {
    ANALYTICS_RANGES,
    AnalyticsRange,
    AnalyticsDateRange,
} from "@/features/analytics/types/analytics-view";

interface AnalyticsRangePickerProps {
    range: AnalyticsRange;
    customRange?: AnalyticsDateRange;

    onApply: (range: {
        startDate: Date;
        endDate: Date;
    }) => void;
}

export default function AnalyticsRangePicker({
    range,
    customRange,
    onApply,
}: AnalyticsRangePickerProps) {
    const isMobile = useIsMobile();
    const mobileRangeRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    const [dateRange, setDateRange] =
        useState<DateRange | undefined>(
            customRange
                ? {
                    from: customRange.startDate,
                    to: customRange.endDate,
                }
                : undefined
        );

    const handleApply = () => {
        if (!dateRange?.from || !dateRange?.to) return;

        onApply({
            startDate: dateRange.from,
            endDate: dateRange.to,
        });

        setOpen(false);
    };

    const CalendarView = (
        <div className="space-y-4 p-4">

            <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={isMobile ? 1 : 2}
                captionLayout="dropdown"
            />

            <div className="flex justify-end gap-2">

                <Button
                    variant="ghost"
                    onClick={() => {
                        setDateRange(undefined);
                        setOpen(false);
                    }}
                >
                    Cancel
                </Button>

                <Button
                    disabled={
                        !dateRange?.from ||
                        !dateRange?.to
                    }
                    onClick={handleApply}
                >
                    Apply
                </Button>

            </div>

        </div>
    );

    useEffect(() => {
        const container = mobileRangeRef.current;

        if (!container) return;

        const selected = container.querySelector(
            `[data-range="${range}"]`
        ) as HTMLElement | null;

        if (!selected) return;

        const maxScroll =
            container.scrollWidth - container.clientWidth;

        const left = Math.max(
            0,
            Math.min(
                selected.offsetLeft -
                container.clientWidth / 2 +
                selected.clientWidth / 2,
                maxScroll
            )
        );

        container.scrollTo({
            left,
            behavior: "smooth",
        });
    }, [range]);

    return (
        <>
            {/* --------------------------
               Mobile
            --------------------------- */}

            {isMobile ? (
                <>
                    <div className="relative md:hidden">

                        {/* Left Fade */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                left-0
                                top-0
                                z-10
                                h-full
                                w-6
                            "
                        />

                        {/* Right Fade */}
                        <div
                            className="
                            pointer-events-none
                            absolute
                            right-0
                            top-0
                            z-10
                            h-full
                            w-6
                        "
                        />

                        <div
                            ref={mobileRangeRef}
                            className="
                            overflow-x-auto
                            scrollbar-hide
                            snap-x
                            snap-mandatory
                            pl-4
                            pr-0
                        "
                        >
                            <div
                                className="
                                    inline-flex
                                    w-max
                                    items-center
                                    gap-1
                                    sm:rounded-full
                                    border
                                    bg-muted/40
                                    p-1
                                "
                            >

                                {ANALYTICS_RANGES.map((item) => {

                                    if (item === "CUSTOM") {
                                        return (
                                            <Button
                                                key={item}
                                                size="sm"
                                                variant={
                                                    range === "CUSTOM"
                                                        ? "secondary"
                                                        : "ghost"
                                                }
                                                className={cn(
                                                    `
                                            snap-start
                                            rounded-full
                                            px-3
                                            h-8
                                            whitespace-nowrap
                                            `,
                                                    range === "CUSTOM" &&
                                                    "bg-background shadow-sm font-semibold"
                                                )}
                                                onClick={() => setOpen(true)}
                                            >
                                                {range === "CUSTOM" &&
                                                    customRange
                                                    ? `${format(
                                                        customRange.startDate,
                                                        "MMM d"
                                                    )} – ${format(
                                                        customRange.endDate,
                                                        "MMM d"
                                                    )}`
                                                    : "Custom"}
                                            </Button>
                                        );
                                    }

                                    return (
                                        <Button
                                            key={item}
                                            asChild
                                            size="sm"
                                            variant={
                                                range === item
                                                    ? "secondary"
                                                    : "ghost"
                                            }
                                            className={cn(
                                                `
                                                snap-start
                                                whitespace-nowrap
                                                rounded-full
                                                h-8
                                                px-3
                                                text-sm
                                                `,
                                                range === item &&
                                                "bg-background shadow-sm font-semibold"
                                            )}
                                        >
                                            <Link href={`/analytics?range=${item}`}>
                                                {item}
                                            </Link>
                                        </Button>
                                    );
                                })}

                            </div>
                        </div>
                    </div >

                    <Sheet
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <SheetContent
                            side="bottom"
                            className="h-[90vh]"
                        >
                            {CalendarView}
                        </SheetContent>
                    </Sheet>
                </>
            ) : (
                /* --------------------------
                   Desktop
                --------------------------- */

                <div className="hidden md:block">
                    <div
                        className="
            inline-flex
            rounded-full
            border
            bg-muted/40
            p-1.5
        "
                    >

                        {ANALYTICS_RANGES.map((item) => {

                            if (item === "CUSTOM") {
                                return (
                                    <Popover
                                        key={item}
                                        open={open}
                                        onOpenChange={setOpen}
                                    >
                                        <PopoverTrigger asChild>

                                            <Button
                                                size="sm"
                                                variant={
                                                    range === "CUSTOM"
                                                        ? "secondary"
                                                        : "ghost"
                                                }
                                                className={cn(
                                                    `
                                                    whitespace-nowrap
                                                    rounded-full
                                                    px-5
                                                    py-2
                                                    h-auto
                                                    text-sm
                                                    `,
                                                    range === "CUSTOM" &&
                                                    "bg-background shadow-md font-semibold"
                                                )}
                                            >
                                                {range === "CUSTOM" &&
                                                    customRange
                                                    ? `${format(
                                                        customRange.startDate,
                                                        "MMM d"
                                                    )} – ${format(
                                                        customRange.endDate,
                                                        "MMM d"
                                                    )}`
                                                    : "Custom"}
                                            </Button>

                                        </PopoverTrigger>

                                        <PopoverContent
                                            align="end"
                                            className="w-auto p-0"
                                        >
                                            {CalendarView}
                                        </PopoverContent>

                                    </Popover>
                                );
                            }

                            return (
                                <Button
                                    key={item}
                                    asChild
                                    size="sm"
                                    variant={
                                        range === item
                                            ? "secondary"
                                            : "ghost"
                                    }
                                    className={cn(
                                        `
                                        whitespace-nowrap
                                        rounded-full
                                        px-5
                                        py-2
                                        h-auto
                                        text-sm
                                        `,
                                        range === item &&
                                        "bg-background shadow-md font-semibold"
                                    )}
                                >
                                    <Link href={`/analytics?range=${item}`}>
                                        {item}
                                    </Link>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )
            }
        </>
    );
}