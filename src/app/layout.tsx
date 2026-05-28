import { JSX } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
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
};

/**
 * Anti-FOUC (Flash of Unstyled Content) script.
 *
 * Injected as a *blocking* <script> at the very top of <body> so the browser
 * runs it synchronously before painting anything. It reads the user's saved
 * theme from localStorage and overrides the server-rendered `data-theme`
 * attribute on <html> on frame 0 — zero flash on every page load.
 *
 * On first visit (no saved value) it honours `prefers-color-scheme` so the
 * user never sees the wrong colour scheme. Because this is a static export
 * (`output: "export"`) we cannot read a server-side cookie, so localStorage
 * is the correct persistence layer.
 */
const ANTI_FOUC_SCRIPT = `(function() {
  try {
    var t = localStorage.getItem("theme");
    if (!t) {
      t = window.matchMedia("(prefers-color-scheme:dark)").matches ? "soft-dark" : "light";
      localStorage.setItem("theme", t);
    }
    document.documentElement.dataset.theme = t;
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  const isGoogleFont = siteConfig.font_url?.includes("fonts.googleapis.com");

  return (
    <>
      {/*
       * data-theme="soft-dark" is the server-rendered default.
       * The ANTI_FOUC_SCRIPT below overrides it on frame 0 using the user's
       * saved preference, so no flash is ever visible.
       */}
      <html
        lang={siteConfig.lang || "en"}
        className="h-full antialiased"
        data-theme="soft-dark"
        suppressHydrationWarning={true}
      >
        <head>
          <meta name="google-site-verification" content="FtCAe189XCM-WjInapqVOrgS_WajuLMnBL201RiO2B8" />

          {isGoogleFont && (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </>
          )}
          {siteConfig.font_url && <link rel="stylesheet" href={siteConfig.font_url} />}

          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  let theme = localStorage.getItem("theme") || "system";
                  if (theme === "system") {
                    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                  }
                  document.documentElement.setAttribute("data-theme", theme);
                } catch (e) {}
              `,
            }}
          />
        </head>
        <body className="min-h-full flex flex-col">
          {/* Blocking script — must be the very first child of <body> */}
          <script dangerouslySetInnerHTML={{ __html: ANTI_FOUC_SCRIPT }} />

          <SkipLink />

          {children}

          <ScrollToTop />
        </body>
      </html>
    </>
  );
}
