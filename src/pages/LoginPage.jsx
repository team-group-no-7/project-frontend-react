import React, { useState } from "react";
import { Lock, Mail, ArrowRight, AlertCircle, KeyRound, CheckCircle2, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * LoginPage Component (Module 1 - Item 2: Authentication Page with Forgot Password)
 * Handles Email/Password authentication & Password Recovery Modal flow.
 */
export default function LoginPage({ onLoginSuccess, onNavigateToRegister }) {
  const [email, setEmail] = useState("arjun.mehta@learnhub.com");
  const [password, setPassword] = useState("password123");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password Modal States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetStep, setResetStep] = useState(1); // 1: Send OTP, 2: Enter OTP & New Password, 3: Success
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  // Handle Standard Login
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
      const mockUser = {
        id: 101,
        name: email.split("@")[0].replace(".", " ").toUpperCase(),
        email: email,
        role: "LEARNER",
        token: "jwt_mock_token_8a9f02341"
      };
      localStorage.setItem("learnhub_token", mockUser.token);
      onLoginSuccess(mockUser);
    }, 800);
  };

  // Handle Forgot Password OTP Send
  const handleSendOTP = (e) => {
    e.preventDefault();
    setResetMsg("");
    if (!forgotEmail || !forgotEmail.includes("@")) {
      setResetMsg("Please enter your registered email address.");
      return;
    }
    setResetStep(2);
  };

  // Handle Reset Password Submit
  const handleResetPassword = (e) => {
    e.preventDefault();
    setResetMsg("");

    if (!otp || otp.length < 4) {
      setResetMsg("Please enter a valid 4-digit verification code.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setResetMsg("New password must be at least 6 characters.");
      return;
    }

    // Step 3: Success
    setResetStep(3);
  };

  // Reset modal state when closing
  const handleCloseForgotModal = () => {
    setShowForgotModal(false);
    setResetStep(1);
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setResetMsg("");
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

            {/* Password Field & Forgot Password Link */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="l-pass" className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Forgot password?
                </button>
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

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-4">
            
            {/* Close Button */}
            <button
              onClick={handleCloseForgotModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                  Reset Password
                </h3>
                <p className="text-xs text-gray-500">
                  Recover access to your LearnHub account
                </p>
              </div>
            </div>

            {resetMsg && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{resetMsg}</span>
              </div>
            )}

            {/* Step 1: Send Verification Email */}
            {resetStep === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                    Your Registered Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="arjun.mehta@learnhub.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="text-sm"
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 text-white font-bold text-sm">
                  Send Reset Verification Code
                </Button>
              </form>
            )}

            {/* Step 2: Enter OTP & New Password */}
            {resetStep === 2 && (
              <form onSubmit={handleResetPassword} className="space-y-4 pt-2">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-200">
                  ✓ Verification code sent to {forgotEmail}! (Enter 1234 to test)
                </p>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                    4-Digit Verification Code (OTP)
                  </Label>
                  <Input
                    type="text"
                    maxLength={4}
                    placeholder="1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-sm font-mono tracking-widest text-center"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                    New Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="text-sm"
                  />
                </div>

                <Button type="submit" className="w-full bg-indigo-600 text-white font-bold text-sm">
                  Update Password
                </Button>
              </form>
            )}

            {/* Step 3: Success Confirmation */}
            {resetStep === 3 && (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-base text-gray-900 dark:text-white">
                  Password Updated Successfully!
                </h4>
                <p className="text-xs text-gray-500">
                  You can now sign in using your new credentials.
                </p>
                <Button
                  onClick={handleCloseForgotModal}
                  className="w-full bg-indigo-600 text-white font-bold text-sm"
                >
                  Back to Sign In
                </Button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
