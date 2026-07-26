import AuthCard from "@/features/auth/components/auth-card";
import AuthHeader from "@/features/auth/components/auth-header";
import RegisterForm from "@/features/auth/components/register-form";

export const metadata = {
    title: "Register | FinanceFlow",
    description:
        "Create your FinanceFlow account.",
};

export default function RegisterPage() {
    return (
        <AuthCard>
            <AuthHeader
                title="Create Account"
                description="Create your FinanceFlow account to start managing your finances."
            />

            <RegisterForm />
        </AuthCard>
    );
}