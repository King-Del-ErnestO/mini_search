// Higher-Order Functions for the mini search app

// Request wrapper HOFs
export function withRetry<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  maxRetries: number = 3,
  delay: number = 1000
) {
  return async (...args: T): Promise<R> => {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error as Error;
        if (attempt === maxRetries) break;
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
      }
    }
    
    throw lastError!;
  };
}

export function withBaseUrl(baseUrl: string) {
  return function<T extends any[], R>(
    fn: (url: string, ...args: T) => Promise<R>
  ) {
    return async (endpoint: string, ...args: T): Promise<R> => {
      const fullUrl = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
      return fn(fullUrl, ...args);
    };
  };
}

// Route middleware HOFs
export function withCache<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  ttl: number = 300000 // 5 minutes default
) {
  const cache = new Map<string, { data: R; timestamp: number }>();
  
  return async (...args: T): Promise<R> => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      console.log('Cache hit for:', key);
      return cached.data;
    }
    
    console.log('Cache miss, fetching fresh data for:', key);
    const result = await fn(...args);
    cache.set(key, { data: result, timestamp: Date.now() });
    
    return result;
  };
}

export function withTiming<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  label: string = 'Function'
) {
  return async (...args: T): Promise<R> => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    console.log(`${label} took ${(end - start).toFixed(2)}ms`);
    return result;
  };
}

// Composed wrapper combining multiple HOFs
export function withRequestEnhancements<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  options: {
    baseUrl?: string;
    maxRetries?: number;
    cacheTtl?: number;
    timingLabel?: string;
  } = {}
) {
  let enhancedFn = fn;
  
  if (options.baseUrl) {
    enhancedFn = withBaseUrl(options.baseUrl)(enhancedFn as any) as any;
  }
  
  if (options.maxRetries !== undefined) {
    enhancedFn = withRetry(enhancedFn, options.maxRetries);
  }
  
  if (options.cacheTtl !== undefined) {
    enhancedFn = withCache(enhancedFn, options.cacheTtl);
  }
  
  if (options.timingLabel) {
    enhancedFn = withTiming(enhancedFn, options.timingLabel);
  }
  
  return enhancedFn;
}

