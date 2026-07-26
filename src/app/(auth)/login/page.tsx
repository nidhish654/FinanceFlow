import AuthCard from "@/features/auth/components/auth-card";
import AuthHeader from "@/features/auth/components/auth-header";
import LoginForm from "@/features/auth/components/login-form";

export const metadata = {
    title: "Login | FinanceFlow",
    description: "Sign in to your FinanceFlow account.",
};

export default function LoginPage() {
    return (
        <AuthCard>
            <AuthHeader
                title="Welcome Back"
                description="Sign in to continue managing your finances."
            />

            <LoginForm />
        </AuthCard>
    );
}