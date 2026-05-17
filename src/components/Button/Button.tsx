import { JSX } from "react";
import Link from "next/link";
import styles from "@/components/Button/Button.module.scss";

export type ButtonVariant = "filled" | "outlined" | "ghost" | "soft";
export type ButtonIntent  = "default" | "accent" | "success" | "danger" | "attention";
export type ButtonSize    = "sm" | "md" | "lg";
export type ButtonShape   = "rounded" | "pill" | "square";

interface ButtonBaseProps {
  /** Visual style. Default: `"filled"` */
  variant?: ButtonVariant;
  /** Semantic colour intent. Default: `"default"` */
  intent?: ButtonIntent;
  /** Padding/font-size scale. Default: `"md"` */
  size?: ButtonSize;
  /**
   * Border-radius preset.
   * - `"rounded"` — 0.5rem (default)
   * - `"pill"`    — fully rounded (9999px)
   * - `"square"`  — equal padding, aspect-ratio 1:1; use for icon-only buttons
   */
  shape?: ButtonShape;
  /** Replaces children with a spinner and disables interaction. */
  loading?: boolean;
  /** Leading icon node (rendered before children). */
  iconLeft?: React.ReactNode;
  /** Trailing icon node (rendered after children). */
  iconRight?: React.ReactNode;
  /** Stretches the button to 100% of its container. */
  fullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/** Render as a <button> when no `href` is supplied. */
type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

/** Render as a Next.js <Link> when `href` is supplied. */
type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps): JSX.Element {
  // Destructure shared props; cast to the merged shape so TS allows it.
  const merged = props as ButtonBaseProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

  const {
    variant  = "filled",
    intent   = "default",
    size     = "md",
    shape    = "rounded",
    loading  = false,
    iconLeft,
    iconRight,
    fullWidth = false,
    children,
    className,
    href,
    disabled,
    ...rest
  } = merged;

  const cls = [
    styles.button,
    styles[size],
    shape !== "rounded" && styles[shape],
    styles[variant],
    styles[intent],
    fullWidth  && styles.fullWidth,
    loading    && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Inner content — spinner overlays the hidden label to preserve button width.
  const inner = (
    <>
      {loading && (
        <span
          className={styles.spinner}
          aria-hidden="true"
          role="presentation"
        />
      )}
      <span className={styles.label}>
        {iconLeft  && <span className={styles.iconSlot}>{iconLeft}</span>}
        {children}
        {iconRight && <span className={styles.iconSlot}>{iconRight}</span>}
      </span>
    </>
  );

  if (href !== undefined) {
    return (
      <>
        <Link
          href={href}
          className={cls}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {inner}
        </Link>
      </>
    );
  }

  return (
    <>
      <button
        // Explicit type prevents accidental form submission.
        type="button"
        className={cls}
        disabled={loading || disabled}
        aria-busy={loading || undefined}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {inner}
      </button>
    </>
  );
}
