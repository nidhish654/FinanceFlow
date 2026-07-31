import { Prisma } from "@prisma/client";

export type GoalWithHistoryCount =
    Prisma.GoalGetPayload<{
        include: {
            _count: {
                select: {
                    history: true;
                };
            };
        };
    }>;

export type GoalHistory =
    Prisma.GoalHistoryGetPayload<{}>;