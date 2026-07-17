"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import {
    accountSchema,
    AccountFormInput,
} from "../schemas/account.schema";

export async function createAccount(values: AccountFormInput) {
    const parsed = accountSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed.",
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const financeProfile = await prisma.financeProfile.findFirst();

    if (!financeProfile) {
        return {
            success: false,
            message: "Finance profile not found.",
        };
    }

    await prisma.account.create({
        data: {
            ...parsed.data,
            financeProfileId: financeProfile.id,
        },
    });

    revalidatePath("/accounts");

    return {
        success: true,
        message: "Account created successfully.",
    };
}