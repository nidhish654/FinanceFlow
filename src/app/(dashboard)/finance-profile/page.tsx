import PageHeader from "@/components/common/PageHeader";

import {
    getAllFinanceProfiles,
    requireActiveFinanceProfile,
} from "@/features/finance-profile/services";

import CreateFinanceProfileDialog from "@/features/finance-profile/components/create-finance-profile-dialog";
import FinanceProfilesView from "@/features/finance-profile/components/finance-profiles-view";

export default async function FinanceProfilesPage() {
    const profiles = await getAllFinanceProfiles();

    const activeProfile =
        await requireActiveFinanceProfile();

    const activeProfiles = profiles.filter(
        (profile) => profile.status === "ACTIVE"
    );

    const archivedProfiles = profiles.filter(
        (profile) => profile.status === "ARCHIVED"
    );

    return (
        <main className="space-y-8">
            <PageHeader
                title="Finance Profiles"
                description="Manage your finance profiles."
            >
                <CreateFinanceProfileDialog />
            </PageHeader>

            <FinanceProfilesView
                activeProfiles={activeProfiles}
                archivedProfiles={archivedProfiles}
                activeProfileId={activeProfile.id}
            />
        </main>
    );
}