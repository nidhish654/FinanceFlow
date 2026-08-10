import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Returns the current authenticated session.
 * Returns null if the user is not authenticated.
 */
export async function getSession() {
    return await auth.api.getSession({
        headers: await headers(),
    });
}

/**
 * Returns the authenticated user.
 * Returns null if no user is logged in.
 */
export async function getCurrentUser() {
    const session = await getSession();

    return session?.user ?? null;
}

/**
 * Returns true if the current request is authenticated.
 */
export async function isAuthenticated() {
    const session = await getSession();

    return session !== null;
}