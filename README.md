# Mini Search + Cache - Enterprise Architecture Demo

A professionally architected Next.js application demonstrating enterprise-grade patterns, scalable architecture, and modern development best practices. This project showcases how to build maintainable, reusable, and scalable React applications following SOLID principles and industry standards.

## 🏗️ Architecture Overview

This application has been completely refactored to address enterprise-level requirements:

### ✅ SOLID Principles Implementation

- **Single Responsibility Principle**: Each class and function has one clear purpose
- **Open/Closed Principle**: Components are open for extension, closed for modification
- **Liskov Substitution Principle**: Interfaces can be substituted without breaking functionality
- **Interface Segregation Principle**: Separate interfaces for different responsibilities
- **Dependency Inversion Principle**: High-level modules don't depend on low-level modules

### ✅ Modern Architecture Patterns

- **Dependency Injection Container**: Centralized service management
- **Service Layer Architecture**: Clear separation of business logic
- **Repository Pattern**: Abstracted data access layer
- **Factory Pattern**: Consistent object creation
- **Observer Pattern**: State management with Zustand

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **UI Library**: Shadcn/UI with Radix primitives
- **State Management**: Zustand with devtools
- **Styling**: Tailwind CSS with CSS variables
- **Icons**: Lucide React
- **Build Tool**: Turbopack for fast development

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/
│   ├── ui/                # Reusable UI components (Shadcn/UI)
│   ├── search/            # Feature-specific components
│   └── common/            # Shared components (ErrorBoundary)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and HOFs
├── services/
│   ├── interfaces/        # Service contracts (ISP)
│   ├── implementations/   # Concrete service implementations
│   └── ServiceContainer.ts # Dependency injection container
├── stores/                # Zustand state management
└── types/                 # TypeScript type definitions
```

## 🎯 Key Features Demonstrated

### 1. **Reusable UI Components**
- Built with Shadcn/UI for consistency
- Proper component composition
- Accessible by default
- Themeable with CSS variables

### 2. **State Management**
- Zustand for predictable state updates
- Typed actions and selectors
- DevTools integration
- Separation of concerns

### 3. **Service Layer Architecture**
- Interface-based design
- Dependency injection
- Testable and mockable services
- Clear separation of concerns

### 4. **Error Handling**
- Error boundaries for graceful failures
- Proper error propagation
- User-friendly error messages
- Logging and monitoring ready

### 5. **Performance Optimizations**
- Caching with configurable TTL
- Request deduplication
- Loading states and skeletons
- Optimized re-renders

### 6. **Developer Experience**
- Full TypeScript coverage
- ESLint configuration
- Hot module replacement
- Clear component APIs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mini-search-cache

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Architecture Patterns Explained

### Dependency Injection Container

```typescript
// Services are registered with their dependencies
container.register<ISearchService>('search', () => 
  new SearchService(
    container.get<IHttpService>('http'),
    container.get<ICacheService>('cache'),
    container.get<ILoggerService>('logger')
  )
);
```

### Service Interfaces (Interface Segregation)

```typescript
export interface ISearchService {
  search(query: string): Promise<SearchResponse>;
}

export interface ICacheService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl?: number): void;
}
```

### Higher-Order Functions (Open/Closed Principle)

```typescript
// Extensible enhancement system
export function withRequestEnhancements<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  options: EnhancementOptions = {}
) {
  // Apply enhancements without modifying original function
}
```

### Custom Hooks (Single Responsibility)

```typescript
export const useSearch = () => {
  // Encapsulates all search-related logic
  // Reusable across components
  // Testable in isolation
};
```

## 📊 Performance Features

- **Caching**: Intelligent caching with TTL
- **Retry Logic**: Configurable retry with exponential backoff
- **Loading States**: Skeleton components for better UX
- **Error Boundaries**: Graceful error handling
- **Code Splitting**: Automatic route-based splitting

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive**: Mobile-first design
- **Accessible**: WCAG compliant components
- **Dark Mode Ready**: CSS variable-based theming
- **Loading States**: Skeleton components and spinners
- **Error States**: User-friendly error messages

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=development
```

### Customization
- Modify `src/app/globals.css` for theme customization
- Update `src/services/ServiceContainer.ts` for service configuration
- Extend `src/types/index.ts` for additional type definitions

## 📈 Scalability Considerations

1. **Modular Architecture**: Easy to add new features
2. **Service Layer**: Business logic separated from UI
3. **Type Safety**: Prevents runtime errors
4. **Testing Ready**: Mockable dependencies
5. **Performance**: Optimized for large datasets
6. **Maintainability**: Clear code organization

## 🤝 Contributing

This project demonstrates enterprise-level patterns. When contributing:

1. Follow SOLID principles
2. Add proper TypeScript types
3. Write reusable components
4. Include error handling
5. Update documentation

## 📝 License

This project is for demonstration purposes and showcases modern React/Next.js architecture patterns.

---

**Built with ❤️ to demonstrate enterprise-grade React architecture**