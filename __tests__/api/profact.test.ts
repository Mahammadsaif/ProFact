import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/profact';

// Mock the LLM providers
jest.mock('@/lib/llm', () => ({
  getLLMProvider: jest.fn(),
}));

import { getLLMProvider } from '@/lib/llm';

describe('/api/profact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Method not allowed. Use POST.',
    });
  });

  it('should return 400 when topic is missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Invalid request. "topic" field is required and must be a string.',
    });
  });

  it('should return 400 when topic is not a string', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { topic: 123 },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Invalid request. "topic" field is required and must be a string.',
    });
  });

  it('should return 400 when topic is empty', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { topic: '   ' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Topic cannot be empty.',
    });
  });

  it('should return 400 when topic is too long', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { topic: 'a'.repeat(501) },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Topic is too long. Maximum 500 characters.',
    });
  });

  it('should return 200 with valid response when topic is valid', async () => {
    const mockProvider = {
      generateResponse: jest.fn().mockResolvedValue({
        content: 'This is a test response about quantum computing.',
        provider: 'OpenAI',
      }),
    };

    (getLLMProvider as jest.Mock).mockReturnValue(mockProvider);

    const { req, res } = createMocks({
      method: 'POST',
      body: { topic: 'Quantum Computing' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      content: 'This is a test response about quantum computing.',
      provider: 'OpenAI',
      topic: 'Quantum Computing',
    });
    expect(mockProvider.generateResponse).toHaveBeenCalledWith('Quantum Computing');
  });

  it('should handle LLM provider errors gracefully', async () => {
    const mockProvider = {
      generateResponse: jest.fn().mockRejectedValue(new Error('API key is invalid')),
    };

    (getLLMProvider as jest.Mock).mockReturnValue(mockProvider);

    const { req, res } = createMocks({
      method: 'POST',
      body: { topic: 'Test Topic' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Server configuration error. Please check API keys.',
    });
  });

  it('should handle provider initialization errors', async () => {
    (getLLMProvider as jest.Mock).mockImplementation(() => {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: { topic: 'Test Topic' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Server configuration error. Please check API keys.',
    });
  });

  it('should trim whitespace from topic', async () => {
    const mockProvider = {
      generateResponse: jest.fn().mockResolvedValue({
        content: 'Test response',
        provider: 'Gemini',
      }),
    };

    (getLLMProvider as jest.Mock).mockReturnValue(mockProvider);

    const { req, res } = createMocks({
      method: 'POST',
      body: { topic: '  Climate Change  ' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(mockProvider.generateResponse).toHaveBeenCalledWith('Climate Change');
    expect(JSON.parse(res._getData()).topic).toBe('Climate Change');
  });
});
