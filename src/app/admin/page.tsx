import { getDb } from "@/lib/mongodb";
import type { JSX } from "react";

function StatCard({ label, value }: { label: string; value: number }): JSX.Element {
  return (
    <div style={{ border: "1px solid var(--color-border-default, #e5e7eb)", borderRadius: "0.5rem", padding: "1.25rem" }}>
      <p style={{ fontSize: "0.875rem", opacity: 0.6 }}>{label}</p>
      <p style={{ fontSize: "2rem", fontWeight: 700, marginTop: "0.25rem" }}>{value}</p>
    </div>
  );
}

export default async function AdminOverviewPage(): Promise<JSX.Element> {
  const db = await getDb();
  const [submissions, comments, likes] = await Promise.all([
    db.collection("contact_submissions").countDocuments(),
    db.collection("post_comments").countDocuments(),
    db.collection("post_likes").countDocuments(),
  ]);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Overview</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        <StatCard label="Contact Submissions" value={submissions} />
        <StatCard label="Comments" value={comments} />
        <StatCard label="Likes" value={likes} />
      </div>
    </div>
  );
}
