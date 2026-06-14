import { JSX } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { mainNav, quickLinks, legalLinks } from "@/data/navigation";
import SkyVisual from "@/components/SiteHeader/Drawer/SkyVisual";
import styles from "@/components/SiteHeader/Drawer/Drawer.module.scss";

// id ties aria-controls on the hamburger to this dialog; pathname drives active-link highlighting; onClose triggers the closing animation.
interface HeaderDrawerProps {
  id: string;
  pathname: string;
  onClose: () => void;
}

// Full-screen slide-in drawer rendered via a portal; contains main nav, quick links inside a sky scene, and legal footer links.
export default function HeaderDrawer({ id, pathname, onClose }: HeaderDrawerProps): JSX.Element {
  return (
    <>
      <motion.div
        id={id}
        className={[
          styles.headerDrawer,
          "fixed flex flex-col",
          "top-20 inset-x-2 bottom-2 z-1002",
          "rounded-md px-[clamp(0.75rem,1vw,1rem)]",
          "shadow-(--box-shadow-md)",
          "bg-(--color-bg-default) text-(--color-fg-accent-muted)",
          "overflow-y-auto",
        ].join(" ")}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ x: "110%" }}
        transition={{ duration: 0.35, ease: [0.41, 0.1, 0.13, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Main Menu"
        tabIndex={-1}
      >
        <motion.div
          className={`${styles.drawerContainer} flex flex-auto flex-col gap-3 overflow-y-auto`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
        >
          {/* ── Navigation ──────────────────────────────────────────────────── */}
          <nav
            className="flex flex-col leading-tight"
            aria-label="Main Navigation"
          >
            <ul className="list-none p-0 m-0">
              {mainNav.map((item) => (
                <li
                  key={item.href}
                  className="py-1 mb-0 border-b border-b-(--color-border-muted)"
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 py-3 px-2 text-sm text-inherit no-underline hover:text-(--color-fg-default) aria-[current=page]:text-(--color-fg-default) aria-[current=page]:font-semibold"
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={onClose}
                  >
                    {item.icon && <Icon name={item.icon} size={16} />}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Decorative sky visual ────────────────────────────────────────── */}
          <SkyVisual>
            <ul className="list-none p-0 m-0 absolute right-2 flex flex-col pb-[6%]">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block p-2 text-inherit text-sm text-right no-underline hover:no-underline hover:text-(--color-fg-default)"
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </SkyVisual>

          {/* ── Footer ───────────────────────────────────────────────────────── */}
          <footer>
            <ul
              className="list-none p-0 m-0 flex justify-evenly text-xs"
              aria-label="Legal links"
            >
              {legalLinks.map((item) => (
                <li key={item.href} className="relative mb-0">
                  <Link
                    href={item.href}
                    className="block p-2 text-inherit font-medium text-center no-underline hover:no-underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </footer>
        </motion.div>
      </motion.div>
    </>
  );
}
