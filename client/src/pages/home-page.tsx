import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { TokenForm } from "@/components/tool/token-form";
import { GuardForm } from "@/components/tool/guard-form";
import { AccountsList } from "@/components/tool/accounts-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, KeyRound, LogOut, Settings, User, Database } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const [tokenData, setTokenData] = useState<{ token: string; id: string; accountId: number } | null>(null);
  const [activeTab, setActiveTab] = useState("token");

  const handleTokenGenerated = (token: string, id: string, accountId: number) => {
    setTokenData({ token, id, accountId });
    setActiveTab("guard");
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Header */}
      <header className="bg-dark-900/60 backdrop-blur-md border-b border-primary/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-xl font-bold text-white">
              <span className="text-primary">FB</span>GUARD
            </h1>
          </div>
          
          <div className="flex items-center">
            {user && (
              <div className="flex items-center mr-4">
                <div className="bg-primary/10 text-primary rounded-full p-1">
                  <User className="h-4 w-4" />
                </div>
                <span className="ml-2 text-white text-sm hidden sm:inline-block">
                  {user.username}
                  {user.isAdmin && (
                    <span className="ml-1 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </span>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-dark-800"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline-block">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs
          defaultValue="token"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-white">
                Profile Guard <span className="text-primary">Protection</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Secure your Facebook profile in just a few steps
              </p>
            </div>
            
            <TabsList className="grid grid-cols-3 bg-dark-800 border border-gray-800">
              <TabsTrigger
                value="token"
                className="data-[state=active]:bg-primary data-[state=active]:text-black"
              >
                <KeyRound className="h-4 w-4 mr-2" />
                <span>Token & ID</span>
              </TabsTrigger>
              <TabsTrigger
                value="guard"
                className="data-[state=active]:bg-primary data-[state=active]:text-black"
                disabled={!tokenData}
              >
                <Shield className="h-4 w-4 mr-2" />
                <span>Guard</span>
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-primary data-[state=active]:text-black"
                disabled={!user?.isAdmin}
              >
                <Settings className="h-4 w-4 mr-2" />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="token" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TokenForm 
                  onTokenGenerated={handleTokenGenerated} 
                  tokenData={tokenData}
                />
              </div>
              <div className="bg-dark-900/80 border border-primary/20 backdrop-blur-md rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
                    <KeyRound size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Why we need a token?</h3>
                </div>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <p>
                    A Facebook access token allows our system to securely communicate with Facebook
                    on your behalf to activate the Profile Guard feature.
                  </p>
                  <p>
                    The token is temporary and has limited permissions—only what's necessary
                    to activate your profile's protection.
                  </p>
                  <p>
                    Your credentials are securely encrypted and are only used once to generate
                    this access token. We never store your plaintext password.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guard" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {tokenData ? (
                  <GuardForm 
                    token={tokenData.token} 
                    id={tokenData.id} 
                    accountId={tokenData.accountId}
                  />
                ) : (
                  <div className="p-6 bg-dark-900/80 border border-primary/20 rounded-lg text-center">
                    <p className="text-gray-400">
                      Please generate a token first to activate Profile Guard.
                    </p>
                  </div>
                )}
              </div>
              <div className="bg-dark-900/80 border border-primary/20 backdrop-blur-md rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">About Profile Guard</h3>
                </div>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <p>
                    <strong className="text-primary">What it does:</strong> Facebook Profile Guard adds a protective layer to your profile picture, preventing others from downloading, sharing, or misusing it.
                  </p>
                  <p>
                    <strong className="text-primary">How it works:</strong> When activated, your profile picture will display a shield icon, and the download/share options will be disabled for others.
                  </p>
                  <p>
                    <strong className="text-primary">Benefits:</strong> Protect your identity, prevent impersonation, and keep control over how your profile picture is used online.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-0">
            {user?.isAdmin ? (
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-dark-900/80 border border-primary/20 backdrop-blur-md rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-4">
                    <Database className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold text-white">Admin Dashboard</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    View and manage all Facebook accounts in the system
                  </p>
                </div>
                
                <AccountsList />
              </div>
            ) : (
              <div className="p-6 bg-dark-900/80 border border-primary/20 rounded-lg text-center">
                <p className="text-gray-400">
                  This section is only available to administrators.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-dark-900/60 backdrop-blur-md border-t border-primary/20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © 2025 FBGuard | All rights reserved
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-primary text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-primary text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}