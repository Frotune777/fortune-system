import { API_BASE_URL } from '../config/apiConfig';
import { validateAndParseJSON } from '../utils/validateJSON';

/**
 * Fetches data from a specified API endpoint.
 * @param endpoint - The API endpoint to fetch data from (e.g., '/data').
 * @returns A promise that resolves to the parsed JSON data.
 * @throws An error if the network response is not ok or if parsing fails.
 */
export async function fetchData<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // In a real app, you might want more sophisticated error handling
      // like reading an error message from the response body.
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const text = await response.text();
    const parsedData = validateAndParseJSON<T>(text);

    if (parsedData.error) {
      throw new Error(`Failed to parse JSON: ${parsedData.error.message}`);
    }

    return parsedData.data as T;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    // Here you could implement retry logic with exponential backoff.
    throw error;
  }
}

/**
 * Posts data to a specified API endpoint.
 * @param endpoint - The API endpoint to post data to (e.g., '/signal').
 * @param payload - The data to send in the request body.
 * @returns A promise that resolves to the parsed JSON response.
 * @throws An error if the network response is not ok.
 */
export async function postData<T, U>(endpoint: string, payload: T): Promise<U> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    // Assuming the server sends back a JSON response.
    const text = await response.text();
    const parsedData = validateAndParseJSON<U>(text);
     if (parsedData.error) {
      throw new Error(`Failed to parse JSON response: ${parsedData.error.message}`);
    }

    return parsedData.data as U;

  } catch (error) {
    console.error(`Error posting to ${url}:`, error);
    throw error;
  }
}