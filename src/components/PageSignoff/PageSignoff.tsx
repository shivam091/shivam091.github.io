import { JSX } from "react";
import { WaveDividerIcon } from "../Icon";
import styles from "@/components/PageSignoff/PageSignoff.module.scss";

interface PostMetadata {
  /** Optional signoff text sourced from frontmatter (e.g. `signoff: "Catch you on the flip side! ✌️"`). */
  signoff?: string;
  [key: string]: any; // Allows other frontmatter fields without throwing type errors
}

interface PageSignoffProps {
  /** Direct one-off override. Takes highest priority over metadata and the default. */
  message?: string;
  /** Frontmatter/MDX metadata object. `metadata.signoff` is used when no `message` prop is provided. */
  metadata?: PostMetadata;
}

const DEFAULT_SIGNOFF =
  "I hope you found this post informative and helpful. It took a lot of work to create, and I’m thrilled to finally share it with the world. Thank you for reading. 💖";

/**
 * Renders a closing signoff blurb at the bottom of a page or post.
 *
 * **Priority chain:** `message` prop → `metadata.signoff` → built-in default.
 *
 * ---
 *
 * **Scenario A — Default fallback**
 *
 * Omit all props and the built-in fallback text is used automatically.
 *
 * ```tsx
 * <PageSignoff />
 * ```
 *
 * ---
 *
 * **Scenario B — MDX / frontmatter metadata**
 *
 * Pass the post’s metadata object (e.g. from a dynamic layout).
 * The component reads `metadata.signoff` when present.
 *
 * ```tsx
 * // signoff: "Catch you on the flip side! ✌️"  ← frontmatter field
 * <PageSignoff metadata={post.metadata} />
 * ```
 *
 * ---
 *
 * **Scenario C — Hard prop override**
 *
 * Supply `message` directly for a one-off customisation on a specific page.
 *
 * ```tsx
 * <PageSignoff message="Custom quick signoff message just for this specific page layout! 🚀" />
 * ```
 */
export default function PageSignoff({ message, metadata }: PageSignoffProps): JSX.Element {
  // Logic Chain Priority: 1. Direct Prop -> 2. Metadata Field -> 3. Hardcoded Default
  const finalMessage = message || metadata?.signoff || DEFAULT_SIGNOFF;

  return (
    <>
      <div className={styles.pageSignoff}>
        <p>{finalMessage}</p>

        <div className={styles.signoffWave}>
          <WaveDividerIcon />
        </div>
      </div>
    </>
  );
}
