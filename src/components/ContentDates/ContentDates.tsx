import { JSX } from "react";
import PublishedAt from "@/components/ContentDates/PublishedAt/PublishedAt";
import LastModified from "@/components/ContentDates/LastModified/LastModified";

// Optional ISO date strings; component renders nothing if both are absent.
interface Props {
  date?: string;
  publishedAt?: string;
}

// Shows the publish date and, when the content has since been updated, a "last modified" label.
export default function ContentDates({ date, publishedAt }: Props): JSX.Element | null {
  if (!date && !publishedAt) return null;

  // True only when both dates exist and differ at the day level.
  const wasUpdated = date && publishedAt && date.slice(0, 10) !== publishedAt.slice(0, 10);

  return (
    <>
      <PublishedAt publishedAt={publishedAt} />
      {wasUpdated && <LastModified date={date} />}
    </>
  );
}
