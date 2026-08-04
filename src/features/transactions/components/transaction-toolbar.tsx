"use client";

import {
    LayoutGrid,
    List,
    Download,
    SlidersHorizontal,
    FileSpreadsheet,
    FileText,
} from "lucide-react";

import * as XLSX from "xlsx";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";

import { DateRange } from "react-day-picker";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TransactionDto } from "../types/transaction";

import FilterPopover, { PeriodFilter } from "@/components/filters/filter-popover";

interface CategoryOption {
    id: string;
    name: string;
}

interface AccountOption {
    id: string;
    name: string;
}

interface TransactionToolbarProps {
    transactions: TransactionDto[];

    search: string;
    onSearchChange: (value: string) => void;

    view: "table" | "cards";
    onViewChange: (
        view: "table" | "cards"
    ) => void;

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

export default function TransactionToolbar({

    transactions,

    search,
    onSearchChange,

    view,
    onViewChange,

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

}: TransactionToolbarProps) {

    const activeFilters = [

        period !== "all",

        type !== "all",

        category !== "all",

        account !== "all",

        priority !== "all",

        period === "custom" &&
            dateRange,

    ].filter(Boolean).length;

    // --------------------------------------------------
    // Export Helpers
    // --------------------------------------------------

    const getExportFileName = (
        extension: string
    ) => {

        const date = new Date()
            .toISOString()
            .split("T")[0];

        return `transactions-${date}.${extension}`;

    };

    const buildExportRows = () =>
        transactions.map(
            (transaction) => ({

                Date:
                    new Date(
                        transaction.transactionDate
                    ).toLocaleDateString(),

                Type:
                    transaction.type,

                Category:
                    transaction.category
                        ?.name ?? "",

                Account:
                    transaction.account.name,

                Priority:
                    transaction.priority ??
                    "",

                Amount:
                    transaction.amount,

                Merchant:
                    transaction.merchant ??
                    "",

                Description:
                    transaction.description ??
                    "",

                Reference:
                    transaction.referenceNumber ??
                    "",

                Notes:
                    transaction.notes ??
                    "",

            })
        );

    // --------------------------------------------------
    // CSV Export
    // --------------------------------------------------

    const exportCSV = () => {

        if (!transactions.length)
            return;

        const rows =
            buildExportRows();

        const headers =
            Object.keys(rows[0]);

        const csv = [

            headers.join(","),

            ...rows.map((row) =>
                headers
                    .map(
                        (
                            header
                        ) =>
                            `"${String(
                                row[
                                    header as keyof typeof row
                                ]
                            ).replace(
                                /"/g,
                                '""'
                            )}"`
                    )
                    .join(",")
            ),

        ].join("\n");

        const blob = new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;",
            }
        );

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            getExportFileName(
                "csv"
            );

        link.click();

