import React from "react";
import { 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  ShoppingBag, 
  Users, 
  Zap, 
  PenSquare, 
  UploadCloud, 
  Wallet,
  Star,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CREATORS, MARKETPLACE_CONTENTS } from "../data/mockData";

// Steps Data for "How It Works"
const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: "Create Content",
    description: "Prepare technical notes, Spring Boot guides, DSA sheets, or system templates.",
    icon: PenSquare,
    bg: "bg-indigo-50 text-indigo-600",
  },
  {
    id: 2,
    title: "Publish Resources",
    description: "Upload resources with dynamic pricing and make them instantly available.",
    icon: UploadCloud,
    bg: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 3,
    title: "Earn Rewards",
    description: "Receive payouts on every sale, grow your followers, and build your technical brand.",
    icon: Wallet,
    bg: "bg-amber-50 text-amber-600",
  },
];

// Testimonials Data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Computer Science Student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    review: "This platform completely changed how I study. The DSA sheets and microservice templates are incredibly structured and easy to grasp.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    review: "Publishing my system design mock templates here gives me a steady stream of passive income while helping junior devs prepare.",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "MCA Student",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    review: "Found exactly what I needed for my final semester microservices prep. The direct access to authors for doubts is a game-changer.",
  },
];

/**
 * LandingPage Component (Module 1: Landing / Onboarding Welcome Page)
 * Displays unauthenticated brand pitch with premium Tailwind styling.
 * Integrates all modular sections from the landing-page branch cleanly.
 * Consumes real data from central mockData.js.
 */
