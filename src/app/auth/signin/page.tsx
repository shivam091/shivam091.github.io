import { signIn } from "@/auth";
import type { JSX } from "react";

export const metadata = { title: "Sign in" };

export default function SignInPage(): JSX.Element {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Sign in</h1>

      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/admin" });
        }}
      >
        <button type="submit" style={{ padding: "0.5rem 1.5rem", border: "1px solid currentColor", borderRadius: "0.375rem", cursor: "pointer" }}>
          Sign in with GitHub
        </button>
      </form>

      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/admin" });
        }}
      >
        <button type="submit" style={{ padding: "0.5rem 1.5rem", border: "1px solid currentColor", borderRadius: "0.375rem", cursor: "pointer" }}>
          Sign in with Google
        </button>
      </form>
    </main>
  );
}
