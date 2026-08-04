"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "../actions/request-password-reset";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export function ForgotPasswordForm() {
    const [isPending, setIsPending] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsPending(true);
        await requestPasswordReset(values);
        setIsPending(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="space-y-5 text-center">
                <div className="rounded-md bg-muted p-4">
                    <p className="text-md text-muted-foreground">
                        If an account exists for that email, we have sent a password reset link.
                    </p>
                    <p className="mt-4 text-md text-muted-foreground">
                        <strong>Check your spam if you don't find it in your inbox.</strong>
                    </p>
                </div>
                <Button asChild className="w-full" variant="outline">
                    <Link href="/login">Return to Login</Link>
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    disabled={isPending}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Log in
                </Link>
            </p>
        </form>
    );
}
