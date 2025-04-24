import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Facebook, KeyRound, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createFbAccount, TokenResponse } from "@/lib/facebook-api";

const formSchema = z.object({
  email: z.string().email("Please enter a valid Facebook email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface TokenFormProps {
  onTokenGenerated: (token: string, id: string, accountId: number) => void;
  tokenData: { token: string; id: string; accountId: number } | null;
}

export function TokenForm({ 
  onTokenGenerated, 
  tokenData 
}: TokenFormProps) {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  // Create account mutation
  const createAccountMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await createFbAccount(data.email, data.password);
    },
    onSuccess: (data) => {
      if (data.token && data.fbId) {
        onTokenGenerated(data.token, data.fbId, data.id);
        toast({
          title: "Success!",
          description: "Token generated successfully",
        });
      } else {
        toast({
          title: "Account saved",
          description: "Your account was saved but we couldn't generate a token automatically. Try again in a moment.",
          variant: "destructive",
        });
      }
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setError(null);
    createAccountMutation.mutate(values);
  };

  const isPending = createAccountMutation.isPending;

  if (tokenData) {
    return (
      <div className="p-6 bg-dark-900/80 border border-primary/20 rounded-lg text-center">
        <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
          <KeyRound size={24} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Token Generated!</h3>
        <p className="text-gray-400 mb-4">
          Your access token has been successfully generated. You can now activate Profile Guard.
        </p>
        <div className="bg-dark-800 p-3 rounded text-xs text-gray-300 mb-4 overflow-x-auto">
          <div className="font-bold text-primary">Token:</div>
          <div className="truncate">{tokenData.token.substring(0, 20)}...{tokenData.token.substring(tokenData.token.length - 8)}</div>
          <div className="font-bold text-primary mt-2">Facebook ID:</div>
          <div>{tokenData.id}</div>
        </div>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-black font-medium"
          onClick={() => {
            form.reset();
            onTokenGenerated(tokenData.token, tokenData.id, tokenData.accountId);
          }}
        >
          Continue to Activate Guard <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-dark-900/80 border border-primary/20 rounded-lg">
      <div className="text-center mb-6">
        <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
          <Facebook size={24} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-white">Enter Facebook Credentials</h3>
        <p className="text-gray-400 text-sm mt-2">
          To generate an access token, we need your Facebook login details
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-400">
                  Facebook Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Facebook email"
                    className="bg-dark-800 border-gray-700 text-white"
                    {...field}
                  />
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
                <FormLabel className="text-sm font-medium text-gray-400">
                  Facebook Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Facebook password"
                    className="bg-dark-800 border-gray-700 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-black font-medium"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Token...
              </>
            ) : (
              "Generate Token"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>
          Your credentials are securely used to generate an access token and are stored encrypted.
          We never share your information with third parties.
        </p>
      </div>
    </div>
  );
}