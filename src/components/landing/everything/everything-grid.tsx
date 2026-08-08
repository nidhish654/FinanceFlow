"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { EverythingCard } from "./everything-card";
import { everythingInOnePlaceItems } from "@/constants/landing";

export function EverythingGrid() {
  return (
    <Section id="everything" padding="lg" background="default" className="border-t border-border/50">
      <Container>
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Everything in one place.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            From everyday transactions to long-term financial goals, FinanceFlow keeps your entire financial life organized and connected.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-[minmax(180px,auto)]"
        >
          {everythingInOnePlaceItems.map((item, index) => (
            <EverythingCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              featured={item.featured}
              className={item.span}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
