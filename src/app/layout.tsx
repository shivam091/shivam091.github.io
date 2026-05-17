import { JSX } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import "./../styles/main.scss";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  const isGoogleFont = siteConfig.font_url?.includes("fonts.googleapis.com");

  return (
    <>
      <html lang={siteConfig.lang || "en"} className="h-full antialiased" data-theme="soft-dark">
        <head>
          {isGoogleFont && (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </>
          )}
          {siteConfig.font_url && <link rel="stylesheet" href={siteConfig.font_url} />}
        </head>
        <body className="min-h-full flex flex-col">
          {children}
        </body>
      </html>
    </>
  );
};
