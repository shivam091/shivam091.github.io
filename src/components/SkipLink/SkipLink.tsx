import { JSX } from "react";

export default function SkipLink(): JSX.Element {
  return (
    <>
      <a
        href="#main-content"
        className="absolute top-2 left-2 z-50 -translate-y-20 focus:translate-y-0 px-4 py-2 bg-secondary text-white transition-transform duration-200 rounded"
      >
        Skip to main content
      </a>
    </>
  );
}
