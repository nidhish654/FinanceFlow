import { DashboardView } from "../types/dashboard-view";

import { getDashboardData } from "./get-dashboard-data";

import { getDashboardSummary } from "./get-dashboard-summary";
import { getDashboardCharts } from "./get-dashboard-charts";
import { getDashboardWidgets } from "./get-dashboard-widgets";
import { getDashboardInsights } from "./get-dashboard-insights";
import { getSettings } from "@/features/settings/services/get-settings";

export async function getDashboardView(): Promise<DashboardView> {

    const [
        { accounts, transactions, budgets, goals, currency },
        settings,
    ] = await Promise.all([
        getDashboardData(),
        getSettings(),
    ]);

    const summary =
        getDashboardSummary({
            accounts,
            transactions,
            currency,
            settings,
        });

    const charts =
        getDashboardCharts({
            transactions,
            settings,
        });

    const widgets =
        getDashboardWidgets({
            accounts,
            transactions,
            budgets,
            goals,
            currency,
        });

    const insights =
        getDashboardInsights({
            budgets: widgets.budgets,
            goals: widgets.goals,
        });

    return {
        currency,

        summary,

        charts,

        widgets,

        insights,
    };
}