/**
 * Normalizes an answer string for comparison:
 * trims whitespace, converts to lowercase, and strips punctuation.
 * Example: "Ger,mA.ny!" → "germany"
 */
export function normalize(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '');
}
