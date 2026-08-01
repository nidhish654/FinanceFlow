import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";

import DashboardPageContent from "@/features/dashboard/components/dashboard-page-content";

import { getDashboardView } from "@/features/dashboard/services/get-dashboard-view";

import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
    const dashboard =
        await getDashboardView();

    return (
        <main className="space-y-8">

            <PageHeader
                title="Dashboard"
                description="Your financial overview at a glance."
            >
                <Button asChild>
                    <Link href="/transactions/new">
                        <Plus data-icon="inline-start" />
                        Add transaction
                    </Link>
                </Button>
            </PageHeader>

            <DashboardPageContent
                dashboard={dashboard}
            />

        </main>
    );
}
