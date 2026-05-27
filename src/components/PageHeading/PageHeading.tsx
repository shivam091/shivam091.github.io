"use client";

import { usePathname } from "next/navigation";
import { JSX } from "react";
import styles from "@/components/PageHeading/PageHeading.module.scss";

const pageNames: Record<string, string> = {
  "/about": "About",
  "/code-of-conduct": "Code of Conduct",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-use": "Terms of Use",
  "/contact": "Contact",
  "/posts": "Posts",
};

export default function PageHeading(): JSX.Element | null {
  const pathname = usePathname();

  // Post detail pages render their own <h1> inside PostLayout — skip here.
  const isPostDetail = pathname.startsWith("/posts/");
  if (isPostDetail) return null;

  const title =
    pageNames[pathname] ||
    pathname.split("/").pop()?.replace(/-/g, " ") ||
    "Page";

  return (
    <>
      <h1 id="page-title" className={`transition-[text-shadow] duration-200 ease-linear ${styles.pageTitle}`}>
        {title}
      </h1>
    </>
  );
}
