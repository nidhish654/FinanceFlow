import {
    AccountType,
    Currency,
} from "@prisma/client";

export interface AccountDto {
    id: string;
    name: string;
    type: AccountType;
    currency: Currency | null;
    openingBalance: number;

    currentBalance: number;
    transactionCount: number;
    isArchived: boolean;
}