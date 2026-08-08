// "use client";

// import { SubcategoryPoint } from "../../../types/analytics-view";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import CurrencyAmount from "@/components/common/CurrencyAmount";
// import { Progress } from "@/components/ui/progress";

// interface TopSubcategoriesProps {
//     subcategories: SubcategoryPoint[];
//     currency: string;
// }

// export default function TopSubcategories({
//     subcategories,
//     currency,
// }: TopSubcategoriesProps) {
//     if (subcategories.length === 0) return null;

//     const top5 = subcategories.slice(0, 5);
//     const maxAmount = top5[0].amount;

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Top Subcategories</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="space-y-6">
//                     {top5.map((sub, index) => (
//                         <div key={sub.id} className="space-y-2">
//                             <div className="flex items-center justify-between text-sm">
//                                 <div className="flex items-center gap-2">
//                                     <span className="font-medium">{index + 1}. {sub.name}</span>
//                                     <span className="text-xs text-muted-foreground">({sub.transactionCount} txns)</span>
//                                 </div>
//                                 <span className="font-medium">
//                                     <CurrencyAmount amount={sub.amount} currency={currency} />
//                                 </span>
//                             </div>
//                             <Progress value={(sub.amount / maxAmount) * 100} className="h-2" />
//                         </div>
//                     ))}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }
"use client";

import {
    Award,
    Tag,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import CurrencyAmount from "@/components/common/CurrencyAmount";

import { SubcategoryPoint } from "../../../types/analytics-view";

interface TopSubcategoriesProps {
    subcategories: SubcategoryPoint[];
    currency: string;
}

export default function TopSubcategories({
    subcategories,
    currency,
}: TopSubcategoriesProps) {
    if (!subcategories.length) {
        return (
            <Card className="rounded-2xl border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Highest Spending Subcategories
                    </CardTitle>

                    <CardDescription>
                        Your biggest spending subcategories during the selected
                        period.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex h-77 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 text-center">
                        <Tag className="mb-4 h-10 w-10 text-muted-foreground" />

                        <h3 className="text-lg font-semibold">
                            No Subcategory Analytics Yet
                        </h3>

                        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                            Create and use subcategories to unlock richer
                            spending insights.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const topFive = subcategories.slice(0, 5);

    const highestAmount = Math.max(
        ...topFive.map((subcategory) => subcategory.amount),
        1
    );

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="space-y-2 pb-4">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Highest Spending Subcategories
                </CardTitle>

                <CardDescription className="text-sm leading-6">
                    Your biggest spending subcategories during the selected period.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-3 overflow-y-auto pr-1">
                    {topFive.map((subcategory, index) => {
                        const percentage =
                            highestAmount === 0
                                ? 0
                                : (subcategory.amount / highestAmount) * 100;

                        const medal =
                            index === 0
                                ? "🥇"
                                : index === 1
                                    ? "🥈"
                                    : index === 2
                                        ? "🥉"
                                        : `#${index + 1}`;

                        return (
                            <div
                                key={subcategory.id}
                                className="
                                    rounded-xl
                                    border
                                    bg-muted/20
                                    p-4
                                    transition-all
                                    hover:bg-muted/35
                                "
                            >
                                {/* Top Row */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">
                                                {medal}
                                            </span>

                                            <h3 className="truncate text-base font-semibold">
                                                {subcategory.name}
                                            </h3>
                                        </div>

                                        {/* Parent Category */}
                                        {"parentName" in subcategory &&
                                            (subcategory as any).parentName && (
                                                <p className="mt-1 truncate text-xs text-muted-foreground">
                                                    {(subcategory as any).parentName}
                                                </p>
                                            )}

                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <Badge
                                                variant="secondary"
                                                className="
                                                    h-6
                                                    rounded-full
                                                    px-2
                                                    text-[11px]
                                                    font-medium
                                                "
                                            >
                                                🧾{" "}
                                                {subcategory.transactionCount}{" "}
                                                {subcategory.transactionCount === 1
                                                    ? "txn"
                                                    : "txns"}
                                            </Badge>

                                            {index === 0 && (
                                                <Badge
                                                    className="
                                                        h-6
                                                        rounded-full
                                                        bg-amber-500/15
                                                        px-2
                                                        text-[11px]
                                                        font-medium
                                                        text-amber-500
                                                    "
                                                >
                                                    Highest
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="shrink-0 text-right">
                                        <div className="text-lg font-bold tabular-nums">
                                            <CurrencyAmount
                                                amount={subcategory.amount}
                                                currency={currency}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mt-4">
                                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                                        <span>
                                            {percentage.toFixed(0)}% of top
                                            spending
                                        </span>

                                        <span className="font-medium">
                                            {percentage.toFixed(0)}%
                                        </span>
                                    </div>

                                    <Progress
                                        value={percentage}
                                        className="h-2"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}