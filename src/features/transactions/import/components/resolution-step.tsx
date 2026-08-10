"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

import IconPicker from "@/components/common/icon-picker";

import {
    ResolutionMap,
    UnknownAccount,
    UnknownCategory,
} from "../types/import-types";

import {
    CategoryOption,
    filterCategoriesByTransactionType,
} from "@/features/categories/lib/category-utils";

import { AccountOption } from "../../components/transaction-toolbar";

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
    const unknownEntities =
        type === "account"
            ? unknownAccounts
            : unknownCategories;

    const [resolutions, setResolutions] =
        useState<ResolutionMap>(() => {
            const initial: ResolutionMap = {};

            unknownEntities.forEach((u) => {
                const entityName = u.csvName;

                const matchedId =
                    type === "account"
                        ? (u as UnknownAccount)
                            .matchedAccountId
                        : (u as UnknownCategory)
                            .matchedCategoryId;

                if (matchedId) {
                    initial[entityName] = {
                        type: "existing",
                        existingId: matchedId,
                    };
                } else {
                    initial[entityName] = {
                        type: "create",
                        newName: entityName,
                        newDescription: "",
                        newIcon: "tag",
                    };
                }
            });

            return initial;
        });

    /*
     * ------------------------------------------------------------
     * GET AVAILABLE EXISTING ENTITIES
     * ------------------------------------------------------------
     *
     * Categories are filtered according to the transaction type.
     * For example:
     *
     * income transaction -> only INCOME categories
     * expense transaction -> only EXPENSE categories
     */

    const getFilteredExistingEntities = (
        entity: string
    ): (AccountOption | CategoryOption)[] => {
        if (type !== "category") {
            return existingEntities;
        }

        const unknownCategory =
            unknownCategories.find(
                (u) => u.csvName === entity
            );

        if (!unknownCategory) {
            return [];
        }

        return filterCategoriesByTransactionType(
            existingEntities as CategoryOption[],
            unknownCategory.transactionType ===
                "income"
                ? "INCOME"
                : "EXPENSE"
        );
    };

    /*
     * ------------------------------------------------------------
     * CHANGE RESOLUTION TYPE
     * ------------------------------------------------------------
     */

    const handleChangeType = (
        entity: string,
        resolutionType: "create" | "existing"
    ) => {
        if (resolutionType === "create") {
            setResolutions((prev) => ({
                ...prev,
                [entity]: {
                    type: "create",
                    newName: entity,
                    newDescription: "",
                    newIcon: "tag",
                },
            }));

            return;
        }

        /*
         * IMPORTANT:
         *
         * ResolutionMap requires existingId to be a string,
         * not string | undefined.
         *
         * Therefore, don't create an "existing" resolution
         * unless an actual existing entity is available.
         */

        const availableEntities =
            getFilteredExistingEntities(entity);

        const firstEntity =
            availableEntities[0];

        if (!firstEntity) {
            return;
        }

        /*
         * Preserve transaction type for categories.
         */

        if (type === "category") {
            const unknownCategory =
                unknownCategories.find(
                    (u) => u.csvName === entity
                );

            setResolutions((prev) => ({
                ...prev,
                [entity]: {
                    type: "existing",
                    existingId: firstEntity.id,
                    ...(unknownCategory?.transactionType
                        ? {
                            transactionType:
                                unknownCategory.transactionType,
                        }
                        : {}),
                },
            }));

            return;
        }

        /*
         * Account resolution
         */

        setResolutions((prev) => ({
            ...prev,
            [entity]: {
                type: "existing",
                existingId: firstEntity.id,
            },
        }));
    };

    /*
     * ------------------------------------------------------------
     * CHANGE EXISTING ID
     * ------------------------------------------------------------
     */

    const handleChangeExistingId = (
        entity: string,
        id: string
    ) => {
        if (!id) {
            return;
        }

        const current = resolutions[entity];

        /*
         * Existing resolution must remain an existing
         * resolution. Don't spread a create resolution
         * into it because that can confuse TypeScript's
         * discriminated union.
         */

        if (type === "category") {
            const unknownCategory =
                unknownCategories.find(
                    (u) => u.csvName === entity
                );

            setResolutions((prev) => ({
                ...prev,
                [entity]: {
                    type: "existing",
                    existingId: id,
                    ...(unknownCategory?.transactionType
                        ? {
                            transactionType:
                                unknownCategory.transactionType,
                        }
                        : {}),
                },
            }));

            return;
        }

        setResolutions((prev) => ({
            ...prev,
            [entity]: {
                type: "existing",
                existingId: id,
            },
        }));
    };

    /*
     * ------------------------------------------------------------
     * CHANGE NEW NAME
     * ------------------------------------------------------------
     */

    const handleChangeNewName = (
        entity: string,
        name: string
    ) => {
        const current = resolutions[entity];

        if (!current || current.type !== "create") {
            return;
        }

        setResolutions((prev) => ({
            ...prev,
            [entity]: {
                type: "create",
                newName: name,
                newDescription:
                    current.newDescription ?? "",
                newIcon: current.newIcon ?? "tag",
                ...(current.transactionType
                    ? {
                        transactionType:
                            current.transactionType,
                    }
                    : {}),
            },
        }));
    };

    /*
     * ------------------------------------------------------------
     * CHANGE DESCRIPTION
     * ------------------------------------------------------------
     */

    const handleChangeNewDescription = (
        entity: string,
        description: string
    ) => {
        const current = resolutions[entity];

        if (!current || current.type !== "create") {
            return;
        }

        setResolutions((prev) => ({
            ...prev,
            [entity]: {
                type: "create",
                newName: current.newName,
                newDescription: description,
                newIcon: current.newIcon ?? "tag",
                ...(current.transactionType
                    ? {
                        transactionType:
                            current.transactionType,
                    }
                    : {}),
            },
        }));
    };

    /*
     * ------------------------------------------------------------
     * CHANGE ICON
     * ------------------------------------------------------------
     */

    const handleChangeNewIcon = (
        entity: string,
        icon: string
    ) => {
        const current = resolutions[entity];

        if (!current || current.type !== "create") {
            return;
        }

        setResolutions((prev) => ({
            ...prev,
            [entity]: {
                type: "create",
                newName: current.newName,
                newDescription:
                    current.newDescription ?? "",
                newIcon: icon,
                ...(current.transactionType
                    ? {
                        transactionType:
                            current.transactionType,
                    }
                    : {}),
            },
        }));
    };

    /*
     * ------------------------------------------------------------
     * VALIDATION
     * ------------------------------------------------------------
     */

    const isAllResolved = unknownEntities.every(
        (u) => {
            const resolution =
                resolutions[u.csvName];

            if (!resolution) {
                return false;
            }

            if (resolution.type === "create") {
                return (
                    !!resolution.newName?.trim() &&
                    !!resolution.newIcon?.trim()
                );
            }

            if (resolution.type === "existing") {
                return !!resolution.existingId;
            }

            return false;
        }
    );

    /*
     * ------------------------------------------------------------
     * NOTHING TO RESOLVE
     * ------------------------------------------------------------
     */

    if (unknownEntities.length === 0) {
        return (
            <div className="space-y-6 py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                    <span className="text-xl font-bold text-emerald-500">
                        ✓
                    </span>
                </div>

                <h3 className="text-lg font-semibold">
                    All {title} Recognized
                </h3>

                <p className="text-sm text-muted-foreground">
                    No new{" "}
                    {title.toLowerCase()} need to
                    be created.
                </p>

                <div className="flex items-center justify-center pt-4">
                    <Button
                        onClick={() =>
                            onResolve({})
                        }
                    >
                        Continue
                    </Button>
                </div>
            </div>
        );
    }

    /*
     * ------------------------------------------------------------
     * MAIN UI
     * ------------------------------------------------------------
     */

    return (
        <div className="space-y-6">
            {/* Header */}

            <div className="space-y-2 rounded-xl border bg-muted/30 p-4">
                <h3 className="text-sm font-semibold">
                    Resolve {title}
                </h3>

                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            </div>

            <ScrollArea className="h-[450px] pr-4">
                <div className="space-y-6">
                    {unknownEntities.map((u) => {
                        const entity = u.csvName;

                        const current =
                            resolutions[entity];

                        if (!current) {
                            return null;
                        }

                        const filteredExistingEntities =
                            getFilteredExistingEntities(
                                entity
                            );

                        return (
                            <div
                                key={entity}
                                className="space-y-4 rounded-xl border bg-card p-4 shadow-sm"
                            >
                                {/* Header */}

                                <div className="flex items-center justify-between gap-3">
                                    <span className="font-semibold">
                                        {entity}
                                    </span>

                                    {type ===
                                        "category" && (
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs ${(
                                                        u as UnknownCategory
                                                    )
                                                        .transactionType ===
                                                        "income"
                                                        ? "bg-emerald-500/10 text-emerald-500"
                                                        : "bg-rose-500/10 text-rose-500"
                                                    }`}
                                            >
                                                {(
                                                    u as UnknownCategory
                                                ).transactionType.toUpperCase()}
                                            </span>
                                        )}
                                </div>

                                {/* Resolution Type */}

                                <RadioGroup
                                    value={
                                        current.type
                                    }
                                    onValueChange={(
                                        value:
                                            | "create"
                                            | "existing"
                                    ) =>
                                        handleChangeType(
                                            entity,
                                            value
                                        )
                                    }
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="create"
                                            id={`${entity}-create`}
                                        />

                                        <label
                                            htmlFor={`${entity}-create`}
                                            className="cursor-pointer text-sm"
                                        >
                                            Create New
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="existing"
                                            id={`${entity}-existing`}
                                            disabled={
                                                filteredExistingEntities.length ===
                                                0
                                            }
                                        />

                                        <label
                                            htmlFor={`${entity}-existing`}
                                            className={`text-sm ${filteredExistingEntities.length ===
                                                    0
                                                    ? "text-muted-foreground"
                                                    : "cursor-pointer"
                                                }`}
                                        >
                                            Use Existing
                                        </label>
                                    </div>
                                </RadioGroup>

                                {/* Create New */}

                                {current.type ===
                                    "create" ? (
                                    <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor={`${entity}-name`}
                                                className="text-sm font-medium"
                                            >
                                                {type ===
                                                    "category"
                                                    ? "Category Name"
                                                    : "Account Name"}

                                                <span className="ml-1 text-destructive">
                                                    *
                                                </span>
                                            </label>

                                            <Input
                                                id={`${entity}-name`}
                                                value={
                                                    current.newName ??
                                                    ""
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    handleChangeNewName(
                                                        entity,
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                }
                                                placeholder={
                                                    type ===
                                                        "category"
                                                        ? "Category name..."
                                                        : "Account name..."
                                                }
                                            />
                                        </div>

                                        {/* Category-only fields */}

                                        {type ===
                                            "category" && (
                                                <>
                                                    <div className="space-y-2">
                                                        <label
                                                            htmlFor={`${entity}-description`}
                                                            className="text-sm font-medium"
                                                        >
                                                            Description
                                                        </label>

                                                        <Textarea
                                                            id={`${entity}-description`}
                                                            value={
                                                                current.newDescription ??
                                                                ""
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                handleChangeNewDescription(
                                                                    entity,
                                                                    e
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Optional description..."
                                                            rows={2}
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">
                                                            Category
                                                            Icon

                                                            <span className="ml-1 text-destructive">
                                                                *
                                                            </span>
                                                        </label>

                                                        <IconPicker
                                                            value={
                                                                current.newIcon ??
                                                                ""
                                                            }
                                                            onChange={(
                                                                icon
                                                            ) =>
                                                                handleChangeNewIcon(
                                                                    entity,
                                                                    icon
                                                                )
                                                            }
                                                        />

                                                        {!current.newIcon?.trim() && (
                                                            <p className="text-xs text-destructive">
                                                                Please select
                                                                an icon.
                                                            </p>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                    </div>
                                ) : (
                                    /* Use Existing */

                                    <Select
                                        value={
                                            current.existingId
                                        }
                                        onValueChange={(
                                            value
                                        ) =>
                                            handleChangeExistingId(
                                                entity,
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={`Select existing ${title.toLowerCase()}...`}
                                            />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {filteredExistingEntities.map(
                                                (e) => (
                                                    <SelectItem
                                                        key={
                                                            e.id
                                                        }
                                                        value={
                                                            e.id
                                                        }
                                                    >
                                                        {
                                                            e.name
                                                        }
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>

            {/* Footer */}

            <div className="flex items-center justify-between border-t pt-4">
                <Button
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    disabled={!isAllResolved}
                    onClick={() =>
                        onResolve(resolutions)
                    }
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}