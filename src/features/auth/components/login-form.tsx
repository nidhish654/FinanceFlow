"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "../lib/auth-client";
import {
    loginSchema,
    LoginSchema,
} from "../schemas/login-schema";

import PasswordInput from "./password-input";

export default function LoginForm() {
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: LoginSchema) => {
        startTransition(async () => {
            const { error } =
                await signIn.email({
                    email: values.email,
                    password: values.password,
                });

            if (error) {
                toast.error(
                    error.message ??
                        "Invalid email or password."
                );

                return;
            }

            toast.success(
                "Logged in successfully."
            );

            router.push("/");
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div className="space-y-2">
                <Label htmlFor="email">
                    Email
                </Label>

                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                />

                {errors.email && (
                    <p className="text-sm text-destructive">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">
                    Password
                </Label>

                <PasswordInput
                    id="password"
                    placeholder="••••••••"
                    {...register("password")}
                />

                {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                {isPending
                    ? "Signing In..."
                    : "Sign In"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-primary hover:underline"
                >
                    Create Account
                </Link>
            </p>
        </form>
    );
}