import { JSX } from "react";
import styles from "@/components/LastModified/LastModified.module.scss";

interface Props {
  date?: string;
  publishedAt?: string;
}

export default function LastModified({ date }: Props): JSX.Element | null {
  if (!date) return null;

  const formatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));

  return (
    <p className={styles.lastModified}>
      <em>Last updated: {formatted}</em>
    </p>
  );
}
