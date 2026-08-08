"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { TechnologyCard } from "./technology-card";
import { landingTechnologyStack } from "@/constants/landing";

export function TechnologyStack() {
  return (
    <Section id="technology" padding="lg" background="default" className="border-t border-border/50">
      <Container>
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-wider text-primary uppercase"
          >
            Built With Modern Technology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            A carefully chosen stack for FinanceFlow.
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {landingTechnologyStack.map((category, index) => (
            <TechnologyCard
              key={category.category}
              index={index}
              {...category}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
