"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  type IconStatus,
  VIEWBOX_SIZE,
  getFirstLineProps,
  getSecondLineProps,
  getThirdLineProps,
} from "./IconHamburger.helpers";

// Parent passes iconStatus (derived from isPressed + drawerOpen) and isOpen (controls scale); boop is owned internally.
interface IconHamburgerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Derived by the parent from its isPressed + drawerOpen state */
  iconStatus: IconStatus;
  /** Controls the scale(1.5) wrapper — true when drawer is open */
  isOpen: boolean;
  size?: number;
}

// Spring-animated hamburger/X button — owns boop state and the scale wrapper; parent only drives iconStatus and isOpen.
const IconHamburger = forwardRef<HTMLButtonElement, IconHamburgerProps>(
  function IconHamburger(
    { iconStatus, isOpen, size = 20, className, onMouseEnter, ...rest },
    ref
  ) {
    const [isBooped, setIsBooped] = useState(false);
    const boopTimerRef = useRef<number | null>(null);

    const triggerBoop = useCallback(() => {
      if (boopTimerRef.current !== null) window.clearTimeout(boopTimerRef.current);
      setIsBooped(true);
      // Auto-reset so the spring bounces back — that rebound IS the boop feel
      boopTimerRef.current = window.setTimeout(() => {
        setIsBooped(false);
        boopTimerRef.current = null;
      }, 150);
    }, []);

    useEffect(() => {
      return () => {
        if (boopTimerRef.current !== null) window.clearTimeout(boopTimerRef.current);
      };
    }, []);

    const sharedConfig = {
      tension: 300,
      friction: 16,
      // clamp during transition so lines stop cleanly at centre;
      // unclamped at rest so boop has natural spring bounce
      clamp: iconStatus === "opening" || iconStatus === "closing",
    };

    const firstLineProps = useSpring({
      ...getFirstLineProps(iconStatus, isBooped),
      config: sharedConfig,
    });
    const secondLineProps = getSecondLineProps();
    const thirdLineProps = useSpring({
      ...getThirdLineProps(iconStatus, isBooped),
      config: sharedConfig,
    });

    const showPatty = iconStatus === "closed" || iconStatus === "opening";

    return (
      <>
        <button
          ref={ref}
          className={className}
          onMouseEnter={(e) => {
            triggerBoop();
            onMouseEnter?.(e);
          }}
          {...rest}
        >
          {/* CSS scale — transition, not a spring */}
          <span
            style={{
              display: "block",
              transform: isOpen ? "scale(1.5)" : "scale(1)",
              transition: "transform 400ms",
              willChange: "transform",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
              width={size}
              height={size}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "block", overflow: "visible" }}
            >
              <animated.line {...firstLineProps} />
              <line {...secondLineProps} style={{ opacity: showPatty ? 1 : 0 }} />
              <animated.line {...thirdLineProps} />
            </svg>
          </span>
        </button>
      </>
    );
  }
);

IconHamburger.displayName = "IconHamburger";
export default IconHamburger;
