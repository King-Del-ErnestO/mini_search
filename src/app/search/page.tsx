'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  titleLength: number;
  bodyLength: number;
  hasLongTitle: boolean;
  excerpt: string;
}

interface UserGroup {
  user: number;
  posts: Post[];
  totalTitleLength: number;
  averageTitleLength: number;
  postCount: number;
  hasLongTitles: boolean;
  longestTitle: Post;
}

interface SearchResponse {
  success: boolean;
  data: UserGroup[];
  meta: {
    totalUsers: number;
    totalPosts: number;
    filteredPosts: number;
    query: string;
  };
  error?: string;
  message?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Search failed');
      }
      
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Mini Search + Cache Demo
          </h1>
          
          <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts by title or content..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Clear
            </button>
          </form>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Error: {error}
            </div>
          )}

          {results && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <div className="font-semibold">Search Results:</div>
              <div className="text-sm">
                Found {results.meta.filteredPosts} posts from {results.meta.totalUsers} users
                {results.meta.query !== 'all' && ` matching "${results.meta.query}"`}
              </div>
            </div>
          )}
        </div>

        {results && results.data && (
          <div className="space-y-6">
            {results.data.map((userGroup) => (
              <div key={userGroup.user} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    User {userGroup.user}
                  </h2>
                  <div className="text-sm text-gray-500">
                    {userGroup.postCount} posts • Avg title length: {userGroup.averageTitleLength.toFixed(1)} chars
                  </div>
                </div>
                
                {userGroup.hasLongTitles && (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded mb-4 text-sm">
                    ⚠️ This user has posts with long titles
                  </div>
                )}

                <div className="space-y-3">
                  {userGroup.posts.map((post) => (
                    <div key={post.id} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {post.title}
                          {post.hasLongTitle && (
                            <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                              Long Title
                            </span>
                          )}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {post.titleLength} chars
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{post.excerpt}</p>
                      <div className="text-xs text-gray-400 mt-1">
                        Post ID: {post.id} • Body: {post.bodyLength} chars
                      </div>
                    </div>
                  ))}
                </div>

                {userGroup.longestTitle && (
                  <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-300">
                    <div className="text-sm font-medium text-blue-900">
                      Longest Title ({userGroup.longestTitle.titleLength} chars):
                    </div>
                    <div className="text-sm text-blue-800">
                      "{userGroup.longestTitle.title}"
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!results && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              Enter a search term to find posts
            </div>
            <div className="text-gray-400 text-sm mt-2">
              Try searching for words like "aut", "dolor", "sit", or "amet"
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

