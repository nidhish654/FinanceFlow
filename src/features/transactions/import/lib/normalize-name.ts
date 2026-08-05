export function normalizeName(name: string): string {
    if (!name) return "";
    return name
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^\w\s]/g, "") // remove punctuation
        .replace(/\s+/g, " ");   // collapse spaces
}
