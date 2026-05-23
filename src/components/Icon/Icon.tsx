import { forwardRef, SVGProps } from "react";
import { icons, type IconDefinition, type IconName } from "./icons";

export type { IconName };

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 20, ...props },
  ref
) {
  const { viewBox, svgProps, children } = icons[name] as IconDefinition;

  return (
    <>
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        {...svgProps}
        {...props}
      >
        {children}
      </svg>
    </>
  );
});

Icon.displayName = "Icon";
export default Icon;
