import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/features/auth/lib/auth";

export default async function HomePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect("/dashboard");
    }

    redirect("/login");
}