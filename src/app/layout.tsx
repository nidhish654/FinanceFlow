import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { AppProvider } from "@/providers/AppProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinanceFlow",
  description: "Modern Personal Finance Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}