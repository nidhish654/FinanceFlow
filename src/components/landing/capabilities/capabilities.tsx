"use client";

import { motion } from "framer-motion";

import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { CapabilityCard } from "./capability-card";

import {
    landingFeatures,
    everythingInOnePlaceItems,
} from "@/constants/landing";

export function Capabilities() {
    const financeProfileItem = everythingInOnePlaceItems.find(
        (item) => item.title === "Finance Profiles"
    );

    const csvExportItem = everythingInOnePlaceItems.find(
        (item) => item.title === "CSV Export"
    );

    const capabilities = [
        /* ------------------------------------------------------------------ */
        /* Financial Dashboard                                               */
        /* ------------------------------------------------------------------ */
        {
            title: "Financial Dashboard",
            description:
                "See your complete financial picture at a glance with a unified, real-time workspace.",
            icon: landingFeatures[0].icon,
            href: "#hero",
            featured: true,
            className: "lg:col-span-2 lg:row-span-2",
        },

        /* ------------------------------------------------------------------ */
        /* Transactions                                                       */
        /* ------------------------------------------------------------------ */
        {
            title: "Smart Transactions",
            description:
                "Categorize, search, filter, and manage your transactions effortlessly.",
            icon: landingFeatures[1].icon,
            href: "#showcase",
            className: "lg:col-span-2",
        },

        /* ------------------------------------------------------------------ */
        /* Accounts                                                           */
        /* ------------------------------------------------------------------ */
        {
            title: "Multi-Account Management",
            description:
                "Keep balances and activity from multiple accounts organized in one place.",
            icon: landingFeatures[2].icon,
            href: "#showcase",
            className: "lg:col-span-2",
        },

        /* ------------------------------------------------------------------ */
        /* Budgets                                                            */
        /* ------------------------------------------------------------------ */
        {
            title: "Custom Budgets",
            description:
                "Set spending limits across categories and stay on track with your financial plans.",
            icon: landingFeatures[3].icon,
            href: "#showcase",
            className: "lg:col-span-2",
        },

        /* ------------------------------------------------------------------ */
        /* Goals                                                              */
        /* ------------------------------------------------------------------ */
        {
            title: "Savings Goals",
            description:
                "Track your progress toward the financial goals that matter most to you.",
            icon: landingFeatures[4].icon,
            href: "#showcase",
            className: "lg:col-span-2",
        },

        /* ------------------------------------------------------------------ */
        /* Finance Profiles                                                  */
        /* ------------------------------------------------------------------ */
        {
            title: "Finance Profiles",
            description:
                financeProfileItem?.description ??
                "Keep different financial contexts separate and organized with dedicated profiles.",
            icon: financeProfileItem?.icon ?? landingFeatures[2].icon,
            href: "#showcase",
            className: "lg:col-span-2",
        },

        /* ------------------------------------------------------------------ */
        /* Categories                                                         */
        /* ------------------------------------------------------------------ */
        {
            title: "Categories",
            description:
                "Organize transactions with custom categories that make your financial activity easier to understand.",
            icon: landingFeatures[5].icon,
            href: "#showcase",
            className: "lg:col-span-2",
        },

        /* ------------------------------------------------------------------ */
        /* CSV Import & Export                                                */
        /* ------------------------------------------------------------------ */
        {
            title: "CSV Import & Export",
            description:
                "Move your financial data in and out whenever you need it. Your data stays yours.",
            icon: csvExportItem?.icon ?? landingFeatures[1].icon,
            href: "#showcase",
            className: "lg:col-span-2",
        },

        /* ------------------------------------------------------------------ */
        /* Understanding / Analytics                                         */
        /* ------------------------------------------------------------------ */
        {
            title: "Understand your money, not just track it.",
            description:
                "Turn everyday financial activity into meaningful insights. FinanceFlow helps you see spending patterns, compare income against expenses, and understand your financial progress.",
            icon: landingFeatures[5].icon,
            href: "#analytics",
            className: "lg:col-span-6",
        },
    ];

    return (
        <Section id="features" padding="lg">
            <Container>
                {/* Section Header */}
                <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
                    >
                        Everything you need to stay on top of your money.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                        }}
                        className="mt-4 text-lg leading-relaxed text-muted-foreground"
                    >
                        Track, plan, analyze, and understand your finances from one
                        unified workspace.
                    </motion.p>
                </div>

                {/* Capabilities Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    variants={{
                        hidden: {
                            opacity: 0,
                        },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.08,
                            },
                        },
                    }}
                    className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
            lg:grid-cols-6
            lg:auto-rows-[190px]
          "
                >
                    {capabilities.map((capability) => (
                        <CapabilityCard
                            key={capability.title}
                            title={capability.title}
                            description={capability.description}
                            icon={capability.icon}
                            href={capability.href}
                            featured={capability.featured}
                            className={capability.className}
                        />
                    ))}
                </motion.div>
            </Container>
        </Section>
    );
}