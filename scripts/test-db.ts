import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const accounts = await prisma.financeAccount.findMany({
        include: {
            financeProfile: true,
        },
    });

    console.dir(accounts, { depth: null });
}

main()
    .catch(console.error)
    .finally(async () => prisma.$disconnect());