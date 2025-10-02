import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    "SOLID Principles Implementation",
    "Dependency Injection Container", 
    "Zustand State Management",
    "Reusable UI Components (Shadcn/UI)",
    "Custom Hooks & Error Boundaries",
    "Service Layer Architecture",
    "TypeScript with Full Type Safety",
    "Modern React Patterns & Best Practices"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-foreground mb-6">
          Mini Search + Cache
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A professionally architected Next.js application demonstrating enterprise-grade 
          patterns, scalable architecture, and modern development best practices
        </p>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Enterprise Architecture Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/search" className="flex items-center gap-2">
            Try the Search Demo
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>

        <div className="mt-8 text-sm text-muted-foreground space-y-1">
          <p>Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn/UI</p>
          <p>Demonstrates SOLID principles, DRY methodology, and scalable patterns</p>
        </div>
      </div>
    </div>
  );
}