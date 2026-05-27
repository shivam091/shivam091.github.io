import type { Metadata } from "next";
import { JSX } from "react";
import { getAllPostsMeta } from "@/lib/posts";
import PostList from "@/components/PostList/PostList";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Posts",
  description: `Technical articles by ${siteConfig.author.name} — covering Ruby, Rails, TypeScript, PostgreSQL, web development, and more.`,
  openGraph: {
    title: `Posts | ${siteConfig.name}`,
    description: `Technical articles by ${siteConfig.author.name}`,
    url: `${siteConfig.url}/posts`,
  },
};

export default function PostsPage(): JSX.Element {
  // getAllPostsMeta() runs at build time (static export)
  const posts = getAllPostsMeta();

  return <PostList initialPosts={posts} />;
}
