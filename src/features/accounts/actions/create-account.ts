"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import {
    accountSchema,
    AccountFormInput,
} from "../schemas/account.schema";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function createAccount(values: AccountFormInput) {
    const parsed = accountSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed.",
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const financeProfile = await requireActiveFinanceProfile();;

    if (!financeProfile) {
        return {
            success: false,
            message: "Finance profile not found.",
        };
    }

    await prisma.financeAccount.create({
        data: {
            ...parsed.data,
            currency: financeProfile.baseCurrency,
            financeProfileId: financeProfile.id,
        },
    });

    revalidatePath("/accounts");

    return {
        success: true,
        message: "Account created successfully.",
    };
}