import { spawnSync } from "node:child_process";

/**
 * Reads the ISO-8601 last-commit date for a file from git.
 * Returns null when the file is untracked, git is unavailable, or the
 * repository history is too shallow (CI checkout without fetch-depth: 0).
 */
function gitLastModified(filePath) {
  const { status, stdout } = spawnSync(
    "git",
    ["log", "-1", "--format=%ad", "--date=iso-strict", "--", filePath],
    { encoding: "utf-8" }
  );
  if (status !== 0) return null;
  return stdout.trim() || null;
}

/**
 * Reads the ISO-8601 date of the first commit that added the file.
 * Returns null for untracked files or shallow clones.
 */
function gitPublishedAt(filePath) {
  const { status, stdout } = spawnSync(
    "git",
    ["log", "--diff-filter=A", "--follow", "--format=%ad", "--date=iso-strict", "--", filePath],
    { encoding: "utf-8" }
  );
  if (status !== 0) return null;
  const lines = stdout.trim().split("\n").filter(Boolean);
  return lines.at(-1) ?? null;
}

/**
 * Remark plugin — injects git-derived `date` and `publishedAt` props into
 * every bare <LastModified /> element found in an MDX file.
 *
 * MDX authors write:
 *   <LastModified />
 *
 * The plugin transforms it at build time to:
 *   <LastModified date="2026-05-28T10:00:00+05:30" publishedAt="2025-01-01T…" />
 *
 * If the file has no git history yet the element is left unchanged and the
 * component renders nothing (graceful degradation during local dev).
 */
export default function remarkGitDates() {
  return (tree, vfile) => {
    const filePath = vfile.path ?? vfile.history?.at(0);
    if (!filePath) return;

    let lastModified = null;
    let publishedAt  = null;
    let fetched      = false;

    function walk(node) {
      if (
        (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
        node.name === "LastModified" &&
        !node.attributes?.some((a) => a.name === "date")
      ) {
        if (!fetched) {
          lastModified = gitLastModified(filePath);
          publishedAt  = gitPublishedAt(filePath);
          fetched      = true;
        }
        if (lastModified) {
          node.attributes = [
            ...(node.attributes ?? []),
            { type: "mdxJsxAttribute", name: "date",        value: lastModified },
            { type: "mdxJsxAttribute", name: "publishedAt", value: publishedAt ?? lastModified },
          ];
        }
      }
      node.children?.forEach(walk);
    }

    walk(tree);
  };
}
