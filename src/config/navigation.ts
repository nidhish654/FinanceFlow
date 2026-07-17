import {
  LayoutDashboard,
  Receipt,
  Landmark,
  FolderTree,
  Target,
  ChartColumn,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    group: "main",
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: Receipt,
    group: "main",
  },
  {
    title: "Accounts",
    href: "/accounts",
    icon: Landmark,
    group: "main",
  },
  {
    title: "Categories",
    href: "/categories",
    icon: FolderTree,
    group: "main",
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: Target,
    group: "main",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartColumn,
    group: "main",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    group: "bottom",
  },
] as const;