"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/auth/lib/session";

import {
    financeProfileSchema,
    type FinanceProfileSchema,
} from "../schemas/finance-profile.schema";

export async function updateFinanceProfile(
    financeProfileId: string,
    data: FinanceProfileSchema
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return {
                success: false,
                message: "Unauthorized.",
            };
        }

        const validated =
            financeProfileSchema.safeParse(data);

        if (!validated.success) {
            return {
                success: false,
                message: "Invalid form data.",
            };
        }

        const profile =
            await prisma.financeProfile.findFirst({
                where: {
                    id: financeProfileId,
                    userId: user.id,
                    status: "ACTIVE",
                },
            });

        if (!profile) {
            return {
                success: false,
                message:
                    "Finance profile not found.",
            };
        }

        const duplicate =
            await prisma.financeProfile.findFirst({
                where: {
                    id: {
                        not: financeProfileId,
                    },
                    userId: user.id,
                    name: validated.data.name,
                    status: "ACTIVE",
                },
            });

        if (duplicate) {
            return {
                success: false,
                message:
                    "A finance profile with this name already exists.",
            };
        }

        await prisma.financeProfile.update({
            where: {
                id: financeProfileId,
            },
            data: {
                name: validated.data.name,
                description:
                    validated.data.description,
            },
        });

        revalidatePath("/", "layout");

        return {
            success: true,
            message:
                "Finance profile updated successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message:
                "Failed to update finance profile.",
        };
    }
}