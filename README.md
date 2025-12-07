# ProFact

A simple web app that gives you quick, factual information on any topic using AI.

## What it does

Type in any topic (like "quantum computing" or "climate change") and get a concise, informative response powered by Google's Gemini AI.

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Add your API key**

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then add your Gemini API key to `.env.local`:

```
GEMINI_API_KEY=your_key_here
```

Get a free API key at: https://aistudio.google.com/app/apikey

3. **Run the app**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Tech Stack

- Next.js (Pages Router)
- TypeScript
- Tailwind CSS
- Google Gemini AI

## Testing

Run tests:

```bash
npm test
```

## Deploy

The easiest way to deploy is with Vercel:

1. Push to GitHub
2. Import your repo on Vercel
3. Add `GEMINI_API_KEY` in Vercel's environment variables
4. Deploy!

## Project Structure

```
profact/
├── pages/          # Next.js pages and API routes
├── components/     # React components
├── lib/            # Utility functions and API integrations
├── styles/         # CSS files
└── __tests__/      # Test files
```

## License

MIT
