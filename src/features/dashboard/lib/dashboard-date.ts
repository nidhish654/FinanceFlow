/**
 * Returns the current month (0–11).
 */
export function getCurrentMonth(): number {
    return new Date().getMonth();
}

/**
 * Returns the current year.
 */
export function getCurrentYear(): number {
    return new Date().getFullYear();
}

/**
 * Returns true if the given date falls
 * within the current month.
 */
export function isCurrentMonth(
    date: Date
): boolean {
    const now = new Date();

    return (
        date.getMonth() ===
            now.getMonth() &&
        date.getFullYear() ===
            now.getFullYear()
    );
}

/**
 * Returns true if the given date falls
 * within the current year.
 */
export function isCurrentYear(
    date: Date
): boolean {
    return (
        date.getFullYear() ===
        getCurrentYear()
    );
}

/**
 * Returns abbreviated month labels.
 */
export function getMonthLabels(): string[] {
    return Array.from(
        { length: 12 },
        (_, month) =>
            new Date(
                2000,
                month
            ).toLocaleString("en-US", {
                month: "short",
            })
    );
}