import { Container } from "../layout/container";
import { Section } from "../layout/section";

import { BackgroundEffects } from "./background-effects";
import { HeroBadge } from "./hero-badge";
import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";
import { HeroActions } from "./hero-actions";
import { HeroDashboard } from "./hero-dashboard";
import { FloatingCard } from "./floating-card";
import { HeroScrollIndicator } from "./hero-scroll-indicator";
import { Activity } from "react";


export function Hero() {
  return (
    <Section
      id="hero"
      padding="none"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-[1px]"
    >
      <BackgroundEffects />

      <Container size="lg" className="relative z-10 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text & Actions */}
          <div className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left pt-10 lg:pt-0">
            <div className="flex justify-center lg:justify-start">
              {/* <HeroBadge /> */}
            </div>

            <HeroTitle />

            <HeroDescription />

            <HeroActions />
          </div>

          {/* Right Column: Dashboard & Floating Cards */}
          <div className="relative min-h-[280px] w-full aspect-square md:aspect-auto md:min-h-[620px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0">

            {/* Dashboard Mockup */}
            <div className="relative w-full max-w-[750px] z-10">
              <HeroDashboard />
            </div>

            {/* Floating Metric Cards */}
            <FloatingCard
              title="Monthly Savings"
              value="₹ 32,450"
              icon="wallet"
              colorClass="bg-green-500/20 text-green-500"
              className="-top-6 md:top-4 lg:top-12 -left-4 md:-left-12 lg:-left-16"
              delay={0.2}
              duration={4.5}
            />

            <FloatingCard
              title="Budget Used"
              value="73%"
              icon="pie-chart"
              colorClass="bg-orange-500/20 text-orange-500"
              className="top-12 md:top-20 -right-4 md:-right-8 lg:-right-12"
              delay={0.8}
              duration={5.2}
            />

            <FloatingCard
              title="Total Income"
              value="₹ 1.2L"
              icon="rupee"
              colorClass="bg-primary/20 text-primary"
              className="-bottom-3 md:bottom-20 -left-2 md:-left-8 lg:-left-12"
              delay={1.5}
              duration={4.8}
            />

            <FloatingCard
              title="Transactions"
              value="542"
              icon="activity"
              colorClass="bg-blue-500/20 text-blue-500"
              className="-bottom-8 md:bottom-8 lg:bottom-12 -right-2 md:-right-4 lg:-right-8"
              delay={2.1}
              duration={5.5}
            />

          </div>
        </div>
      </Container>

      {/* <HeroScrollIndicator /> */}
    </Section>
  );
}
