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

import { signUp } from "../lib/auth-client";
import {
    registerSchema,
    RegisterSchema,
} from "../schemas/register-schema";

import PasswordInput from "./password-input";

export default function RegisterForm() {
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(
            registerSchema
        ),

        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (
        values: RegisterSchema
    ) => {
        startTransition(async () => {
            const { error } =
                await signUp.email({
                    name: values.name,

                    email: values.email,

                    password:
                        values.password,
                });

            if (error) {
                toast.error(
                    error.message ??
                        "Unable to create account."
                );

                return;
            }

            toast.success(
                "Account created successfully."
            );

            router.push("/");
        });
    };

    return (
        <form
            onSubmit={handleSubmit(
                onSubmit
            )}
            className="space-y-5"
        >
            {/* Name */}

            <div className="space-y-2">
                <Label htmlFor="name">
                    Full Name
                </Label>

                <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                />

                {errors.name && (
                    <p className="text-sm text-destructive">
                        {
                            errors.name
                                .message
                        }
                    </p>
                )}
            </div>

            {/* Email */}

            <div className="space-y-2">
                <Label htmlFor="email">
                    Email
                </Label>

                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register(
                        "email"
                    )}
                />

                {errors.email && (
                    <p className="text-sm text-destructive">
                        {
                            errors.email
                                .message
                        }
                    </p>
                )}
            </div>

            {/* Password */}

            <div className="space-y-2">
                <Label htmlFor="password">
                    Password
                </Label>

                <PasswordInput
                    id="password"
                    placeholder="••••••••"
                    {...register(
                        "password"
                    )}
                />

                {errors.password && (
                    <p className="text-sm text-destructive">
                        {
                            errors
                                .password
                                .message
                        }
                    </p>
                )}
            </div>

            {/* Confirm Password */}

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                    Confirm Password
                </Label>

                <PasswordInput
                    id="confirmPassword"
                    placeholder="••••••••"
                    {...register(
                        "confirmPassword"
                    )}
                />

                {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                        {
                            errors
                                .confirmPassword
                                .message
                        }
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={
                    isPending
                }
            >
                {isPending
                    ? "Creating Account..."
                    : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-primary hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
}