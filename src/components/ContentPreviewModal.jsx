import React from "react";
import { X, Star, BookOpen, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * ContentPreviewModal Component
 * Beginner-Friendly modal dialog that previews a course/note resource before buying.
 * 
 * Props:
 *  - item: The selected content object (or null if modal is closed)
 *  - onClose: Callback to close the modal
 *  - onBuy: Callback to trigger checkout/buy logic
 *  - isPurchased: Boolean indicating if current user already owns it
 */
export default function ContentPreviewModal({ item, onClose, onBuy, isPurchased = false }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400">
                {item.category_name}
              </Badge>
              <span className="text-xs font-semibold text-gray-500">{item.type}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{item.title}</h3>
            <p className="text-xs text-gray-500 mt-1">Published by <strong className="text-gray-700 dark:text-gray-300">{item.creator_name}</strong></p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1">About This Content</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl text-center">
            <div>
              <div className="flex justify-center items-center gap-1 text-amber-500 font-bold text-base">
                <Star className="h-4 w-4 fill-amber-400 stroke-amber-500" /> {item.rating} / 5.0
              </div>
              <div className="text-[11px] text-gray-500">Learner Rating</div>
            </div>
            <div>
              <div className="text-base font-bold text-gray-900 dark:text-white">{item.learners_count.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500">Enrolled Students</div>
            </div>
          </div>

          {/* Partial Content Preview Snippet */}
          <div className="border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/40 dark:bg-indigo-950/20 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <BookOpen className="h-4 w-4" /> Sample Content Preview
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 italic font-mono bg-white dark:bg-black/30 p-3 rounded-md border border-indigo-100 dark:border-indigo-900/40">
              "{item.preview_text}"
            </p>
            {!isPurchased && (
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-1">
                <Lock className="h-3 w-3 text-amber-500" />
                <span>Full document unlocks immediately upon payment via Razorpay.</span>
              </div>
            )}
          </div>

          {/* Key Highlights */}
          <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Instant lifetime digital access to full PDF/Notes
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Directly downloadable to your "My Library" dashboard
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-500" /> Verified creator content
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-400 block">Total Price</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {item.price === 0 ? "FREE" : `₹${item.price}`}
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose} className="text-xs">
              Close
            </Button>
            
            {isPurchased ? (
              <Button disabled className="bg-emerald-600 text-white text-xs gap-1">
                <CheckCircle2 className="h-4 w-4" /> Already in Library
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
