import {
  LayoutDashboard,
  ArrowLeftRight,
  WalletCards,
  PiggyBank,
  Target,
  ChartNoAxesCombined,
  ShieldCheck,
  Split,
  DatabaseZap,
  Download,
  UserPlus,
  Settings,
  LineChart,
  Blocks,
  Code2,
  Database,
  Lock,
  Wrench,
  Tags,
  Users
} from "lucide-react";

export const LANDING_CONSTANTS = {
  navigation: [
    { name: "Home", href: "#" },
    { name: "Why Us", href: "#why-financeflow" },
    { name: "Product", href: "#showcase" },
    { name: "Analytics", href: "#analytics" },
    { name: "Features", href: "#features" },
    { name: "Technology", href: "#technology" },
    { name: "FAQ", href: "#faq" },
  ],
  footer: {
    resources: [
      { name: "Documentation", href: "https://docs.google.com/document/d/1lszopAGmP5ZSsPd-kSCSX8ymzYdLY-icVeLNawrpdQE/edit?usp=sharing" },
      { name: "GitHub", href: "https://github.com/nidhish654/FinanceFlow" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/nidhish-shettigar" },
      // { name: "Guides", href: "#" },
    ],
    technology: [
      { name: "Next.js", href: "https://nextjs.org/docs" },
      { name: "React", href: "https://react.dev/learn" },
      { name: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
    ],
    social: [
      // { name: "Twitter", href: "#" },
      // { name: "Discord", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
  links: {
    github: "https://github.com/nidhish654/FinanceFlow",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
  }
};

export const landingFeatures = [
  {
    id: "dashboard",
    title: "Financial Dashboard",
    description: "See your complete financial picture at a glance with a unified, real-time workspace.",
    icon: LayoutDashboard,
  },
  {
    id: "transactions",
    title: "Smart Transactions",
    description: "Categorize, search, and manage your expenses and income effortlessly.",
    icon: ArrowLeftRight,
  },
  {
    id: "accounts",
    title: "Multi-Account Sync",
    description: "Connect and track multiple bank accounts, wallets, and credit cards in one place.",
    icon: WalletCards,
  },
  {
    id: "budgets",
    title: "Custom Budgets",
    description: "Set monthly limits across categories and receive proactive insights to stay on track.",
    icon: PiggyBank,
  },
  {
    id: "goals",
    title: "Savings Goals",
    description: "Plan for the future by tracking your progress towards specific financial milestones.",
    icon: Target,
  },
  {
    id: "categories",
    title: "Categories",
    description: "Categorize, search, and manage your expenses and income effortlessly.",
    icon: Tags,
  },
  {
    id: "analytics",
    title: "Deep Analytics",
    description: "Understand your spending patterns and income trends with beautiful visualizations.",
    icon: ChartNoAxesCombined,
  },
];

export const whyFinanceFlowItems = [
  {
    id: "workspace",
    title: "One financial workspace",
    description: "Your accounts, transactions, budgets, goals, and analytics live together seamlessly.",
    icon: LayoutDashboard,
  },
  {
    id: "clarity",
    title: "Built around clarity",
    description: "FinanceFlow turns raw financial activity into information that is immediately easy to understand.",
    icon: ChartNoAxesCombined,
  },
  {
    id: "profiles",
    title: "Flexible profiles",
    description: "Manage different financial contexts without mixing their data using isolated Finance Profiles.",
    icon: Split,
  },
  {
    id: "control",
    title: "Your data, your control",
    description: "FinanceFlow is designed around giving you total control and ownership over your financial information.",
    icon: ShieldCheck,
  },
];

export const productShowcaseTabs = [
  { id: "transactions", label: "Transactions" },
  { id: "budgets", label: "Budgets" },
  { id: "goals", label: "Goals" },
  { id: "categories", label: "Categories" },
  { id: "accounts", label: "Accounts" },
  { id: "financeProfile", label: "Finance Profiles" },
];

export const everythingInOnePlaceItems = [
  {
    title: "Dashboard",
    description: "The ultimate command center for your money.",
    icon: LayoutDashboard,
    span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
    featured: true,
  },
  {
    title: "Transactions",
    description: "Categorize and filter instantly.",
    icon: ArrowLeftRight,
    span: "col-span-1",
  },
  {
    title: "Accounts",
    description: "All balances, unified.",
    icon: WalletCards,
    span: "col-span-1",
  },
  {
    title: "Budgets",
    description: "Stay under your limits effortlessly.",
    icon: PiggyBank,
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Goals",
    description: "Track your path to financial freedom.",
    icon: Target,
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    title: "Analytics",
    description: "Turn numbers into beautiful, actionable insights.",
    icon: ChartNoAxesCombined,
    span: "col-span-1 md:col-span-2 lg:col-span-3",
    featured: true,
  },
  {
    title: "Finance Profiles",
    description: "Separate personal from business seamlessly.",
    icon: Users,
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    title: "CSV Export",
    description: "Your data is always yours to take.",
    icon: Download,
    span: "col-span-1",
  },
];

export const landingHowItWorks = [
  {
    step: "01",
    title: "Create Account",
    description: "Sign up securely and create your personal financial workspace in seconds.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Setup Finances",
    description: "Add your accounts, define your starting balances, and establish your financial baseline.",
    icon: Settings,
  },
  {
    step: "03",
    title: "Track & Plan",
    description: "Log transactions, categorize expenses, and set budgets to keep your money on track.",
    icon: Target,
  },
  {
    step: "04",
    title: "Understand",
    description: "Use powerful analytics to uncover trends, optimize spending, and reach your goals.",
    icon: LineChart,
  },
];

export const landingTechnologyStack = [
  {
    category: "Frontend",
    icon: Blocks,
    items: [
      { name: "Next.js", description: "App Router" },
      { name: "React", description: "Server Components" },
      { name: "TypeScript", description: "Strict Typing" },
      { name: "Tailwind CSS", description: "Styling" },
      { name: "shadcn/ui", description: "UI Primitives" },
    ]
  },
  {
    category: "Backend & Data",
    icon: Database,
    items: [
      { name: "PostgreSQL", description: "Database" },
      { name: "Prisma", description: "Modern ORM" },
    ]
  },
  {
    category: "Auth & Validation",
    icon: Lock,
    items: [
      { name: "Better Auth", description: "Authentication" },
      { name: "Zod", description: "Schema Validation" },
    ]
  },
  {
    category: "Utilities",
    icon: Wrench,
    items: [
      { name: "Recharts", description: "Visualizations" },
      { name: "Framer Motion", description: "Animations" },
    ]
  }
];

export const landingFaqs = [
  {
    question: "What is FinanceFlow?",
    answer: "FinanceFlow is a comprehensive personal finance application designed to help you track your accounts, monitor your spending, and understand your financial health through a unified workspace."
  },
  {
    question: "Do I need an account to use FinanceFlow?",
    answer: "Yes, you need to create a secure account so that your personal financial data can be safely stored and synced across your devices."
  },
  {
    question: "Where is my financial data stored?",
    answer: "Your data is securely stored in a PostgreSQL database with industry-standard encryption practices. We prioritize your privacy and do not sell your data to third parties."
  },
  {
    question: "Can I track multiple bank accounts?",
    answer: "Absolutely. You can manually create and track as many separate accounts (checking, savings, credit cards, cash) as you need within your workspace."
  },
  {
    question: "Does FinanceFlow connect directly to my bank?",
    answer: "Currently, FinanceFlow focuses on manual tracking and categorization to give you complete control over your data. Automatic bank connections are not yet implemented."
  },
  {
    question: "What are Finance Profiles?",
    answer: "Finance Profiles allow you to isolate different financial contexts (e.g., Personal vs. Business) so you can manage them within the same account without mixing their data."
  }
];

export const landingFinalCta = {
  eyebrow: "TAKE CONTROL",
  title: "Your finances. One clear picture.",
  description: "Bring your accounts, transactions, budgets, goals, and insights together with FinanceFlow.",
  primaryButton: "Get Started",
  secondaryButton: "Log In"
};
