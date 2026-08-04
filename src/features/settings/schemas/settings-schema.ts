import { z } from "zod";
import {
    Theme,
    WeekStart,
    Language,
    DateFormat,
    TimeFormat,
    NumberFormat,
    NegativeNumberFormat,
    Month,
    TransactionType,
    AccentColor
} from "@prisma/client";

export const SettingsSchema = z.object({
    theme: z.nativeEnum(Theme),
    weekStart: z.nativeEnum(WeekStart),

    language: z.nativeEnum(Language),
    timezone: z.string().min(1, "Timezone is required"),
    dateFormat: z.nativeEnum(DateFormat),
    timeFormat: z.nativeEnum(TimeFormat),
    numberFormat: z.nativeEnum(NumberFormat),

    defaultAccountId: z.string().uuid().nullable(),
    defaultExpenseCategoryId: z.string().uuid().nullable(),
    defaultIncomeCategoryId: z.string().uuid().nullable(),
    defaultTransactionType: z.nativeEnum(TransactionType).nullable(),

    monthStart: z.number().int().min(1).max(31),
    fiscalYear: z.nativeEnum(Month),
    showDecimals: z.boolean(),
    negativeNumberFormat: z.nativeEnum(NegativeNumberFormat),

    compactMode: z.boolean(),
    reduceMotion: z.boolean(),
    animationsEnabled: z.boolean(),
    accentColor: z.nativeEnum(AccentColor),
});

export type SettingsFormData = z.infer<typeof SettingsSchema>;
