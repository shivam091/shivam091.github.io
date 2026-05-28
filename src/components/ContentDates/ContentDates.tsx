import { JSX } from "react";
import PublishedAt from "@/components/ContentDates/PublishedAt/PublishedAt";
import LastModified from "@/components/ContentDates/LastModified/LastModified";

interface Props {
  date?: string;
  publishedAt?: string;
}

export default function ContentDates({ date, publishedAt }: Props): JSX.Element | null {
  if (!date && !publishedAt) return null;

  const wasUpdated = date && publishedAt && date.slice(0, 10) !== publishedAt.slice(0, 10);

  return (
    <>
      <PublishedAt publishedAt={publishedAt} />
      {wasUpdated && <LastModified date={date} />}
    </>
  );
}
