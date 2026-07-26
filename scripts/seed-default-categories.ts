import { PrismaClient } from "@prisma/client";

import { DEFAULT_CATEGORIES } from "@/features/categories/constants/default-categories";

const prisma = new PrismaClient();

async function main() {
    console.log(
        "🌱 Seeding default categories..."
    );

    const profiles =
        await prisma.financeProfile.findMany({
            include: {
                categories: {
                    select: {
                        id: true,
                    },
                },
            },
        });

    let updatedProfiles = 0;

    for (const profile of profiles) {
        if (profile.categories.length > 0) {
            console.log(
                `⏭️  Skipping "${profile.name}" (already has categories)`
            );

            continue;
        }

        await prisma.category.createMany({
            data: DEFAULT_CATEGORIES.map(
                (category) => ({
                    financeProfileId:
                        profile.id,

                    name: category.name,

                    description:
                        category.description,

                    type: category.type,

                    icon: category.icon,

                    color: category.color,

                    displayOrder:
                        category.displayOrder,

                    isDefault: true,
                })
            ),
        });

        updatedProfiles++;

        console.log(
            `✅ Seeded categories for "${profile.name}"`
        );
    }

    console.log("");

    console.log(
        `🎉 Done! Updated ${updatedProfiles} finance profile(s).`
    );
}

main()
    .catch((error) => {
        console.error(error);

        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });