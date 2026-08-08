import { Prisma } from "@prisma/client";

export type TransactionWithRelations =
    Prisma.TransactionGetPayload<{
        include: {
            account: {
                select: {
                    id: true;
                    name: true;
                    type: true;
                    currency: true;
                };
            };

            transferAccount: {
                select: {
                    id: true;
                    name: true;
                };
            };

            category: {
                select: {
                    id: true;
                    name: true;
                    type: true;
                    icon: true;
                    color: true;
                    parentCategoryId: true;
                    parent: {
                        select: {
                            id: true;
                            name: true;
                            icon: true;
                            color: true;
                        };
                    };
                };
            };
        };
    }>;

export type TransactionDto = Omit<TransactionWithRelations, "amount"> & {
    amount: number;
};