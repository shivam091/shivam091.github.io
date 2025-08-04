/**
 * Converts a camelCase or PascalCase string to kebab-case.
 *
 * Examples:
 *   - colorCloud300 → color-cloud-300
 *   - primaryColor → primary-color
 *
 * @param {string} str - Input string in camelCase/PascalCase.
 * @returns {string} - Kebab-cased string.
 */
export function kebabCase(str) {
  return str
    // 1. Normalize to NFKD to handle accented characters
    .normalize("NFKD")
    // 2. Convert camelCase / PascalCase boundaries to space
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    // 3. Replace non-alphanumeric sequences with space
    .replace(/[^a-zA-Z0-9]+/g, " ")
    // 4. Trim and collapse spaces
    .trim()
    .replace(/\s+/g, "-")
    // 5. Lowercase everything
    .toLowerCase();
}
