import type { MDXComponents } from "mdx/types";
import LastModified from "@/components/LastModified";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    LastModified,
  };
}
