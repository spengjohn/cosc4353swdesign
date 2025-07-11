// src/hooks/useSanitize.js
export function sanitizeInput(input, options = {}) {
  const {
    allowDoubleSpaces = false,
    allowCharacters = "/.,&-'",  // default safe characters
    trim = true,
    collapseSpaces = true,
  } = options;

  let result = input;

  if (typeof result !== "string") return result;

  if (trim) result = result.trim();

  if (!allowDoubleSpaces && collapseSpaces) {
    result = result.replace(/\s{2,}/g, " ");
  }

  // Allow only whitelisted characters
  const escaped = allowCharacters.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const allowed = `a-zA-Z0-9\\s${escaped}`;
  const regex = new RegExp(`[^${allowed}]`, "g");
  result = result.replace(regex, "");

  return result;
}

export function useSanitize() {
  return sanitizeInput;
}
