import { JSX } from "react";
import { formatDate } from "@/utils/date";
import styles from "@/components/ContentDates/ContentDates.module.scss";

// ISO date string of the most recent content update.
interface Props {
  date?: string;
}

// Renders "Last updated: <date>" if a date is provided; returns null otherwise.
export default function LastModified({ date }: Props): JSX.Element | null {
  if (!date) return null;

  return (
    <>
      <p className={styles.date}>
        <em>Last updated: {formatDate(date)}</em>
      </p>
    </>
  );
}
