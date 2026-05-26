/**
 * robots.txt — generated at build time by Next.js.
 *
 * Points crawlers at the sitemap so the ping-sitemap workflow actually helps.
 * Output: `out/robots.txt` after `next build`.
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Required for `output: "export"` — tells Next.js this route is fully static.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
