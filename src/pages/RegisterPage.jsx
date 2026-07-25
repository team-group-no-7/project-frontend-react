import React, { useState } from "react";
import { User, Mail, Lock, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * RegisterPage Component (Module 1: Registration Page)
 * Simple, beginner-friendly signup form styled with pure Tailwind CSS.
 * 
 * Props:
 *  - onRegisterSuccess: Function called when user registers successfully
 *  - onNavigateToLogin: Function to switch to Login page
 */
export default function RegisterPage({ onRegisterSuccess, onNavigateToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        role: "LEARNER", // default role is LEARNER as decided
        token: "jwt_mock_token_" + Date.now()
      };
      localStorage.setItem("learnhub_token", newUser.token);
      localStorage.setItem("learnhub_user", JSON.stringify(newUser));
      onRegisterSuccess(newUser);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <Card className="w-full max-w-md border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg rounded-2xl overflow-hidden">
        
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 text-center space-y-2">
          <div className="mx-auto w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xl tracking-wider mb-1">
            LH
          </div>
          <CardTitle className="text-xl font-extrabold tracking-tight">Create your account</CardTitle>
          <CardDescription className="text-blue-200 text-xs">
            Fill in the details below to get started.
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
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="r-name" className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="r-name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9 bg-slate-50/50 dark:bg-black/20 text-xs h-9"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label htmlFor="r-email" className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="r-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-slate-50/50 dark:bg-black/20 text-xs h-9"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="r-pass" className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="r-pass"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 bg-slate-50/50 dark:bg-black/20 text-xs h-9"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="r-confirm-pass" className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Confirm Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="r-confirm-pass"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-9 bg-slate-50/50 dark:bg-black/20 text-xs h-9"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg shadow-sm gap-2 mt-2"
            >
              {isLoading ? "Creating Account..." : "Create Account"} <ArrowRight className="h-4 w-4" />
            </Button>

          </form>
        </CardContent>

        {/* Footer Link to Login */}
        <CardFooter className="bg-slate-50 dark:bg-black/20 p-4 border-t border-slate-100 dark:border-slate-800 text-center justify-center text-xs text-slate-500">
          Already registered?{" "}
          <button
            onClick={onNavigateToLogin}
            className="text-blue-600 dark:text-blue-400 font-bold ml-1 hover:underline cursor-pointer"
          >
            Log In Here
          </button>
        </CardFooter>

      </Card>
    </div>
  );
}
