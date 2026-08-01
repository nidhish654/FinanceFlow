import PlanningPageContent from "@/features/planning/components/planning-page-content";

interface PlanningPageProps {
    searchParams: Promise<{
        tab?: string;
    }>;
}

export default async function PlanningPage({
    searchParams,
}: PlanningPageProps) {
    const { tab } = await searchParams;

    return (
        <PlanningPageContent
            initialModule={
                tab === "goals"
                    ? "goals"
                    : "budgets"
            }
        />
    );
}
