import Link from "next/link";
import { ArrowLeftRight, Plus } from "lucide-react";

import DataCard from "@/components/common/DataCard";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
    return (
        <DataCard>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                    Quick Actions
                </h2>

                <div className="flex flex-wrap gap-3">
                    <Button asChild>
                        <Link href="/accounts">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Account
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        disabled
                    >
                        <ArrowLeftRight className="mr-2 h-4 w-4" />
                        Add Transaction
                    </Button>
                </div>
            </div>
        </DataCard>
    );
}