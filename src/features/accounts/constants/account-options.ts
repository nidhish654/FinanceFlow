import { AccountType, Currency } from "@prisma/client";

export const ACCOUNT_TYPE_OPTIONS = [
    { label: "Cash", value: AccountType.CASH },
    { label: "Bank", value: AccountType.BANK },
    { label: "Credit Card", value: AccountType.CREDIT_CARD },
    { label: "Digital Wallet", value: AccountType.DIGITAL_WALLET },
    { label: "Savings", value: AccountType.SAVINGS },
    { label: "Investment", value: AccountType.INVESTMENT },
];

export const CURRENCY_OPTIONS = [
    { label: "Indian Rupee (₹)", value: Currency.INR },
    { label: "Japanese Yen (¥)", value: Currency.JPY },
    { label: "US Dollar ($)", value: Currency.USD },
    { label: "Euro (€)", value: Currency.EUR },
    { label: "British Pound (£)", value: Currency.GBP },
];