"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { ShowcaseTabs } from "./showcase-tabs";
import { ShowcasePreview } from "./showcase-preview";
import { productShowcaseTabs } from "@/constants/landing";

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(productShowcaseTabs[0].id);

  return (
    <Section id="showcase" padding="lg" className="overflow-hidden">
      <Container size="lg">
        <div className="flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-4xl">
              See FinanceFlow in action.
            </h2>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mt-5 mb-5 text-base leading-relaxed text-muted-foreground md:text-base">
              See how FinanceFlow brings all your finances together into one beautiful workspace.
            </p>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center w-full gap-8"
        >
          <ShowcaseTabs
            tabs={productShowcaseTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <ShowcasePreview activeTab={activeTab} />
        </motion.div>
      </Container>
    </Section>
  );
}
