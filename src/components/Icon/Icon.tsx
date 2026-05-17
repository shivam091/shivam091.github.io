import { createElement, forwardRef, JSX, SVGProps } from "react";
import { hyphenate } from "@/utils/string";
import defaultAttributes from "@/components/Icon/defaultAttributes";
import { icons, type IconDefinition, type IconName } from "@/components/Icon/icons";
import styles from "@/components/Icon/Icon.module.scss";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  /**
   * Explicit SVG children. When omitted the component resolves them
   * automatically from the `icons` registry using `name`.
   */
  iconNode?: JSX.Element;
  name: IconName;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { size, className, iconNode, name, ...props },
  ref
): JSX.Element {
  const iconClass = `icon-${hyphenate(name)}`;

  // Look up the definition from the registry when iconNode isn't supplied.
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
