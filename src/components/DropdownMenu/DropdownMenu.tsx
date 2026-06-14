"use client";

import { JSX, ReactNode, RefObject, createContext, useCallback, useContext, useRef, useState } from "react";
import * as Radix from "@radix-ui/react-dropdown-menu";
import { useSpring, animated } from "@react-spring/web";
import styles from "@/components/DropdownMenu/DropdownMenu.module.scss";

// Which edge of the trigger the panel opens from.
type Side = "top" | "right" | "bottom" | "left";

// Shared between Root, Tip, and Content so they stay in sync without prop-drilling.
type DropdownCtxType = { isOpen: boolean; autoSide: Side };

// isOpen drives the tip spring; autoSide is the measured best side when side="auto".
const DropdownCtx = createContext<DropdownCtxType>({ isOpen: false, autoSide: "bottom" });

// Carries the trigger's DOM ref down to DropdownTrigger for measurement on open.
const TriggerRefCtx = createContext<RefObject<HTMLButtonElement | null>>({ current: null });

// Props for the root wrapper that owns open state.
interface DropdownMenuProps {
  children: ReactNode;
  modal?: boolean;
}

// Props for the trigger slot — wraps any button via Radix asChild.
interface DropdownTriggerProps {
  children: ReactNode;
  className?: string;
}

// Props for the floating panel. "auto" measures the trigger and picks the roomiest side.
interface DropdownContentProps {
  children: ReactNode;
  side?: Side | "auto";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
  "aria-label"?: string;
}

// Props for a single selectable row inside the panel.
interface DropdownItemProps {
  children: ReactNode;
  onSelect?: () => void;
  className?: string;
  disabled?: boolean;
}

// Props for a non-interactive label row used to group items.
interface DropdownLabelProps {
  children: ReactNode;
  className?: string;
}

// Returns whichever side of the trigger has the most viewport space.
function computeSide(rect: DOMRect): Side {
  const spaceRight = window.innerWidth  - rect.right;
  const spaceLeft  = rect.left;
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const max = Math.max(spaceRight, spaceLeft, spaceBelow, spaceAbove);

  if (max === spaceBelow) return "bottom";
  if (max === spaceAbove) return "top";
  if (max === spaceLeft)  return "left";

  return "right";
}

// Dimensions match Radix Arrow's built-in viewBox (0 0 30 10).
// Tip is at y=TIP_H (bottom), base at y=0 (top). Radix's PopperArrow wrapper
// applies rotate(180deg) for bottom placement, which flips these so the tip
// ends up pointing upward at the trigger. ✓
const TIP_W = 30;
const TIP_H = 10;

// Flat line — the resting (closed) state of the animated tip.
const PATH_FLAT   = `M 0 0 C 0 0 ${TIP_W / 2} 0 ${TIP_W / 2} 0 C ${TIP_W / 2} 0 ${TIP_W} 0 ${TIP_W} 0 Z`;

// Bezier hill — the expanded (open) state of the animated tip.
const PATH_CURVED = `M 0 0 C ${TIP_W * 0.25} 0 ${TIP_W * 0.375} ${TIP_H} ${TIP_W / 2} ${TIP_H} C ${TIP_W * 0.625} ${TIP_H} ${TIP_W * 0.75} 0 ${TIP_W} 0 Z`;

// Animated SVG arrow that springs from a flat line to a curved hill as the panel opens.
function DropdownTip(): JSX.Element {
  const { isOpen } = useContext(DropdownCtx);

  const spring = useSpring({
    from: {
      d: PATH_FLAT
    },
    d: isOpen ? PATH_CURVED : PATH_FLAT,
    config: {
      tension: 300,
      friction: 18
    },
  });

  // Radix.Arrow asChild: Radix's Slot merges positioning props onto our SVG.
  // The SPAN Radix renders around the arrow uses Floating UI's arrow middleware
  // to centre it on the trigger — we get correct alignment.
  return (
    <>
      <Radix.Arrow asChild width={TIP_W} height={TIP_H} className={styles.tip}>
        <svg
          aria-hidden
          width={TIP_W}
          height={TIP_H}
          viewBox={`0 0 ${TIP_W} ${TIP_H}`}
          preserveAspectRatio="none"
        >
          <animated.path className={styles.tipPath} d={spring.d} />
        </svg>
      </Radix.Arrow>
    </>
  );
}

// Root — owns open state, measures the trigger on open, and provides both contexts.
export function DropdownMenu({ children, modal = false }: DropdownMenuProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [autoSide, setAutoSide] = useState<Side>("bottom");
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenChange = useCallback((next: boolean) => {
    if (next && triggerRef.current) {
      setAutoSide(computeSide(triggerRef.current.getBoundingClientRect()));
    }
    setOpen(next);
  }, []);

  return (
    <>
      <DropdownCtx.Provider value={{ isOpen: open, autoSide }}>
        <TriggerRefCtx.Provider value={triggerRef}>
          <Radix.Root open={open} onOpenChange={handleOpenChange} modal={modal}>
            {children}
          </Radix.Root>
        </TriggerRefCtx.Provider>
      </DropdownCtx.Provider>
    </>
  );
}

// Trigger — attaches the shared ref so DropdownMenu can measure it on open.
export function DropdownTrigger({ children, className }: DropdownTriggerProps): JSX.Element {
  const ref = useContext(TriggerRefCtx);

  return (
    <>
      <Radix.Trigger asChild ref={ref} className={className}>
        {children}
      </Radix.Trigger>
    </>
  );
}

// Content — the floating panel; resolves "auto" to a measured side at open time.
export function DropdownContent({
  children,
  side = "auto",
  align = "end",
  sideOffset = 16,
  className,
  "aria-label": ariaLabel,
}: DropdownContentProps): JSX.Element {
  const { autoSide } = useContext(DropdownCtx);
  const resolvedSide = side === "auto" ? autoSide : side;

  return (
    <>
      <Radix.Portal>
        <Radix.Content
          side={resolvedSide}
          align={align}
          sideOffset={sideOffset}
          aria-label={ariaLabel}
          className={[styles.content, className].filter(Boolean).join(" ")}
        >
          <DropdownTip />
          <div className={styles.contentInner}>{children}</div>
        </Radix.Content>
      </Radix.Portal>
    </>
  );
}

// Item — a single selectable row; calls onSelect and closes the menu automatically.
export function DropdownItem({
  children,
  onSelect,
  className,
  disabled,
}: DropdownItemProps): JSX.Element {
  return (
    <>
      <Radix.Item
        onSelect={onSelect}
        disabled={disabled}
        className={[styles.item, className].filter(Boolean).join(" ")}
      >
        {children}
      </Radix.Item>
    </>
  );
}

// Separator — a thin horizontal rule for visually grouping items.
export function DropdownSeparator(): JSX.Element {
  return (
    <>
      <Radix.Separator className={styles.separator} />
    </>
  );
}

// Label — a non-interactive heading row for a group of items.
export function DropdownLabel({ children, className }: DropdownLabelProps): JSX.Element {
  return (
    <>
      <Radix.Label className={[styles.label, className].filter(Boolean).join(" ")}>
        {children}
      </Radix.Label>
    </>
  );
}
