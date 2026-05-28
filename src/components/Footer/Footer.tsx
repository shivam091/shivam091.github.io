import { JSX } from "react";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import { siteConfig } from "@/config/site";
import styles from "@/components/Footer/Footer.module.scss";
import type { IconName } from "@/components/Icon/icons";

const quickLinks = [
  { title: "Home",  href: "/" },
  { title: "About", href: "/about" },
];

const socialLinks: Array<{ label: string; href: string; icon: IconName; external?: boolean }> = [
  { label: "GitHub",    href: siteConfig.author.social.github,     icon: "github",    external: true },
  { label: "LinkedIn",  href: siteConfig.author.social.linkedin,   icon: "linkedin",  external: true },
  { label: "Instagram", href: siteConfig.author.social.instagram,  icon: "instagram", external: true },
  { label: "Email",     href: `mailto:${siteConfig.author.email}`, icon: "envelope" },
];

const legalLinks = [
  { title: "Code of Conduct", href: "/code-of-conduct" },
];

const LICENSE_NOTE =
  "Except where otherwise noted, content on this site is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).";

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
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
          {socialLinks.map(({ label, href, icon, external }) => (
            <a
              key={href}
              href={href}
              className={styles.footerLink}
              aria-label={label}
              data-tooltip={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
            © {year}{" "}
            <strong>{siteConfig.name}</strong>,{" "}
            All Rights Reserved.
            Built with{" "}
            <span className={styles.heart} aria-hidden="true">♥</span>
            {" and "}
            <a
              href="https://nextjs.org/"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>
            .
          </span>
        </div>

      </div>
    </footer>
  );
}
