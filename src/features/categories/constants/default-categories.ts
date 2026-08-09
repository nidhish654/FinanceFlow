import { CategoryType } from "@prisma/client";

export interface DefaultCategory {
    name: string;
    description: string;
    type: CategoryType;
    icon: string;
    color: string;
    displayOrder: number;
}

export const DEFAULT_CATEGORIES: DefaultCategory[] = [
    // =========================
    // INCOME
    // =========================
    {
        name: "Salary",
        description: "Monthly salary or wages",
        type: CategoryType.INCOME,
        icon: "banknote-arrow-up",
        color: "#22C55E",
        displayOrder: 1,
    },
    {
        name: "Bonus",
        description: "Performance bonuses and incentives",
        type: CategoryType.INCOME,
        icon: "award",
        color: "#16A34A",
        displayOrder: 2,
    },
    {
        name: "Investment",
        description: "Investment returns",
        type: CategoryType.INCOME,
        icon: "trending-up",
        color: "#0D9488",
        displayOrder: 3,
    },
    {
        name: "Gift",
        description: "Money received as gifts",
        type: CategoryType.INCOME,
        icon: "gift",
        color: "#2563EB",
        displayOrder: 4,
    },
    {
        name: "Other Income",
        description: "Miscellaneous income",
        type: CategoryType.INCOME,
        icon: "circle-dollar-sign",
        color: "#6366F1",
        displayOrder: 5,
    },

    // =========================
    // EXPENSE
    // =========================
    {
        name: "Food & Dining",
        description: "Restaurants, cafes and food delivery",
        type: CategoryType.EXPENSE,
        icon: "utensils-crossed",
        color: "#EF4444",
        displayOrder: 1,
    },
    {
        name: "Groceries",
        description: "Supermarket and grocery shopping",
        type: CategoryType.EXPENSE,
        icon: "shopping-cart",
        color: "#DC2626",
        displayOrder: 2,
    },
    {
        name: "Rent",
        description: "House rent",
        type: CategoryType.EXPENSE,
        icon: "home",
        color: "#B91C1C",
        displayOrder: 3,
    },
    {
        name: "Utilities",
        description: "Electricity, water, gas and internet",
        type: CategoryType.EXPENSE,
        icon: "zap",
        color: "#EA580C",
        displayOrder: 4,
    },
    {
        name: "Transportation",
        description: "Public transport and commuting",
        type: CategoryType.EXPENSE,
        icon: "bus",
        color: "#F97316",
        displayOrder: 5,
    },
    {
        name: "Shopping",
        description: "General shopping",
        type: CategoryType.EXPENSE,
        icon: "shopping-bag",
        color: "#F59E0B",
        displayOrder: 6,
    },
    {
        name: "Entertainment",
        description: "Movies, games and subscriptions",
        type: CategoryType.EXPENSE,
        icon: "popcorn",
        color: "#EAB308",
        displayOrder: 7,
    },
    // {
    //     name: "Investment",
    //     description: "Investments and savings",
    //     type: CategoryType.EXPENSE,
    //     icon: "piggybank",
    //     color: "#059669",
    //     displayOrder: 8,
    // },
    {
        name: "Other Expense",
        description: "Miscellaneous expenses",
        type: CategoryType.EXPENSE,
        icon: "circle-ellipsis",
        color: "#6B7280",
        displayOrder: 9,
    },
];