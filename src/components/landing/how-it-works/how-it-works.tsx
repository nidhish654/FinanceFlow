"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { StepCard } from "./step-card";
import { landingHowItWorks } from "@/constants/landing";

export function HowItWorks() {
  return (
    <Section id="how-it-works" background="muted" padding="lg">
      <Container>
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-wider text-primary uppercase"
          >
            How It Works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Take control in a few steps.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            FinanceFlow makes it simple to go from scattered finances to absolute clarity.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-4"
        >
          {/* Connecting Line - Desktop (Horizontal) */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.6, duration: 0.5 } },
            }}
            className="hidden lg:block absolute top-[4.5rem] left-[10%] w-[80%] h-[2px] bg-border/80 border-t-2 border-dashed border-border"
          />

          {/* Connecting Line - Mobile (Vertical) */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.6, duration: 0.5 } },
            }}
            className="block lg:hidden absolute top-[10%] left-1/2 -translate-x-1/2 w-[2px] h-[80%] bg-border/80 border-l-2 border-dashed border-border"
          />

          {landingHowItWorks.map((step, index) => (
            <StepCard
              key={step.step}
              index={index}
              {...step}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
