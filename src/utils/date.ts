/**
 * Client-safe formatting utilities (no fs/path — safe to import in Client Components).
 */

/** Format an ISO date string for display. */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
