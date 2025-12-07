import OpenAI from 'openai';
import { LLMProvider, LLMResponse } from './types';

/**
 * OpenAI provider implementation
 */
export class OpenAIProvider implements LLMProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }
    this.client = new OpenAI({ apiKey });
  }

  async generateResponse(topic: string): Promise<LLMResponse> {
    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides concise, factual information.',
          },
          {
            role: 'user',
            content: `Provide a brief, informative response about: ${topic}`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content || 'No response generated';

      return {
        content,
        provider: 'OpenAI',
      };
    } catch (error) {
      throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
