import { ISearchService, IHttpService, ICacheService, ILoggerService } from '../interfaces';
import { SearchResponse } from '@/types';

export class SearchService implements ISearchService {
  constructor(
    private httpService: IHttpService,
    private cacheService: ICacheService,
    private logger: ILoggerService
  ) {}

  async search(query: string): Promise<SearchResponse> {
    const cacheKey = `search:${query}`;
    
    // Check cache first
    const cached = this.cacheService.get<SearchResponse>(cacheKey);
    if (cached) {
      this.logger.info('Cache hit for search query:', query);
      return cached;
    }

    this.logger.info('Cache miss, fetching fresh data for:', query);
    
    try {
      // Make API request
      const response = await this.httpService.get<SearchResponse>(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      
      // Cache the result
      this.cacheService.set(cacheKey, response, 60000); // 1 minute cache
      
      return response;
    } catch (error) {
      this.logger.error('Search API error:', error as Error);
      throw error;
    }
  }
}
