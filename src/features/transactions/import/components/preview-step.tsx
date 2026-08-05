"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { ParsedImportRow } from "../types/import-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface PreviewStepProps {
    rows: ParsedImportRow[];
    onContinue: () => void;
    onCancel: () => void;
}

export function PreviewStep({ rows, onContinue, onCancel }: PreviewStepProps) {
    const stats = useMemo(() => {
        return rows.reduce(
            (acc, row) => {
                if (row.status === "valid") acc.valid++;
                else if (row.status === "warning") acc.warnings++;
                else if (row.status === "error") acc.errors++;
                return acc;
            },
            { valid: 0, warnings: 0, errors: 0, total: rows.length }
        );
    }, [rows]);

    const hasValidRows = stats.valid + stats.warnings > 0;

    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 p-4 rounded-xl border flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{stats.total}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Rows</span>
                </div>
                <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.valid}</span>
                    <span className="text-xs text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider">Valid</span>
                </div>
                <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.warnings}</span>
                    <span className="text-xs text-amber-600/80 dark:text-amber-400/80 uppercase tracking-wider">Warnings</span>
                </div>
                <div className="bg-destructive/10 p-4 rounded-xl border border-destructive/20 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-destructive">{stats.errors}</span>
                    <span className="text-xs text-destructive/80 uppercase tracking-wider">Errors</span>
                </div>
            </div>

            {/* Preview Table */}
            <ScrollArea className="h-[400px] border rounded-xl">
                <Table>
                    <TableHeader className="bg-muted/50 sticky top-0 z-10 backdrop-blur-sm">
                        <TableRow>
                            <TableHead className="w-12 text-center">#</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Account</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.originalIndex}>
                                <TableCell className="text-center text-muted-foreground text-xs">{row.originalIndex}</TableCell>
                                <TableCell>
                                    {row.status === "valid" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                                    {row.status === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                                    {row.status === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {row.transaction.date ? format(row.transaction.date, "MMM d, yyyy") : "-"}
                                </TableCell>
                                <TableCell className="max-w-[150px] truncate" title={row.transaction.description}>
                                    {row.transaction.description || "-"}
                                </TableCell>
                                <TableCell className="max-w-[100px] truncate">
                                    {row.transaction.account || "-"}
                                </TableCell>
                                <TableCell className="max-w-[100px] truncate">
                                    {row.transaction.category || "-"}
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">
                                    {row.transaction.amount ? (
                                        <span className={row.transaction.type === "income" ? "text-emerald-500 font-medium" : ""}>
                                            {row.transaction.type === "income" ? "+" : "-"}
                                            {row.transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    ) : "-"}
                                </TableCell>
                            </TableRow>
                        ))}
                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No valid rows to preview.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>

            {/* Error Summary */}
            {stats.errors > 0 && (
                <div className="bg-destructive/5 rounded-xl p-4 flex gap-3 text-sm">
                    <Info className="h-5 w-5 text-destructive shrink-0" />
                    <div>
                        <p className="font-semibold text-destructive mb-1">Attention Required</p>
                        <p className="text-destructive/90">
                            {stats.errors} transaction(s) have validation errors and will be skipped during import.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button disabled={!hasValidRows} onClick={onContinue}>
                    Continue to Resolution
                </Button>
            </div>
        </div>
    );
}
