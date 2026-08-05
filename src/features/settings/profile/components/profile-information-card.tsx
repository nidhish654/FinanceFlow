"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Pencil,
    ArrowRight,
    Lock,
} from "lucide-react";

import {
    ProfileSchema,
    ProfileFormData,
} from "../profile.schema";
import { UserProfileData } from "../profile.types";

import { useUnsavedChanges } from "../../hooks/use-unsaved-changes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangePasswordDialog } from "@/features/auth/components/change-password-dialog";

interface ProfileInformationCardProps {
    profile: UserProfileData;
    onChange: (
        data: Partial<ProfileFormData>
    ) => void;
}

export function ProfileInformationCard({
    profile,
    onChange,
}: ProfileInformationCardProps) {
    const { markDirty } =
        useUnsavedChanges();

    const [isEditing, setIsEditing] =
        useState(false);

    const form =
        useForm<ProfileFormData>({
            resolver: zodResolver(
                ProfileSchema
            ),
            defaultValues: {
                displayName:
                    profile.displayName,
            },
        });

    const error =
        form.formState.errors
            .displayName?.message;

    const currentDisplayName =
        form.watch("displayName");

    const handleDone = async () => {
        const isValid =
            await form.trigger(
                "displayName"
            );

        if (!isValid) return;

        setIsEditing(false);

        if (
            currentDisplayName !==
            profile.displayName
        ) {
            onChange({
                displayName:
                    currentDisplayName,
            });

            markDirty();
        }
    };

    const handleCancel = () => {
        form.reset({
            displayName:
                profile.displayName,
        });

        setIsEditing(false);
    };

    return (
        <div className="flex h-full flex-col">
            {/* Display Name */}
            <div className="flex items-start justify-between gap-6 border-b border-border/50 py-6">
                <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">
                        Display Name
                    </p>

                    {isEditing ? (
                        <div className="mt-3 flex flex-col gap-3">
                            <Input
                                {...form.register(
                                    "displayName"
                                )}
                                className={
                                    error
                                        ? "border-destructive focus-visible:ring-destructive"
                                        : ""
                                }
                            />

                            {error && (
                                <p className="text-xs font-medium text-destructive">
                                    {error}
                                </p>
                            )}

                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={
                                        handleDone
                                    }
                                >
                                    Done
                                </Button>

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={
                                        handleCancel
                                    }
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-1 text-base font-semibold">
                            {
                                currentDisplayName
                            }
                        </p>
                    )}
                </div>

                {!isEditing && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            setIsEditing(
                                true
                            )
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                )}
            </div>

            {/* Password */}
            <div className="flex items-start justify-between gap-6 border-b border-border/50 py-6">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Password
                    </p>

                    <p className="mt-1 text-base font-medium tracking-[0.3em]">
                        ••••••••
                    </p>
                </div>

                <ChangePasswordDialog
                    trigger={
                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            <Lock className="mr-2 h-4 w-4" />
                            Change
                        </Button>
                    }
                />
            </div>

            {/* Email Section */}
            <div className="flex items-start justify-between gap-6 border-b border-border/50 py-6">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">
                        Email
                    </p>
                    <p className="mt-1 text-base font-semibold">{profile.email}</p>
                </div>
            </div>

            {/* Finance Profile */}
            <div className="flex items-start justify-between gap-6 py-6">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Finance Profile
                    </p>

                    <p className="mt-1 text-base font-semibold">
                        {
                            profile.activeFinanceProfileName
                        }
                    </p>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                >
                    <Link href="/finance-profile">
                        Switch
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}