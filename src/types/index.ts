// Domain types following Single Responsibility Principle
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  titleLength: number;
  bodyLength: number;
  hasLongTitle: boolean;
  excerpt: string;
}

export interface UserGroup {
  user: number;
  posts: Post[];
  totalTitleLength: number;
  averageTitleLength: number;
  postCount: number;
  hasLongTitles: boolean;
  longestTitle: Post;
}

export interface SearchResponse {
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

export interface SearchState {
  query: string;
  results: SearchResponse | null;
  isLoading: boolean;
  error: string | null;
}

// Action types for better type safety
export interface SearchActions {
  setQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setResults: (results: SearchResponse | null) => void;
  setError: (error: string | null) => void;
  clearSearch: () => void;
  performSearch: (query: string) => Promise<void>;
}

export type SearchStore = SearchState & SearchActions;
