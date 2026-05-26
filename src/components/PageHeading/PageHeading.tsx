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
};

export default function PageHeading(): JSX.Element {
  const pathname = usePathname();
  const title = pageNames[pathname] || pathname.split("/").pop()?.replace(/-/g, " ") || "Page";

  return (
    <>
      <h1 id="page-title" className={`transition-[text-shadow] duration-200 ease-linear ${styles.pageTitle}`}>
        {title}
      </h1>
    </>
  );
}
