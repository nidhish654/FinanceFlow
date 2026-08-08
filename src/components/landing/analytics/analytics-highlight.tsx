"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { AnalyticsPreview } from "./analytics-preview";

const analyticsTabs = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "expenses",
    label: "Expenses",
  },
  {
    id: "income",
    label: "Income",
  },
  {
    id: "category",
    label: "Category",
  },
] as const;

type AnalyticsTab = (typeof analyticsTabs)[number]["id"];

export function AnalyticsHighlight() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview");

  return (
    <Section
      id="analytics"
      padding="lg"
      background="muted"
      className="overflow-hidden"
    >
      <Container size="lg">
        <div className="flex flex-col items-center">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-4xl">
              Understand where your money goes.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-base">
              FinanceFlow does not just record your money, it helps you
              understand it. Explore your income, expenses, cash flow, and
              financial patterns from one powerful analytics workspace.
            </p>
          </motion.div>

          {/* Analytics Tabs */}
          <div className="flex w-full overflow-x-auto pb-4 md:pb-0 hide-scrollbar justify-start md:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="mt-10"
            >
              <div
                role="tablist"
                aria-label="Analytics sections"
                className="
                flex w-fit max-w-full items-center gap-1
                overflow-x-auto rounded-full
                border border-border/60
                bg-muted/40 p-1
                backdrop-blur-sm
                scrollbar-none
              "
              >
                {analyticsTabs.map((tab) => {
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`analytics-panel-${tab.id}`}
                      onClick={() => setActiveTab(tab.id)}
                      className="
                      relative shrink-0
                      rounded-full
                      px-5 py-2.5
                      text-sm font-medium
                      transition-colors
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-primary
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-background
                    "
                    >
                      {isActive && (
                        <motion.div
                          layoutId="analytics-active-tab"
                          className="absolute inset-0 rounded-full bg-background shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <span
                        className={`relative z-10 transition-colors ${isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Analytics Screenshot / Preview */}
          <motion.div
            key={activeTab}
            id={`analytics-panel-${activeTab}`}
            role="tabpanel"
            aria-label={`${activeTab} analytics preview`}
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="mt-10 w-full"
          >
            <AnalyticsPreview activeTab={activeTab} />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}