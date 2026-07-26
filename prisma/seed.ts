import { PrismaClient, AccountType, Currency } from "@prisma/client";

import {
    indiaAccountSeedData,
    japanAccountSeedData,
    categorySeedData,
} from "./seed-data";

const prisma = new PrismaClient();

type AccountSeed = {
    name: string;
    type: AccountType;
    currency: Currency;
    openingBalance: number;
    color: string;
    icon: string;
};

async function seedAccounts(
    financeProfileId: string,
    accounts: AccountSeed[]
) {
    console.log("🌱 Seeding Accounts...");

    for (const account of accounts) {
        await prisma.financeAccount.upsert({
            where: {
                financeProfileId_name: {
                    financeProfileId,
                    name: account.name,
                },
            },
            update: account,
            create: {
                financeProfileId,
                ...account,
            },
        });
    }

    console.log(`✅ ${accounts.length} accounts seeded`);
}

async function seedCategories(financeProfileId: string) {
    console.log("🌱 Seeding Categories...");

    for (const category of categorySeedData) {
        await prisma.category.upsert({
            where: {
                financeProfileId_type_name: {
                    financeProfileId,
                    type: category.type,
                    name: category.name,
                },
            },
            update: category,
            create: {
                financeProfileId,
                ...category,
            },
        });
    }

    console.log(`✅ ${categorySeedData.length} categories seeded`);
}

async function main() {
    console.log("🚀 Starting FinanceFlow Seed");

    // ----------------------------------------------------
    // Demo User
    // ----------------------------------------------------

    const user = await prisma.user.upsert({
        where: {
            email: "demo@financeflow.dev",
        },
        update: {},
        create: {
            name: "Demo User",
            email: "demo@financeflow.dev",
            emailVerified: true,
        },
    });

    console.log("✅ Demo User Created");

    // ----------------------------------------------------
    // India Profile
    // ----------------------------------------------------

    const indiaProfile = await prisma.financeProfile.upsert({
        where: {
            userId_name: {
                userId: user.id,
                name: "India",
            },
        },
        update: {},
        create: {
            userId: user.id,
            name: "India",
            description: "Personal Finance (India)",
            baseCurrency: Currency.INR,
        },
    });

    console.log("✅ India Finance Profile");

    // ----------------------------------------------------
    // Japan Profile
    // ----------------------------------------------------

    const japanProfile = await prisma.financeProfile.upsert({
        where: {
            userId_name: {
                userId: user.id,
                name: "Japan",
            },
        },
        update: {},
        create: {
            userId: user.id,
            name: "Japan",
            description: "Life in Japan",
            baseCurrency: Currency.JPY,
        },
    });

    console.log("✅ Japan Finance Profile");

    // ----------------------------------------------------
    // Active Finance Profile
    // ----------------------------------------------------

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            activeFinanceProfileId: indiaProfile.id,
        },
    });

    console.log("✅ India set as Active Profile");

    // ----------------------------------------------------
    // Seed India
    // ----------------------------------------------------

    await seedAccounts(indiaProfile.id, indiaAccountSeedData);
    await seedCategories(indiaProfile.id);

    // ----------------------------------------------------
    // Seed Japan
    // ----------------------------------------------------

    await seedAccounts(japanProfile.id, japanAccountSeedData);
    await seedCategories(japanProfile.id);

    console.log("");
    console.log("🎉 FinanceFlow Seed Completed Successfully!");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });