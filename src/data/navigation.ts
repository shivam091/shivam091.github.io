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
  { href: "/about",   title: "About",   icon: "infoCircle" },
  { href: "/posts",   title: "Posts",   icon: "list"       },
  { href: "/series",  title: "Series",  icon: "book"       },
  { href: "/goodies", title: "Goodies", icon: "candy"      },
];

export const quickLinks: NavItem[] = [
  { href: "/categories", title: "Categories" },
  { href: "/tags",       title: "Tags"       },
  { href: "/archive",    title: "Archive"    },
  { href: "/contact",    title: "Contact"    },
];

export const legalLinks: NavItem[] = [
  { href: "/code-of-conduct", title: "Code of Conduct" },
  { href: "/privacy",         title: "Privacy"         },
  { href: "/terms",           title: "Terms"           },
];

export const colorSchemes: ColorScheme[] = [
  { key: "system",    label: "System",    icon: "deviceDesktop", description: "Use your system’s default theme" },
  { key: "light",     label: "Light",     icon: "sun",           description: "Use light mode"                  },
  { key: "soft-dark", label: "Soft Dark", icon: "sunDim",        description: "Use soft dark mode"              },
  { key: "dark",      label: "Dark",      icon: "moon",          description: "Use dark mode"                   },
];
