/**
 * Light theme raw HSL colors.
 * Values are arrays in format [H, S, L, (optional A)].
 *
 * Example: [210, 30, 55] → hsl(210deg 30% 55%)
 */
export const LIGHT_COLORS_RAW = {
  colorCloud100: [203, 60, 95],
  colorCloud300: [202, 68, 92],
  colorCloud400: [201, 60, 86],
  colorCloud500: [200, 80, 83],
  colorCloud700: [210, 30, 55],
  colorSkyFrom: [200, 70, 78],
  colorSkyTo: [200, 70, 70],
  colorSkySubtle: [200, 90, 88],
  colorSkyBottom: [200, 79, 83],
};

/**
 * Dark theme raw HSL colors.
 * Similar structure to LIGHT_COLORS_RAW.
 */
export const DARK_COLORS_RAW = {
  colorCloud100: [210, 15, 6],
  colorCloud300: [212, 40, 9],
  colorCloud400: [213, 40, 10],
  colorCloud500: [213, 40, 12],
  colorSkyFrom: [214, 40, 11],
  colorSkyTo: [200, 50, 30],
  colorSkySubtle: [210, 40, 16],
  colorSkyBottom: [212, 32, 8, 0.5],
};
