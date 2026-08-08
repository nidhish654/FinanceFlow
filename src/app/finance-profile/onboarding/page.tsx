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
        <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
            <PageHeader
                title="Create your first Finance Profile"
                description="Set up your first finance profile to start tracking accounts, transactions, budgets and goals."
            />

            <div className="mt-8">
                <FinanceProfileForm
                    submitLabel="Continue"
                    loadingLabel="Creating..."
                    onSubmit={handleCreate}
                />
            </div>
        </main>
    );
}