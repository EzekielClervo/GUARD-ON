import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { activateProfileGuard } from "@/lib/facebook-api";

interface GuardFormProps {
  token: string;
  id: string;
  accountId?: number;
  onSuccess?: () => void;
}

export function GuardForm({ token, id, accountId, onSuccess }: GuardFormProps) {
  const { toast } = useToast();
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activateGuardMutation = useMutation({
    mutationFn: async () => {
      return await activateProfileGuard(token, id, accountId);
    },
    onSuccess: () => {
      setIsActivated(true);
      setError(null);
      toast({
        title: "Success!",
        description: "Profile Guard has been activated successfully",
      });
      if (onSuccess) {
        onSuccess();
      }
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

  const handleActivateGuard = () => {
    setError(null);
    activateGuardMutation.mutate();
  };

  const isPending = activateGuardMutation.isPending;

  if (isActivated) {
    return (
      <div className="p-6 bg-dark-900/80 border border-primary/20 rounded-lg text-center">
        <div className="mb-4 inline-block p-3 bg-green-500/20 rounded-full">
          <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Profile Guard Activated!</h3>
        <p className="text-gray-400 mb-4">
          Your Facebook profile picture is now protected from unauthorized downloads and misuse.
        </p>
        <div className="p-4 rounded-lg bg-dark-800 mb-4">
          <ul className="text-sm text-left space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-gray-300">Your profile picture is now protected from unauthorized copying</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-gray-300">Users cannot download or share your profile photo</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-gray-300">Your profile is now highlighted with a special shield icon</span>
            </li>
          </ul>
        </div>
        <Button 
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium"
          onClick={() => window.location.reload()}
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-dark-900/80 border border-primary/20 rounded-lg">
      <div className="text-center mb-6">
        <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
          <Shield size={24} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-white">Activate Profile Guard</h3>
        <p className="text-gray-400 text-sm mt-2">
          Protect your Facebook profile picture from unauthorized downloads
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-dark-800 p-4 rounded-lg mb-6">
        <h4 className="text-white text-sm font-medium mb-2">What is Profile Guard?</h4>
        <p className="text-gray-400 text-sm">
          Profile Guard is a Facebook security feature that prevents others from downloading 
          or misusing your profile picture. When activated, your profile will show a blue shield 
          icon and others cannot copy your profile photo.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-dark-800 p-3">
          <div className="flex items-center text-xs text-gray-300">
            <div className="font-semibold w-20 text-primary">Facebook ID:</div>
            <div className="ml-2">{id}</div>
          </div>
          <div className="flex items-center text-xs text-gray-300 mt-2">
            <div className="font-semibold w-20 text-primary">Token Status:</div>
            <div className="ml-2">
              <span className="inline-block bg-green-500/20 text-green-500 rounded-full px-2 py-0.5">
                Valid
              </span>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-primary hover:bg-primary/90 text-black font-medium"
          onClick={handleActivateGuard}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Activating Guard...
            </>
          ) : (
            "Activate Profile Guard"
          )}
        </Button>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>
          This process is completely secure and follows Facebook's official methods
          for activating profile protection.
        </p>
      </div>
    </div>
  );
}