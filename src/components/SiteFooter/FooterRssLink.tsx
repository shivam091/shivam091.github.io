"use client";

import { JSX } from "react";
import { useBoop } from "@/hooks/useBoop";
import IconRssAnimated from "@/components/Icon/IconRssAnimated";
import type { AnalyticsEvent } from "@/data/navigation";
import styles from "@/components/SiteFooter/SiteFooter.module.scss";

// Atom feed link props — mirrors the relevant fields from SocialLink.
interface FooterRssLinkProps {
  href: string;
  label: string;
  analytics?: AnalyticsEvent;
}

// Atom Feed link for the footer — boop-animated RSS icon, matching the header behaviour.
export default function FooterRssLink({ href, label, analytics }: FooterRssLinkProps): JSX.Element {
  const [rssBooped, triggerRssBoop] = useBoop();

  return (
    <>
      <a
        href={href}
        className={styles.footerLink}
        aria-label={label}
        target="_blank"
        rel="alternate"
        type="application/atom+xml"
        onMouseEnter={triggerRssBoop}
        {...(analytics ? {
          "data-analytics-event":    analytics.event,
          "data-analytics-label":    analytics.label,
          "data-analytics-category": analytics.category,
        } : {})}
      >
        <IconRssAnimated size={18} isBooped={rssBooped} />
      </a>
    </>
  );
}
