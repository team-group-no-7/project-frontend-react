import React from "react";
import { Sparkles, BookOpen, ShieldCheck, ArrowRight, ShoppingBag, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * LandingPage Component (Module 1 - Item 1: Public Landing / Welcome Page)
 * Unauthenticated entry point highlighting platform value proposition & CTA buttons.
 * Styled with clean Tailwind CSS for a simplistic, freshman-friendly look.
 */
export default function LandingPage({ onExplore, onLogin, onRegister }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">LearnHub</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onLogin} className="text-xs font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer">
              Log In
            </Button>
            <Button onClick={onRegister} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Learner-Focused Content Platform
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Learn Faster with Curated <br />
            <span className="text-indigo-600">Notes, Guides & Code</span>
          </h1>

          <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            LearnHub connects learners with verified creators. Browse our marketplace for Spring Boot notes, DSA cheat sheets, and LLD templates.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              onClick={onExplore}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-5 rounded-lg shadow-sm gap-2 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" /> Browse Catalog
            </Button>
            <Button
              variant="outline"
              onClick={onRegister}
              className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs px-6 py-5 rounded-lg gap-1.5 cursor-pointer"
            >
              Get Started Free <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400 pt-8 border-t border-slate-100 max-w-md mx-auto">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Verified Notes</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-500" /> Instant Access</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-indigo-500" /> 1:1 Live Doubts</span>
          </div>

        </div>

        {/* Feature Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16">
          
          <div className="bg-white border border-slate-100 p-6 rounded-xl space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <h3 className="font-bold text-sm text-slate-800">Knowledge Marketplace</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find Spring Boot notes, DSA roadmaps, and System Design templates published by expert creators.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-xl space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="h-4.5 w-4.5" />
            </div>
            <h3 className="font-bold text-sm text-slate-800">Content Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you an expert? Create drafts, publish study documents, and earn money directly on every purchase.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-xl space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="h-4.5 w-4.5" />
            </div>
            <h3 className="font-bold text-sm text-slate-800">1:1 Doubt Mentorship</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Book live video slots with verified mentors and resolve technical blockers in real-time.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        © 2026 LearnHub Inc. Built for CDAC Final Project.
      </footer>

    </div>
  );
}
