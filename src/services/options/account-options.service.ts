import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function getAccountOptions() {
    const financeProfile =
        await requireActiveFinanceProfile();

    const accounts =
        await prisma.financeAccount.findMany({
            where: {
                financeProfileId: financeProfile.id,
                isArchived: false,
            },

            orderBy: {
                name: "asc",
            },
        });

    return accounts.map((account) => ({
        value: account.id,
        label: account.name,
    }));
}