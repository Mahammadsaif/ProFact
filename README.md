# ProFact

A minimal Next.js + TypeScript project with Google Gemini AI integration. Get concise, factual information on any topic using AI.

## Features

- ✨ **Next.js with Pages Router** - Traditional routing with API routes
- 🎨 **Tailwind CSS** - Beautiful, responsive UI design
- 🤖 **Google Gemini AI** - Powered by gemini-pro model
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
- Google Gemini API key

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

Edit `.env.local` and add your Gemini API key:

```env
# Google Gemini Configuration
GEMINI_API_KEY=your-gemini-api-key-here
```

**Getting API Key:**

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
  "provider": "Gemini",
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

| Name             | Value               | Environment                      |
| ---------------- | ------------------- | -------------------------------- |
| `GEMINI_API_KEY` | Your Gemini API key | Production, Preview, Development |

4. Click **Save**
5. Redeploy your application

#### Via Vercel CLI:

```bash
vercel env add GEMINI_API_KEY
```

### Important Notes for Vercel Deployment

- ✅ Environment variables are encrypted and secure
- ✅ You can set different values for Production, Preview, and Development
- ✅ After adding/changing environment variables, redeploy your app
- ✅ Never commit `.env.local` to your repository

## Environment Variables Reference

| Variable         | Required | Description           | Example   |
| ---------------- | -------- | --------------------- | --------- |
| `GEMINI_API_KEY` | Yes      | Google Gemini API key | `AIza...` |

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Pages Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **LLM Provider**: [Google Gemini](https://ai.google.dev/) (gemini-pro)
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
  provider: string; // "Gemini"
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

Make sure you've created a `.env.local` file with your Gemini API key.

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
