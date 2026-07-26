import PageHeader from "@/components/common/PageHeader";

import DashboardStats from "@/features/dashboard/components/dashboard-stats";
import QuickActions from "@/features/dashboard/components/quick-actions";
import RecentActivity from "@/features/dashboard/components/recent-activity";
import { getDashboardData } from "@/features/dashboard/services/dashboard.service";

export default async function DashboardPage() {
    const data = await getDashboardData();

    return (
        <main className="space-y-8">
            <PageHeader
                title="Dashboard"
                description="Here's an overview of your finances."
            />

            <DashboardStats
                totalBalance={data.totalBalance}
                accountCount={data.accountCount}
            />

            <QuickActions />

            <RecentActivity />
        </main>
    );
}