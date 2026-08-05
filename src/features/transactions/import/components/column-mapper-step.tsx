"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ParsedCSVResult } from "../lib/parse-csv";
import { ColumnMapping, detectColumns } from "../lib/detect-columns";
import { REQUIRED_COLUMNS, AMOUNT_COLUMNS, OPTIONAL_COLUMNS } from "../lib/column-aliases";

interface ColumnMapperStepProps {
    parsedCSV: ParsedCSVResult;
    onMappingComplete: (mapping: ColumnMapping) => void;
    onCancel: () => void;
}

export function ColumnMapperStep({ parsedCSV, onMappingComplete, onCancel }: ColumnMapperStepProps) {
    const [mapping, setMapping] = useState<ColumnMapping>({});

    useEffect(() => {
        // Auto-detect columns on mount
        const initialMapping = detectColumns(parsedCSV.headers);
        setMapping(initialMapping);
        
        // Check if all required columns are mapped
        const isReady = checkIsReady(initialMapping);
        if (isReady) {
            // Wait for next tick so user can briefly see what happened, or just immediately fire
            // Actually, requirements state: "If every column is detected correctly, Skip directly to Preview."
            // We can invoke it here, but maybe it's better to show the mapper if they want to review?
            // "If every column is detected correctly Skip directly to Preview."
            // So we just call it automatically.
            onMappingComplete(initialMapping);
        }
    }, [parsedCSV]);

    const checkIsReady = (m: ColumnMapping) => {
        const hasAllRequired = REQUIRED_COLUMNS.every((col) => !!m[col]);
        const hasAmount = !!m["credit"] || !!m["debit"]; // either is fine
        return hasAllRequired && hasAmount;
    };

    const handleMappingChange = (ffField: string, csvHeader: string | null) => {
        setMapping((prev) => ({
            ...prev,
            [ffField]: csvHeader === "none" ? null : csvHeader,
        }));
    };

    const isReady = checkIsReady(mapping);

    const renderMappingRow = (ffField: string, label: string, isRequired: boolean) => {
        const selectedValue = mapping[ffField];
        const isMapped = !!selectedValue;

        return (
            <div key={ffField} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3 border-b last:border-0">
                <div className="flex flex-col">
                    <span className="font-medium text-sm flex items-center gap-2">
                        {label}
                        {isRequired && <span className="text-destructive">*</span>}
                    </span>
                    <span className="text-xs text-muted-foreground">FinanceFlow Field</span>
                </div>
                
                <div className="flex items-center justify-center">
                    {isMapped ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : isRequired ? (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                    ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-dashed border-muted-foreground/30" />
                    )}
                </div>

                <Select
                    value={selectedValue || "none"}
                    onValueChange={(val) => handleMappingChange(ffField, val)}
                >
                    <SelectTrigger className="w-full h-10">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none" className="text-muted-foreground italic">
                            -- Skip --
                        </SelectItem>
                        {parsedCSV.headers.map((h) => (
                            <SelectItem key={h} value={h}>
                                {h}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-xl border space-y-2">
                <h3 className="font-semibold text-sm">Column Mapping</h3>
                <p className="text-xs text-muted-foreground">
                    Match the columns from your CSV file to FinanceFlow's transaction fields.
                </p>
            </div>

            <div className="space-y-0">
                {renderMappingRow("date", "Date", true)}
                {renderMappingRow("account", "Account", true)}
                {renderMappingRow("category", "Category", true)}
                {renderMappingRow("priority", "Priority", true)}
                {renderMappingRow("credit", "Credit", false)}
                {renderMappingRow("debit", "Debit", false)}
                
                {renderMappingRow("description", "Description", false)}
                {renderMappingRow("merchant", "Merchant", false)}
                {renderMappingRow("referenceNumber", "Reference Number", false)}
                {renderMappingRow("notes", "Notes", false)}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button disabled={!isReady} onClick={() => onMappingComplete(mapping)}>
                    Continue to Preview
                </Button>
            </div>
        </div>
    );
}
