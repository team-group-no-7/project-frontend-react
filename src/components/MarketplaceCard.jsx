import React from "react";
import { Star, Users, Eye, ShoppingBag, CheckCircle, Heart, Sparkles, Flame, Tag, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * MarketplaceCard Component
 * Modern, responsive card component supporting both Grid and List view layouts.
 * 
 * Props:
 *  - item: Content object
 *  - onPreview: Function when previewing
 *  - isPurchased: Boolean if learner owns the resource
 *  - isBookmarked: Boolean if learner saved to wishlist
 *  - onToggleBookmark: Function to toggle bookmark status
 *  - viewMode: "grid" | "list"
 */
export default function MarketplaceCard({
  item,
  onPreview,
  isPurchased = false,
  isBookmarked = false,
  onToggleBookmark,
  viewMode = "grid"
}) {
  const getCategoryColor = (categoryId) => {
    switch (categoryId) {
      case 1: return "bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-900/50";
      case 2: return "bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900/50";
      case 3: return "bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-900/50";
      case 4: return "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/50";
      case 5: return "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900/50";
      default: return "bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:border-indigo-900/50";
    }
  };

  // --- List View Layout ---
  if (viewMode === "list") {
    return (
      <Card className="border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#121124] hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all rounded-xl overflow-hidden group">
        <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Main Info */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={`font-semibold text-[11px] px-2 py-0.5 rounded-md ${getCategoryColor(item.category_id)}`}>
                {item.category_name}
              </Badge>
              
              {item.featured && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                  <Sparkles className="h-3 w-3 text-amber-500" /> Featured
                </span>
              )}

              {item.is_trending && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-300 dark:border-rose-800">
                  <Flame className="h-3 w-3 text-rose-500" /> Trending
                </span>
              )}

              <span className="text-[11px] font-medium text-gray-500 bg-gray-100 dark:bg-gray-800/80 px-2 py-0.5 rounded">
                {item.type}
              </span>
              <span className="text-[11px] font-medium text-gray-400">
                • {item.level || "All Levels"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <h3
                onClick={() => onPreview(item)}
                className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer leading-snug"
              >
                {item.title}
              </h3>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed max-w-3xl">
              {item.description}
            </p>

            {/* Creator & Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
              <div className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
                {item.creator_avatar && (
                  <img src={item.creator_avatar} alt={item.creator_name} className="w-5 h-5 rounded-full object-cover border border-gray-200" />
                )}
                <span>By {item.creator_name}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-500" />
                <span>{item.rating} ({item.reviews_count || 50}+)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Users className="h-3.5 w-3.5" />
                <span>{item.learners_count.toLocaleString()} learners</span>
              </div>
            </div>
          </div>

          {/* Price & Action Column */}
          <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800 gap-3 shrink-0">
            <div className="text-left md:text-right">
              {isPurchased ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                  <CheckCircle className="h-3.5 w-3.5" /> Owned
                </span>
              ) : item.price === 0 ? (
                <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">FREE</span>
              ) : (
                <span className="text-xl font-extrabold text-gray-900 dark:text-white">₹{item.price}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onToggleBookmark && onToggleBookmark(item.id)}
                className={`p-2 h-8 w-8 rounded-lg border border-gray-200 dark:border-gray-800 ${
                  isBookmarked ? "text-rose-500 bg-rose-50 dark:bg-rose-950/30 border-rose-200" : "text-gray-400 hover:text-rose-500"
                }`}
                title={isBookmarked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-4 w-4 ${isBookmarked ? "fill-rose-500" : ""}`} />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => onPreview(item)}
                className="gap-1 text-xs border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Eye className="h-3.5 w-3.5" /> Details
              </Button>

              {!isPurchased && (
                <Button
                  size="sm"
                  className="gap-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-xs"
                  onClick={() => onPreview(item)}
                >
                  <ShoppingBag className="h-3.5 w-3.5" /> {item.price === 0 ? "Get Free" : "Unlock"}
                </Button>
              )}
            </div>
          </div>

        </div>
      </Card>
    );
  }

  // --- Grid View Layout (Default) ---
  return (
    <Card className="flex flex-col justify-between h-full border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#121124] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl overflow-hidden group relative">
      
      {/* Top Banner Ribbon Badges */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark && onToggleBookmark(item.id);
          }}
          className={`p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 shadow-sm ${
            isBookmarked
              ? "bg-rose-500 text-white"
              : "bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-rose-500 border border-gray-200 dark:border-gray-700"
          }`}
          title={isBookmarked ? "Saved to Wishlist" : "Save to Wishlist"}
        >
          <Heart className={`h-3.5 w-3.5 ${isBookmarked ? "fill-white" : ""}`} />
        </button>
      </div>

      <div>
        {/* Card Header: Category Badge & Type */}
        <CardHeader className="pb-3 pt-5 px-5 space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 pr-8">
            <Badge variant="outline" className={`font-semibold text-[11px] px-2 py-0.5 rounded-md ${getCategoryColor(item.category_id)}`}>
              {item.category_name}
            </Badge>

            {item.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                <Sparkles className="h-3 w-3 text-amber-500" /> Featured
              </span>
            )}

            {item.is_trending && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-300 dark:border-rose-800">
                <Flame className="h-3 w-3 text-rose-500" /> Trending
              </span>
            )}
          </div>

          {/* Title */}
          <CardTitle
            onClick={() => onPreview(item)}
            className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer leading-snug pt-1"
          >
            {item.title}
          </CardTitle>
          
          {/* Creator Info */}
          <div className="flex items-center gap-2 pt-0.5">
            {item.creator_avatar && (
              <img src={item.creator_avatar} alt={item.creator_name} className="w-5 h-5 rounded-full object-cover border border-gray-200" />
            )}
            <p className="text-xs text-gray-500">
              By <span className="font-semibold text-gray-700 dark:text-gray-300">{item.creator_name}</span>
            </p>
          </div>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="px-5 py-2 space-y-3">
          <CardDescription className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {item.description}
          </CardDescription>

          {/* Tags preview */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {item.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Ratings & Learner Count */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800/60">
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-500" />
              <span>{item.rating}</span>
              <span className="text-gray-400 font-normal">({item.reviews_count || 45})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="h-3.5 w-3.5" />
              <span>{item.learners_count.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Card Footer: Price & Action Buttons */}
      <CardFooter className="px-5 py-3.5 bg-gray-50/70 dark:bg-black/30 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2 mt-3">
        {/* Price Tag */}
        <div>
          {isPurchased ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md">
              <CheckCircle className="h-3.5 w-3.5" /> Owned
            </span>
          ) : item.price === 0 ? (
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">FREE</span>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-[11px] text-gray-400">Price:</span>
              <span className="text-base font-extrabold text-gray-900 dark:text-white">₹{item.price}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPreview(item)}
            className="gap-1 text-xs px-2.5 h-8 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </Button>

          {!isPurchased && (
            <Button
              size="sm"
              className="gap-1 text-xs px-3 h-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-xs"
              onClick={() => onPreview(item)}
            >
              <ShoppingBag className="h-3.5 w-3.5" /> {item.price === 0 ? "Get" : "Buy"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

