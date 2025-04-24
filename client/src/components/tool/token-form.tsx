import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { TokenResult } from '@/components/tool/token-result';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { apiRequest } from '@/lib/queryClient';

interface TokenFormProps {
  onTokenGenerated: (token: string, id: string) => void;
  tokenData: { token: string; id: string } | null;
  onActivateGuard: () => void;
}

const formSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional()
});

export function TokenForm({ onTokenGenerated, tokenData, onActivateGuard }: TokenFormProps) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await apiRequest('POST', '/api/fb/token', {
        email: values.email,
        password: values.password
      });
      
      const data = await response.json();
      
      if (data.token && data.id) {
        onTokenGenerated(data.token, data.id);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate token",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="bg-dark-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Generate Token & ID</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-400">Email or Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input 
                        type="text"
                        placeholder="Enter email or phone number"
                        className="pl-10 pr-3 py-2.5 bg-dark-800 border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-400">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 py-2.5 bg-dark-800 border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary"
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button 
                          type="button" 
                          className="text-gray-500 hover:text-gray-400 focus:outline-none"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between pt-2">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      className="h-4 w-4 rounded bg-dark-800 border-gray-700 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-400">
                      Remember this session
                    </Label>
                  </div>
                )}
              />
              
              <a href="#" className="text-sm text-primary hover:text-primary/80">
                Need help?
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-dark-900 font-medium"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-dark-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </div>
              ) : (
                <span className="flex items-center">
                  Generate Token
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </Form>
      </div>
      
      {tokenData && (
        <div className="mt-6">
          <TokenResult 
            token={tokenData.token} 
            id={tokenData.id} 
            onActivateGuard={onActivateGuard}
          />
        </div>
      )}
    </div>
  );
}
