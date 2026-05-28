"use client";

import { JSX, useState } from "react";
import { Icon } from "@/components/Icon";
import type { Faq } from "@/data/faqs";
import styles from "@/components/FAQ/FAQ.module.scss";

interface FAQProps {
  faqs: Faq[];
}

export default function FAQ({ faqs }: FAQProps): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(prev => (prev === index ? null : index));
  }

  return (
    <div className={styles.faqList}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`${styles.collapse} ${isOpen ? styles.open : ""}`}>
            <button
              type="button"
              className={styles.collapseToggle}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span className={`${styles.iconWrap} ${isOpen ? styles.iconOpen : ""}`}>
                <Icon name={isOpen ? "flat" : "plus"} size={16} />
              </span>
              <span className={styles.question}>{faq.question}</span>
            </button>
            <div
              className={styles.collapseContent}
              hidden={!isOpen}
              dangerouslySetInnerHTML={{ __html: markdownToHtml(faq.answer) }}
            />
          </div>
        );
      })}
    </div>
  );
}

function markdownToHtml(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
