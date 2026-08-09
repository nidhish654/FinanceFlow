"use client";

import { useCallback, useState } from "react";
import { UploadCloud, File, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CSVUploadStepProps {
    onFileAccepted: (file: File) => void;
    onCancel: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function CSVUploadStep({ onFileAccepted, onCancel }: CSVUploadStepProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const validateAndSetFile = (file: File) => {
        if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
            toast.error("Invalid file type. Please upload a CSV file.");
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            toast.error("File is too large. Maximum size is 10MB.");
            return;
        }
        setSelectedFile(file);
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) validateAndSetFile(file);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) validateAndSetFile(file);
    };

    const handleDownloadSample = () => {
        const sampleCSV = `Date,Description,Category,Priority,Account,Credit,Debit,Merchant,Reference Number,Notes\n2026-08-01,Salary,Income,Need,ICICI Bank,50000,,Employer Inc.,REF12345,August Salary\n2026-08-02,Grocery Store,Groceries,Need,ICICI Bank,,1250.50,SuperMart,,Weekly groceries\n2026-08-05,Netflix Subscription,Entertainment,Want,ICICI Bank,,499,Netflix,,Monthly sub`;

        const blob = new Blob([sampleCSV], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "sample-transactions.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {!selectedFile ? (
                <div
                    className={`border-2 border-dashed rounded-xl p-10 text-center flex flex-col items-center justify-center transition-colors duration-200 ${isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                        }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <UploadCloud className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Drag & Drop CSV</h3>
                    <p className="text-sm text-muted-foreground mb-6">or</p>

                    <label>
                        <Button variant="secondary" className="cursor-pointer" asChild>
                            <span>Choose File</span>
                        </Button>
                        <input
                            type="file"
                            accept=".csv, text/csv"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    <p className="text-xs text-muted-foreground mt-6">
                        Supported format: .csv (Max 10MB)
                    </p>
                </div>
            ) : (
                <div className="border rounded-xl p-4 flex items-center justify-between bg-muted/20">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <File className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-sm">{selectedFile.name}</span>
                            <span className="text-xs text-muted-foreground">
                                {(selectedFile.size / 1024).toFixed(1)} KB
                            </span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="ghost" onClick={handleDownloadSample} className="text-muted-foreground">
                    <Download className="mr-2 h-4 w-4" />
                    Download Sample CSV
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button className="flex-1 sm:flex-none" disabled={!selectedFile} onClick={() => selectedFile && onFileAccepted(selectedFile)}>
                        Continue
                    </Button>
                </div>
            </div> */}
            <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <Button
                    onClick={handleDownloadSample}
                    variant="ghost"
                    className="w-full sm:w-auto text-muted-foreground"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download Sample CSV
                </Button>

                <div className="flex w-full gap-2 sm:w-auto">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="flex-1 sm:flex-none"
                    >
                        Cancel
                    </Button>

                    <Button className="flex-1 sm:flex-none" disabled={!selectedFile} onClick={() => selectedFile && onFileAccepted(selectedFile)}>
                        Continue
                    </Button>
                </div>
            </div>

        </div>
    );
}
