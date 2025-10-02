'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserGroupCard } from './UserGroupCard';
import { SearchResultsSkeleton } from './SearchResultsSkeleton';
import { SearchResponse } from '@/types';

interface SearchResultsProps {
  results: SearchResponse | null;
  isLoading: boolean;
  error: string | null;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <SearchResultsSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (results) {
    return (
      <>
        <Alert variant="success" className="mb-6">
          <AlertDescription>
            <div className="font-semibold">Search Results:</div>
            <div className="text-sm">
              Found {results.meta.filteredPosts} posts from {results.meta.totalUsers} users
              {results.meta.query !== 'all' && (
                <span> matching &quot;{results.meta.query}&quot;</span>
              )}
            </div>
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {results.data.map((userGroup) => (
            <UserGroupCard key={userGroup.user} userGroup={userGroup} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="text-muted-foreground text-lg">
        Enter a search term to find posts
      </div>
      <div className="text-muted-foreground/70 text-sm mt-2">
        Try searching for words like &quot;aut&quot;, &quot;dolor&quot;, &quot;sit&quot;, or &quot;amet&quot;
      </div>
    </div>
  );
};
