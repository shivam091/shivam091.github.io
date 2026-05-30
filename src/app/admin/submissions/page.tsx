import { getDb } from "@/lib/mongodb";
import type { JSX } from "react";

export default async function SubmissionsPage(): Promise<JSX.Element> {
  const db = await getDb();
  const docs = await db
    .collection("contact_submissions")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        Contact Submissions
        <span style={{ fontSize: "0.875rem", fontWeight: 400, marginLeft: "0.75rem", opacity: 0.5 }}>
          {docs.length} total
        </span>
      </h1>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border-default, #e5e7eb)" }}>
              {["Name", "Email", "Message", "Date"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={String(doc._id)} style={{ borderBottom: "1px solid var(--color-border-default, #f3f4f6)" }}>
                <td style={{ padding: "0.5rem 0.75rem" }}>{doc.name}</td>
                <td style={{ padding: "0.5rem 0.75rem" }}>{doc.email}</td>
                <td style={{ padding: "0.5rem 0.75rem", maxWidth: "20rem" }}>
                  <span title={doc.message} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {doc.message}
                  </span>
                </td>
                <td style={{ padding: "0.5rem 0.75rem", whiteSpace: "nowrap" }}>
                  {doc.createdAt ? new Date(doc.createdAt as Date).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {docs.length === 0 && (
          <p style={{ textAlign: "center", padding: "3rem", opacity: 0.5 }}>No submissions yet.</p>
        )}
      </div>
    </div>
  );
}
