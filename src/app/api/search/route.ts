import { NextRequest, NextResponse } from 'next/server';
import { withRequestEnhancements } from '@/lib/hofs';

// Base fetch function that will be enhanced with HOFs
async function fetchPosts(url: string, query?: string) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const posts = await response.json();
  return posts;
}

// Enhanced fetch function with all HOFs applied
const enhancedFetchPosts = withRequestEnhancements(fetchPosts, {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  maxRetries: 2,
  cacheTtl: 60000, // 1 minute cache
  timingLabel: 'Posts API Request'
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    // Fetch posts from the enhanced function
    const posts = await enhancedFetchPosts('/posts', query);
    
    // Transform the API response using functional array methods
    const transformedPosts = posts
      .map((post: any) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
        // Add computed fields
        titleLength: post.title.length,
        bodyLength: post.body.length,
        hasLongTitle: post.title.length > 50,
        excerpt: post.body.substring(0, 100) + '...'
      }))
      .filter((post: any) => {
        // Filter posts based on search query
        if (!query) return true;
        const searchTerm = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(searchTerm) ||
          post.body.toLowerCase().includes(searchTerm)
        );
      })
      .reduce((acc: any, post: any) => {
        // Group posts by userId and add statistics
        const userId = post.userId;
        if (!acc[userId]) {
          acc[userId] = {
            user: userId,
            posts: [],
            totalTitleLength: 0,
            averageTitleLength: 0
          };
        }
        acc[userId].posts.push(post);
        acc[userId].totalTitleLength += post.titleLength;
        acc[userId].averageTitleLength = 
          acc[userId].totalTitleLength / acc[userId].posts.length;
        return acc;
      }, {});
    
    // Convert grouped object back to array and add more transformations
    const result = Object.values(transformedPosts)
      .map((userGroup: any) => ({
        ...userGroup,
        postCount: userGroup.posts.length,
        // Add more computed statistics
        hasLongTitles: userGroup.posts.some((p: any) => p.hasLongTitle),
        longestTitle: userGroup.posts.reduce((longest: any, current: any) => 
          current.titleLength > longest.titleLength ? current : longest
        )
      }))
      .sort((a: any, b: any) => b.postCount - a.postCount); // Sort by post count
    
    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        totalUsers: result.length,
        totalPosts: posts.length,
        filteredPosts: Object.values(transformedPosts).reduce((sum: number, group: any) => 
          sum + group.posts.length, 0
        ),
        query: query || 'all'
      }
    });
    
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

