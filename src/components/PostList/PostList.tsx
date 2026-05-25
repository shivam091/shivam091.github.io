"use client";

import { JSX, useCallback, useEffect, useRef, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard/PostCard";
import styles from "@/components/PostList/PostList.module.scss";

const PAGE_SIZE = 5;

interface PostListProps {
  initialPosts: PostMeta[];
}

export default function PostList({ initialPosts }: PostListProps): JSX.Element {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hasMore = visibleCount < initialPosts.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, initialPosts.length));
  }, [initialPosts.length]);

  // IntersectionObserver – auto-load when sentinel scrolls into view
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const visible = initialPosts.slice(0, visibleCount);

  return (
    <div className={styles.postListWrapper}>
      {initialPosts.length === 0 ? (
        <div className={styles.emptyState} role="status">
          <p>No posts yet. Check back soon!</p>
        </div>
      ) : (
        <>
          <p className={styles.postCount} aria-live="polite">
            Showing <strong>{visible.length}</strong> of{" "}
            <strong>{initialPosts.length}</strong>{" "}
            {initialPosts.length === 1 ? "post" : "posts"}
          </p>

          <ol className={styles.postList} role="list" aria-label="Blog posts">
            {visible.map((post) => (
              <li key={post.slug} className={styles.postListItem}>
                <PostCard post={post} />
              </li>
            ))}
          </ol>

          {/* Invisible sentinel element that triggers loading */}
          <div
            ref={sentinelRef}
            className={styles.sentinel}
            aria-hidden="true"
          />

          {/* Accessible fallback button for keyboard / reduced-motion users */}
          {hasMore && (
            <div className={styles.loadMoreWrapper}>
              <button
                type="button"
                className={styles.loadMoreBtn}
                onClick={loadMore}
                aria-label={`Load ${Math.min(PAGE_SIZE, initialPosts.length - visibleCount)} more posts`}
              >
                Load more
                <span className={styles.loadMoreCount}>
                  ({Math.min(PAGE_SIZE, initialPosts.length - visibleCount)} remaining)
                </span>
              </button>
            </div>
          )}

          {!hasMore && initialPosts.length > PAGE_SIZE && (
            <p className={styles.allLoaded} role="status" aria-live="polite">
              You&apos;ve reached the end — all {initialPosts.length} posts loaded.
            </p>
          )}
        </>
      )}
    </div>
  );
}
