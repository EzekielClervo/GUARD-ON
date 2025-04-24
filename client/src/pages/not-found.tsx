import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-dark-900 to-dark-800">
      <Card className="w-full max-w-md mx-4 border-primary/30 bg-dark-800/60 backdrop-blur-md">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-100">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Button asChild className="w-full">
            <Link href="/">
              Return to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
