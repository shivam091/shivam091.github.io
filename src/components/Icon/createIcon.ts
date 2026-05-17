import { createElement, forwardRef, JSX, SVGProps } from "react";
import Icon from "@/components/Icon/Icon";
import { icons, IconName } from "@/components/Icon/icons";

// Factory that builds a named, forwarded-ref SVG component from an icons-registry entry.
const createIcon = (name: IconName) => {
  const Component = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement> & { size?: number }>(
    ({ className, size, name: _name, ...props }, ref) => {
      return createElement(Icon, {
        ref,
        name,
        size,
        iconNode: icons[name].children,
        className,
        ...props,
      });
    }
  );

  Component.displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return Component;
};

export default createIcon;
