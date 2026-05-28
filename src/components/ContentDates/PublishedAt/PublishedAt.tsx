import { JSX } from "react";
import { formatDate } from "@/utils/date";
import styles from "@/components/ContentDates/ContentDates.module.scss";

interface Props {
  publishedAt?: string;
}

export default function PublishedAt({ publishedAt }: Props): JSX.Element | null {
  if (!publishedAt) return null;

  return (
    <p className={styles.date}>
      <em>Published: {formatDate(publishedAt)}</em>
    </p>
  );
}
