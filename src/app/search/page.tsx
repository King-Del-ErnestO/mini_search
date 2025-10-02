'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { SearchForm } from '@/components/search/SearchForm';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearch } from '@/hooks/useSearch';

export default function SearchPage() {
  const {
    query,
    results,
    isLoading,
    error,
    setQuery,
    handleSearch,
    handleClear,
  } = useSearch();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">
                Enterprise Search Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SearchForm
                query={query}
                isLoading={isLoading}
                onQueryChange={setQuery}
                onSubmit={handleSearch}
                onClear={handleClear}
              />
            </CardContent>
          </Card>

          <SearchResults
            results={results}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

