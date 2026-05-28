import { JSX } from "react";
import { formatDate } from "@/utils/date";
import styles from "@/components/ContentDates/ContentDates.module.scss";

interface Props {
  date?: string;
}

export default function LastModified({ date }: Props): JSX.Element | null {
  if (!date) return null;

  return (
    <p className={styles.date}>
      <em>Last updated: {formatDate(date)}</em>
    </p>
  );
}
