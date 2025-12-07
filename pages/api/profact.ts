import type { NextApiRequest, NextApiResponse } from 'next';
import { getLLMProvider } from '@/lib/llm';

type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  content: string;
  provider: string;
  topic: string;
};

/**
 * API route handler for /api/profact
 * Accepts POST requests with { topic } and returns LLM-generated response
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Validate request body
    const { topic } = req.body;

    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ error: 'Invalid request. "topic" field is required and must be a string.' });
    }

    if (topic.trim().length === 0) {
      return res.status(400).json({ error: 'Topic cannot be empty.' });
    }

    if (topic.length > 500) {
      return res.status(400).json({ error: 'Topic is too long. Maximum 500 characters.' });
    }

    // Get the appropriate LLM provider based on environment
    const llmProvider = getLLMProvider();

    // Generate response
    const response = await llmProvider.generateResponse(topic.trim());

    // Return successful response
    return res.status(200).json({
      content: response.content,
      provider: response.provider,
      topic: topic.trim(),
    });
  } catch (error) {
    console.error('API error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes('api key') || error.message.includes('API_KEY')) {
        return res.status(500).json({ error: 'Server configuration error. Please check API keys.' });
      }
      return res.status(500).json({ error: `Server error: ${error.message}` });
    }

    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
