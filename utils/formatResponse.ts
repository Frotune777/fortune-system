/**
 * Attempts to format a string as a pretty-printed JSON.
 * If the string is not valid JSON, it returns the original string.
 * This is useful for handling outputs that could be JSON, code, or plain text.
 * @param potentialJson - The string to format.
 * @returns A formatted string.
 */
export const formatCode = (potentialJson: string): string => {
  try {
    // Clean up markdown ```json markers if they exist
    const cleanedString = potentialJson.replace(/^```json\n|```$/g, '');
    const parsed = JSON.parse(cleanedString);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    // If parsing fails, it's not a JSON string, so return as is.
    return potentialJson;
  }
};
