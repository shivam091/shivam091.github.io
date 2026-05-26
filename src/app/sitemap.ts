/**
 * Sitemap — generated at build time by Next.js.
 *
 * Next.js calls this function during `next build` and writes the result to
 * `/sitemap.xml` in the static-export output (`out/`). No extra package is
 * needed; `MetadataRoute.Sitemap` is the built-in type.
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Required for `output: "export"` — tells Next.js this route is fully static.
export const dynamic = "force-static";

// Normalise: strip any trailing slash so concatenation is consistent.
const base = siteConfig.url.replace(/\/$/, "");

// ─── Static pages ─────────────────────────────────────────────────────────────
// Add a new entry here each time a new top-level page is created.
// changeFrequency and priority follow standard SEO conventions:
//   home  → weekly  / 1.0   (highest — crawled often)
//   posts → weekly  / 0.9   (index page — changes when new posts land)
//   post  → monthly / 0.7   (content rarely changes after publish)
//   other → monthly / 0.6
//   legal → yearly  / 0.3   (changes very rarely)
const staticPages: MetadataRoute.Sitemap = [
  {
    url: base,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${base}/code-of-conduct`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

// ─── Dynamic post pages ───────────────────────────────────────────────────────
// Uncomment and adapt when the posts route is ready:
//
// import { getAllPosts } from "@/lib/posts";
//
// const posts = getAllPosts();
// const postPages: MetadataRoute.Sitemap = [
//   // /posts index
//   {
//     url: `${base}/posts`,
//     lastModified: new Date(posts[0]?.lastModified ?? Date.now()),
//     changeFrequency: "weekly",
//     priority: 0.9,
//   },
//   // individual post pages
//   ...posts.map((post) => ({
//     url: `${base}/posts/${post.slug}`,
//     lastModified: new Date(post.lastModified ?? Date.now()),
//     changeFrequency: "monthly" as const,
//     priority: 0.7,
//   })),
// ];
// ─────────────────────────────────────────────────────────────────────────────

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages,
    // ...postPages,   // ← uncomment when posts are live
  ];
}
