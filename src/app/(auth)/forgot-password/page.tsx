import AuthCard from "@/features/auth/components/auth-card";
import AuthHeader from "@/features/auth/components/auth-header";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata = {
    title: "Forgot Password | FinanceFlow",
    description: "Request a password reset for your FinanceFlow account.",
};

export default function ForgotPasswordPage() {
    return (
        <AuthCard>
            <AuthHeader
                title="Forgot Password"
                description="Enter your email to receive a password reset link."
            />
            <ForgotPasswordForm />
        </AuthCard>
    );
}
