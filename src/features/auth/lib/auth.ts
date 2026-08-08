import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    secret: process.env.BETTER_AUTH_SECRET!,

    baseURL: process.env.BETTER_AUTH_URL!,

    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },

    session: {
        expiresIn: 60 * 60 * 24 * 30,
        updateAge: 60 * 60 * 24,
    },

    advanced: {
        database: {
            generateId: "uuid",
        },
    },

    trustedOrigins: [
        process.env.BETTER_AUTH_URL!,
        "http://192.168.1.36:3000",
    ],
});