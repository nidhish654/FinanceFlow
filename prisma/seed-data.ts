import {
    AccountType,
    CategoryType,
    Currency,
} from "@prisma/client";

/**
 * ============================================================================
 * INDIA ACCOUNTS
 * ============================================================================
 */

export const indiaAccountSeedData = [
    {
        name: "Cash Wallet",
        type: AccountType.CASH,
        currency: Currency.INR,
        openingBalance: 5000,
        color: "#22C55E",
        icon: "wallet",
    },
    {
        name: "SBI Savings",
        type: AccountType.BANK,
        currency: Currency.INR,
        openingBalance: 85000,
        color: "#2563EB",
        icon: "building-2",
    },
    {
        name: "HDFC Credit Card",
        type: AccountType.CREDIT_CARD,
        currency: Currency.INR,
        openingBalance: 0,
        color: "#EF4444",
        icon: "credit-card",
    },
    {
        name: "PhonePe Wallet",
        type: AccountType.DIGITAL_WALLET,
        currency: Currency.INR,
        openingBalance: 1250,
        color: "#7C3AED",
        icon: "smartphone",
    },
];

/**
 * ============================================================================
 * JAPAN ACCOUNTS
 * ============================================================================
 */

export const japanAccountSeedData = [
    {
        name: "Cash Wallet",
        type: AccountType.CASH,
        currency: Currency.JPY,
        openingBalance: 30000,
        color: "#22C55E",
        icon: "wallet",
    },
    {
        name: "JP Bank",
        type: AccountType.BANK,
        currency: Currency.JPY,
        openingBalance: 450000,
        color: "#2563EB",
        icon: "building-2",
    },
    {
        name: "Rakuten Card",
        type: AccountType.CREDIT_CARD,
        currency: Currency.JPY,
        openingBalance: 0,
        color: "#EF4444",
        icon: "credit-card",
    },
    {
        name: "PayPay Wallet",
        type: AccountType.DIGITAL_WALLET,
        currency: Currency.JPY,
        openingBalance: 12000,
        color: "#7C3AED",
        icon: "smartphone",
    },
];

/**
 * ============================================================================
 * EXPENSE CATEGORIES
 * ============================================================================
 */

export const expenseCategorySeedData = [
    {
        name: "Food & Dining",
        icon: "utensils",
        color: "#F97316",
    },
    {
        name: "Groceries",
        icon: "shopping-cart",
        color: "#22C55E",
    },
    {
        name: "Transport",
        icon: "car",
        color: "#3B82F6",
    },
    {
        name: "Fuel",
        icon: "fuel",
        color: "#EAB308",
    },
    {
        name: "Shopping",
        icon: "shopping-bag",
        color: "#EC4899",
    },
    {
        name: "Entertainment",
        icon: "film",
        color: "#8B5CF6",
    },
    {
        name: "Bills & Utilities",
        icon: "receipt",
        color: "#EF4444",
    },
    {
        name: "Healthcare",
        icon: "heart-pulse",
        color: "#DC2626",
    },
    {
        name: "Education",
        icon: "graduation-cap",
        color: "#0EA5E9",
    },
    {
        name: "Travel",
        icon: "plane",
        color: "#06B6D4",
    },
    {
        name: "Rent",
        icon: "house",
        color: "#A855F7",
    },
    {
        name: "Insurance",
        icon: "shield-check",
        color: "#0F766E",
    },
];

/**
 * ============================================================================
 * INCOME CATEGORIES
 * ============================================================================
 */

export const incomeCategorySeedData = [
    {
        name: "Salary",
        icon: "wallet",
        color: "#16A34A",
    },
    {
        name: "Freelancing",
        icon: "briefcase",
        color: "#2563EB",
    },
    {
        name: "Bonus",
        icon: "gift",
        color: "#D97706",
    },
    {
        name: "Investment",
        icon: "trending-up",
        color: "#7C3AED",
    },
    {
        name: "Interest",
        icon: "landmark",
        color: "#0EA5E9",
    },
    {
        name: "Cashback",
        icon: "coins",
        color: "#EAB308",
    },
    {
        name: "Refund",
        icon: "rotate-ccw",
        color: "#22C55E",
    },
    {
        name: "Gift",
        icon: "gift",
        color: "#EC4899",
    },
];

/**
 * ============================================================================
 * ALL CATEGORIES
 * ============================================================================
 */

export const categorySeedData = [
    ...expenseCategorySeedData.map((category, index) => ({
        ...category,
        type: CategoryType.EXPENSE,
        displayOrder: index + 1,
    })),

    ...incomeCategorySeedData.map((category, index) => ({
        ...category,
        type: CategoryType.INCOME,
        displayOrder: index + 1,
    })),
];