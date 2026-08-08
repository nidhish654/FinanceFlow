import {
  LayoutDashboard,
  Receipt,
  Landmark,
  FolderTree,
  ClipboardList,
  ChartColumn,
  Settings,
  BriefcaseBusiness
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
    title: "Planning",
    href: "/planning",
    icon: ClipboardList,
    group: "main",
  },
  {
    title: "Insights & Analytics",
    href: "/analytics",
    icon: ChartColumn,
    group: "main",
  },
  {
    title: "Finance Profiles",
    href: "/finance-profile",
    icon: BriefcaseBusiness,
    group: "bottom",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    group: "bottom",
  },
] as const;
