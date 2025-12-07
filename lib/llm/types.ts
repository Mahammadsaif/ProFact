/**
 * Shared types for LLM providers
 */

export interface LLMResponse {
  content: string;
  provider: string;
}

export interface LLMProvider {
  generateResponse(topic: string): Promise<LLMResponse>;
}

export type SupportedProvider = 'OPENAI' | 'GEMINI';
