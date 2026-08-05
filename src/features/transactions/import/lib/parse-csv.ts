import Papa from "papaparse";

export interface ParsedCSVResult {
    headers: string[];
    rows: Record<string, any>[];
}

/**
 * Parses a CSV file and extracts headers and rows.
 */
export async function parseCSV(file: File): Promise<ParsedCSVResult> {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            transformHeader: (header) => header.trim(),
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length > 0 && results.data.length === 0) {
                    reject(new Error(results.errors[0].message));
                    return;
                }

                resolve({
                    headers: results.meta.fields || [],
                    rows: results.data as Record<string, any>[],
                });
            },
            error: (error) => {
                reject(error);
            },
        });
    });
}
