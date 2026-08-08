"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { FaqItem } from "./faq-item";
import { landingFaqs } from "@/constants/landing";

export function FAQ() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  return (
    <Section id="faq" background="muted" padding="lg">
      <Container>
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-wider text-primary uppercase"
          >
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Frequently asked questions.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-[850px] mx-auto bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm"
        >
          {landingFaqs.map((faq, index) => (
            <FaqItem
              key={index}
              id={`faq-${index}`}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeFaq === `faq-${index}`}
              onToggle={() => setActiveFaq(activeFaq === `faq-${index}` ? null : `faq-${index}`)}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
