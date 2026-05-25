import { JSX } from "react";
import { EmojiSadIcon } from "@/components/Icon";

export const metadata = {
  title: "Page Not Found"
};

export default function NotFound(): JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div
          className="rounded-full flex items-center justify-center mb-8"
          style={{ color: "var(--color-fg-danger)" }}
        >
          <EmojiSadIcon size={96} />
        </div>

        <h1 className="text-5xl font-bold" style={{ color: "var(--color-fg-danger)" }}>
          404 - Page Not Found
        </h1>

        <p className="text-lg mt-4 max-w-md opacity-75">
          Sorry, we've misplaced that URL or it's pointing to something that doesn't exist.
        </p>

        <a href="/" className="mt-8 px-6 py-3">
          Go Home
        </a>
      </div>
    </>
  );
}
