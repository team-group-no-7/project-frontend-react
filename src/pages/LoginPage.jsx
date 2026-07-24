import React, { useState } from "react";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * LoginPage Component (Module 1 - Item 2: Login Page)
 * Standard form for Email & Password authentication.
 * 
 * Props:
 *  - onLoginSuccess: Function called when user logs in successfully
 *  - onNavigateToRegister: Function to switch to Registration page
 */
export default function LoginPage({ onLoginSuccess, onNavigateToRegister }) {
  const [email, setEmail] = useState("arjun.mehta@learnhub.com");
  const [password, setPassword] = useState("password123");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    // Simulate API Auth token response
    setTimeout(() => {
      setIsLoading(false);
      const resolvedRole = email.toLowerCase() === "admin@learnhub.com" ? "ADMIN" : "LEARNER";
      const mockUser = {
        id: 101,
        name: email.split("@")[0].replace(".", " ").toUpperCase(),
        email: email,
        role: resolvedRole,
        token: "jwt_mock_token_8a9f02341"
      };
      // Save token and user details to localStorage for persistence
      localStorage.setItem("learnhub_token", mockUser.token);
      localStorage.setItem("learnhub_user", JSON.stringify(mockUser));
      onLoginSuccess(mockUser);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF] dark:bg-[#0b0a14] px-4 py-12">
      <Card className="w-full max-w-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-xl rounded-2xl overflow-hidden">
        
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6 text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-bold text-2xl tracking-wider mb-1">
            LH
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-indigo-200 text-xs">
            Sign in to access your purchased library & doubt sessions
          </CardDescription>
        </CardHeader>

        {/* Form Content */}
        <CardContent className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="l-email" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="l-email"
                  type="email"
                  placeholder="name@learnhub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-gray-50/50 dark:bg-black/20 text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="l-pass" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="l-pass"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 bg-gray-50/50 dark:bg-black/20 text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl shadow-md gap-2 mt-2"
            >
              {isLoading ? "Signing In..." : "Sign In to Account"} <ArrowRight className="h-4 w-4" />
            </Button>

          </form>
        </CardContent>

        {/* Footer Link to Register */}
        <CardFooter className="bg-gray-50 dark:bg-black/20 p-4 border-t border-gray-100 dark:border-gray-800 text-center justify-center text-xs text-gray-500">
          Don't have a LearnHub account?{" "}
          <button
            onClick={onNavigateToRegister}
            className="text-indigo-600 dark:text-indigo-400 font-bold ml-1 hover:underline"
          >
            Register Here
          </button>
        </CardFooter>

      </Card>
    </div>
  );
}
