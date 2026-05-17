import { createElement, forwardRef, JSX, SVGProps } from "react";
import { hyphenate } from "@/utils/string";
import defaultAttributes from "@/components/Icon/defaultAttributes";
import { icons, type IconDefinition, type IconName } from "@/components/Icon/icons";
import styles from "@/components/Icon/Icon.module.scss";

// Extends SVGProps with size and an optional pre-resolved node; name is required for registry lookup.
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  /** Explicit SVG children — when omitted, resolved from the icons registry via name. */
  iconNode?: JSX.Element;
  name: IconName;
}

// Generic SVG icon — resolves children and viewBox from the icons registry by name, or accepts an explicit iconNode.
const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { size, className, iconNode, name, ...props },
  ref
): JSX.Element {
  const iconClass = `icon-${hyphenate(name)}`;

  // Cast to IconDefinition so svgProps (which is optional) is visible to TS.
  const def = icons[name] as IconDefinition | undefined;
  const resolvedNode = iconNode ?? <>{def?.children}</>;
  const defProps = def?.svgProps ?? {};
  const viewBox = (props.viewBox ?? def?.viewBox) || defaultAttributes.viewBox;

  return createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      ...defProps,
      viewBox,
      width: size || defaultAttributes.width,
      height: size || defaultAttributes.height,
      className: `${styles.icon} ${iconClass} ${className || ""}`.trim(),
      ...props,
    },
    resolvedNode
  );
});

Icon.displayName = "Icon";
export default Icon;
