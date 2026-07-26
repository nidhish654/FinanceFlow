import DataCard from "@/components/common/DataCard";

export default function RecentActivity() {
    return (
        <DataCard>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                    Recent Activity
                </h2>

                <div className="rounded-lg border border-dashed py-10 text-center text-muted-foreground">
                    No recent transactions yet.
                </div>
            </div>
        </DataCard>
    );
}