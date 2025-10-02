'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  query: string;
  isLoading: boolean;
  onQueryChange: (query: string) => void;
  onSubmit: (query: string) => void;
  onClear: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  query,
  isLoading,
  onQueryChange,
  onSubmit,
  onClear,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search posts by title or content..."
          className="pl-10"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="px-6"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onClear}
        className="px-4"
      >
        <X className="h-4 w-4" />
      </Button>
    </form>
  );
};
