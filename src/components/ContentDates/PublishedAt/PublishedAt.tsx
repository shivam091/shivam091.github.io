import { JSX } from "react";
import { formatDate } from "@/utils/date";
import styles from "@/components/ContentDates/ContentDates.module.scss";

// ISO date string of the original publish date.
interface Props {
  publishedAt?: string;
}

// Renders "Published: <date>" if publishedAt is provided; returns null otherwise.
export default function PublishedAt({ publishedAt }: Props): JSX.Element | null {
  if (!publishedAt) return null;

  return (
    <>
      <p className={styles.date}>
        <em>Published: {formatDate(publishedAt)}</em>
      </p>
    </>
  );
}
