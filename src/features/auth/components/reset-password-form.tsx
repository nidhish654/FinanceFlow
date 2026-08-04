"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPasswordStrength } from "../lib/password-strength";
import { resetPassword } from "../actions/reset-password";
import PasswordInput from "./password-input";

const formSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const newPassword = form.watch("newPassword");
    const strength = getPasswordStrength(newPassword);

    const strengthMap = {
        Weak: { color: "bg-red-500", bars: 1 },
        Medium: { color: "bg-amber-500", bars: 3 },
        Strong: { color: "bg-emerald-500", bars: 5 },
    };

    if (!token) {
        return (
            <div className="space-y-5 text-center">
                <div className="rounded-md bg-destructive/10 p-4">
                    <p className="text-sm text-destructive">
                        Invalid or missing reset token.
                    </p>
                </div>
                <Button asChild className="w-full" variant="outline">
                    <Link href="/login">Return to Login</Link>
                </Button>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="space-y-5 text-center">
                <div className="rounded-md bg-emerald-500/10 p-4">
                    <p className="text-sm text-emerald-600">
                        Password updated successfully.
                    </p>
                </div>
                <Button asChild className="w-full">
                    <Link href="/login">Return to Login</Link>
                </Button>
            </div>
        );
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (strength === "Weak") {
            form.setError("newPassword", { message: "Password is too weak" });
            return;
        }

        setIsPending(true);
        const result = await resetPassword({
            token,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        });
        setIsPending(false);

        if (result.success) {
            toast.success("Password updated successfully.");
            setIsSuccess(true);
        } else {
            toast.error(result.error || "Failed to reset password.");
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <PasswordInput
                    id="newPassword"
                    placeholder="••••••••"
                    {...form.register("newPassword")}
                    disabled={isPending}
                />
                {newPassword && (
                    <div className="mt-2 flex items-center space-x-2">
                        <div className="flex h-1.5 w-full space-x-1 overflow-hidden rounded-full bg-secondary">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-full w-full flex-1 ${
                                        i < strengthMap[strength].bars
                                            ? strengthMap[strength].color
                                            : "bg-transparent"
                                    } transition-all duration-300`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground w-12 text-right">
                            {strength}
                        </span>
                    </div>
                )}
                {form.formState.errors.newPassword && (
                    <p className="text-sm text-destructive">{form.formState.errors.newPassword.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput
                    id="confirmPassword"
                    placeholder="••••••••"
                    {...form.register("confirmPassword")}
                    disabled={isPending}
                />
                {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset Password
            </Button>
        </form>
    );
}
