import Head from 'next/head';
import ProFactForm from '@/components/ProFactForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>ProFact - AI-Powered Knowledge</title>
        <meta name="description" content="Get concise, factual information on any topic using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              ProFact
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get concise, factual information on any topic powered by AI
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                OpenAI
              </span>
              <span className="text-gray-400">•</span>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                Gemini
              </span>
            </div>
          </div>

          {/* Main Form */}
          <ProFactForm />

          {/* Footer */}
          <footer className="mt-16 text-center text-sm text-gray-500">
            <p>
              Powered by{' '}
              <span className="font-medium text-gray-700">
                {process.env.NEXT_PUBLIC_LLM_PROVIDER || 'AI'}
              </span>
            </p>
            <p className="mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
          </footer>
        </div>
      </main>
    </>
  );
}
