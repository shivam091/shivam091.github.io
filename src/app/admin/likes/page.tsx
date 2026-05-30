import { getDb } from "@/lib/mongodb";
import type { JSX } from "react";

export default async function LikesPage(): Promise<JSX.Element> {
  const db = await getDb();
  const rows = await db
    .collection("post_likes")
    .aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$postSlug", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
    .toArray();

  const total = rows.reduce((sum, r) => sum + r.count, 0);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Likes by Post</h1>
      <p style={{ fontSize: "0.875rem", opacity: 0.6, marginBottom: "1.5rem" }}>
        {total} total across {rows.length} posts
      </p>

      <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border-default, #e5e7eb)" }}>
            <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Post Slug</th>
            <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Likes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} style={{ borderBottom: "1px solid var(--color-border-default, #f3f4f6)" }}>
              <td style={{ padding: "0.5rem 0.75rem", fontFamily: "monospace", fontSize: "0.75rem" }}>
                {row._id ?? "(unknown)"}
              </td>
              <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontWeight: 700 }}>
                {row.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p style={{ textAlign: "center", padding: "3rem", opacity: 0.5 }}>No likes yet.</p>
      )}
    </div>
  );
}
