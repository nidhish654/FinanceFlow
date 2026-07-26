"use server";

import { revalidatePath } from "next/cache";

import { TransactionType } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    transactionSchema,
    TransactionFormInput,
} from "../schemas/transaction.schema";

export async function updateTransaction(
    transactionId: string,
    values: TransactionFormInput
) {
    const parsed = transactionSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed.",
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const financeProfile =
        await requireActiveFinanceProfile();

    if (!financeProfile) {
        return {
            success: false,
            message: "Finance profile not found.",
            errors: undefined,
        };
    }

    const existingTransaction =
        await prisma.transaction.findFirst({
            where: {
                id: transactionId,
                financeProfileId: financeProfile.id,
            },
        });

    if (!existingTransaction) {
        return {
            success: false,
            message: "Transaction not found.",
            errors: undefined,
        };
    }

    const data = parsed.data;

    await prisma.transaction.update({
        where: {
            id: transactionId,
        },

        data: {
            accountId: data.accountId,

            transferAccountId:
                data.type === TransactionType.TRANSFER
                    ? data.transferAccountId || null
                    : null,

            categoryId:
                data.type === TransactionType.TRANSFER
                    ? null
                    : data.categoryId,

            type: data.type,

            priority:
                data.type === TransactionType.TRANSFER
                    ? null
                    : data.priority,

            amount: data.amount,

            description:
                data.description || null,

            merchant:
                data.merchant || null,

            notes:
                data.notes || null,

            referenceNumber:
                data.referenceNumber || null,

            transactionDate:
                data.transactionDate,
        },
    });

    revalidatePath("/transactions");
    revalidatePath("/accounts");
    revalidatePath("/dashboard");

    return {
        success: true,
        message:
            "Transaction updated successfully.",
        errors: undefined,
    };
}