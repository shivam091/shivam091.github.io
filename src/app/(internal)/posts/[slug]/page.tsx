import type { Metadata } from "next";
import { JSX } from "react";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import PostLayout from "@/components/PostLayout/PostLayout";
import { siteConfig } from "@/config/site";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} | ${siteConfig.name}`,
        description: post.excerpt,
        url: `${siteConfig.url}/posts/${slug}`,
        type: "article",
        publishedTime: post.published_at,
        modifiedTime: post.last_modified_at ?? post.published_at,
        authors: [post.author ?? siteConfig.author.name],
        tags: post.tags,
      },
    };
  } catch {
    return { title: "Post not found" };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<JSX.Element> {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  // Compile MDX on the server — runs at build time with output: "export"
  const { default: Content } = await evaluate(post.content, {
    ...(runtime as Parameters<typeof evaluate>[1]),
    baseUrl: import.meta.url,
  });

  return (
    <PostLayout post={post}>
      <Content />
    </PostLayout>
  );
}
