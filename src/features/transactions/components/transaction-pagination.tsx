"use client";

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TransactionPaginationProps {
    totalItems: number;
    currentPage: number;
    pageSize: number;

    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export default function TransactionPagination({
    totalItems,
    currentPage,
    pageSize,
    onPageChange,
    onPageSizeChange,
}: TransactionPaginationProps) {
    const totalPages = Math.max(
        1,
        Math.ceil(totalItems / pageSize)
    );

    const startItem =
        totalItems === 0
            ? 0
            : (currentPage - 1) * pageSize + 1;

    const endItem = Math.min(
        currentPage * pageSize,
        totalItems
    );

    const createPageNumbers = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 7) {
            for (
                let i = 1;
                i <= totalPages;
                i++
            ) {
                pages.push(i);
            }

            return pages;
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push("...");
        }

        const start = Math.max(
            2,
            currentPage - 1
        );

        const end = Math.min(
            totalPages - 1,
            currentPage + 1
        );

        for (
            let i = start;
            i <= end;
            i++
        ) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    const pages = createPageNumbers();

    return (
        <div className="flex flex-col items-center gap-4 rounded-xl border bg-card py-2.5 px-4 text-center md:flex-row md:items-center md:justify-between md:text-left">

            <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                    {startItem}
                </span>
                {" "} to{" "}
                <span className="font-medium text-foreground">
                    {endItem}
                </span>
                {" "} of{" "}
                <span className="font-medium text-foreground">
                    {totalItems}
                </span>{" "}
                transactions
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">

                <div className="hidden items-center gap-2 md:flex">
                    <span className="text-sm text-muted-foreground">
                        Rows
                    </span>

                    <Select
                        value={pageSize.toString()}
                        onValueChange={(value) =>
                            onPageSizeChange(
                                Number(value)
                            )
                        }
                    >
                        <SelectTrigger className="h-9 w-20">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="10">
                                10
                            </SelectItem>

                            <SelectItem value="25">
                                25
                            </SelectItem>

                            <SelectItem value="50">
                                50
                            </SelectItem>

                            <SelectItem value="100">
                                100
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-3">

                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden md:flex"
                        disabled={currentPage === 1}
                        onClick={() =>
                            onPageChange(1)
                        }
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === 1}
                        onClick={() =>
                            onPageChange(
                                currentPage - 1
                            )
                        }
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {pages.map(
                        (page, index) =>
                            page === "..." ? (
                                <div
                                    key={index}
                                    className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
                                >
                                    ...
                                </div>
                            ) : (
                                <Button
                                    key={page}
                                    variant={
                                        currentPage ===
                                        page
                                            ? "default"
                                            : "outline"
                                    }
                                    className="h-9 w-9 p-0"
                                    onClick={() =>
                                        onPageChange(
                                            page
                                        )
                                    }
                                >
                                    {page}
                                </Button>
                            )
                    )}

                    <Button
                        variant="outline"
                        size="icon"
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            onPageChange(
                                currentPage + 1
                            )
                        }
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden md:flex"
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            onPageChange(
                                totalPages
                            )
                        }
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>

                </div>

            </div>

        </div>
    );
}