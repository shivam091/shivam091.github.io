import { JSX } from "react";
import { EmojiSadIcon } from "@/components/Icon";
import Button from "@/components/Button";
import styles from "./error.module.scss";

export const metadata = {
  title: "Page Not Found"
};

export default function NotFound(): JSX.Element {
  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-screen px-6 py-20 ${styles.page}`}>
        <div className="rounded-full flex items-center justify-center mb-8 text-(--color-fg-danger)">
          <EmojiSadIcon size={96} />
        </div>

        <h1 className="text-5xl font-bold text-(--color-fg-danger)">
          404 — Page Not Found
        </h1>

        <p className="text-center text-lg mt-4 max-w-md text-(--color-fg-muted)">
          Sorry, we&apos;ve misplaced that URL or it&apos;s pointing to something that doesn&apos;t exist.
        </p>

        <div className="flex items-center gap-3 mt-8">
          <Button intent="danger" href="/">
            Go Home
          </Button>
        </div>
      </div>
    </>
  );
}
