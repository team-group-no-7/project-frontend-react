import React from "react";
import { AlertCircle, BookOpen } from "lucide-react";
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from "@/components/ui/card";

/**
 * AuthLayout — Shared wrapper for LoginPage and RegisterPage.
 * Provides the card shell, landing page matching blue gradient header, open book logo, error banner, and footer link.
 * 
 * Props:
 *  - title        : Heading text inside the gradient header
 *  - subtitle     : Sub-heading below the title
 *  - errorMsg     : Validation error string (shown in red banner)
 *  - footerText   : Text before the navigation link
 *  - footerLink   : Clickable link text
 *  - onFooterClick: Handler for the footer link
 *  - children     : The form fields rendered inside CardContent
 */
export default function AuthLayout({
  title,
  subtitle,
  errorMsg,
  footerText,
  footerLink,
  onFooterClick,
  children
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <Card className="w-full max-w-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl rounded-2xl overflow-hidden">

        {/* Gradient Header — matching LandingPage blue theme */}
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white shadow-sm mb-1">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-indigo-200">LearnHub</div>
          <CardTitle className="text-2xl font-extrabold tracking-tight">{title}</CardTitle>
          <CardDescription className="text-indigo-100 text-xs">{subtitle}</CardDescription>
        </CardHeader>

        {/* Form Content */}
        <CardContent className="p-6 space-y-4">
          {/* Shared Error Banner */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {children}
        </CardContent>

        {/* Footer navigation link */}
        <CardFooter className="bg-gray-50 dark:bg-black/20 p-4 border-t border-gray-100 dark:border-gray-800 text-center justify-center text-xs text-gray-500">
          {footerText}{" "}
          <button
            onClick={onFooterClick}
            className="text-indigo-600 dark:text-indigo-400 font-bold ml-1 hover:underline cursor-pointer"
          >
            {footerLink}
          </button>
        </CardFooter>

      </Card>
    </div>
  );
}
