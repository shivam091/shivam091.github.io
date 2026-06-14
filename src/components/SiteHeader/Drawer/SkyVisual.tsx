import { JSX, ReactNode } from "react";

// Accepts optional overlay content (e.g. quick-link list) rendered above the scene.
interface SkyVisualProps {
  children?: ReactNode;
}

// Decorative sky scene used as the drawer's mid-section — gradient sky, cloud SVG, and ground silhouette.
export default function SkyVisual({ children }: SkyVisualProps): JSX.Element {
  return (
    <>
      <div className="relative rounded-md overflow-clip aspect-18/10 max-h-62.5 bg-[linear-gradient(to_top,var(--color-bg-sky-to)_30%,var(--color-bg-sky-from)_100%)] mt-auto">
        {/* Cloud shape */}
        <svg
          viewBox="0 0 788 265"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-none absolute min-w-118.75 w-[85%] h-56 top-auto -right-px -bottom-px left-auto"
          focusable={false}
          aria-hidden="true"
        >
          <path
            d="M681.771 38.1111C693.771 38.1111 688.271 -2.38884 759.771 0.111155C770.228 0.476802 779.338 1.54837 787.271 3.11155V264.111H0.770948C0.770948 264.111 -9.72906 229.611 46.7709 192.611C103.271 155.611 148.271 182.611 153.271 181.611C158.271 180.611 153.771 139.111 230.771 123.111C307.771 107.111 322.771 138.111 332.271 136.111C341.771 134.111 336.771 87.6111 405.271 74.1111C473.771 60.6112 497.771 89.1112 505.771 88.1111C513.771 87.1111 510.271 37.1111 574.271 21.6111C638.271 6.11115 669.771 38.1111 681.771 38.1111Z"
            className="fill-(--color-bg-sky-subtle)"
          />
        </svg>

        {/* Base / ground shape */}
        <svg
          viewBox="0 0 740 100"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-none absolute w-[calc(100%+3px)] h-1/2 top-auto -right-px -bottom-px left-[-1.5px]"
          focusable={false}
          aria-hidden="true"
        >
          <path
            d="M230 74.9998C221.5 71.9995 190.5 22.4998 69 18.4998C45.6329 17.7305 25.6317 19.3469 8.56594 22.4598C4.15502 23.2644 0 19.9389 0 15.4552V108H740V60.9843C740 65.0822 736.496 68.3004 732.408 68.01C729.819 67.8261 727.184 67.6558 724.5 67.4998C595.5 59.9998 582 95 573.5 94.9998C565 94.9995 532 58.9998 406 47.4998C280 35.9998 238.5 78 230 74.9998Z"
            className="fill-(--color-bg-default)"
          />
        </svg>

        {children}
      </div>
    </>
  );
}
