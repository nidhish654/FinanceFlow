import { Suspense } from "react";
import AuthCard from "@/features/auth/components/auth-card";
import AuthHeader from "@/features/auth/components/auth-header";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata = {
    title: "Reset Password | FinanceFlow",
    description: "Create a new password for your FinanceFlow account.",
};

export default function ResetPasswordPage() {
    return (
        <AuthCard>
            <AuthHeader
                title="Reset Password"
                description="Enter and confirm your new password."
            />
            <Suspense fallback={<div className="text-sm text-muted-foreground text-center">Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </AuthCard>
    );
}
