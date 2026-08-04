// "use client";

// import * as React from "react";
// import { DateRange } from "react-day-picker";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
// import { useIsMobile } from "@/hooks/use-mobile";

// interface DateRangePickerProps {
//     trigger: React.ReactNode;
//     isOpen: boolean;
//     onOpenChange: (open: boolean) => void;
//     initialDateRange?: DateRange;
//     onApply: (range: { startDate: Date; endDate: Date }) => void;
//     onCancel: () => void;
// }

// export function DateRangePicker({
//     trigger,
//     isOpen,
//     onOpenChange,
//     initialDateRange,
//     onApply,
//     onCancel,
// }: DateRangePickerProps) {
//     const isMobile = useIsMobile();
//     const [date, setDate] = React.useState<DateRange | undefined>(initialDateRange);

//     React.useEffect(() => {
//         if (isOpen && initialDateRange) {
//             setDate(initialDateRange);
//         } else if (isOpen && !initialDateRange) {
//             setDate(undefined);
//         }
//     }, [isOpen, initialDateRange]);

//     const handleApply = () => {
//         if (date?.from && date?.to) {
//             onApply({ startDate: date.from, endDate: date.to });
//             onOpenChange(false);
//         }
//     };

//     const handleCancel = () => {
//         onCancel();
//         onOpenChange(false);
//     };

//     const isApplyDisabled = !date?.from || !date?.to;
//     const maxDate = new Date();

//     const Content = (
//         <div className="flex flex-col gap-4 p-4 sm:p-0">
//             <Calendar
//                 mode="range"
//                 defaultMonth={date?.from}
//                 selected={date}
//                 onSelect={setDate}
//                 numberOfMonths={isMobile ? 1 : 2}
//                 disabled={{ after: maxDate }}
//                 className={cn(isMobile && "flex justify-center")}
//             />
//             <div className="flex items-center justify-end gap-2 px-3 pb-3">
//                 <Button variant="ghost" onClick={handleCancel}>
//                     Cancel
//                 </Button>
//                 <Button disabled={isApplyDisabled} onClick={handleApply}>
//                     Apply
//                 </Button>
//             </div>
//         </div>
//     );

//     if (isMobile) {
//         return (
//             <Sheet open={isOpen} onOpenChange={onOpenChange}>
//                 <div onClick={() => onOpenChange(true)}>{trigger}</div>
//                 <SheetContent side="bottom" className="p-0 border-t rounded-t-2xl">
//                     <SheetHeader className="p-4 text-left border-b">
//                         <SheetTitle>Custom Date Range</SheetTitle>
//                         <SheetDescription className="sr-only">
//                             Select a custom date range for analytics.
//                         </SheetDescription>
//                     </SheetHeader>
//                     {Content}
//                 </SheetContent>
//             </Sheet>
//         );
//     }

//     return (
//         <Popover open={isOpen} onOpenChange={onOpenChange}>
//             <PopoverTrigger asChild>
//                 <div onClick={() => onOpenChange(!isOpen)}>{trigger}</div>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//                 {Content}
//             </PopoverContent>
//         </Popover>
//     );
// }

"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useIsMobile } from "@/hooks/use-mobile";

interface DateRangePickerProps {
    trigger: React.ReactNode;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    initialDateRange?: DateRange;
    onApply: (range: {
        startDate: Date;
        endDate: Date;
    }) => void;
    onCancel: () => void;
}

export function DateRangePicker({
    trigger,
    isOpen,
    onOpenChange,
    initialDateRange,
    onApply,
    onCancel,
}: DateRangePickerProps) {

    const isMobile = useIsMobile();

    const [date, setDate] =
        React.useState<DateRange | undefined>(
            initialDateRange
        );

    React.useEffect(() => {
        if (isOpen && initialDateRange) {
            setDate(initialDateRange);
        } else if (isOpen && !initialDateRange) {
            setDate(undefined);
        }
    }, [isOpen, initialDateRange]);

    const maxDate = new Date();

    const isApplyDisabled =
        !date?.from || !date?.to;

    const handleApply = () => {
        if (!date?.from || !date?.to) return;

        onApply({
            startDate: date.from,
            endDate: date.to,
        });

        onOpenChange(false);
    };

    const handleCancel = () => {
        onCancel();
        onOpenChange(false);
    };

    const handleClear = () => {
        setDate(undefined);
    };

    const selectedRange =
        date?.from && date?.to
            ? `${format(date.from, "dd MMM yyyy")}  →  ${format(date.to, "dd MMM yyyy")}`
            : "No date range selected";

    const CalendarContent = (
        <div className="flex flex-col">

            {/* Header */}

            <div
                className="
                    border-b
                    px-6
                    py-5
                "
            >
                <h3 className="text-lg font-semibold">
                    Custom Date Range
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                    Choose a start and end date for
                    your analytics.
                </p>
            </div>

            {/* Selected Range */}

            <div
                className="
                    border-b
                    px-6
                    py-4
                "
            >
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    Selected Range
                </div>

                <div className="mt-2 text-sm font-medium">
                    {selectedRange}
                </div>
            </div>

            {/* Calendar */}

            <div
                className={cn(
                    "px-4 py-5",
                    isMobile &&
                    "flex justify-center"
                )}
            >
                <Calendar
                    mode="range"
                    selected={date}
                    defaultMonth={date?.from}
                    onSelect={setDate}
                    numberOfMonths={
                        isMobile ? 1 : 2
                    }
                    disabled={{
                        after: maxDate,
                    }}
                    className={cn(
                        "rounded-xl border bg-background p-3",
                        isMobile &&
                        "mx-auto"
                    )}
                />
            </div>

            {/* Footer */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-t
                    px-6
                    py-4
                "
            >
                <Button
                    variant="ghost"
                    onClick={handleClear}
                >
                    Clear
                </Button>

                <div className="flex gap-2">

                    <Button
                        variant="ghost"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleApply}
                        disabled={isApplyDisabled}
                    >
                        Apply
                    </Button>

                </div>
            </div>

        </div>
    );

    if (isMobile) {
        return (
            <Sheet
                open={isOpen}
                onOpenChange={onOpenChange}
            >
                <div
                    onClick={() =>
                        onOpenChange(true)
                    }
                >
                    {trigger}
                </div>

                <SheetContent
                    side="bottom"
                    className="
                        h-[90vh]
                        rounded-t-3xl
                        border-t
                        p-0
                    "
                >
                    <SheetHeader className="sr-only">
                        <SheetTitle>
                            Custom Date Range
                        </SheetTitle>

                        <SheetDescription>
                            Select a custom date
                            range.
                        </SheetDescription>
                    </SheetHeader>

                    {CalendarContent}
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Popover
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <PopoverTrigger asChild>
                <div
                    onClick={() =>
                        onOpenChange(!isOpen)
                    }
                >
                    {trigger}
                </div>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                sideOffset={10}
                className="
                    w-[470px]
                    overflow-hidden
                    rounded-2xl
                    border
                    p-0
                    shadow-2xl
                "
            >
                {CalendarContent}
            </PopoverContent>
        </Popover>
    );
}