import { ReactNode } from "react";

import { Label } from "@/components/ui/label";

import FormError from "./FormError";

interface FormFieldProps {
    label: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
}

export default function FormField({
    label,
    error,
    required,
    children,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label>
                {label}

                {required && (
                    <span className="text-destructive ml-1">*</span>
                )}
            </Label>

            {children}

            <FormError message={error} />
        </div>
    );
}