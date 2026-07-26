import { getAccounts } from "@/features/accounts/actions/getAccounts";

export async function getDashboardData() {
    const accounts = await getAccounts();

    const totalBalance = accounts.reduce(
        (sum, account) => sum + account.openingBalance,
        0
    );

    return {
        totalBalance,
        accountCount: accounts.length,
    };
}