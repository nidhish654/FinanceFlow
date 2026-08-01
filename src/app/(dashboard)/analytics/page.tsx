import AnalyticsPageContent from "@/features/analytics/components/analytics-page-content";
import { getAnalyticsView } from "@/features/analytics/services/get-analytics-view";
import {
    ANALYTICS_RANGES,
    AnalyticsRange,
} from "@/features/analytics/types/analytics-view";

interface AnalyticsPageProps {
    searchParams: Promise<{
        range?: string;
    }>;
}

function isAnalyticsRange(value?: string): value is AnalyticsRange {
    return ANALYTICS_RANGES.some((range) => range === value);
}

export default async function AnalyticsPage({
    searchParams,
}: AnalyticsPageProps) {
    const { range } = await searchParams;
    const analyticsRange = isAnalyticsRange(range) ? range : "12M";
    const analytics = await getAnalyticsView(analyticsRange);

    return <AnalyticsPageContent analytics={analytics} />;
}
