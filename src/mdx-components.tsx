import type { MDXComponents } from "mdx/types";
import { LastModified, PublishedAt, ContentDates } from "@/components/ContentDates";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    LastModified,
    PublishedAt,
    ContentDates,
  };
}
