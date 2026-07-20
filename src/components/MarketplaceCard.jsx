import React from "react";
import { Star, Users, Eye, ShoppingBag, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * MarketplaceCard Component
 * Beginner-Friendly Card representation of a single learning resource.
 * 
 * Props:
 *  - item: The content object from CONTENTS database table
 *  - onPreview: Function called when clicking "Preview"
 *  - isPurchased: Boolean indicating if current learner already owns this item
 */
export default function MarketplaceCard({ item, onPreview, isPurchased = false }) {
  // Helper to pick dynamic badge color based on Category
  const getCategoryColor = (categoryId) => {
    switch (categoryId) {
      case 1: // Java
        return "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900";
      case 2: // DSA
        return "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900";
      case 3: // Web Dev
        return "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-900";
      case 4: // System Design
        return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900";
      default: // SQL & DB / Others
        return "bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900";
    }
  };

  return (
    <Card className="flex flex-col justify-between h-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden group">
      <div>
        {/* Card Header: Category Badge & Type */}
        <CardHeader className="pb-3 pt-5 px-5">
          <div className="flex justify-between items-center gap-2 mb-2">
            <Badge variant="outline" className={`font-semibold text-xs px-2.5 py-0.5 rounded-md ${getCategoryColor(item.category_id)}`}>
              {item.category_name}
            </Badge>
            <span className="text-[11px] font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
              {item.type}
            </span>
          </div>

          {/* Title */}
          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {item.title}
          </CardTitle>
          
          {/* Creator Name */}
          <p className="text-xs text-gray-500 mt-1">
            By <span className="font-semibold text-gray-700 dark:text-gray-300">{item.creator_name}</span>
          </p>
        </CardHeader>

        {/* Card Content: Short Description & Ratings */}
        <CardContent className="px-5 py-2 space-y-3">
          <CardDescription className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {item.description}
          </CardDescription>

          {/* Ratings & Learner Count */}
          <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-500" />
              <span>{item.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-gray-400" />
              <span>{item.learners_count.toLocaleString()} learners</span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Card Footer: Price & Action Buttons */}
      <CardFooter className="px-5 py-4 bg-gray-50/60 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-3 mt-4">
        {/* Price Tag */}
        <div>
          {isPurchased ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md">
              <CheckCircle className="h-3.5 w-3.5" /> Owned
            </span>
          ) : item.price === 0 ? (
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-gray-400">Price:</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">₹{item.price}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPreview(item)}
            className="gap-1 text-xs border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </Button>

          {!isPurchased && (
            <Button
              size="sm"
              className="gap-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm"
              onClick={() => onPreview(item)}
            >
              <ShoppingBag className="h-3.5 w-3.5" /> {item.price === 0 ? "Get Free" : "Buy Now"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
