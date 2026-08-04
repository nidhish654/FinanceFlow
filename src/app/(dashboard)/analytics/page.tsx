import AnalyticsPageContent from "@/features/analytics/components/analytics-page-content";
import { getAnalyticsView } from "@/features/analytics/services/get-analytics-view";
import {
    ANALYTICS_RANGES,
    AnalyticsRange,
} from "@/features/analytics/types/analytics-view";

interface AnalyticsPageProps {
    searchParams: Promise<{
        range?: string;
        start?: string;
        end?: string;
    }>;
}

function isAnalyticsRange(value?: string): value is AnalyticsRange {
    return ANALYTICS_RANGES.some((range) => range === value);
}

export default async function AnalyticsPage({
    searchParams,
}: AnalyticsPageProps) {
    const { range, start, end } = await searchParams;
    const analyticsRange = isAnalyticsRange(range) ? range : "1M";

    // Parse custom dates if provided
    let customRange = undefined;
    if (analyticsRange === "CUSTOM" && start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            customRange = { startDate, endDate };
        }
    }

    const analytics = await getAnalyticsView(analyticsRange, customRange);

    return <AnalyticsPageContent analytics={analytics} />;
}
