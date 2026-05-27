"use client";

import { JSX, useEffect, useRef, useState } from "react";
import styles from "@/components/TableOfContents/TableOfContents.module.scss";

interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function TableOfContents(): JSX.Element {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Extract headings from the rendered article body
  useEffect(() => {
    const articleBody = document.querySelector("[data-post-body]");
    if (!articleBody) return;

    const els = articleBody.querySelectorAll<HTMLHeadingElement>("h2, h3, h4");
    const extracted: TocHeading[] = [];

    els.forEach((el) => {
      // Ensure each heading has an id for anchor links
      if (!el.id) {
        el.id = slugify(el.textContent ?? "");
      }
      const level = parseInt(el.tagName[1]) as 2 | 3 | 4;
      extracted.push({ id: el.id, text: el.textContent ?? "", level });
    });

    setHeadings(extracted);
  }, []);

  // IntersectionObserver to highlight the active heading
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the first visible heading
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-10% 0px -75% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return <></>;

  return (
    <aside
      className={styles.toc}
      aria-labelledby="toc-heading"
    >
      <details className={styles.tocDetails} open>
        <summary className={styles.tocSummary} id="toc-heading">
          <span>On this page</span>
          <span className={styles.tocChevron} aria-hidden="true">▾</span>
        </summary>

        <nav aria-label="Table of contents">
          <ol className={styles.tocList} role="list">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={[
                  styles.tocItem,
                  heading.level === 3 ? styles.indent1 : "",
                  heading.level === 4 ? styles.indent2 : "",
                  activeId === heading.id ? styles.active : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <a
                  href={`#${heading.id}`}
                  className={styles.tocLink}
                  aria-current={activeId === heading.id ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(heading.id);
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(heading.id);
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </details>
    </aside>
  );
}
