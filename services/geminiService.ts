import { postData } from './dataService';
import { ENDPOINTS } from '../config/apiConfig';
import { FileNode } from '../types';

export async function generateFileSystem(prompt: string): Promise<FileNode> {
  const fullPrompt = `You are an expert file system generator. Your task is to interpret the user's request and create a JSON representation of the desired folder and file structure.
- The root of the structure must be a single folder.
- If a file is requested with content, include it in the 'content' property.
- If a file is requested without specified content (e.g., 'an empty file.txt'), the 'content' property should be an empty string "".
- Your output MUST be a single, valid JSON object and nothing else. Do not wrap it in markdown.
The user's request is: "${prompt}"`;

  try {
    const result = await postData<{ prompt: string }, { response: string }>(ENDPOINTS.GEMINI, { prompt: fullPrompt });
    
    // The response from the proxy is a string which should be JSON
    const jsonString = result.response.trim().replace(/^```json\n|```$/g, '');
    const fileNode = JSON.parse(jsonString);
    return fileNode as FileNode;
  } catch (error) {
    console.error("Error generating file system via proxy:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error("The AI returned an invalid structure. Please try rephrasing your prompt.");
    }
    throw new Error("Failed to generate file system. Please check your backend connection.");
  }
}

export async function generateStrategy(prompt: string): Promise<string> {
   const fullPrompt = `You are an expert in quantitative trading strategies. Based on the user's prompt, generate a detailed trading strategy. The output can be pseudo-code, Python code using a common library like 'pandas' or 'backtrader', or a JSON object defining the parameters. The response should be clear, concise, and directly usable.
   The user's prompt is: "${prompt}"`;
  try {
    const result = await postData<{ prompt: string }, { response: string }>(ENDPOINTS.GEMINI, { prompt: fullPrompt });
    return result.response;
  } catch (error) {
    console.error("Error generating strategy via proxy:", error);
    throw new Error("Failed to generate strategy. Please check your backend connection.");
  }
}