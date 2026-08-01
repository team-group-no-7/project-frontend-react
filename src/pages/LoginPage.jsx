import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import api from "@/utils/api";

/**
 * LoginPage Component (Module 1 - Item 2: Login Page)
 * Standard form for Email & Password authentication.
 * Managed cleanly using React Router DOM useNavigate.
 */
export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("arjun.mehta@learnhub.com");
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

    // Call real Spring Boot JWT login API
    api.post("/api/auth/login", { email, password })
      .then((res) => {
        setIsLoading(false);
        const user = res.data.data;
        localStorage.setItem("learnhub_token", user.token);
        localStorage.setItem("learnhub_user", JSON.stringify(user));
        if (onLoginSuccess) {
          onLoginSuccess(user);
        } else {
          navigate(user.role === 'ADMIN' ? '/admin' : (user.role === 'CREATOR' ? '/creator/dashboard' : '/learner/dashboard'));
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMsg(err.response?.data?.message || "Invalid email or password.");
      });
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your purchased library & doubt sessions"
      errorMsg={errorMsg}
      footerText="Don't have a LearnHub account?"
      footerLink="Register Here"
      onFooterClick={() => navigate('/register')}
    >
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

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl shadow-md gap-2 mt-2"
        >
          {isLoading ? "Signing In..." : "Sign In to Account"} <ArrowRight className="h-4 w-4" />
        </Button>

      </form>
    </AuthLayout>
  );
}
