import { cache } from "react";

import { headers } from "next/headers";

import { auth } from "./auth";

/**
 * Returns the current authenticated session.
 * Returns null if the user is not authenticated.
 */
export const getSession = cache(async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
});

/**
 * Returns the authenticated user.
 * Returns null if no user is logged in.
 */
export const getCurrentUser = cache(async () => {
    const session = await getSession();

    return session?.user ?? null;
});

/**
 * Returns true if the current request is authenticated.
 */
export const isAuthenticated = cache(async () => {
    const session = await getSession();

    return session !== null;
});