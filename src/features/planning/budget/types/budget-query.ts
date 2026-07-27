import { Prisma } from "@prisma/client";

export type BudgetWithCategory = Prisma.BudgetGetPayload<{
    include: {
        category: {
            select: {
                id: true;
                name: true;
                icon: true;
                color: true;
                parentCategoryId: true;

                parent: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            };
        };
    };
}>;