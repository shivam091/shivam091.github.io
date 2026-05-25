"use client";

import { JSX, useEffect } from "react";
import { EmojiSadIcon } from "@/components/Icon";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
      <div
        className="rounded-full flex items-center justify-center mb-8"
        style={{ color: "var(--color-fg-danger)" }}
      >
        <EmojiSadIcon size={96} />
      </div>

      <h1 className="text-5xl font-bold" style={{ color: "var(--color-fg-danger)" }}>
        500 — Server Error
      </h1>

      <p className="text-lg mt-4 max-w-md text-center opacity-75">
        Oops! Something broke on our end. It's not you — it's us.
        Give it another shot or come back in a bit.
      </p>

      <button className="mt-8 px-6 py-3" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
