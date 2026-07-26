"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    accountSchema,
    AccountFormInput,
} from "../schemas/account.schema";

export async function updateAccount(
    id: string,
    values: AccountFormInput
) {
    const parsed = accountSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed.",
        };
    }

    const financeProfile = await requireActiveFinanceProfile();
    await prisma.financeAccount.update({
        where: {
            id,
        },
        data: {
        ...parsed.data,
        currency: financeProfile.baseCurrency,
        },
    });

    revalidatePath("/accounts");

    return {
        success: true,
        message: "Account updated successfully.",
    };
}