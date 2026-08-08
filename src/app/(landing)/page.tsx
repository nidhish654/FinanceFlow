import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { WhyFinanceFlow } from "@/components/landing/why-financeflow";
import { ProductShowcase } from "@/components/landing/showcase";
import { AnalyticsHighlight } from "@/components/landing/analytics";
import { EverythingGrid } from "@/components/landing/everything";
import { Capabilities } from "@/components/landing/capabilities";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TechnologyStack } from "@/components/landing/technology";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";

export default function LandingPage() {
  return (
    <>
      <Hero />
      {/* <Features /> */}
      <WhyFinanceFlow />
      <ProductShowcase />
      <AnalyticsHighlight />
      {/* <EverythingGrid /> */}
      <Capabilities />
      <HowItWorks />
      <TechnologyStack />
      <FAQ />
      <FinalCTA />
    </>
  );
}
