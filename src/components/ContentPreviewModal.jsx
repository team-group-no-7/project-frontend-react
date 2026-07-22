import React from "react";
import { X, Star, BookOpen, CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ContentPreviewModal Component (Module 2 - Item 8: Detailed Content View & Preview Page)
 * Developed by: Team Member (CDAC PGCP-AC Project)
 * 
 * Simple beginner modal showing resource details, preview text, and purchase option.
 */
export default function ContentPreviewModal({ item, onClose, isPurchased = false, onBuyNow }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-xl space-y-4 p-6">
        
        {/* Header: Title & Close Button */}
        <div className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <div>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded">
              {item.category_name}
            </span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              {item.title}
            </h2>
            <p className="text-xs text-gray-500">
              Published by <strong className="text-gray-700 dark:text-gray-300">{item.creator_name}</strong>
            </p>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Description */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.description}
          </p>

          {/* Sample Preview Text */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 space-y-1">
            <p className="text-[11px] font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-indigo-600" /> Sample Preview Snippet:
            </p>
            <p className="text-xs italic text-gray-600 dark:text-gray-400 leading-normal">
              "{item.preview_text || "Includes comprehensive code examples, setup steps, and interview questions."}"
            </p>
          </div>
        </div>

        {/* Footer: Price & Purchase Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-[11px] text-gray-500">Price</p>
            <p className="text-base font-extrabold text-gray-900 dark:text-white">
              {isPurchased ? "Owned" : item.price === 0 ? "FREE" : `₹${item.price}`}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-xs">
              Close
            </Button>

            {isPurchased ? (
              <Button size="sm" className="bg-emerald-600 text-white text-xs gap-1.5 cursor-default">
                <CheckCircle className="h-4 w-4" /> Unlocked in Library
              </Button>
            ) : (
              <Button size="sm" onClick={onBuyNow} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5">
                <ShoppingBag className="h-4 w-4" /> {item.price === 0 ? "Get Free Access" : "Buy & Unlock"}
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
