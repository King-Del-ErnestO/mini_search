# Mini Search + Cache Demo

A Next.js application demonstrating higher-order functions, caching, and functional programming patterns.

## Features

### Higher-Order Functions (HOFs)

#### Request Wrapper HOFs
- **`withRetry`**: Adds retry logic with exponential backoff
- **`withBaseUrl`**: Adds base URL prefixing to API calls
- **`withRequestEnhancements`**: Composed wrapper combining multiple enhancements

#### Route Middleware HOFs
- **`withCache`**: In-memory caching with TTL support
- **`withTiming`**: Performance timing measurements
- **`withRequestEnhancements`**: Composed wrapper for all enhancements

### Functional Programming
- **Array Transformations**: Uses `map`, `filter`, and `reduce` to transform API data
- **Data Grouping**: Groups posts by user with statistical analysis
- **Search Filtering**: Client-side filtering based on search queries

### API Route
- **`/api/search`**: Searches JSONPlaceholder posts API
- **Caching**: 1-minute TTL cache for improved performance
- **Error Handling**: Comprehensive error handling with retry logic
- **Data Transformation**: Rich data processing with computed fields

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **JSONPlaceholder API** for demo data

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Navigate to the search page to try the demo

## API Endpoints

### GET /api/search

Search posts with optional query parameter.

**Query Parameters:**
- `q` (optional): Search term to filter posts

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "user": 1,
      "posts": [...],
      "totalTitleLength": 265,
      "averageTitleLength": 37.86,
      "postCount": 7,
      "hasLongTitles": true,
      "longestTitle": {...}
    }
  ],
  "meta": {
    "totalUsers": 10,
    "totalPosts": 100,
    "filteredPosts": 66,
    "query": "aut"
  }
}
```

## Architecture

The application demonstrates several key patterns:

1. **Higher-Order Functions**: Composable function enhancement
2. **Caching Strategy**: In-memory caching with TTL
3. **Error Handling**: Retry logic with exponential backoff
4. **Data Processing**: Functional array transformations
5. **Type Safety**: Full TypeScript implementation

## Performance Features

- **Caching**: Reduces API calls with 1-minute TTL
- **Retry Logic**: Handles transient failures gracefully
- **Performance Timing**: Monitors function execution times
- **Efficient Filtering**: Client-side search with debouncing

## Demo Data

Uses the JSONPlaceholder API (https://jsonplaceholder.typicode.com/posts) which provides 100 sample blog posts from 10 different users.