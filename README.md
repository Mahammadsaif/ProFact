# ProFact

A minimal Next.js + TypeScript project with provider-agnostic LLM integration. Get concise, factual information on any topic using OpenAI or Google Gemini.

## Features

- ✨ **Next.js with Pages Router** - Traditional routing with API routes
- 🎨 **Tailwind CSS** - Beautiful, responsive UI design
- 🤖 **Provider-Agnostic LLM** - Switch between OpenAI and Gemini via environment variable
- 🧪 **Jest Testing** - Comprehensive unit tests for API routes
- 📝 **TypeScript** - Full type safety
- 🎯 **ESLint & Prettier** - Code quality and formatting

## Project Structure

```
profact/
├── pages/
│   ├── api/
│   │   └── profact.ts          # Serverless API route
│   ├── _app.tsx                # App wrapper
│   ├── _document.tsx           # Document wrapper
│   └── index.tsx               # Homepage
├── components/
│   └── ProFactForm.tsx         # Main form component
├── lib/
│   └── llm/
│       ├── index.ts            # LLM provider factory
│       ├── types.ts            # Shared types
│       ├── openai.ts           # OpenAI integration
│       └── gemini.ts           # Gemini integration
├── __tests__/
│   └── api/
│       └── profact.test.ts     # API route tests
├── styles/
│   └── globals.css             # Global styles
├── .env.example                # Environment variables template
├── jest.config.js              # Jest configuration
├── .prettierrc                 # Prettier configuration
└── package.json                # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key OR Google Gemini API key

### Installation

1. **Clone the repository** (or navigate to the project directory):

```bash
cd profact
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# Choose your LLM provider: OPENAI or GEMINI
LLM_PROVIDER=OPENAI

# OpenAI Configuration (required if using OpenAI)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Google Gemini Configuration (required if using Gemini)
GEMINI_API_KEY=your-gemini-api-key-here
```

**Getting API Keys:**

- **OpenAI**: Get your API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Gemini**: Get your API key from [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### Running Locally

1. **Start the development server**:

```bash
npm run dev
```

2. **Open your browser** and navigate to:

```
http://localhost:3000
```

3. **Try it out**:
   - Enter a topic (e.g., "Quantum Computing", "Climate Change")
   - Click "Get ProFact"
   - View the AI-generated response

### Switching LLM Providers

To switch between OpenAI and Gemini, simply change the `LLM_PROVIDER` in your `.env.local`:

```env
# Use OpenAI
LLM_PROVIDER=OPENAI

# OR use Gemini
LLM_PROVIDER=GEMINI
```

Restart the dev server after changing the provider.

## Testing with Postman

### API Endpoint

```
POST http://localhost:3000/api/profact
```

### Request Headers

```
Content-Type: application/json
```

### Request Body

```json
{
  "topic": "Artificial Intelligence"
}
```

### Example Response (Success)

```json
{
  "content": "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines...",
  "provider": "OpenAI",
  "topic": "Artificial Intelligence"
}
```

### Example Response (Error)

```json
{
  "error": "Invalid request. \"topic\" field is required and must be a string."
}
```

### Status Codes

- `200` - Success
- `400` - Bad request (invalid topic)
- `405` - Method not allowed (non-POST request)
- `500` - Server error (API key issues, LLM errors)

## Running Tests

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

The test suite includes:

- Input validation tests
- Error handling tests
- Provider switching tests
- API response format tests

## Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Building for Production

Build the production bundle:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Deploying to Vercel

### Quick Deploy

1. **Install Vercel CLI** (optional):

```bash
npm install -g vercel
```

2. **Deploy from the command line**:

```bash
vercel
```

Or simply push to GitHub and import the repository in the [Vercel Dashboard](https://vercel.com/new).

### Setting Environment Variables in Vercel

#### Via Vercel Dashboard:

1. Go to your project in the [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Name             | Value                | Environment                      |
| ---------------- | -------------------- | -------------------------------- |
| `LLM_PROVIDER`   | `OPENAI` or `GEMINI` | Production, Preview, Development |
| `OPENAI_API_KEY` | Your OpenAI API key  | Production, Preview, Development |
| `GEMINI_API_KEY` | Your Gemini API key  | Production, Preview, Development |

4. Click **Save**
5. Redeploy your application

#### Via Vercel CLI:

```bash
vercel env add LLM_PROVIDER
vercel env add OPENAI_API_KEY
vercel env add GEMINI_API_KEY
```

### Important Notes for Vercel Deployment

- ✅ Environment variables are encrypted and secure
- ✅ You can set different values for Production, Preview, and Development
- ✅ After adding/changing environment variables, redeploy your app
- ✅ Never commit `.env.local` to your repository

## Environment Variables Reference

| Variable         | Required      | Description           | Example              |
| ---------------- | ------------- | --------------------- | -------------------- |
| `LLM_PROVIDER`   | Yes           | LLM provider to use   | `OPENAI` or `GEMINI` |
| `OPENAI_API_KEY` | Conditional\* | OpenAI API key        | `sk-...`             |
| `GEMINI_API_KEY` | Conditional\* | Google Gemini API key | `AIza...`            |

\*Required based on the selected `LLM_PROVIDER`

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Pages Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **LLM Providers**:
  - [OpenAI](https://openai.com/) (GPT-3.5-turbo)
  - [Google Gemini](https://ai.google.dev/) (gemini-pro)
- **Testing**: [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)
- **Code Quality**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

## API Route Details

### `/api/profact`

**Method**: `POST`

**Request Body**:

```typescript
{
  topic: string; // 1-500 characters, required
}
```

**Response**:

```typescript
{
  content: string; // LLM-generated response
  provider: string; // "OpenAI" or "Gemini"
  topic: string; // Original topic (trimmed)
}
```

**Error Response**:

```typescript
{
  error: string; // Error message
}
```

## Troubleshooting

### "API key is not set" Error

Make sure you've created a `.env.local` file with the correct API key for your chosen provider.

### "Method not allowed" Error

The API only accepts POST requests. Make sure you're using POST in your request.

### Tests Failing

Make sure all dependencies are installed:

```bash
npm install
```

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
npm run dev -- -p 3001
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
