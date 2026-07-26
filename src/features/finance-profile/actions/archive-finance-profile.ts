"use server";

import { revalidatePath } from "next/cache";

import { FinanceProfileStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/auth/lib/session";

export async function archiveFinanceProfile(
    financeProfileId: string
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return {
                success: false,
                message: "Unauthorized.",
            };
        }

        const profile =
            await prisma.financeProfile.findFirst({
                where: {
                    id: financeProfileId,
                    userId: user.id,
                },
            });

        if (!profile) {
            return {
                success: false,
                message: "Finance profile not found.",
            };
        }

        const currentUser =
            await prisma.user.findUnique({
                where: {
                    id: user.id,
                },
                select: {
                    activeFinanceProfileId: true,
                },
            });

        if (
            currentUser?.activeFinanceProfileId ===
            financeProfileId
        ) {
            return {
                success: false,
                message:
                    "Switch to another finance profile before archiving this one.",
            };
        }

        await prisma.financeProfile.update({
            where: {
                id: financeProfileId,
            },
            data: {
                status: FinanceProfileStatus.ARCHIVED,
            },
        });

        revalidatePath("/", "layout");

        return {
            success: true,
            message:
                "Finance profile archived successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message:
                "Failed to archive finance profile.",
        };
    }
}