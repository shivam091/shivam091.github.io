import { JSX } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import styles from "@/components/PostCard/PostCard.module.scss";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps): JSX.Element {
  const {
    slug,
    title,
    excerpt,
    published_at,
    tags = [],
    reading_time,
  } = post;

  return (
    <article className={styles.postCard} itemScope itemType="https://schema.org/BlogPosting">
      <meta itemProp="datePublished" content={published_at} />
      <meta itemProp="headline" content={title} />

      <div className={styles.postCardMeta}>
        <time
          className={styles.postDate}
          dateTime={published_at}
          itemProp="datePublished"
        >
          {formatDate(published_at)}
        </time>

        <span className={styles.readingTime} aria-label={`${reading_time} minute read`}>
          {reading_time} min read
        </span>
      </div>

      <h2 className={styles.postTitle} itemProp="name">
        <Link href={`/posts/${slug}`} className={styles.postTitleLink} itemProp="url">
          {title}
        </Link>
      </h2>

      {excerpt && (
        <p className={styles.postExcerpt} itemProp="description">
          {excerpt}
        </p>
      )}

      {tags.length > 0 && (
        <footer className={styles.postCardFooter}>
          <ul className={styles.tagList} aria-label="Tags" role="list">
            {tags.map((tag) => (
              <li key={tag} className={styles.tagItem}>
                <span className={styles.tag}>{tag}</span>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
