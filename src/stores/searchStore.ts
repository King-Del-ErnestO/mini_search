import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SearchStore } from '@/types';
import { container } from '@/services/ServiceContainer';
import { ISearchService } from '@/services/interfaces';

export const useSearchStore = create<SearchStore>()(
  devtools(
    (set, get) => ({
      // State
      query: '',
      results: null,
      isLoading: false,
      error: null,

      // Actions
      setQuery: (query: string) => set({ query }, false, 'setQuery'),
      
      setLoading: (isLoading: boolean) => set({ isLoading }, false, 'setLoading'),
      
      setResults: (results) => set({ results }, false, 'setResults'),
      
      setError: (error) => set({ error }, false, 'setError'),
      
      clearSearch: () => set({
        query: '',
        results: null,
        error: null,
        isLoading: false
      }, false, 'clearSearch'),
      
      performSearch: async (query: string) => {
        const { setLoading, setResults, setError } = get();
        
        setLoading(true);
        setError(null);
        
        try {
          const searchService = container.get<ISearchService>('search');
          const results = await searchService.search(query);
          setResults(results);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An error occurred';
          setError(errorMessage);
          setResults(null);
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: 'search-store',
    }
  )
);
