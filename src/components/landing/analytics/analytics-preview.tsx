"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BrowserFrame } from "../ui/browser-frame";
import analyticsOverview from "@/components/landing/analytics/overview.png";
import analyticsExpenses from "@/components/landing/analytics/expenses.png";
import analyticsIncome from "@/components/landing/analytics/income.png";
import analyticsCashFlow from "@/components/landing/analytics/category.png";

interface AnalyticsPreviewProps {
  activeTab: "overview" | "expenses" | "income" | "category";
}

const analyticsScreenshots = {
  overview: {
    src: analyticsOverview,
    alt: "FinanceFlow Analytics Overview showing income, expenses, net cash flow, savings rate, insights, and spending analysis.",
  },

  expenses: {
    src: analyticsExpenses,
    alt: "FinanceFlow Expenses Analytics showing detailed expense patterns and spending analysis.",
  },

  income: {
    src: analyticsIncome,
    alt: "FinanceFlow Income Analytics showing income trends and detailed income analysis.",
  },

  category: {
    src: analyticsCashFlow,
    alt: "FinanceFlow Category Analytics showing category trends and detailed analysis",
  },
} as const;

export function AnalyticsPreview({
  activeTab,
}: AnalyticsPreviewProps) {
  const screenshot = analyticsScreenshots[activeTab];

  return (
    <BrowserFrame className="w-full overflow-hidden">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="relative w-full overflow-hidden"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            className="h-auto w-full object-cover object-top"
            priority={activeTab === "overview"}
          /></div>
      </motion.div>
    </BrowserFrame>
  );
}