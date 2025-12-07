import { GeminiProvider } from './gemini';
import { LLMProvider } from './types';

/**
 * Factory function to get the Gemini LLM provider
 */
export function getLLMProvider(): LLMProvider {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }
  return new GeminiProvider(apiKey);
}

export * from './types';

