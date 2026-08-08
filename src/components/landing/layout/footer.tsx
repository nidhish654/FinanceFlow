import * as React from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";

import { LANDING_CONSTANTS } from "@/constants/landing";
import { Container } from "./container";
import { Section } from "./section";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Section padding="lg">
        <Container size="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2 flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-2 group w-fit">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Wallet className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">FinanceFlow</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                Take complete control of your financial life. Beautiful, intuitive, and 
                powerful personal finance management for the modern web.
              </p>
            </div>

            {/* Links Columns */}
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground">Resources</h4>
              <ul className="flex flex-col gap-3">
                {LANDING_CONSTANTS.footer.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground">Technology</h4>
              <ul className="flex flex-col gap-3">
                {LANDING_CONSTANTS.footer.technology.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground">Connect</h4>
              <ul className="flex flex-col gap-3">
                {LANDING_CONSTANTS.footer.social.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} FinanceFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {LANDING_CONSTANTS.footer.legal.map((link) => (
                <Link key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
