import { JSX, type ReactNode } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css"; // Tailwind v4 — must be plain CSS, not SCSS
import "@/styles/main.scss";
import SkipLink from "@/components/SkipLink";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  icons: {
    icon: [
      { url: "/assets/img/icons/favicon.png" },
      { url: "/assets/img/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/img/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/img/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/img/icons/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/assets/img/icons/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/assets/img/icons/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/assets/img/icons/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/assets/img/icons/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/assets/img/icons/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/assets/img/icons/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/assets/img/icons/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/assets/img/icons/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/assets/img/icons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/assets/img/icons/manifest.json",
  verification: {
    google: "FtCAe189XCM-WjInapqVOrgS_WajuLMnBL201RiO2B8",
  },
};

/**
 * Anti-FOUC (Flash of Unstyled Content) script.
 *
 * Runs synchronously as the very first child of <body> so the browser applies
 * the correct theme before painting anything — zero flash on every page load.
 *
 * "system" is stored as a preference but always resolved to a concrete theme
 * before being written to data-theme, because the CSS only understands
 * "light" | "dark" | "soft-dark" — not "system".
 */
const ANTI_FOUC_SCRIPT = `(function() {
  try {
    var saved = localStorage.getItem("saved-color-theme") || "system";
    var resolved = saved;
    if (saved === "system") {
      resolved = window.matchMedia("(prefers-color-scheme:dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", resolved);
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  const isGoogleFont = siteConfig.font_url.includes("fonts.googleapis.com");

  return (
    <>
      {/*
       * data-theme="soft-dark" is the server-rendered default.
       * The ANTI_FOUC_SCRIPT below overrides it on frame 0 using the user's
       * saved preference, so no flash is ever visible.
       */}
      <html
        lang={siteConfig.lang}
        className="h-full antialiased"
        data-theme="soft-dark"
        suppressHydrationWarning={true}
      >
        <head>
          {isGoogleFont && (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </>
          )}
          <link rel="stylesheet" href={siteConfig.font_url} />
        </head>
        <body className="min-h-full flex flex-col">
          {/* Blocking script — must be the very first child of <body> */}
          <script dangerouslySetInnerHTML={{ __html: ANTI_FOUC_SCRIPT }} />

          <SkipLink />

          <ThemeProvider>
            {children}
          </ThemeProvider>

          <ScrollToTop />
        </body>
      </html>
    </>
  );
}
