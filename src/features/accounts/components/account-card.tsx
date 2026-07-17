import { AccountType } from "@prisma/client";
import DataCard from "@/components/common/DataCard";

interface AccountCardProps {
    name: string;
    type: AccountType;
    balance: number;
}

export default function AccountCard({
    name,
    type,
    balance,
}: AccountCardProps) {
    return (
        <DataCard>
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">{name}</h3>

                <p className="text-sm text-muted-foreground">
                    {type.replace("_", " ")}
                </p>

                <p className="pt-2 text-2xl font-bold">
                    ₹ {balance.toLocaleString()}
                </p>
            </div>
        </DataCard>
    );
}