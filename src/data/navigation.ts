import { type IconName } from "@/components/Icon/icons";

export type NavItem = {
  href: string;
  title: string;
  icon?: IconName;
  external?: boolean;
};

export type ColorScheme = {
  key: string;
  label: string;
  icon: IconName;
  description?: string;
};

export const mainNav: NavItem[] = [
  { href: "/",         title: "Home",     icon: "home"     },
  { href: "/blog",     title: "Blog",     icon: "book"     },
  { href: "/projects", title: "Projects", icon: "code"     },
  { href: "/til",      title: "TIL",      icon: "bulb"     },
  { href: "/gems",     title: "Gems",     icon: "diamonds" },
];

export const quickLinks: NavItem[] = [
  { href: "/blog",     title: "Blog"     },
  { href: "/projects", title: "Projects" },
  { href: "/til",      title: "TIL"      },
  { href: "/gems",     title: "Gems"     },
];

export const legalLinks: NavItem[] = [
  { href: "/code-of-conduct", title: "Code of Conduct" },
  { href: "/privacy",         title: "Privacy"         },
  { href: "/terms",           title: "Terms"           },
];

export const colorSchemes: ColorScheme[] = [
  { key: "light",    label: "Light",    icon: "sun",    description: "Switch to light color scheme"    },
  { key: "dark",     label: "Dark",     icon: "moon",   description: "Switch to dark color scheme"     },
  { key: "soft-dark",label: "Soft Dark",icon: "adjust", description: "Switch to soft dark color scheme"},
];
