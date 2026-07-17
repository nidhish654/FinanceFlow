import { PrismaClient, Currency, AccountType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding FinanceFlow...");

    const user = await prisma.user.upsert({
        where: {
            email: "nidhish@example.com",
        },
        update: {},
        create: {
            name: "Nidhish",
            email: "nidhish@example.com",
        },
    });

    const profile = await prisma.financeProfile.upsert({
        where: {
            userId_name: {
                userId: user.id,
                name: "Personal Finance",
            },
        },
        update: {},
        create: {
            userId: user.id,
            name: "Personal Finance",
            description: "Primary Finance Profile",
            baseCurrency: Currency.INR,
        },
    });

    await prisma.account.upsert({
        where: {
            financeProfileId_name: {
                financeProfileId: profile.id,
                name: "Cash Wallet",
            },
        },
        update: {},
        create: {
            financeProfileId: profile.id,
            name: "Cash Wallet",
            description: "Cash in hand",
            type: AccountType.CASH,
            currency: Currency.INR,
            openingBalance: 5000,
            color: "#22c55e",
            icon: "wallet",
        },
    });

    console.log("✅ Database seeded successfully!");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });