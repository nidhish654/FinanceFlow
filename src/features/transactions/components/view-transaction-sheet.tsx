"use client";

import {
    ArrowDownLeft,
    ArrowRightLeft,
    ArrowUpRight,
    Calendar,
    Clock,
    FileText,
    Flag,
    Hash,
    NotebookPen,
    Store,
    Tag,
    Wallet,
    X,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import CurrencyAmount from "@/components/common/CurrencyAmount";

import { TransactionDto } from "../types/transaction";

interface ViewTransactionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transaction: TransactionDto;
}

function getTransactionConfig(type: string) {
    switch (type) {
        case "INCOME":
            return {
                label: "Income",
                icon: ArrowUpRight,
                amountClass: "text-emerald-500",
                badgeClass:
                    "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            };

        case "TRANSFER":
            return {
                label: "Transfer",
                icon: ArrowRightLeft,
                amountClass: "text-blue-500",
                badgeClass:
                    "bg-blue-500/10 text-blue-500 border-blue-500/20",
            };

        default:
            return {
                label: "Expense",
                icon: ArrowDownLeft,
                amountClass: "text-red-500",
                badgeClass:
                    "bg-red-500/10 text-red-500 border-red-500/20",
            };
    }
}

function DetailRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value?: React.ReactNode;
}) {
    if (!value) return null;

    return (
        <div className="flex items-start gap-3 py-2.5 md:gap-4 md:py-3">
            <Icon className="mt-1 h-4 w-4 shrink-0 text-muted-foreground md:h-5 md:w-5" />

            <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                </p>

                <p className="mt-1 wrap-break-word text-sm font-semibold md:text-base">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function ViewTransactionDialog({
    open,
    onOpenChange,
    transaction,
}: ViewTransactionDialogProps) {
    const config = getTransactionConfig(transaction.type);

    const Icon = config.icon;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="w-[95vw] max-w-5xl overflow-hidden rounded-xl p-0">
                <DialogHeader className="border-b px-3 py-3 md:px-4 md:py-4">
                    <DialogTitle className="text-2xl font-bold md:text-3xl">
                        Transaction Details
                    </DialogTitle>
                </DialogHeader>

                <div className="max-h-[84vh] overflow-y-auto">
                    <div className="flex flex-col items-center px-3 py-2 md:px-4 md:py-3">
                        <Badge
                            variant="outline"
                            className={`${config.badgeClass} text-xs md:text-sm`}
                        >
                            <Icon className="mr-2 h-4 w-4" />
                            {config.label}
                        </Badge>

                        <div
                            className={`mt-4 text-2xl font-bold md:text-3xl ${config.amountClass}`}
                        >
                            <CurrencyAmount
                                amount={transaction.amount}
                                currency="INR"
                            />
                        </div>

                        <p className="mt-3 text-center text-base text-muted-foreground md:mt-4 md:text-xl">
                            {transaction.description ??
                                "No Description"}
                        </p>
                    </div>

                    <Separator />

                    <div className="grid gap-x-8 gap-y-1 px-4 py-2 md:gap-x-16 md:gap-y-2 md:px-6 md:py-6">
                        <DetailRow
                            icon={Wallet}
                            label="Account"
                            value={transaction.account.name}
                        />

                        {transaction.transferAccount && (
                            <DetailRow
                                icon={ArrowRightLeft}
                                label="Transfer To"
                                value={transaction.transferAccount.name}
                            />
                        )}

                        <DetailRow
                            icon={Tag}
                            label="Category"
                            value={
                                transaction.category?.parentCategoryId
                                    ? transaction.category.parent?.name
                                    : (transaction.category?.name ?? "-")
                            }
                        />

                        {transaction.category?.parentCategoryId && (
                            <DetailRow
                                icon={Tag}
                                label="Subcategory"
                                value={transaction.category.name}
                            />
                        )}

                        <DetailRow
                            icon={Flag}
                            label="Priority"
                            value={
                                transaction.priority ??
                                "-"
                            }
                        />

                        <DetailRow
                            icon={Store}
                            label="Merchant"
                            value={transaction.merchant}
                        />

                        <DetailRow
                            icon={Hash}
                            label="Reference Number"
                            value={transaction.referenceNumber}
                        />

                        <DetailRow
                            icon={Calendar}
                            label="Transaction Date"
                            value={new Date(
                                transaction.transactionDate
                            ).toLocaleDateString()}
                        />
                    </div>

                    {(transaction.description ||
                        transaction.notes) && (
                            <>
                                <Separator />

                                <div className="space-y-3 px-4 py-3 md:px-3 md:py-3">
                                    {transaction.description && (
                                        <Card className="shadow-none">
                                            <CardContent className="p-3 md:p-2">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-muted-foreground" />

                                                    <h3 className="text-base font-semibold md:text-lg">
                                                        Description
                                                    </h3>
                                                </div>

                                                <Separator className="my-4" />

                                                <p className="text-sm leading-6 text-muted-foreground">
                                                    {transaction.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )}
                                    {transaction.notes && (
                                        <Card className="shadow-none">
                                            <CardContent className="p-3 md:p-4">
                                                <div className="flex items-center gap-2">
                                                    <NotebookPen className="h-5 w-5 text-muted-foreground" />

                                                    <h3 className="text-base font-semibold md:text-lg">
                                                        Notes
                                                    </h3>
                                                </div>

                                                <Separator className="my-4" />

                                                <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                                    {transaction.notes}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </>
                        )}
                </div>

                {/* <div className="border-t bg-background px-4 py-4 md:px-6">
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="w-full sm:w-auto"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Close
                        </Button>
                    </div>
                </div> */}
            </DialogContent>
        </Dialog>
    );
}