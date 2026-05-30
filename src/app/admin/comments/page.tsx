import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import type { JSX } from "react";

async function approveComment(formData: FormData): Promise<void> {
  "use server";
  const id = formData.get("id") as string;
  const db = await getDb();
  await db
    .collection("post_comments")
    .updateOne({ _id: new ObjectId(id) }, { $set: { status: "approved" } });
  revalidatePath("/admin/comments");
}

async function deleteComment(formData: FormData): Promise<void> {
  "use server";
  const id = formData.get("id") as string;
  const db = await getDb();
  await db.collection("post_comments").deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/admin/comments");
}

export default async function CommentsPage(): Promise<JSX.Element> {
  const db = await getDb();
  const docs = await db
    .collection("post_comments")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const pending = docs.filter((d) => d.status !== "approved").length;
  const approved = docs.length - pending;

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Comments</h1>
      <p style={{ fontSize: "0.875rem", opacity: 0.6, marginBottom: "1.5rem" }}>
        {approved} approved · {pending} pending
      </p>

      <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border-default, #e5e7eb)" }}>
            {["Post", "Name", "Body", "Status", "Date", "Actions"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={String(doc._id)} style={{ borderBottom: "1px solid var(--color-border-default, #f3f4f6)" }}>
              <td style={{ padding: "0.5rem 0.75rem", fontFamily: "monospace", fontSize: "0.75rem" }}>
                {doc.postSlug}
              </td>
              <td style={{ padding: "0.5rem 0.75rem" }}>{doc.name}</td>
              <td style={{ padding: "0.5rem 0.75rem", maxWidth: "16rem" }}>
                <span title={doc.body} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {doc.body}
                </span>
              </td>
              <td style={{ padding: "0.5rem 0.75rem" }}>
                <span style={{ color: doc.status === "approved" ? "green" : "orange" }}>
                  {doc.status}
                </span>
              </td>
              <td style={{ padding: "0.5rem 0.75rem", whiteSpace: "nowrap" }}>
                {doc.createdAt ? new Date(doc.createdAt as Date).toLocaleDateString() : "—"}
              </td>
              <td style={{ padding: "0.5rem 0.75rem" }}>
                <span style={{ display: "flex", gap: "0.5rem" }}>
                  {doc.status !== "approved" && (
                    <form action={approveComment}>
                      <input type="hidden" name="id" value={String(doc._id)} />
                      <button type="submit" style={{ fontSize: "0.75rem", color: "green", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                        Approve
                      </button>
                    </form>
                  )}
                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={String(doc._id)} />
                    <button type="submit" style={{ fontSize: "0.75rem", color: "red", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      Delete
                    </button>
                  </form>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {docs.length === 0 && (
        <p style={{ textAlign: "center", padding: "3rem", opacity: 0.5 }}>No comments yet.</p>
      )}
    </div>
  );
}
