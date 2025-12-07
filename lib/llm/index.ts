import { OpenAIProvider } from './openai';
import { GeminiProvider } from './gemini';
import { LLMProvider, SupportedProvider } from './types';

/**
 * Factory function to get the appropriate LLM provider based on environment configuration
 */
export function getLLMProvider(): LLMProvider {
  const provider = (process.env.LLM_PROVIDER || 'OPENAI').toUpperCase() as SupportedProvider;

  switch (provider) {
    case 'OPENAI': {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY environment variable is not set');
      }
      return new OpenAIProvider(apiKey);
    }

    case 'GEMINI': {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not set');
      }
      return new GeminiProvider(apiKey);
    }

    default:
      throw new Error(`Unsupported LLM provider: ${provider}. Use OPENAI or GEMINI.`);
  }
}

export * from './types';
