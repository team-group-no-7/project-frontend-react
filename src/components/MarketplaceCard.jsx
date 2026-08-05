import React from "react";
import { Star, Users, Eye, CheckCircle, Flame, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * MarketplaceCard Component
 * Beginner-friendly card component for displaying individual notes/courses.
 * Developed for CDAC PGCP-AC Final Project.
 */
export default function MarketplaceCard({
  item,
  onPreview,
  onOpenCreatorProfile,
  isPurchased = false
}) {
  return (
    <div 
      onClick={() => onPreview && onPreview(item)}
      className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Top Header: Category, Trending/Featured badges & Price */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded">
              {item.category_name}
            </span>
            {item.is_trending && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                <Flame className="h-3 w-3" /> Trending
              </span>
            )}
          </div>
          {isPurchased ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              <CheckCircle className="h-3 w-3" /> Owned
            </span>
          ) : (
            <span className="text-sm font-extrabold text-gray-900 dark:text-white">
              {item.price === 0 ? "FREE" : `₹${item.price}`}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors line-clamp-2">
          {item.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {item.description}
        </p>

        {/* Creator Name & Avatar */}
        <div
          onClick={(e) => {
            e.stopPropagation(); // Prevents card click from triggering
            onOpenCreatorProfile && onOpenCreatorProfile(item.creator_id);
          }}
          className="flex items-center gap-2 pt-1 text-xs text-gray-500 hover:text-indigo-600 cursor-pointer w-fit"
        >
          {item.creator_avatar && (
            <img
              src={item.creator_avatar}
              alt={item.creator_name}
              className="w-5 h-5 rounded-full object-cover border border-gray-200"
            />
          )}
          <span>By <strong className="font-semibold text-gray-700 dark:text-gray-300">{item.creator_name}</strong></span>
        </div>
      </div>

      {/* Footer: Rating, Learners, Details Button */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400" /> {item.rating}
          </span>
          <span className="flex items-center gap-1 text-gray-500 font-medium" title="Enrolled Learners">
            <Users className="h-3.5 w-3.5 text-indigo-500" /> {(item.learners_count || item.learnersCount || 0).toLocaleString()} enrolled
          </span>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="gap-1 text-xs border-indigo-600 text-indigo-600 hover:bg-indigo-50 cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5" /> View Details
        </Button>
      </div>

    </div>
  );
}