        URL.revokeObjectURL(url);

    };

    // --------------------------------------------------
    // Excel Export
    // --------------------------------------------------

    const exportExcel = () => {

        if (!transactions.length)
            return;

        const rows = buildExportRows();

        const worksheet =
            XLSX.utils.json_to_sheet(rows);

        // Auto-size columns
        worksheet["!cols"] = Object.keys(rows[0]).map(
            (key) => {

                const maxLength = Math.max(
                    key.length,
                    ...rows.map((row) =>
                        String(
                            row[
                                key as keyof typeof row
                            ] ?? ""
                        ).length
                    )
                );

                return {
                    wch: Math.min(
                        maxLength + 4,
                        40
                    ),
                };

            }
        );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Transactions"
        );

        XLSX.writeFile(
            workbook,
            getExportFileName(
                "xlsx"
            )
        );

    };

    // --------------------------------------------------
    // PDF Export
    // --------------------------------------------------

    const exportPDF = () => {

        if (!transactions.length)
            return;

        const rows =
            buildExportRows();

        const pdf =
            new jsPDF({
                orientation:
                    "landscape",
                unit: "mm",
                format: "a4",
            });

        const pageWidth =
            pdf.internal.pageSize.getWidth();

        pdf.setFontSize(20);

        pdf.text(
            "FinanceFlow",
            14,
            16
        );

        pdf.setFontSize(12);

        pdf.text(
            "Transactions Report",
            14,
            24
        );

        pdf.setFontSize(9);

        pdf.text(
            `Generated on ${new Date().toLocaleDateString()}`,
            14,
            30
        );

        pdf.text(
            `Total Transactions: ${transactions.length}`,
            pageWidth - 70,
            30
        );

        autoTable(pdf, {

            startY: 36,

            head: [[

                "Date",

                "Type",

                "Category",

                "Account",

                "Priority",

                "Amount",

                "Merchant",

                "Description",

            ]],

            body: rows.map(
                (row) => [

                    row.Date,

                    row.Type,

                    row.Category,

                    row.Account,

                    row.Priority,

                    Number(
                        row.Amount
                    ).toLocaleString(),

                    row.Merchant,

                    row.Description,

                ]
            ),

            styles: {

                fontSize: 8,

                cellPadding: 2,

                overflow:
                    "linebreak",

                valign:
                    "middle",

            },

            headStyles: {

                fillColor: [
                    37,
                    99,
                    235,
                ],

                textColor: 255,

                fontStyle:
                    "bold",

            },

            alternateRowStyles: {

                fillColor: [
                    248,
                    250,
                    252,
                ],

            },

            didDrawPage: () => {

                pdf.setFontSize(8);

                pdf.text(
                    `Page ${pdf.getCurrentPageInfo().pageNumber}`,
                    pageWidth - 25,
                    pdf.internal.pageSize.getHeight() - 8
                );

            },

        });

        pdf.save(
            getExportFileName(
                "pdf"
            )
        );

    };

    return (
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">

            {/* Search */}

            <div className="w-full md:min-w-65 md:flex-1">

                <Input
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(
                            e.target.value
                        )
                    }
                />

            </div>

            {/* Filters & Export */}

            <div className="flex w-full gap-2 md:w-auto">

                <FilterPopover
                    period={period}
                    onPeriodChange={
                        onPeriodChange
                    }
                    type={type}
                    onTypeChange={
                        onTypeChange
                    }
                    category={category}
                    onCategoryChange={
                        onCategoryChange
                    }
                    account={account}
                    onAccountChange={
                        onAccountChange
                    }
                    priority={priority}
                    onPriorityChange={
                        onPriorityChange
                    }
                    dateRange={
                        dateRange
                    }
                    onDateRangeChange={
                        onDateRangeChange
                    }
                    categories={
                        categories
                    }
                    accounts={
                        accounts
                    }
                >

                    <Button
                        variant="outline"
                        className="flex-1 gap-2 md:flex-none"
                    >

                        <SlidersHorizontal className="h-4 w-4" />

                        {activeFilters > 0
                            ? `Filters (${activeFilters})`
                            : "Filters"}

                    </Button>

                </FilterPopover>

                <DropdownMenu>

                    <DropdownMenuTrigger
                        asChild
                    >

                        <Button
                            variant="outline"
                            className="flex-1 gap-2 md:flex-none"
                        >

                            <Download className="h-4 w-4" />

                            Export

                        </Button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-52"
                    >

                        <DropdownMenuItem
                            onClick={exportCSV}
                            disabled={
                                !transactions.length
                            }
                        >

                            <FileSpreadsheet className="mr-2 h-4 w-4" />

                            Export as CSV

                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={exportExcel}
                            disabled={
                                !transactions.length
                            }
                        >

                            <FileSpreadsheet className="mr-2 h-4 w-4" />

                            Export as Excel

                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={exportPDF}
                            disabled={
                                !transactions.length
                            }
                        >

                            <FileText className="mr-2 h-4 w-4" />

                            Export as PDF

                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>

            </div>

            {/* View Toggle */}

            <ToggleGroup
                type="single"
                value={view}
                onValueChange={(value) => {

                    if (
                        value === "table" ||
                        value === "cards"
                    ) {

                        onViewChange(value);

                    }

                }}
                className="hidden rounded-md border md:flex"
            >

                <ToggleGroupItem
                    value="table"
                    aria-label="Table View"
                    className="gap-2 px-3"
                >

                    <List className="h-4 w-4" />

                    Table

                </ToggleGroupItem>

                <ToggleGroupItem
                    value="cards"
                    aria-label="Card View"
                    className="gap-2 px-3"
                >

                    <LayoutGrid className="h-4 w-4" />

                    Cards

                </ToggleGroupItem>

            </ToggleGroup>

        </div>
    );
}