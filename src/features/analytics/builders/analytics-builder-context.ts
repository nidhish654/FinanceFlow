import { TransactionDto } from "@/features/transactions/types/transaction";

import {
    AnalyticsSummary,
} from "../types/analytics-view";

export interface AnalyticsBuilderContext {
    periodTransactions: TransactionDto[];

    summary: AnalyticsSummary;

    byAmount: <T extends { amount: number }>(
        a: T,
        b: T
    ) => number;
}