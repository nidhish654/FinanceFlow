"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function PasswordInput({
    className,
    ...props
}: PasswordInputProps) {
    const [showPassword, setShowPassword] =
        useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                className={className}
                type={
                    showPassword
                        ? "text"
                        : "password"
                }
            />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={() =>
                    setShowPassword(
                        (prev) => !prev
                    )
                }
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
}