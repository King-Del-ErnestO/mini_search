import { NextRequest, NextResponse } from 'next/server';
import { withRequestEnhancements } from '@/lib/hofs';
import { Post, UserGroup, SearchResponse } from '@/types';

// Data transformation service following Single Responsibility Principle
class PostTransformationService {
  static transformPost(post: Record<string, unknown>): Post {
    const title = String(post.title || '');
    const body = String(post.body || '');
    
    return {
      id: Number(post.id) || 0,
      title,
      body,
      userId: Number(post.userId) || 0,
      titleLength: title.length,
      bodyLength: body.length,
      hasLongTitle: title.length > 50,
      excerpt: body.substring(0, 100) + '...'
    };
  }

  static filterPosts(posts: Post[], query: string): Post[] {
    if (!query) return posts;
    
    const searchTerm = query.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.body.toLowerCase().includes(searchTerm)
    );
  }

  static groupPostsByUser(posts: Post[]): UserGroup[] {
    const grouped = posts.reduce((acc: Record<number, Post[]>, post) => {
      if (!acc[post.userId]) {
        acc[post.userId] = [];
      }
      acc[post.userId].push(post);
      return acc;
    }, {});

    return Object.entries(grouped).map(([userId, userPosts]) => {
      const totalTitleLength = userPosts.reduce((sum, post) => sum + post.titleLength, 0);
      const longestTitle = userPosts.reduce((longest, current) => 
        current.titleLength > longest.titleLength ? current : longest
      );

      return {
        user: parseInt(userId),
        posts: userPosts,
        totalTitleLength,
        averageTitleLength: totalTitleLength / userPosts.length,
        postCount: userPosts.length,
        hasLongTitles: userPosts.some(post => post.hasLongTitle),
        longestTitle
      };
    }).sort((a, b) => b.postCount - a.postCount);
  }
}

// API service following Dependency Inversion Principle
class PostApiService {
  private enhancedFetch: (url: string) => Promise<unknown[]>;

  constructor() {
    this.enhancedFetch = withRequestEnhancements(this.baseFetch, {
      baseUrl: 'https://jsonplaceholder.typicode.com',
      retry: { maxRetries: 2, delay: 1000 },
      cache: { ttl: 60000 },
      timing: { label: 'Posts API Request' }
    });
  }

  private async baseFetch(url: string): Promise<unknown[]> {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async fetchPosts(): Promise<unknown[]> {
    return this.enhancedFetch('/posts');
  }
}

// Main search service orchestrating the flow
class SearchService {
  constructor(
    private postApi: PostApiService,
    private transformer: typeof PostTransformationService
  ) {}

  async search(query: string): Promise<SearchResponse> {
    const rawPosts = await this.postApi.fetchPosts();
    
    const transformedPosts = (rawPosts as Record<string, unknown>[]).map(post => 
      this.transformer.transformPost(post)
    );
    
    const filteredPosts = this.transformer.filterPosts(transformedPosts, query);
    const userGroups = this.transformer.groupPostsByUser(filteredPosts);
    
    return {
      success: true,
      data: userGroups,
      meta: {
        totalUsers: userGroups.length,
        totalPosts: rawPosts.length,
        filteredPosts: filteredPosts.length,
        query: query || 'all'
      }
    };
  }
}

// Initialize services
const postApi = new PostApiService();
const searchService = new SearchService(postApi, PostTransformationService);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    const result = await searchService.search(query);
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