export default function LandingPage({ onExplore, onLogin, onRegister }) {
  // Take first 5 featured / trending resources from mock data for showcase
  const featuredResources = MARKETPLACE_CONTENTS.slice(0, 5);

  // Take top creators from mock data
  const topCreators = CREATORS.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      
      {/* Navigation Header */}
      <header className="bg-white/85 backdrop-blur-md border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">LearnHub</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onLogin} className="text-xs font-bold text-slate-600 hover:text-indigo-600 transition cursor-pointer">
              Log In
            </Button>
            <Button onClick={onRegister} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs cursor-pointer">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1">

        {/* Hero Section */}
        <section className="py-20 px-6 bg-radial from-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Learner-Focused Technical Marketplace
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Learn Faster with Curated <br />
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">Notes, Guides & Code</span>
            </h1>

            <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
              Connect with verified top-tier creators. Browse high-quality Spring Boot notes, DSA cheat sheets, System Design handbooks, and book live 1:1 doubt mentorship.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button
                onClick={onExplore}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-5 rounded-xl shadow-md shadow-indigo-100 gap-2 transition cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" /> Browse Catalog
              </Button>
              <Button
                variant="outline"
                onClick={onRegister}
                className="w-full sm:w-auto border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs px-6 py-5 rounded-xl gap-1.5 transition cursor-pointer"
              >
                Get Started Free <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400 pt-8 border-t border-slate-100 max-w-md mx-auto">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Verified Notes</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-500" /> Instant Access</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-indigo-500" /> 1:1 Live Doubts</span>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-6 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-lg mx-auto mb-12">
              <h2 className="text-2xl font-black text-slate-900">Explore Top Categories</h2>
              <p className="text-xs text-slate-400 mt-1">Structured learning resources filtered by topics.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { title: "Notes", icon: "📘", count: "2,300+ resources" },
                { title: "Articles", icon: "📄", count: "1,200+ articles" },
                { title: "Projects", icon: "💻", count: "1,800+ templates" },
                { title: "Study Guides", icon: "📚", count: "2,500+ documents" },
                { title: "Interview Prep", icon: "🎯", count: "900+ cheat sheets" }
              ].map(cat => (
                <div key={cat.title} onClick={onExplore} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center hover:shadow-md hover:border-slate-200 transition cursor-pointer group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition duration-300">{cat.icon}</div>
                  <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{cat.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-1">{cat.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources Section */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex items-end justify-between border-b border-slate-200/60 pb-5">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Featured Study Materials</h2>
                <p className="text-xs text-slate-400 mt-1">Highest rated references, interview templates, and codes.</p>
              </div>
              <button onClick={onExplore} className="hidden sm:flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition cursor-pointer">
                View All Catalog <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {featuredResources.map((item) => (
                <div key={item.id} onClick={onExplore} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition cursor-pointer space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
                      {item.category_name}
                    </span>
                    <h3 className="font-bold text-xs text-slate-800 line-clamp-2 min-h-[32px]">{item.title}</h3>
                    <p className="text-[10px] text-slate-400 line-clamp-3 leading-relaxed">{item.description}</p>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="font-extrabold text-slate-900">₹{item.price}</span>
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star size={11} fill="currentColor" /> {item.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Creators Section */}
        <section className="py-20 px-6 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center max-w-lg mx-auto">
              <h2 className="text-2xl font-black text-slate-900">Learn From Top Technical Authors</h2>
              <p className="text-xs text-slate-400 mt-1">Verified industry leaders, software engineers, and domain experts.</p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 justify-center">
              {topCreators.map((creator) => (
                <div key={creator.id} onClick={onExplore} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center flex flex-col items-center space-y-3 hover:shadow-md transition cursor-pointer">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                  />
                  <div>
                    <h3 className="font-bold text-xs text-slate-950">{creator.name}</h3>
                    <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-wider mt-0.5">{creator.joinedDate ? "Pro Mentor" : "@author"}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">{creator.headline}</p>
                  </div>
                  
                  <div className="pt-2 flex items-center justify-center gap-3 text-[10px] font-bold text-slate-500">
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star size={11} fill="currentColor" /> {creator.rating}
                    </span>
                    <span>•</span>
                    <span>{creator.followersCount} followers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-lg mx-auto">
              <h2 className="text-2xl font-black text-slate-900">How LearnHub Works</h2>
              <p className="text-xs text-slate-400 mt-1">Earn from your tech expertise or fast-track your prep.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {HOW_IT_WORKS_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4 hover:shadow-xs transition">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.bg}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-lg mx-auto">
              <h2 className="text-2xl font-black text-slate-900">Loved By Learners & Creators</h2>
              <p className="text-xs text-slate-400 mt-1">Join thousands of students building their careers on LearnHub.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((item) => (
                <div key={item.id} className="bg-slate-50 border border-slate-100/80 p-6 rounded-2xl space-y-4 flex flex-col justify-between hover:shadow-xs transition">
                  <p className="text-xs text-slate-500 italic leading-relaxed">"{item.review}"</p>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                      <p className="text-[10px] text-slate-400">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-8 py-14 text-center text-white shadow-xl shadow-indigo-100">
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
              <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl"></div>

              <div className="relative z-10 mx-auto max-w-2xl space-y-6">
                <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold backdrop-blur-xs uppercase tracking-wider">
                  🚀 Join LearnHub Today
                </span>

                <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                  Start Your Learning Journey
                </h2>

                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  Discover top tier tech notes, guides, and source templates, or share your knowledge and turn it into earnings.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <button onClick={onRegister} className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-indigo-600 shadow-md hover:bg-slate-50 transition cursor-pointer">
                    Get Started Now
                  </button>
                  <button onClick={onExplore} className="flex items-center justify-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer">
                    Explore Catalog <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="bg-slate-950 text-slate-400">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            
            {/* Brand */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <BookOpen className="h-4.5 w-4.5" />
                </div>
                <span className="font-extrabold text-lg text-white">LearnHub</span>
              </div>
              <p className="text-xs max-w-sm leading-relaxed">
                LearnHub is a community-driven knowledge marketplace where developers share notes, cheat sheets, and source templates, and earn from their technical expertise.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3 pt-2">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-indigo-600 flex items-center justify-center text-white transition">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-indigo-600 flex items-center justify-center text-white transition">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-indigo-600 flex items-center justify-center text-white transition">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="https://learnhub.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-indigo-600 flex items-center justify-center text-white transition">
                  <Globe size={14} />
                </a>
              </div>
            </div>

            {/* Platform links */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={onExplore} className="hover:text-white transition cursor-pointer">Browse Catalog</button></li>
                <li><button onClick={onLogin} className="hover:text-white transition cursor-pointer">Creator Dashboard</button></li>
                <li><button onClick={onRegister} className="hover:text-white transition cursor-pointer">Register Free</button></li>
              </ul>
            </div>

            {/* Project info */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Project Scope</h4>
              <p className="text-xs leading-relaxed text-slate-500">
                CDAC Final Project. Designed for streamlined user acceptance testing, mock billing integrations, and virtual doubt calls.
              </p>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 LearnHub. Built for CDAC Final Project. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
