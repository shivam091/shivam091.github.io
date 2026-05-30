import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { JSX } from "react";

const navLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/comments", label: "Comments" },
  { href: "/admin/likes", label: "Likes" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await auth();
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav style={{ width: "14rem", flexShrink: 0, borderRight: "1px solid var(--color-border-default, #e5e7eb)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem", opacity: 0.6 }}>
          Admin
        </span>
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            style={{ padding: "0.4rem 0.75rem", borderRadius: "0.375rem", textDecoration: "none", fontSize: "0.875rem" }}
          >
            {label}
          </a>
        ))}
      </nav>
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}
