"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import {
    AccountType,
    CategoryType,
    Priority,
    TransactionType,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { auth } from "@/features/auth/lib/auth";
import { getActiveFinanceProfile } from "@/features/finance-profile/services/active-finance-profile.service";

import { ImportTransaction } from "../import/schemas/import-schema";
import { ResolutionMap } from "../import/types/import-types";

const normalize = (value: string) =>
    value.trim().toLowerCase();

export async function importTransactions(
    transactions: ImportTransaction[],
    accountResolutions: ResolutionMap,
    categoryResolutions: ResolutionMap
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return {
                success: false,
                error: "Unauthorized",
            };
        }

        const activeProfile =
            await getActiveFinanceProfile();

        if (!activeProfile) {
            return {
                success: false,
                error: "No active finance profile found.",
            };
        }

        let newAccountsCount = 0;
        let newCategoriesCount = 0;

        const result = await prisma.$transaction(
            async (tx) => {
                /*
                 * --------------------------------------------------------
                 * ACCOUNTS
                 * --------------------------------------------------------
                 */

                const accountMap = new Map<
                    string,
                    string
                >();

                const existingAccounts =
                    await tx.financeAccount.findMany({
                        where: {
                            financeProfileId:
                                activeProfile.id,
                        },
                        select: {
                            id: true,
                            name: true,
                        },
                    });

                existingAccounts.forEach(
                    (account) => {
                        accountMap.set(
                            normalize(account.name),
                            account.id
                        );
                    }
                );

                for (const [
                    csvName,
                    resolution,
                ] of Object.entries(
                    accountResolutions
                )) {
                    if (
                        resolution.type ===
                        "existing" &&
                        resolution.existingId
                    ) {
                        accountMap.set(
                            normalize(csvName),
                            resolution.existingId
                        );
                    } else if (
                        resolution.type ===
                        "create" &&
                        resolution.newName
                    ) {
                        const newAccount =
                            await tx.financeAccount.create(
                                {
                                    data: {
                                        name: resolution.newName,
                                        type: AccountType.BANK,
                                        openingBalance: 0,
                                        financeProfileId:
                                            activeProfile.id,
                                    },
                                }
                            );

                        accountMap.set(
                            normalize(csvName),
                            newAccount.id
                        );

                        newAccountsCount++;
                    }
                }

                /*
                 * --------------------------------------------------------
                 * CATEGORIES
                 * --------------------------------------------------------
                 */

                const categoryMap =
                    new Map<string, string>();

                const existingCategories =
                    await tx.category.findMany({
                        where: {
                            financeProfileId:
                                activeProfile.id,
                        },
                        select: {
                            id: true,
                            name: true,
                        },
                    });

                existingCategories.forEach(
                    (category) => {
                        categoryMap.set(
                            normalize(category.name),
                            category.id
                        );
                    }
                );

                for (const [
                    csvName,
                    resolution,
                ] of Object.entries(
                    categoryResolutions
                )) {
                    if (
                        resolution.type ===
                        "existing" &&
                        resolution.existingId
                    ) {
                        categoryMap.set(
                            normalize(csvName),
                            resolution.existingId
                        );
                    } else if (
                        resolution.type ===
                        "create" &&
                        resolution.newName
                    ) {
                        const importedTransaction =
                            transactions.find(
                                (t) =>
                                    normalize(
                                        t.category
                                    ) ===
                                    normalize(
                                        csvName
                                    )
                            );

                        const categoryType =
                            importedTransaction?.type ===
                                "income"
                                ? CategoryType.INCOME
                                : CategoryType.EXPENSE;

                        const newCategory =
                            await tx.category.create(
                                {
                                    data: {
                                        name: resolution.newName,
                                        type: categoryType,
                                        financeProfileId:
                                            activeProfile.id,
                                    },
                                }
                            );

                        categoryMap.set(
                            normalize(csvName),
                            newCategory.id
                        );

                        newCategoriesCount++;
                    }
                }

                /*
                 * --------------------------------------------------------
                 * TRANSACTIONS
                 * --------------------------------------------------------
                 */

                const txData =
                    transactions.map((t) => {
                        const accountId =
                            accountMap.get(
                                normalize(
                                    t.account
                                )
                            );

                        const categoryId =
                            categoryMap.get(
                                normalize(
                                    t.category
                                )
                            );

                        if (!accountId) {
                            throw new Error(
                                `Unable to resolve account "${t.account}".`
                            );
                        }

                        if (!categoryId) {
                            throw new Error(
                                `Unable to resolve category "${t.category}".`
                            );
                        }

                        return {
                            financeProfileId:
                                activeProfile.id,

                            accountId,

                            categoryId,

                            type:
                                t.type.toUpperCase() as TransactionType,

                            amount: t.amount,

                            transactionDate:
                                new Date(
                                    t.date
                                ),

                            priority:
                                t.priority.toUpperCase() as Priority,

                            description:
                                t.description ||
                                null,

                            merchant:
                                t.merchant ||
                                null,

                            referenceNumber:
                                t.referenceNumber ||
                                null,

                            notes:
                                t.notes || null,
                        };
                    });

                /*
                 * --------------------------------------------------------
                 * INSERT
                 * --------------------------------------------------------
                 */

                const created =
                    await tx.transaction.createMany(
                        {
                            data: txData,
                        }
                    );

                return {
                    imported: created.count,
                    newAccountsCount,
                    newCategoriesCount,
                };
            }
        );

        revalidatePath("/dashboard");
        revalidatePath("/transactions");
        revalidatePath("/analytics");
        revalidatePath("/planning");

        return {
            success: true,
            data: result,
        };
    } catch (error: any) {
        console.error(
            "Import error:",
            error
        );

        return {
            success: false,
            error:
                error.message ??
                "An unexpected error occurred during import.",
        };
    }
}