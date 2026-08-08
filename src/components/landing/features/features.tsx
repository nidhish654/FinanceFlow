"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { FeatureCard } from "./feature-card";
import { landingFeatures } from "@/constants/landing";

export function Features() {
  return (
    <Section id="features" padding="lg" className="border-t border-border/50">
      <Container>
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Everything you need to stay on top of your money.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Track, plan, analyze, and understand your finances from one unified workspace.
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {landingFeatures.map((feature) => (
            <FeatureCard 
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
