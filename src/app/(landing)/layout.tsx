import type { Metadata } from "next";
import { Navbar } from "@/components/landing/layout/navbar";
import { Footer } from "@/components/landing/layout/footer";

export const metadata: Metadata = {
  title: "FinanceFlow | Take Control of Your Financial Life",
  description: "A beautiful, intuitive, and powerful personal finance management system for the modern web.",
  keywords: ["finance", "personal finance", "budgeting", "expense tracker", "money management"],
  openGraph: {
    title: "FinanceFlow | Take Control of Your Financial Life",
    description: "A beautiful, intuitive, and powerful personal finance management system for the modern web.",
    type: "website",
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
