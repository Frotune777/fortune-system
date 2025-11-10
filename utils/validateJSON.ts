interface ParsedResult<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Safely parses a JSON string and returns a structured result.
 * @param jsonString - The string to parse.
 * @returns An object containing either the parsed data or an error object.
 */
export function validateAndParseJSON<T>(jsonString: string): ParsedResult<T> {
  try {
    const data = JSON.parse(jsonString);
    return { data, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error };
    }
    return { data: null, error: new Error('An unknown parsing error occurred.') };
  }
}