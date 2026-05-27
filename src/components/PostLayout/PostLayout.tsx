import { JSX, ReactNode } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import PostMeta from "@/components/PostMeta/PostMeta";
import TableOfContents from "@/components/TableOfContents/TableOfContents";
import styles from "@/components/PostLayout/PostLayout.module.scss";

interface PostLayoutProps {
  post: Post;
  children: ReactNode; // compiled MDX content
}

export default function PostLayout({ post, children }: PostLayoutProps): JSX.Element {
  const {
    title,
    excerpt,
    published_at,
    last_modified_at,
    tags = [],
    categories = [],
  } = post;

  const postUrl = `https://shivam091.github.io/posts/${post.slug}`;
  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(postUrl);

  return (
    <article
      className={styles.post}
      itemScope
      itemType="https://schema.org/BlogPosting"
      aria-labelledby="page-title"
    >
      {/* Schema.org metadata */}
      <meta itemProp="datePublished" content={published_at} />
      <meta itemProp="dateModified" content={last_modified_at ?? published_at} />
      <meta itemProp="headline" content={title} />
      <meta itemProp="mainEntityOfPage" content={postUrl} />

      {/* ── Post title ─────────────────────────────────────────────────────── */}
      <h1 id="page-title" className={styles.postTitle} itemProp="name">
        {title}
      </h1>

      {/* ── Post header: excerpt + primary meta ────────────────────────────── */}
      <header className={styles.postHeader}>
        {excerpt && (
          <p className={styles.pageExcerpt} itemProp="description">
            {excerpt}
          </p>
        )}

        <div
          className={styles.pageMetaPrimary}
          role="group"
          aria-label="Post metadata"
        >
          <PostMeta post={post} />
        </div>
      </header>

      {/* ── Post body: content + sticky TOC ────────────────────────────────── */}
      <div className={styles.postLayout}>
        <div
          className={styles.postContent}
          itemProp="articleBody"
          data-post-body
        >
          {children}
        </div>

        <TableOfContents />
      </div>

      {/* ── Sign-off ───────────────────────────────────────────────────────── */}
      <div className={styles.pageSignoff}>
        <p>
          I hope you found this post informative and helpful. It took a lot of
          work to create, and I&apos;m thrilled to finally share it with the
          world. Thank you for reading. 💖
        </p>
        <div className={styles.signoffDivider} aria-hidden="true" />
      </div>

      {/* ── Footer: tags, categories, copyright, share ─────────────────────── */}
      <footer className={styles.postFooter}>
        {(tags.length > 0 || categories.length > 0) && (
          <div
            className={styles.pageMetaSecondary}
            role="group"
            aria-label="Post metadata"
          >
            {categories.length > 0 && (
              <div className={styles.taxonomy}>
                <span className={styles.taxonomyLabel}>Categories</span>
                <ul className={styles.taxonomyList} role="list" aria-label="Categories">
                  {categories.map((cat) => (
                    <li key={cat} className={styles.taxonomyItem}>
                      <span className={styles.taxonomyTag}>{cat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tags.length > 0 && (
              <div className={styles.taxonomy}>
                <span className={styles.taxonomyLabel}>Tags</span>
                <ul className={styles.taxonomyList} role="list" aria-label="Tags">
                  {tags.map((tag) => (
                    <li key={tag} className={styles.taxonomyItem}>
                      <span className={styles.taxonomyTag}>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className={styles.postFooterContent}>
          {/* Copyright / license */}
          <p className={styles.copyright}>
            This post is licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.licenseLink}
            >
              CC BY 4.0
            </a>{" "}
            by the author.
          </p>

          {/* Share */}
          <section className={styles.shareSection} aria-labelledby="share-title">
            <h3 id="share-title" className={styles.shareTitle}>
              Share this post
            </h3>
            <ul className={styles.shareList} role="list">
              <li>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareLink}
                  aria-label="Share on X (Twitter)"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareLink}
                  aria-label="Share on LinkedIn"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`https://news.ycombinator.com/submitlink?u=${shareUrl}&t=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareLink}
                  aria-label="Share on Hacker News"
                >
                  Hacker News
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Back to all posts */}
        <nav aria-label="Post navigation" className={styles.postNav}>
          <Link href="/posts" className={styles.backLink}>
            ← All posts
          </Link>
        </nav>
      </footer>
    </article>
  );
}
