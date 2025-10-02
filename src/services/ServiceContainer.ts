// Dependency Injection Container following Dependency Inversion Principle
import { 
  ISearchService, 
  IHttpService, 
  ICacheService, 
  ILoggerService 
} from './interfaces';
import { SearchService } from './implementations/SearchService';
import { HttpService } from './implementations/HttpService';
import { CacheService } from './implementations/CacheService';
import { LoggerService } from './implementations/LoggerService';

class ServiceContainer {
  private services = new Map<string, () => unknown>();

  register<T>(key: string, factory: () => T): void {
    this.services.set(key, factory);
  }

  get<T>(key: string): T {
    const factory = this.services.get(key);
    if (!factory) {
      throw new Error(`Service ${key} not registered`);
    }
    return factory() as T;
  }
}

// Create and configure the container
const container = new ServiceContainer();

// Register services with their dependencies
container.register<ILoggerService>('logger', () => new LoggerService());
container.register<ICacheService>('cache', () => new CacheService());
container.register<IHttpService>('http', () => new HttpService());
container.register<ISearchService>('search', () => 
  new SearchService(
    container.get<IHttpService>('http'),
    container.get<ICacheService>('cache'),
    container.get<ILoggerService>('logger')
  )
);

export { container };
