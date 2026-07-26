"use server";

import { revalidatePath } from "next/cache";

import { FinanceProfileStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/auth/lib/session";

export async function deleteFinanceProfile(
    financeProfileId: string
) {
    try {
        const sessionUser = await getCurrentUser();

        if (!sessionUser) {
            return {
                success: false,
                message: "Unauthorized.",
            };
        }

        const profile = await prisma.financeProfile.findFirst({
            where: {
                id: financeProfileId,
                userId: sessionUser.id,
            },
            include: {
                accounts: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!profile) {
            return {
                success: false,
                message: "Finance profile not found.",
            };
        }

        if (
            profile.status !==
            FinanceProfileStatus.ARCHIVED
        ) {
            return {
                success: false,
                message:
                    "Archive the finance profile before deleting it.",
            };
        }

        const user = await prisma.user.findUnique({
            where: {
                id: sessionUser.id,
            },
            select: {
                activeFinanceProfileId: true,
            },
        });

        if (
            user?.activeFinanceProfileId ===
            financeProfileId
        ) {
            return {
                success: false,
                message:
                    "Cannot delete the active finance profile.",
            };
        }

        if (profile.accounts.length > 0) {
            return {
                success: false,
                message:
                    "This finance profile contains accounts. Delete the accounts first.",
            };
        }

        await prisma.financeProfile.delete({
            where: {
                id: financeProfileId,
            },
        });

        revalidatePath("/", "layout");

        return {
            success: true,
            message:
                "Finance profile deleted successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message:
                "Failed to delete finance profile.",
        };
    }
}