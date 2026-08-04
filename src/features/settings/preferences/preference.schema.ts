import { z } from "zod";
import { AccentColor, Language, WeekStart, DateFormat, TimeFormat, NumberFormat } from "@prisma/client";

export const PreferenceSchema = z.object({
    accentColor: z.nativeEnum(AccentColor),
    language: z.nativeEnum(Language),
    weekStartsOn: z.nativeEnum(WeekStart),
    dateFormat: z.nativeEnum(DateFormat),
    timeFormat: z.nativeEnum(TimeFormat),
    numberFormat: z.nativeEnum(NumberFormat),
});

export type PreferenceFormData = z.infer<typeof PreferenceSchema>;
