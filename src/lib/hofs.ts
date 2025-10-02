// Higher-Order Functions following SOLID principles and modern patterns

// Interface for retry configuration
export interface RetryConfig {
  maxRetries: number;
  delay: number;
  backoffMultiplier?: number;
}

// Interface for cache configuration  
export interface CacheConfig {
  ttl: number;
  keyGenerator?: (...args: unknown[]) => string;
}

// Interface for timing configuration
export interface TimingConfig {
  label: string;
  logger?: (message: string) => void;
}

// Single Responsibility: Retry functionality
export function withRetry<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  config: RetryConfig = { maxRetries: 3, delay: 1000 }
) {
  return async (...args: T): Promise<R> => {
    let lastError: Error;
    const { maxRetries, delay, backoffMultiplier = 2 } = config;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error as Error;
        if (attempt === maxRetries) break;
        
        // Configurable backoff strategy
        const waitTime = delay * Math.pow(backoffMultiplier, attempt);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    throw lastError!;
  };
}

// Single Responsibility: Base URL handling
export function withBaseUrl(baseUrl: string) {
  return function<T extends unknown[], R>(
    fn: (url: string, ...args: T) => Promise<R>
  ) {
    return async (endpoint: string, ...args: T): Promise<R> => {
      const fullUrl = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
      return fn(fullUrl, ...args);
    };
  };
}

// Single Responsibility: Caching functionality
export function withCache<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  config: CacheConfig = { ttl: 300000 }
) {
  const cache = new Map<string, { data: R; timestamp: number }>();
  const { ttl, keyGenerator = (...args: unknown[]) => JSON.stringify(args) } = config;
  
  return async (...args: T): Promise<R> => {
    const key = keyGenerator(...args);
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

// Single Responsibility: Performance timing
export function withTiming<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  config: TimingConfig = { label: 'Function' }
) {
  const { label, logger = console.log } = config;
  
  return async (...args: T): Promise<R> => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    logger(`${label} took ${(end - start).toFixed(2)}ms`);
    return result;
  };
}

// Open/Closed Principle: Extensible enhancement options
export interface EnhancementOptions {
  baseUrl?: string;
  retry?: RetryConfig;
  cache?: CacheConfig;
  timing?: TimingConfig;
}

// Composed wrapper following Open/Closed principle
export function withRequestEnhancements<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  options: EnhancementOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let enhancedFn: any = fn;
  
  // Apply enhancements in a specific order for predictable behavior
  if (options.baseUrl) {
    enhancedFn = withBaseUrl(options.baseUrl)(enhancedFn);
  }
  
  if (options.retry) {
    enhancedFn = withRetry(enhancedFn, options.retry);
  }
  
  if (options.cache) {
    enhancedFn = withCache(enhancedFn, options.cache);
  }
  
  if (options.timing) {
    enhancedFn = withTiming(enhancedFn, options.timing);
  }
  
  return enhancedFn as (...args: T) => Promise<R>;
}

// Factory function for creating commonly used enhanced functions
export class EnhancementFactory {
  static createApiClient(baseUrl: string, options: Partial<EnhancementOptions> = {}) {
    return withRequestEnhancements(fetch, {
      baseUrl,
      retry: { maxRetries: 2, delay: 1000 },
      cache: { ttl: 60000 },
      timing: { label: 'API Request' },
      ...options
    });
  }
  
  static createCachedFunction<T extends unknown[], R>(
    fn: (...args: T) => Promise<R>,
    cacheTtl: number = 300000
  ) {
    return withCache(fn, { ttl: cacheTtl });
  }
}

