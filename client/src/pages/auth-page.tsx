import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Redirect } from "wouter";
import { Facebook, Shield, Lock, UserPlus } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col md:flex-row">
      {/* Auth Form Column */}
      <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Toggle Buttons */}
          <div className="flex rounded-lg overflow-hidden mb-6">
            <Button
              type="button"
              className={`flex-1 py-3 ${
                isLogin
                  ? "bg-primary text-black font-medium"
                  : "bg-dark-800 text-gray-400 hover:bg-dark-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button
              type="button"
              className={`flex-1 py-3 ${
                !isLogin
                  ? "bg-primary text-black font-medium"
                  : "bg-dark-800 text-gray-400 hover:bg-dark-700"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </Button>
          </div>

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>

      {/* Hero Column */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary/20 to-dark-900 p-6 flex items-center justify-center hidden md:flex">
        <div className="max-w-md text-center">
          <div className="mb-6 inline-block p-4 bg-primary/10 rounded-full">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Protect Your <span className="text-primary">Facebook</span> Profile
          </h1>
          <p className="text-gray-300 mb-8">
            Activate Facebook Profile Guard to prevent others from downloading, 
            sharing, or misusing your profile picture.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-dark-900/60 p-4 rounded-lg border border-primary/20">
              <Facebook className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium text-white">Secure Profile</h3>
              <p className="text-sm text-gray-400">
                Prevent unauthorized use of your profile picture
              </p>
            </div>
            <div className="bg-dark-900/60 p-4 rounded-lg border border-primary/20">
              <Lock className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium text-white">Easy Setup</h3>
              <p className="text-sm text-gray-400">
                Activate protection with just a few clicks
              </p>
            </div>
            <div className="bg-dark-900/60 p-4 rounded-lg border border-primary/20">
              <UserPlus className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium text-white">Free Service</h3>
              <p className="text-sm text-gray-400">
                Protect your profile at no cost
              </p>
            </div>
            <div className="bg-dark-900/60 p-4 rounded-lg border border-primary/20">
              <Shield className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium text-white">Always On</h3>
              <p className="text-sm text-gray-400">
                Continuous protection for your profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}