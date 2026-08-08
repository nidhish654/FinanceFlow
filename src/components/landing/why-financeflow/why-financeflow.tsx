"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { WhyCard } from "./why-card";
import { whyFinanceFlowItems } from "@/constants/landing";

export function WhyFinanceFlow() {
  return (
    <Section id="why-financeflow" padding="lg" background="muted" className="border-t border-border/50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Why FinanceFlow?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              We believe managing money should be as simple and intuitive as spending it. Here is how we make that happen.
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
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8"
          >
            {whyFinanceFlowItems.map((item) => (
              <WhyCard 
                key={item.id}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </motion.div>
          
        </div>
      </Container>
    </Section>
  );
}
