import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Mini Search + Cache
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A Next.js demo featuring higher-order functions, caching, and functional programming
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Features Demonstrated
          </h2>
          <ul className="text-left space-y-2 text-gray-600">
            <li>✅ <strong>Request Wrapper HOFs:</strong> withRetry, withBaseUrl</li>
            <li>✅ <strong>Route Middleware HOFs:</strong> withCache, withTiming</li>
            <li>✅ <strong>Composed Wrapper:</strong> withRequestEnhancements</li>
            <li>✅ <strong>Functional Array Methods:</strong> map, filter, reduce</li>
            <li>✅ <strong>API Route:</strong> /api/search with caching</li>
            <li>✅ <strong>TypeScript:</strong> Full type safety</li>
            <li>✅ <strong>App Router:</strong> Next.js 13+ routing</li>
          </ul>
        </div>

        <Link
          href="/search"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Try the Search Demo →
        </Link>

        <div className="mt-8 text-sm text-gray-500">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
          <p>Uses JSONPlaceholder API for demo data</p>
        </div>
      </div>
    </div>
  );
}