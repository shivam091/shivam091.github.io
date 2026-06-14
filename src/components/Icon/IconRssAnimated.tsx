"use client";

import { useSpring, animated } from "@react-spring/web";

// `isBooped` drives the staggered spring burst; `size` sets the SVG dimensions.
interface Props {
  size?: number;
  isBooped: boolean;
}

// RSS icon with three staggered springs that pulse outward on boop and settle back.
export default function IconRssAnimated({ size = 16, isBooped }: Props) {
  // Base dot — grows from r=1 to r=2 on boop.
  const circleSpring = useSpring({
    r: isBooped ? 2 : 1,
    config: { tension: 300, friction: 22 },
  });

  // Inner arc — path expands outward on boop, offset by 4 frames.
  const innerRingSpring = useSpring({
    d: isBooped ? "M4 9 a 11 11 0 0 1 11 11" : "M4 11 a 9 9 0 0 1 9 9",
    config: { tension: 300, friction: 18 },
    delay: 16.6 * 4,
  });

  // Outer arc — path expands further on boop, offset by 8 frames.
  const outerRingSpring = useSpring({
    d: isBooped ? "M4 2 a 18 18 0 0 1 18 18" : "M4 4 a 16 16 0 0 1 16 16",
    config: { tension: 250, friction: 12 },
    delay: 16.6 * 8,
  });

  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="block overflow-visible"
      >
        <animated.path {...innerRingSpring} />
        <animated.path {...outerRingSpring} />
        <animated.circle cx="5" cy="19" fill="currentColor" {...circleSpring} />
      </svg>
    </>
  );
}
