import { useCallback } from 'react';
import { useSearchStore } from '@/stores/searchStore';

export const useSearch = () => {
  const {
    query,
    results,
    isLoading,
    error,
    setQuery,
    clearSearch,
    performSearch,
  } = useSearchStore();

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    await performSearch(searchQuery);
  }, [performSearch]);

  const handleClear = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  return {
    query,
    results,
    isLoading,
    error,
    setQuery,
    handleSearch,
    handleClear,
  };
};
