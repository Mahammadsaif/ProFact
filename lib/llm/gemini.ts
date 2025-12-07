import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMProvider, LLMResponse } from './types';

/**
 * Google Gemini provider implementation
 */
export class GeminiProvider implements LLMProvider {
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateResponse(topic: string): Promise<LLMResponse> {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Provide a brief, informative response about: ${topic}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();

      return {
        content,
        provider: 'Gemini',
      };
    } catch (error) {
      throw new Error(`Gemini API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
