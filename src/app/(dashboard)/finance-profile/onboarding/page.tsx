import { redirect } from "next/navigation";

import PageHeader from "@/components/common/PageHeader";

import FinanceProfileForm from "@/features/finance-profile/components/finance-profile-form";

import { createFinanceProfile } from "@/features/finance-profile/actions/create-finance-profile";

import { getFinanceProfiles } from "@/features/finance-profile/services";

export default async function FinanceProfileOnboardingPage() {
    const profiles = await getFinanceProfiles();

    if (profiles.length > 0) {
        redirect("/dashboard");
    }

    async function handleCreate(values: any) {
        "use server";

        await createFinanceProfile(values);

        redirect("/dashboard");
    }

    return (
        <main className="mx-auto max-w-2xl space-y-8">
            <PageHeader
                title="Create your first Finance Profile"
                description="Before using FinanceFlow, create a finance profile to organize your accounts, transactions and budgets."
            />

            <FinanceProfileForm
                title="Finance Profile"
                description="Create your first finance profile."
                submitLabel="Create Finance Profile"
                loadingLabel="Creating..."
                onSubmit={handleCreate}
            />
        </main>
    );
}