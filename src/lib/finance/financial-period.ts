import { Month } from "@prisma/client";

/**
 * Returns the start and end dates of the financial month for a given date.
 * If monthStart = 25, and date is Aug 4, it returns July 25 - Aug 24.
 * If date is Aug 26, it returns Aug 25 - Sept 24.
 *
 * @param date The date to evaluate
 * @param monthStart The day of the month the financial period begins (1-28)
 */
export function getFinancialMonthRange(date: Date, monthStart: number): { start: Date; end: Date } {
    const d = new Date(date);
    let startYear = d.getFullYear();
    let startMonth = d.getMonth();

    if (d.getDate() < monthStart) {
        // Belongs to the period starting in the previous calendar month
        startMonth -= 1;
        if (startMonth < 0) {
            startMonth = 11;
            startYear -= 1;
        }
    }

    const start = new Date(startYear, startMonth, monthStart, 0, 0, 0, 0);

    // End date is one month after start, minus one millisecond
    const end = new Date(startYear, startMonth + 1, monthStart, 0, 0, 0, 0);
    end.setTime(end.getTime() - 1);

    return { start, end };
}

/**
 * Checks if a given date falls within the financial month of the reference date.
 */
export function isSameFinancialMonth(date: Date, referenceDate: Date, monthStart: number): boolean {
    const { start, end } = getFinancialMonthRange(referenceDate, monthStart);
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
}

/**
 * Checks if a given date is in the current financial month based on today.
 */
export function isCurrentFinancialMonth(date: Date, monthStart: number): boolean {
    return isSameFinancialMonth(date, new Date(), monthStart);
}

const MONTH_TO_INDEX: Record<Month, number> = {
    JANUARY: 0,
    FEBRUARY: 1,
    MARCH: 2,
    APRIL: 3,
    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUGUST: 7,
    SEPTEMBER: 8,
    OCTOBER: 9,
    NOVEMBER: 10,
    DECEMBER: 11,
};

/**
 * Returns the start and end dates of the fiscal year for a given date.
 * 
 * @param date The date to evaluate
 * @param fiscalYearStartMonth The month the fiscal year starts
 * @param monthStart The day of the month the financial period begins
 */
export function getFiscalYearRange(date: Date, fiscalYearStartMonth: Month, monthStart: number = 1): { start: Date; end: Date } {
    const d = new Date(date);
    const targetMonth = MONTH_TO_INDEX[fiscalYearStartMonth];
    
    // First, determine which financial month we are currently in
    let currentYear = d.getFullYear();
    let currentMonth = d.getMonth();
    if (d.getDate() < monthStart) {
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
    }

    // Now figure out the fiscal year boundaries
    let startYear = currentYear;
    if (currentMonth < targetMonth) {
        // If we haven't reached the fiscal start month this year, the fiscal year started last year
        startYear -= 1;
    }

    const start = new Date(startYear, targetMonth, monthStart, 0, 0, 0, 0);
    
    // End date is one year after start, minus one millisecond
    const end = new Date(startYear + 1, targetMonth, monthStart, 0, 0, 0, 0);
    end.setTime(end.getTime() - 1);

    return { start, end };
}

/**
 * Adds or subtracts financial months from a given date.
 */
export function addFinancialMonths(date: Date, months: number, monthStart: number = 1): Date {
    const { start } = getFinancialMonthRange(date, monthStart);
    const result = new Date(start);
    result.setMonth(result.getMonth() + months);
    return result;
}
