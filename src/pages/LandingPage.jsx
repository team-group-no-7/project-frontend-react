import React from "react";
import { Sparkles, BookOpen, ShieldCheck, ArrowRight, ShoppingBag, Users, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * LandingPage Component (Module 1 - Item 1: Public Landing / Welcome Page)
 * Unauthenticated entry point highlighting platform value proposition & CTA buttons.
 * 
 * Props:
 *  - onExplore: Function to open marketplace catalog
 *  - onLogin: Function to open login page
 *  - onRegister: Function to open registration page
 */
export default function LandingPage({ onExplore, onLogin, onRegister }) {
  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] text-[#1A1A2E] dark:text-[#f3f4f6]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 text-white py-20 px-6">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200 border border-white/10 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-300" /> Learner-Focused Content Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Learn Faster with Verified <br />
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
              Notes, Guides & Code
            </span>
          </h1>

          <p className="text-indigo-200 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal">
            LearnHub bridges tech learners with expert creators. Unlock curated Java, DSA, Web Dev, and System Design resources with instant Razorpay checkout.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={onExplore}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm px-8 py-6 rounded-xl shadow-lg gap-2"
            >
              <ShoppingBag className="h-5 w-5" /> Explore Marketplace Catalog
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={onRegister}
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-bold text-sm px-8 py-6 rounded-xl gap-2"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-indigo-300 pt-6 border-t border-white/10 max-w-xl mx-auto">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Verified Tech Notes</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-400" /> Instant PDF Delivery</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-indigo-400" /> Live Doubt Sessions</span>
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Everything You Need to Ace Tech Interviews
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            A complete ecosystem for learners & content publishers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Curated Marketplace</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Find Java Spring Boot notes, DSA cheat sheets, and System Design architectural templates.
            </p>
          </div>

          <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <div className="font-bold text-base text-gray-900 dark:text-white">Creator Monetization</div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Publish your PDF notes & code repositories. Earn money directly on every purchase.
            </p>
          </div>

          <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">1-on-1 Doubt Sessions</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Book live video sessions with creators via Jitsi integration to resolve doubts in real-time.
            </p>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Ready to start learning or earning?</h3>
            <p className="text-xs text-indigo-100">Create your free account today in under 30 seconds.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={onLogin} variant="outline" className="border-white text-white hover:bg-white/10 text-xs">
              Log In
            </Button>
            <Button onClick={onRegister} className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold text-xs">
              Sign Up Now
            </Button>
          </div>
        </div>

      </section>
    </div>
  );
}
