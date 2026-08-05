"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getPasswordStrength } from "../lib/password-strength";
import { changePassword } from "../actions/change-password";
import PasswordInput from "./password-input";

const formSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export function ChangePasswordDialog({ trigger }: { trigger?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const newPassword = watch("newPassword");
    const strength = getPasswordStrength(newPassword);

    const strengthMap = {
        Weak: { color: "bg-red-500", bars: 1 },
        Medium: { color: "bg-amber-500", bars: 3 },
        Strong: { color: "bg-emerald-500", bars: 5 },
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (strength === "Weak") {
            setError("newPassword", { message: "Password is too weak" });
            return;
        }

        setIsPending(true);

        const result = await changePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        });

        setIsPending(false);

        if (result.success) {
            toast.success("Password updated successfully.");
            reset();
            setOpen(false);
        } else {
            toast.error(result.error || "Failed to update password.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">Change Password</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Enter your current password and choose a new one.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <PasswordInput 
                            id="currentPassword" 
                            placeholder="••••••••" 
                            {...register("currentPassword")} 
                        />
                        {errors.currentPassword && (
                            <p className="text-sm text-destructive">{errors.currentPassword.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <PasswordInput 
                            id="newPassword" 
                            placeholder="••••••••" 
                            {...register("newPassword")} 
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
                        {errors.newPassword && (
                            <p className="text-sm text-destructive">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <PasswordInput 
                            id="confirmPassword" 
                            placeholder="••••••••" 
                            {...register("confirmPassword")} 
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
