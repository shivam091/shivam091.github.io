"use client";

import { usePathname } from "next/navigation";
import styles from "./PageHeading.module.scss";

const pageNames: Record<string, string> = {
  "/code-of-conduct": "Code of Conduct",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-use": "Terms of Use",
  "/contact": "Contact",
};

export default function PageHeading() {
  const pathname = usePathname();
  const title = pageNames[pathname] || pathname.split("/").pop()?.replace(/-/g, " ") || "Page";

  return (
    <h1 id="page-title" className={styles.pageTitle}>
      {title}
    </h1>
  );
}
