export function calculateTotalBalance(
    balances: number[]
): number {
    return balances.reduce(
        (total, balance) => total + balance,
        0
    );
}

export function calculateAverageBalance(
    balances: number[]
): number {
    if (balances.length === 0) {
        return 0;
    }

    return (
        calculateTotalBalance(balances) /
        balances.length
    );
}

export function calculateHighestBalance(
    balances: number[]
): number {
    if (balances.length === 0) {
        return 0;
    }

    return Math.max(...balances);
}

export function calculateLowestBalance(
    balances: number[]
): number {
    if (balances.length === 0) {
        return 0;
    }

    return Math.min(...balances);
}