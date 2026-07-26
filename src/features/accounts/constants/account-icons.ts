import {
    Wallet,
    Landmark,
    CreditCard,
    PiggyBank,
    TrendingUp,
    Smartphone,
    LucideIcon,
} from "lucide-react";

export interface AccountTypeConfig {
    icon: LucideIcon;
    iconClassName: string;
    badgeClassName: string;
}

export const ACCOUNT_TYPE_CONFIG: Record<string, AccountTypeConfig> = {
    CASH: {
        icon: Wallet,
        iconClassName:
            "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
        badgeClassName:
            "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    },

    BANK: {
        icon: Landmark,
        iconClassName:
            "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
        badgeClassName:
            "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
    },

    CREDIT_CARD: {
        icon: CreditCard,
        iconClassName:
            "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
        badgeClassName:
            "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
    },

    SAVINGS: {
        icon: PiggyBank,
        iconClassName:
            "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
        badgeClassName:
            "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    },

    INVESTMENT: {
        icon: TrendingUp,
        iconClassName:
            "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400",
        badgeClassName:
            "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400",
    },

    DIGITAL_WALLET: {
        icon: Smartphone,
        iconClassName:
            "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400",
        badgeClassName:
            "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400",
    },
};

export function getAccountTypeConfig(type: string): AccountTypeConfig {
    return (
        ACCOUNT_TYPE_CONFIG[type] ?? {
            icon: Wallet,
            iconClassName:
                "bg-muted text-muted-foreground",
            badgeClassName:
                "bg-muted text-muted-foreground",
        }
    );
}