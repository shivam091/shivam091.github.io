import { JSX } from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import { quickLinks, legalLinks, socialLinks } from "@/data/navigation";
import styles from "@/components/SiteFooter/SiteFooter.module.scss";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const copyrightYear =
    currentYear > siteConfig.foundedYear
      ? `${siteConfig.foundedYear}–present`
      : `${siteConfig.foundedYear}`;

  return (
    <>
      <footer className={styles.siteFooter} aria-label="Site footer">
        <div className={styles.footerGrid}>

          <nav className={`${styles.footerSection} ${styles.footerLinks}`} aria-label="Quick links">
            {quickLinks.map(({ title, href }) => (
              <Link key={href} href={href} className={styles.footerLink}>
                {title}
              </Link>
            ))}
          </nav>

          <nav className={`${styles.footerSection} ${styles.footerSocial}`} aria-label="Social links">
            {/* Skip links whose href is empty (e.g. resume not yet configured). */}
            {socialLinks.filter(link => link.href).map(({ label, href, icon, external, analytics }) => (
              <a
                key={href}
                href={href}
                className={styles.footerLink}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(analytics ? {
                  "data-analytics-event":    analytics.event,
                  "data-analytics-label":    analytics.label,
                  "data-analytics-category": analytics.category,
                } : {})}
              >
                <Icon name={icon} size={18} aria-hidden="true" focusable={false} />
              </a>
            ))}
          </nav>

          <nav className={`${styles.footerSection} ${styles.footerLegal}`} aria-label="Legal links">
            {legalLinks.map(({ title, href }) => (
              <Link key={href} href={href} className={styles.footerLink}>
                {title}
              </Link>
            ))}
          </nav>

          <div className={`${styles.footerSection} ${styles.footerCredits}`}>
            <span>
              © {copyrightYear}{" "}
              <strong>{siteConfig.name}</strong>.{" "}
              All Rights Reserved.
              Built with{" "}
              <span className={styles.heart} aria-hidden="true">♥</span>
              {" and "}
              <a
                href="https://nextjs.org/"
                className={styles.footerLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Next.js (opens in new tab)"
              >
                Next.js
              </a>
              .
            </span>
          </div>

        </div>
      </footer>
    </>
  );
}
