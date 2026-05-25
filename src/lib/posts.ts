import fs from "fs";
import path from "path";
export { formatDate } from "@/lib/format";

const POSTS_DIR = path.join(process.cwd(), "posts");

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PostFrontmatter {
  title: string;
  excerpt?: string;
  published_at: string;
  last_modified_at?: string;
  author?: string;
  tags?: string[];
  categories?: string[];
  cover_image?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  reading_time: number; // in minutes
}

export interface Post extends PostMeta {
  content: string; // raw MDX content (frontmatter stripped)
}

// ─── Frontmatter parser ───────────────────────────────────────────────────────

function parseFrontmatter(source: string): {
  data: Partial<PostFrontmatter>;
  content: string;
} {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: source };

  const yamlStr = match[1];
  const content = match[2].trim();
  const data: Partial<PostFrontmatter> = {};

  for (const line of yamlStr.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim() as keyof PostFrontmatter;
    const rawVal = line.slice(colonIdx + 1).trim();

    if (!rawVal) continue;

    // Inline array: [a, b, c]
    if (rawVal.startsWith("[") && rawVal.endsWith("]")) {
      (data as Record<string, unknown>)[key] = rawVal
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    // Strip surrounding quotes
    (data as Record<string, unknown>)[key] = rawVal.replace(/^["']|["']$/g, "");
  }

  return { data, content };
}

// ─── Reading-time helper ──────────────────────────────────────────────────────

function estimateReadingTime(content: string): number {
  // Strip MDX/markdown syntax before counting words
  const text = content
    .replace(/```[\s\S]*?```/g, "") // fenced code blocks
    .replace(/`[^`]+`/g, "") // inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/\[.*?\]\(.*?\)/g, "") // links
    .replace(/[#>*_~|]/g, "") // markdown symbols
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = text.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200)); // 200 wpm
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Returns all post slugs (for generateStaticParams). */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Returns metadata for all posts, sorted newest-first. */
export function getAllPostsMeta(): PostMeta[] {
  const slugs = getAllSlugs();

  return slugs
    .map((slug) => {
      const source = fs.readFileSync(
        path.join(POSTS_DIR, `${slug}.mdx`),
        "utf-8"
      );
      const { data, content } = parseFrontmatter(source);

      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt,
        published_at: data.published_at ?? new Date().toISOString(),
        last_modified_at: data.last_modified_at,
        author: data.author,
        tags: data.tags ?? [],
        categories: data.categories ?? [],
        cover_image: data.cover_image,
        reading_time: estimateReadingTime(content),
      } satisfies PostMeta;
    })
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
}

/** Returns a single post (meta + raw MDX content body). */
export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(source);

  return {
    slug,
    content,
    title: data.title ?? slug,
    excerpt: data.excerpt,
    published_at: data.published_at ?? new Date().toISOString(),
    last_modified_at: data.last_modified_at,
    author: data.author,
    tags: data.tags ?? [],
    categories: data.categories ?? [],
    cover_image: data.cover_image,
    reading_time: estimateReadingTime(content),
  };
}
