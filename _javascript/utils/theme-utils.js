import { kebabCase } from "./string-utils";
import { LIGHT_COLORS_RAW, DARK_COLORS_RAW } from "./../constants/colors";

/**
 * Converts a raw color map into a CSS variable object.
 *
 * Example input:
 *   { colorPrimary: [200, 80, 50] }
 * Output:
 *   { "--color-primary": "hsl(200deg 80% 50%)" }
 *
 * @param {Record<string, Array<number|string>>} colorMapRaw
 * @returns {Record<string, string>} CSS variable map
 */
export function createStyleObject(colorMapRaw) {
  const styleObj = {};
  for (const key in colorMapRaw) {
    let value = colorMapRaw[key];
    if (typeof value === "string") value = colorMapRaw[value]; // alias support
    const [h, s, l, a = 1] = value;
    styleObj[`--${kebabCase(key)}`] =
      a === 1
        ? `hsl(${h}deg ${s}% ${l}%)`
        : `hsl(${h}deg ${s}% ${l}% / ${a})`;
  }
  return styleObj;
}

/**
 * Applies CSS variables to :root based on the selected theme.
 *
 * @param {boolean} isDark - If true, applies DARK_COLORS_RAW, else light theme.
 */
export function applyThemeVars(isDark = false) {
  const colorMapRaw = isDark ? DARK_COLORS_RAW : LIGHT_COLORS_RAW;
  const cssVars = createStyleObject(colorMapRaw);

  for (const [key, value] of Object.entries(cssVars)) {
    document.documentElement.style.setProperty(key, value);
  }
}
