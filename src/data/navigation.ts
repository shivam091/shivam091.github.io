import { type IconName } from "@/components/Icon/icons";
import { siteConfig } from "@/config/site";

// A single navigation link — href and title required; icon and external are optional.
export type NavItem = {
  href: string;
  title: string;
  icon?: IconName;
  external?: boolean;
};

// A theme-switcher option — key maps to data-theme, icon to the icon registry, label for display.
export type ColorScheme = {
  key: string;
  label: string;
  icon: IconName;
  description?: string;
};

// Data attributes forwarded to analytics tracking on social and footer links.
export type AnalyticsEvent = {
  event: string;
  label: string;
  category: string;
};

// A social/contact/feed link with optional external flag and analytics tracking payload.
export type SocialLink = {
  type: "github" | "linkedin" | "instagram" | "email" | "resume" | "atom";
  label: string;
  icon: IconName;
  href: string;
  external?: boolean;
  analytics?: AnalyticsEvent;
};

// Primary nav links shown in the header bar and mobile drawer.
export const mainNav: NavItem[] = [
  { href: "/about",   title: "About",   icon: "infoCircle" },
  { href: "/posts",   title: "Posts",   icon: "list"       },
  { href: "/series",  title: "Series",  icon: "book"       },
  { href: "/goodies", title: "Goodies", icon: "candy"      }
];

// Secondary links shown in the footer and the drawer sky scene.
export const quickLinks: NavItem[] = [
  { href: "/how-i-built-my-blog", title: "About This Blog" },
  { href: "/categories",          title: "Categories"      },
  { href: "/tags",                title: "Tags"            },
  { href: "/archives",            title: "Archives"        },
  { href: "/contact",             title: "Contact"         }
];

// Policy/legal links shown in the footer and mobile drawer.
export const legalLinks: NavItem[] = [
  { href: "/terms-of-use",    title: "Terms of Use"    },
  { href: "/privacy-policy",  title: "Privacy Policy"  },
  { href: "/code-of-conduct", title: "Code of Conduct" }
];

// Theme options shown in the header color-scheme dropdown.
export const colorSchemes: ColorScheme[] = [
  { key: "system",    label: "System",    icon: "deviceDesktop", description: "Use your system’s default theme" },
  { key: "light",     label: "Light",     icon: "sun",           description: "Use light mode"                  },
  { key: "soft-dark", label: "Soft Dark", icon: "sunDim",        description: "Use soft dark mode"              },
  { key: "dark",      label: "Dark",      icon: "moon",          description: "Use dark mode"                   }
];

// Author social, contact, and feed links rendered in the site footer.
export const socialLinks: SocialLink[] = [
  {
    type:      "github",
    label:     "GitHub",
    icon:      "github",
    href:      siteConfig.author.social.github,
    external:  true,
  },
  {
    type:      "linkedin",
    label:     "LinkedIn",
    icon:      "linkedin",
    href:      siteConfig.author.social.linkedin,
    external:  true,
  },
  {
    type:      "instagram",
    label:     "Instagram",
    icon:      "instagram",
    href:      siteConfig.author.social.instagram,
    external:  true,
  },
  {
    type:      "email",
    label:     "Email",
    icon:      "envelope",
    href:      `mailto:${siteConfig.author.email}`,
  },
  {
    type:      "resume",
    label:     "Resume",
    icon:      "file",
    href:      siteConfig.author.resume,
    external:  true,
    analytics: {
      event:    "download_resume",
      label:    "resume.pdf",
      category: "engagement",
    },
  },
  {
    type:      "atom",
    label:     "Atom Feed",
    icon:      "rss",
    href:      "/atom.xml",
    analytics: {
      event:    "subscribe_feed",
      label:    "Atom Feed",
      category: "engagement",
    },
  },
];
