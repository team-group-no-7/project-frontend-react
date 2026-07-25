import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";

/**
 * RegisterPage Component (Module 1: Registration Page)
 * Simple signup form. New accounts default to LEARNER role.
 *
 * Props:
 *  - onRegisterSuccess : Called with new user object on successful registration
 *  - onNavigateToLogin : Switches view to Login page
 */
export default function RegisterPage({ onRegisterSuccess, onNavigateToLogin }) {
  const [name, setName]                     = useState("");
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg]             = useState("");
  const [isLoading, setIsLoading]           = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim())                          { setErrorMsg("Please enter your full name."); return; }
    if (!email.trim() || !email.includes("@")) { setErrorMsg("Please enter a valid email address."); return; }
    if (!password || password.length < 6)      { setErrorMsg("Password must be at least 6 characters long."); return; }
    if (password !== confirmPassword)          { setErrorMsg("Passwords do not match."); return; }

    setIsLoading(true);

    // Simulate Spring Boot registration response
    setTimeout(() => {
      setIsLoading(false);
      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        role: "LEARNER", // Default role — backend assigns on registration
        token: "jwt_mock_token_" + Date.now()
      };
      localStorage.setItem("learnhub_token", newUser.token);
      localStorage.setItem("learnhub_user", JSON.stringify(newUser));
      onRegisterSuccess(newUser);
    }, 800);
  };

  // Reusable field config — same icon+label+input pattern for every field
  const fields = [
    { id: "r-name",  label: "Full Name *",        icon: User, type: "text",     placeholder: "Enter your full name",   value: name,            onChange: setName },
    { id: "r-email", label: "Email Address *",    icon: Mail, type: "email",    placeholder: "Enter your email",       value: email,           onChange: setEmail },
    { id: "r-pass",  label: "Password *",         icon: Lock, type: "password", placeholder: "Create a password",      value: password,        onChange: setPassword },
    { id: "r-cpass", label: "Confirm Password *", icon: Lock, type: "password", placeholder: "Confirm your password",  value: confirmPassword, onChange: setConfirmPassword },
  ];

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Fill in the details below to get started on LearnHub"
      errorMsg={errorMsg}
      footerText="Already registered?"
      footerLink="Log In Here"
      onFooterClick={onNavigateToLogin}
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        {fields.map(({ id, label, icon: Icon, type, placeholder, value, onChange }) => (
          <div key={id} className="space-y-1.5">
            <Label htmlFor={id} className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
              {label}
            </Label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-9 bg-gray-50/50 dark:bg-black/20 text-sm"
              />
            </div>
          </div>
        ))}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl shadow-md gap-2 mt-2"
        >
          {isLoading ? "Creating Account..." : "Create Account"} <ArrowRight className="h-4 w-4" />
        </Button>

      </form>
    </AuthLayout>
  );
}
