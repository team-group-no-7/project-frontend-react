import React, { useState } from "react";
import { X, Star, BookOpen, Lock, ShieldCheck, CheckCircle2, Heart, Sparkles, UserCheck, Layers, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * ContentPreviewModal Component
 * Rich modal dialog that previews resource overview, sample preview, creator stats, and pricing.
 * 
 * Props:
 *  - item: The selected content object
 *  - onClose: Callback to close modal
 *  - onBuy: Callback to buy/unlock content
 *  - isPurchased: Boolean if learner owns it
 *  - isBookmarked: Boolean if bookmarked
 *  - onToggleBookmark: Callback to toggle bookmark
 */
export default function ContentPreviewModal({
  item,
  onClose,
  onBuy,
  isPurchased = false,
  isBookmarked = false,
  onToggleBookmark
}) {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "preview" | "creator"

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-black/40">
          <div className="space-y-1.5 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 font-semibold">
                {item.category_name}
              </Badge>
              <span className="text-xs font-semibold text-gray-500 bg-gray-200/60 dark:bg-gray-800 px-2 py-0.5 rounded">
                {item.type}
              </span>
              <span className="text-xs font-medium text-gray-400">
                • {item.level || "All Levels"}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{item.title}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              Published by <strong className="text-gray-700 dark:text-gray-300 font-semibold">{item.creator_name}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark && onToggleBookmark(item.id)}
              className={`p-2 rounded-full border transition ${
                isBookmarked
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 hover:text-rose-500"
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Bookmark Resource"}
            >
              <Heart className={`h-4 w-4 ${isBookmarked ? "fill-white" : ""}`} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 dark:border-gray-800 px-6 bg-white dark:bg-[#121124]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <FileText className="h-3.5 w-3.5" /> Overview & Highlights
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" /> Sample Content
          </button>
          <button
            onClick={() => setActiveTab("creator")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "creator"
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" /> Creator Info
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">

          {activeTab === "overview" && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5">Description</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Key Topics Covered</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md font-medium border border-indigo-100 dark:border-indigo-900/40">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl text-center">
                <div>
                  <div className="flex justify-center items-center gap-1 text-amber-500 font-bold text-base">
                    <Star className="h-4 w-4 fill-amber-400 stroke-amber-500" /> {item.rating}
                  </div>
                  <div className="text-[11px] text-gray-500">Learner Rating ({item.reviews_count || 40}+)</div>
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 dark:text-white">{item.learners_count.toLocaleString()}</div>
                  <div className="text-[11px] text-gray-500">Enrolled Learners</div>
                </div>
                <div>
                  <div className="text-base font-bold text-indigo-600 dark:text-indigo-400">{item.level || "All Levels"}</div>
                  <div className="text-[11px] text-gray-500">Target Level</div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Instant lifetime digital access in your "My Library" workspace
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Searchable code snippets & downloadable reference material
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-indigo-500 shrink-0" /> Verified by LearnHub quality moderation team
                </div>
              </div>
            </div>
          )}

          {activeTab === "preview" && (
            <div className="space-y-4">
              <div className="border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/40 dark:bg-indigo-950/20 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="h-4 w-4" /> Sample Content Teaser
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-500 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded">
                    Free Excerpt
                  </span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-200 italic font-mono bg-white dark:bg-black/40 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/40 leading-relaxed shadow-xs">
                  "{item.preview_text}"
                </p>
                {!isPurchased && (
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-1">
                    <Lock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>Complete module document unlocks immediately upon zero-friction checkout.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "creator" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl">
                {item.creator_avatar ? (
                  <img src={item.creator_avatar} alt={item.creator_name} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                    {item.creator_name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">{item.creator_name}</h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Verified Senior Technical Creator</p>
                  <p className="text-xs text-gray-500 mt-1">Specializes in {item.category_name}, System Architecture, and Technical Interviews.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-black/40 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-gray-400 block font-medium">Price</span>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {item.price === 0 ? "FREE" : `₹${item.price}`}
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose} className="text-xs">
              Close
            </Button>
            
            {isPurchased ? (
              <Button disabled className="bg-emerald-600 text-white text-xs gap-1.5 font-semibold">
                <CheckCircle2 className="h-4 w-4" /> Unlocked in Library
              </Button>
            ) : (
              <Button
                onClick={() => onBuy(item)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 shadow-md"
              >
                {item.price === 0 ? "Unlock Free Access" : `Proceed to Pay ₹${item.price}`}
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

