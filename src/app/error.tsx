"use client";

import { JSX, useEffect } from "react";
import { EmojiSadIcon } from "@/components/Icon";
import Button from "@/components/Button";
import styles from "./error.module.scss";

export const metadata = {
  title: "Server Error"
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-6 py-20 ${styles.page}`}>
      <div className="rounded-full flex items-center justify-center mb-8 text-(--color-fg-danger)">
        <EmojiSadIcon size={96} />
      </div>

      <h1 className="text-5xl font-bold text-(--color-fg-danger)">
        500 — Server Error
      </h1>

      <p className="text-center text-lg mt-4 max-w-md text-(--color-fg-muted)">
        Oops! Something broke on our end. It&apos;s not you — it&apos;s us.
        Give it another shot or come back in a bit.
      </p>

      <div className="flex items-center gap-3 mt-8">
        <Button intent="danger" onClick={() => reset()}>
          Try again
        </Button>

        <Button variant="outlined" href="/">
          Go Home
        </Button>
      </div>
    </div>
  );
}
