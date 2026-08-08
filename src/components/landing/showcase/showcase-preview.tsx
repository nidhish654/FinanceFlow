"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserFrame } from "../ui/browser-frame";

import transactionsImage from "./transactions.png";
import budgetsImage from "./budgets.png";
import goalsImage from "./goals.png";
import categoriesImage from "./categories.png";
import accountsImage from "./accounts.png";
import financeProfile from "./finance-profile.png";

interface ShowcasePreviewProps {
  activeTab: string;
}

const showcaseScreenshots = {
  transactions: {
    src: transactionsImage,
    alt: "FinanceFlow transactions management screen",
  },
  budgets: {
    src: budgetsImage,
    alt: "FinanceFlow budgets management screen",
  },
  goals: {
    src: goalsImage,
    alt: "FinanceFlow savings goals screen",
  },
  categories: {
    src: categoriesImage,
    alt: "FinanceFlow categories management screen",
  },
  accounts: {
    src: accountsImage,
    alt: "FinanceFlow accounts management screen",
  },
  financeProfile: {
    src: financeProfile,
    alt: "FinanceFlow accounts management screen",
  },
} as const;

export function ShowcasePreview({
  activeTab,
}: ShowcasePreviewProps) {
  const screenshot =
    showcaseScreenshots[
    activeTab as keyof typeof showcaseScreenshots
    ] ?? showcaseScreenshots.transactions;

  return (
    <BrowserFrame className="w-full overflow-hidden">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full overflow-hidden"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            className="h-auto w-full object-cover object-top"
            priority={activeTab === "transactions"}
          />
        </div>
      </motion.div>
    </BrowserFrame >
  );
}