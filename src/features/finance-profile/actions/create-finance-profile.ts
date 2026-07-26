"use server";

import { revalidatePath } from "next/cache";

import { FinanceProfileStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { getSession } from "@/features/auth/lib/session";

import { DEFAULT_CATEGORIES } from "@/features/categories/constants/default-categories";

import {
    financeProfileSchema,
    type FinanceProfileSchema,
} from "../schemas/finance-profile.schema";

export async function createFinanceProfile(
    data: FinanceProfileSchema
) {
    try {
        const session = await getSession();

        if (!session) {
            return {
                success: false,
                message: "You must be logged in.",
            };
        }

        const validatedData =
            financeProfileSchema.safeParse(data);

        if (!validatedData.success) {
            return {
                success: false,
                message: "Invalid form data.",
            };
        }

        const {
            name,
            description,
            baseCurrency,
        } = validatedData.data;

        const existingProfile =
            await prisma.financeProfile.findFirst({
                where: {
                    userId: session.user.id,
                    name,
                },
            });

        if (existingProfile) {
            return {
                success: false,
                message:
                    "A finance profile with this name already exists.",
            };
        }

        const financeProfile = await prisma.$transaction(async (tx) => {
        const profile = await tx.financeProfile.create({
            data: {
                userId: session.user.id,
                name,
                description,
                baseCurrency,
            },
        });

        await tx.category.createMany({
            data: DEFAULT_CATEGORIES.map((category) => ({
                financeProfileId: profile.id,

                name: category.name,
                description: category.description,

                type: category.type,

                icon: category.icon,
                color: category.color,

                displayOrder: category.displayOrder,

                isDefault: true,
            })),
        });

        const user = await tx.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                activeFinanceProfileId: true,
            },
        });

        if (!user?.activeFinanceProfileId) {
            await tx.user.update({
                where: {
                    id: session.user.id,
                },
                data: {
                    activeFinanceProfileId: profile.id,
                },
            });
        }

        return profile;
    });

        revalidatePath("/");
        revalidatePath("/dashboard");
        revalidatePath("/finance-profile/onboarding");
        revalidatePath("/finance-profiles");

        return {
            success: true,
            message: "Finance profile created successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message:
                "Something went wrong while creating the finance profile.",
        };
    }
}