import { LucideIcon } from "lucide-react";
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

export interface SettingsState {
    id: string;
    financeProfileId: string;
    
    theme: Theme;
    weekStart: WeekStart;
    
    language: Language;
    timezone: string;
    dateFormat: DateFormat;
    timeFormat: TimeFormat;
    numberFormat: NumberFormat;
    
    defaultAccountId: string | null;
    defaultExpenseCategoryId: string | null;
    defaultIncomeCategoryId: string | null;
    defaultTransactionType: TransactionType | null;
    
    monthStart: number;
    fiscalYear: Month;
    showDecimals: boolean;
    negativeNumberFormat: NegativeNumberFormat;
    
    accentColor: AccentColor;
    compactMode: boolean;
    reduceMotion: boolean;
    animationsEnabled: boolean;
    
    avatarStyle: string;
    avatarSeed: string;
    
    createdAt: Date;
    updatedAt: Date;
}

export type SettingsSectionId = 
    | "profile"
    | "preferences"
    | "financial-defaults"
    | "security"
    | "data-management"
    | "about";

export interface SidebarItem {
    id: SettingsSectionId;
    label: string;
    icon: LucideIcon;
    href: string;
}
