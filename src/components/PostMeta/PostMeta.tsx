import { JSX } from "react";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import styles from "@/components/PostMeta/PostMeta.module.scss";

interface PostMetaProps {
  post: PostMeta;
}

export default function PostMeta({ post }: PostMetaProps): JSX.Element {
  const { published_at, last_modified_at, author, reading_time } = post;

  return (
    <dl className={styles.postMeta}>
      <div className={styles.metaItem}>
        <dt className={styles.metaLabel}>Published</dt>
        <dd className={styles.metaValue}>
          <time dateTime={published_at} itemProp="datePublished">
            {formatDate(published_at)}
          </time>
        </dd>
      </div>

      {last_modified_at && last_modified_at !== published_at && (
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Updated</dt>
          <dd className={styles.metaValue}>
            <time dateTime={last_modified_at} itemProp="dateModified">
              {formatDate(last_modified_at)}
            </time>
          </dd>
        </div>
      )}

      <div className={styles.metaItem}>
        <dt className={styles.metaLabel}>Reading time</dt>
        <dd className={styles.metaValue}>
          <span aria-label={`${reading_time} minute read`}>
            {reading_time} min read
          </span>
        </dd>
      </div>

      {author && (
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Author</dt>
          <dd className={styles.metaValue} itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">{author}</span>
          </dd>
        </div>
      )}
    </dl>
  );
}
