# ProFact - Quick Start Commands

## Initial Setup

```bash
# Navigate to project
cd /Users/saifshaik/Downloads/Projects/profact

# Install dependencies (already done)
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your API keys
# Required: Add your OPENAI_API_KEY or GEMINI_API_KEY
```

## Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Code Quality

```bash
# Run linter
npm run lint

# Format code
npm run format
```

## Testing API with curl

```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/profact \
  -H "Content-Type: application/json" \
  -d '{"topic": "Quantum Computing"}'
```

## Git Commands

```bash
# View commit history
git log --oneline

# Check status
git status

# View changes
git diff
```

## Vercel Deployment

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
LLM_PROVIDER=OPENAI
OPENAI_API_KEY=sk-your-actual-key-here
GEMINI_API_KEY=your-actual-key-here
```

## Project Location

```
/Users/saifshaik/Downloads/Projects/profact
```
