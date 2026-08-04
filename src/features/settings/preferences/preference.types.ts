import { AccentColor, Language, WeekStart, DateFormat, TimeFormat, NumberFormat } from "@prisma/client";

export interface PreferencesData {
    accentColor: AccentColor;
    language: Language;
    weekStartsOn: WeekStart;
    dateFormat: DateFormat;
    timeFormat: TimeFormat;
    numberFormat: NumberFormat;
}
