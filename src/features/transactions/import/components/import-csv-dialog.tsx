"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CSVUploadStep } from "./csv-upload-step";
import { ColumnMapperStep } from "./column-mapper-step";
import { PreviewStep } from "./preview-step";
import { ResolutionStep } from "./resolution-step";
import { ImportSummaryStep } from "./import-summary-step";
import { parseCSV, ParsedCSVResult } from "../lib/parse-csv";
import { detectColumns, ColumnMapping } from "../lib/detect-columns";
import { validateImport } from "../lib/validate-import";
import { ParsedImportRow, ResolutionMap, UnknownAccount, UnknownCategory } from "../types/import-types";
import { extractUnknownAccounts, extractUnknownCategories } from "../lib/entity-resolver";
import { importTransactions } from "../../actions/import-transactions";
import { CategoryOption } from "@/features/categories/lib/category-utils";
import { AccountOption } from "../../components/transaction-toolbar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ImportCSVDialogProps {
    categories: CategoryOption[];
    accounts: AccountOption[];
}

export function ImportCSVDialog({ categories, accounts }: ImportCSVDialogProps) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"upload" | "mapping" | "preview" | "account-resolution" | "category-resolution" | "summary">("upload");
    const [file, setFile] = useState<File | null>(null);
    const [parsedCSV, setParsedCSV] = useState<ParsedCSVResult | null>(null);
    const [mapping, setMapping] = useState<ColumnMapping>({});
    const [rows, setRows] = useState<ParsedImportRow[]>([]);

    // Resolution state
    const [unknownAccounts, setUnknownAccounts] = useState<UnknownAccount[]>([]);
    const [unknownCategories, setUnknownCategories] = useState<UnknownCategory[]>([]);
    const [accountResolutions, setAccountResolutions] = useState<ResolutionMap>({});
    const [categoryResolutions, setCategoryResolutions] = useState<ResolutionMap>({});

    // Summary state
    const [importStats, setImportStats] = useState({ imported: 0, skipped: 0, newAccounts: 0, newCategories: 0, time: 0 });
    const [isImporting, setIsImporting] = useState(false);

    const resetState = () => {
        setStep("upload");
        setFile(null);
        setParsedCSV(null);
        setMapping({});
        setRows([]);
        setUnknownAccounts([]);
        setUnknownCategories([]);
        setAccountResolutions({});
        setCategoryResolutions({});
        setIsImporting(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && isImporting) return; // Prevent closing while importing
        if (!newOpen) resetState();
        setOpen(newOpen);
    };

    const handleFileAccepted = async (acceptedFile: File) => {
        setFile(acceptedFile);
        try {
            const parsed = await parseCSV(acceptedFile);
            setParsedCSV(parsed);
            setStep("mapping");
        } catch (error: any) {
            toast.error(error.message || "Failed to parse CSV file.");
        }
    };

    const handleMappingComplete = (completedMapping: ColumnMapping) => {
        if (!parsedCSV) return;
        setMapping(completedMapping);

        // Validate and generate preview rows
        const validatedRows = validateImport(parsedCSV, completedMapping);
        setRows(validatedRows);
        setStep("preview");
    };

    const handlePreviewContinue = () => {
        const missingAccounts = extractUnknownAccounts(rows, accounts);
        setUnknownAccounts(missingAccounts);
        
        if (missingAccounts.length > 0) {
            setStep("account-resolution");
        } else {
            handleAccountResolution({});
        }
    };

    const handleAccountResolution = (resolutions: ResolutionMap) => {
        setAccountResolutions(resolutions);
        
        const missingCategories = extractUnknownCategories(rows, categories);
        setUnknownCategories(missingCategories);
        
        if (missingCategories.length > 0) {
            setStep("category-resolution");
        } else {
            handleCategoryResolution({}, resolutions);
        }
    };

    const handleCategoryResolution = async (catRes: ResolutionMap, accResOverride?: ResolutionMap) => {
        setCategoryResolutions(catRes);

        // Execute Import!
        setIsImporting(true);
        const startTime = performance.now();

        const validTransactions = rows
            .filter((r) => r.status === "valid" || r.status === "warning")
            .map((r) => r.transaction as any); // Type assertion, validated previously

        const finalAccRes = accResOverride || accountResolutions;

        const result = await importTransactions(
            validTransactions, 
            finalAccRes, 
            catRes
        );

        setIsImporting(false);
        const endTime = performance.now();
        const timeSeconds = (endTime - startTime) / 1000;

        if (result.success && result.data) {
            setImportStats({
                imported: result.data.imported,
                skipped: rows.length - validTransactions.length,
                newAccounts: result.data.newAccountsCount,
                newCategories: result.data.newCategoriesCount,
                time: timeSeconds
            });
            setStep("summary");
        } else {
            toast.error(result.error || "Failed to import transactions.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Import Transactions</DialogTitle>
                </DialogHeader>
                <div className="py-2">
                    {step === "upload" && (
                        <CSVUploadStep
                            onFileAccepted={handleFileAccepted}
                            onCancel={() => handleOpenChange(false)}
                        />
                    )}
                    {step === "mapping" && parsedCSV && (
                        <ColumnMapperStep
                            parsedCSV={parsedCSV}
                            onMappingComplete={handleMappingComplete}
                            onCancel={() => handleOpenChange(false)}
                        />
                    )}
                    {step === "preview" && (
                        <PreviewStep
                            rows={rows}
                            onContinue={handlePreviewContinue}
                            onCancel={() => handleOpenChange(false)}
                        />
                    )}
                    {step === "account-resolution" && (
                        <ResolutionStep
                            title="Accounts"
                            description="Some accounts in your CSV do not match existing accounts. Choose how to handle them."
                            unknownAccounts={unknownAccounts}
                            unknownCategories={[]}
                            type="account"
                            existingEntities={accounts}
                            onResolve={handleAccountResolution}
                            onCancel={() => handleOpenChange(false)}
                        />
                    )}
                    {step === "category-resolution" && (
                        <div className="relative">
                            {isImporting && (
                                <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl">
                                    <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                                    <p className="font-medium animate-pulse">Importing transactions...</p>
                                </div>
                            )}
                            <ResolutionStep 
                                title="Categories"
                                description="Some categories in your CSV do not match existing categories. Choose how to handle them."
                                unknownAccounts={[]}
                                unknownCategories={unknownCategories}
                                type="category"
                                existingEntities={categories}
                                onResolve={(res) => handleCategoryResolution(res)}
                                onCancel={() => handleOpenChange(false)}
                            />
                        </div>
                    )}
                    {step === "summary" && (
                        <ImportSummaryStep
                            imported={importStats.imported}
                            skipped={importStats.skipped}
                            newCategories={importStats.newCategories}
                            newAccounts={importStats.newAccounts}
                            timeSeconds={importStats.time}
                            onDone={() => handleOpenChange(false)}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
