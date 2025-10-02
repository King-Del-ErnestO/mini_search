// Interface Segregation Principle - separate interfaces for different responsibilities
import { SearchResponse } from '@/types';

export interface ISearchService {
  search(query: string): Promise<SearchResponse>;
}

export interface ICacheService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl?: number): void;
  clear(): void;
}

export interface IHttpService {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
}

export interface ILoggerService {
  info(message: string, ...args: unknown[]): void;
  error(message: string, error?: Error): void;
  warn(message: string, ...args: unknown[]): void;
}
