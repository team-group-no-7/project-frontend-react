import React, { useState } from "react";
import { User, Mail, Lock, UserCheck, ArrowRight, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

/**
 * RegisterPage Component (Module 1 - Item 3: Registration Page)
 * Account registration form with role selection (Learner vs Creator) & validation.
 * 
 * Props:
 *  - onRegisterSuccess: Function called when user registers successfully
 *  - onNavigateToLogin: Function to switch to Login page
 */
export default function RegisterPage({ onRegisterSuccess, onNavigateToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("LEARNER"); // "LEARNER" vs "CREATOR"
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

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        role: role,
        token: "jwt_mock_token_" + Date.now()
      };
      localStorage.setItem("learnhub_token", newUser.token);
      onRegisterSuccess(newUser);
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
          <CardTitle className="text-2xl font-extrabold tracking-tight">Create Account</CardTitle>
          <CardDescription className="text-indigo-200 text-xs">
            Join LearnHub as a Learner to study or a Creator to publish content
          </CardDescription>
        </CardHeader>

        {/* Form */}
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
              <Label htmlFor="r-name" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="r-name"
                  placeholder="Arjun Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9 bg-gray-50/50 dark:bg-black/20 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="r-email" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="r-email"
                  type="email"
                  placeholder="arjun@learnhub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-gray-50/50 dark:bg-black/20 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="r-pass" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="r-pass"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 bg-gray-50/50 dark:bg-black/20 text-sm"
                />
              </div>
            </div>

            {/* Role Selection Toggle */}
            <div className="space-y-2 pt-1">
              <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                Select Primary Account Role *
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("LEARNER")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    role === "LEARNER"
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold"
                      : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <div className="text-xs font-bold">Learner</div>
                  <div className="text-[10px] text-gray-500 font-normal">Buy & study notes</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("CREATOR")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    role === "CREATOR"
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold"
                      : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <div className="text-xs font-bold">Creator</div>
                  <div className="text-[10px] text-gray-500 font-normal">Publish & earn</div>
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl shadow-md gap-2 mt-3"
            >
              {isLoading ? "Creating Account..." : "Complete Registration"} <ArrowRight className="h-4 w-4" />
            </Button>

          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="bg-gray-50 dark:bg-black/20 p-4 border-t border-gray-100 dark:border-gray-800 text-center justify-center text-xs text-gray-500">
          Already registered?{" "}
          <button
            onClick={onNavigateToLogin}
            className="text-indigo-600 dark:text-indigo-400 font-bold ml-1 hover:underline"
          >
            Sign In Here
          </button>
        </CardFooter>

      </Card>
    </div>
  );
}
