"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { CtaBackground } from "./cta-background";
import { Button } from "@/components/ui/button";
import { landingFinalCta, LANDING_CONSTANTS } from "@/constants/landing";

export function FinalCTA() {
  return (
    <Section id="final-cta" padding="lg" className="border-t border-border/50">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-[900px] mx-auto rounded-3xl border border-border/50 bg-card p-8 md:p-16 text-center shadow-lg overflow-hidden"
        >
          <CtaBackground />
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="text-sm font-bold tracking-wider text-primary uppercase">
              {landingFinalCta.eyebrow}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {landingFinalCta.title}
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed">
              {landingFinalCta.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full text-base px-8 h-12 shadow-md shadow-primary/20" asChild>
                  <Link href={LANDING_CONSTANTS.links.register}>
                    {landingFinalCta.primaryButton}
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base px-8 h-12 bg-background/50 backdrop-blur-sm" asChild>
                  <Link href={LANDING_CONSTANTS.links.login}>
                    {landingFinalCta.secondaryButton}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
