/**
 * Converts a camelCase or PascalCase string to its hyphenated (kebab-case) equivalent.
 *
 * @param {string} value - The string to hyphenate.
 * @returns {string} The hyphenated, lowercase version of the input string.
 *
 * @example
 * hyphenate('camelCase');     // → 'camel-case'
 * hyphenate('PascalCase');    // → '-pascal-case'
 * hyphenate('myComponentId'); // → 'my-component-id'
 * hyphenate('already-kebab'); // → 'already-kebab'
 */
export const hyphenate = (value: string) => value.replace(/([A-Z])/g, '-$1').toLowerCase();
