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
              Get concise, factual information on any topic
            </p>
          </div>

          {/* Main Form */}
          <ProFactForm />
        </div>
      </main>
    </>
  );
}
