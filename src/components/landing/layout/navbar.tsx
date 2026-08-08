"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GitBranch, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LANDING_CONSTANTS } from "@/constants/landing";
import { Container } from "./container";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container size="lg">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">FinanceFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {LANDING_CONSTANTS.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={LANDING_CONSTANTS.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {/* <GitBranch className="h-5 w-5" /> */}
              <span className="sr-only">GitHub</span>
            </Link>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <Button variant="ghost" asChild>
              <Link href={LANDING_CONSTANTS.links.login}>Login</Link>
            </Button>
            <Button asChild>
              <Link href={LANDING_CONSTANTS.links.register}>Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-4">
              <nav className="flex flex-col gap-4">
                {LANDING_CONSTANTS.navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="h-[1px] w-full bg-border my-2" />
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={LANDING_CONSTANTS.links.login} onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button className="w-full justify-start" asChild>
                  <Link href={LANDING_CONSTANTS.links.register} onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                  <Link href={LANDING_CONSTANTS.links.github} target="_blank" rel="noreferrer">
                    {/* <GitBranch className="h-5 w-5" /> */}
                    GitHub Repository
                  </Link>
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
