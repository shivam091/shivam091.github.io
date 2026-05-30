"use client";

import { JSX, useEffect } from "react";
import { EmojiSadIcon } from "@/components/Icon";
import Button from "@/components/Button";
import FlashlightOverlay from "@/components/FlashlightOverlay";
import styles from "./error.module.scss";

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
    <>
      <FlashlightOverlay showToggle />
      <div className={`flex flex-col items-center justify-center min-h-screen px-6 py-20 ${styles.page}`}>
      <div className="rounded-full flex items-center justify-center mb-6 text-(--color-fg-danger)">
        <EmojiSadIcon size={96} />
      </div>

      <h1 className="text-5xl font-bold text-(--color-fg-danger)">
        Something went wrong
      </h1>

      <p className="text-center text-lg mt-4 max-w-md text-(--color-fg-muted)">
        An unexpected error occurred while rendering this page.
        Try again, or head back home.
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
    </>
  );
}
