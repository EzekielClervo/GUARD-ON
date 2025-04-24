import React from "react";
import Navbar from "@/components/layout/navbar";
import FeatureCard from "@/components/layout/feature-card";
import { StepsList } from "@/components/tool/steps-list";
import { TokenForm } from "@/components/tool/token-form";
import { GuardForm } from "@/components/tool/guard-form";
import { FaqAccordion } from "@/components/tool/faq-accordion";
import Footer from "@/components/layout/footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { KeyRound, ShieldCheck, UserSearch } from "lucide-react";

export default function Home() {
  const [activeOption, setActiveOption] = React.useState<'token' | 'guard' | 'advanced'>('token');
  const [tokenData, setTokenData] = React.useState<{ token: string; id: string } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const { toast } = useToast();

  const handleTokenGenerated = (token: string, id: string) => {
    setTokenData({ token, id });
    toast({
      title: "Success!",
      description: "Token and ID have been generated successfully.",
      duration: 3000,
    });
  };

  const handleActivateGuard = async () => {
    if (!tokenData) {
      toast({
        title: "Error",
        description: "Please generate a token and ID first",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would call the API to activate the guard
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800 text-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/30 blur-3xl -top-60 -left-20"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary-500/20 blur-3xl top-40 right-20"></div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <div className="text-xs text-primary-300 font-semibold uppercase tracking-wider mb-3">
                Enhanced Security Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Protect Your Facebook Profile With Advanced <span className="text-primary">Guard</span>
              </h1>
              <p className="text-gray-400 mb-8 text-lg">
                Secure your profile picture and personal information with our easy-to-use tool designed to enhance your Facebook privacy settings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="bg-primary hover:bg-primary/90 text-dark-900 font-medium px-6 py-3 rounded-lg transition duration-300 shadow-[0_4px_14px_0_rgba(15,108,142,0.3)]"
                  onClick={() => {
                    document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                </button>
                <button className="border border-gray-600 hover:border-primary text-gray-300 hover:text-primary px-6 py-3 rounded-lg transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="rounded-xl shadow-lg overflow-hidden h-64 md:h-80 bg-gradient-to-r from-primary/20 to-secondary-500/20">
                <div className="w-full h-full flex items-center justify-center">
                  <ShieldCheck className="w-24 h-24 text-primary/60" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-dark-800 p-4 rounded-lg border border-primary/30 shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ShieldCheck className="text-primary h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold">Security Status</div>
                    <div className="text-xs text-primary">Protected Profile</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FeatureCard 
            icon={<KeyRound className="text-xl text-primary" />}
            title="Token Generator"
            description="Securely generate Facebook access tokens for protected profile management."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-xl text-primary" />}
            title="Profile Guard"
            description="Activate Facebook's advanced profile picture protection with just a few clicks."
          />
          <FeatureCard 
            icon={<UserSearch className="text-xl text-primary" />}
            title="ID Finder"
            description="Quickly retrieve your Facebook ID for enhanced security configuration."
          />
        </div>

        {/* Main Tool Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-16" id="tools-section">
          {/* Left Column - Tool Information */}
          <div className="md:w-1/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">How It Works</h2>
            <StepsList />
            
            <div className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <div className="flex items-start">
                <div className="text-primary mr-3 mt-1">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
                <p className="text-sm text-gray-300">
                  Your credentials are never stored on our servers. All operations run locally on your device for maximum security.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Tools Interface */}
          <div className="md:w-2/3">
            <div className="bg-dark-800/60 backdrop-blur-md rounded-xl border border-primary/30 overflow-hidden">
              <div className="border-b border-gray-800">
                <Tabs defaultValue="tools" className="w-full">
                  <TabsList>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="p-6">
                {/* Tool Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Select Operation</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Option Card - Token & ID */}
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer relative ${activeOption === 'token' ? 'border-primary bg-primary/10' : 'border-gray-800 bg-dark-800'}`}
                      onClick={() => setActiveOption('token')}
                    >
                      <div className="flex items-center justify-between">
                        <label className="font-medium cursor-pointer">Token & ID</label>
                        <div className={`w-4 h-4 rounded-full ${activeOption === 'token' ? 'bg-primary flex items-center justify-center' : 'border-2 border-gray-600'}`}>
                          {activeOption === 'token' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Generate token and retrieve Facebook ID</p>
                    </div>
                    
                    {/* Option Card - Profile Guard */}
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer relative ${activeOption === 'guard' ? 'border-primary bg-primary/10' : 'border-gray-800 bg-dark-800'}`}
                      onClick={() => setActiveOption('guard')}
                    >
                      <div className="flex items-center justify-between">
                        <label className="font-medium cursor-pointer">Profile Guard</label>
                        <div className={`w-4 h-4 rounded-full ${activeOption === 'guard' ? 'bg-primary flex items-center justify-center' : 'border-2 border-gray-600'}`}>
                          {activeOption === 'guard' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Activate Facebook profile picture protection</p>
                    </div>
                    
                    {/* Option Card - Advanced */}
                    <div 
                      className={`border-2 rounded-lg p-4 cursor-pointer relative ${activeOption === 'advanced' ? 'border-primary bg-primary/10' : 'border-gray-800 bg-dark-800'}`}
                      onClick={() => setActiveOption('advanced')}
                    >
                      <div className="flex items-center justify-between">
                        <label className="font-medium cursor-pointer">Advanced</label>
                        <div className={`w-4 h-4 rounded-full ${activeOption === 'advanced' ? 'bg-primary flex items-center justify-center' : 'border-2 border-gray-600'}`}>
                          {activeOption === 'advanced' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Advanced security configuration options</p>
                    </div>
                  </div>
                </div>
                
                {/* Active Form */}
                {activeOption === 'token' && (
                  <TokenForm onTokenGenerated={handleTokenGenerated} tokenData={tokenData} onActivateGuard={handleActivateGuard} />
                )}
                
                {activeOption === 'guard' && (
                  <GuardForm onActivateGuard={handleActivateGuard} />
                )}
                
                {activeOption === 'advanced' && (
                  <div className="bg-dark-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Advanced Configuration</h3>
                    <p className="text-gray-400 mb-4">This feature is coming soon.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
            <div className="bg-dark-800 rounded-xl border border-primary/30 shadow-[0_10px_25px_-5px_rgba(15,108,142,0.5)] p-6 w-full max-w-md m-4 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      className="checkmark" 
                      d="M5 13l4 4L19 7" 
                      stroke="#15aacf" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 100,
                        strokeDashoffset: 0,
                        animation: "checkmark 1s ease-in-out forwards"
                      }}
                    />
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Profile Guard Activated!</h3>
                <p className="text-gray-400 mb-6">Your Facebook profile picture is now protected with enhanced security settings.</p>
                
                <div className="flex w-full space-x-3">
                  <button 
                    className="flex-1 bg-primary hover:bg-primary/90 text-dark-900 font-medium py-2.5 rounded-lg transition" 
                    onClick={handleCloseModal}
                  >
                    Done
                  </button>
                  <button 
                    className="flex-1 border border-gray-700 hover:border-gray-600 text-gray-300 py-2.5 rounded-lg transition"
                    onClick={handleCloseModal}
                  >
                    View Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* FAQ Section */}
        <div className="py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
