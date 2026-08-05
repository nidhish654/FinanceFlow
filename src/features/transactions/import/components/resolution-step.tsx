"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ResolutionMap, UnknownAccount, UnknownCategory } from "../types/import-types";
import { CategoryOption, filterCategoriesByTransactionType } from "@/features/categories/lib/category-utils";
import { AccountOption } from "../../components/transaction-toolbar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResolutionStepProps {
    title: string;
    description: string;
    unknownAccounts: UnknownAccount[];
    unknownCategories: UnknownCategory[];
    type: "account" | "category";
    existingEntities: (AccountOption | CategoryOption)[];
    onResolve: (resolutions: ResolutionMap) => void;
    onCancel: () => void;
}

export function ResolutionStep({
    title,
    description,
    unknownAccounts,
    unknownCategories,
    type,
    existingEntities,
    onResolve,
    onCancel,
}: ResolutionStepProps) {
    const unknownEntities = type === "account" ? unknownAccounts : unknownCategories;

    const [resolutions, setResolutions] = useState<ResolutionMap>(() => {
        const initial: ResolutionMap = {};
        unknownEntities.forEach((u) => {
            const entityName = u.csvName;
            // Support default matching
            const matchedId = type === "account" 
                ? (u as UnknownAccount).matchedAccountId 
                : (u as UnknownCategory).matchedCategoryId;

            if (matchedId) {
                initial[entityName] = { type: "existing", existingId: matchedId };
            } else {
                initial[entityName] = { type: "create", newName: entityName };
            }
        });
        return initial;
    });

    const handleChangeType = (entity: string, type: "create" | "existing") => {
        setResolutions((prev) => ({
            ...prev,
            [entity]: { 
                type, 
                newName: type === "create" ? entity : undefined,
                existingId: type === "existing" && existingEntities.length > 0 ? existingEntities[0].id : undefined 
            },
        }));
    };

    const handleChangeExistingId = (entity: string, id: string) => {
        setResolutions((prev) => ({
            ...prev,
            [entity]: { ...prev[entity], existingId: id },
        }));
    };

    const handleChangeNewName = (entity: string, name: string) => {
        setResolutions((prev) => ({
            ...prev,
            [entity]: { ...prev[entity], newName: name },
        }));
    };

    const isAllResolved = unknownEntities.every((u) => {
        const res = resolutions[u.csvName];
        if (!res) return false;
        if (res.type === "create") return !!res.newName?.trim();
        if (res.type === "existing") return !!res.existingId;
        return false;
    });

    if (unknownEntities.length === 0) {
        return (
            <div className="space-y-6 text-center py-8">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 mx-auto flex items-center justify-center mb-4">
                    <span className="text-emerald-500 text-xl font-bold">✓</span>
                </div>
                <h3 className="text-lg font-semibold">All {title} Recognized</h3>
                <p className="text-muted-foreground text-sm">No new {title.toLowerCase()} need to be created.</p>
                
                <div className="flex items-center justify-center pt-4">
                    <Button onClick={() => onResolve({})}>Continue</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-xl border space-y-2">
                <h3 className="font-semibold text-sm">Resolve {title}</h3>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>

            <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-6">
                    {unknownEntities.map((u) => {
                        const entity = u.csvName;
                        const current = resolutions[entity];
                        if (!current) return null;

                        const filteredExistingEntities = type === "category" 
                            ? filterCategoriesByTransactionType(
                                existingEntities as CategoryOption[], 
                                (u as UnknownCategory).transactionType === "income" ? "INCOME" : "EXPENSE"
                            )
                            : existingEntities;

                        return (
                            <div key={entity} className="border rounded-xl p-4 bg-card shadow-sm space-y-4">
                                <div className="font-semibold flex items-center justify-between">
                                    <span>{entity}</span>
                                    {type === "category" && (
                                        <span className={`text-xs px-2 py-1 rounded-full ${(u as UnknownCategory).transactionType === "income" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}>
                                            {(u as UnknownCategory).transactionType.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                
                                <RadioGroup 
                                    value={current.type} 
                                    onValueChange={(val: "create" | "existing") => handleChangeType(entity, val)}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="create" id={`${entity}-create`} />
                                        <label htmlFor={`${entity}-create`} className="text-sm cursor-pointer">Create New</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="existing" id={`${entity}-existing`} disabled={filteredExistingEntities.length === 0} />
                                        <label htmlFor={`${entity}-existing`} className={`text-sm ${filteredExistingEntities.length === 0 ? "text-muted-foreground" : "cursor-pointer"}`}>
                                            Use Existing
                                        </label>
                                    </div>
                                </RadioGroup>

                                {current.type === "create" ? (
                                    <Input 
                                        value={current.newName || ""}
                                        onChange={(e) => handleChangeNewName(entity, e.target.value)}
                                        placeholder={`New ${title.toLowerCase()} name...`}
                                    />
                                ) : (
                                    <Select 
                                        value={current.existingId} 
                                        onValueChange={(val) => handleChangeExistingId(entity, val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={`Select existing ${title.toLowerCase()}...`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredExistingEntities.map((e) => (
                                                <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>

            <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button disabled={!isAllResolved} onClick={() => onResolve(resolutions)}>
                    Continue
                </Button>
            </div>
        </div>
    );
}
