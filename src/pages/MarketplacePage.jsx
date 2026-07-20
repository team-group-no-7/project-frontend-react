import React, { useState } from "react";
import { Search, SlidersHorizontal, BookOpen, Sparkles, Filter, AlertCircle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import UI sub-components & mock database catalog
import MarketplaceCard from "@/components/MarketplaceCard";
import ContentPreviewModal from "@/components/ContentPreviewModal";
import { MARKETPLACE_CONTENTS, CATEGORIES, PURCHASED_CONTENTS } from "@/data/mockData";

/**
 * MarketplacePage Component (Module 2: Content Marketplace & Discovery)
 * High-performance, beginner-friendly catalog grid page.
 */
export default function MarketplacePage({ onNavigateToProfile }) {
  // State 1: Search query input
  const [searchQuery, setSearchQuery] = useState("");

  // State 2: Active Category Filter (0 = All Categories)
  const [selectedCategory, setSelectedCategory] = useState(0);

  // State 3: Sorting preference ("popular", "price-low", "price-high", "rating")
  const [sortBy, setSortBy] = useState("popular");

  // State 4: Selected item for Preview Modal
  const [previewItem, setPreviewItem] = useState(null);

  // State 5: Purchase notification message banner
  const [purchaseNotification, setPurchaseNotification] = useState("");

  // Helper: Get array of content IDs already purchased by current user
  const purchasedContentIds = PURCHASED_CONTENTS.map(p => p.content_id);

  // Filter & Sort Logic (Easy to explain in viva!)
  const filteredContents = MARKETPLACE_CONTENTS
    // Step A: Category filter
    .filter((item) => {
      if (selectedCategory === 0) return true; // All categories
      return item.category_id === selectedCategory;
    })
    // Step B: Search keyword filter (case-insensitive)
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.creator_name.toLowerCase().includes(query) ||
        item.category_name.toLowerCase().includes(query)
      );
    })
    // Step C: Sorting array
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.learners_count - a.learners_count; // "popular" default
    });

  // Simulated purchase action
  const handleBuyContent = (item) => {
    setPreviewItem(null); // Close modal
    setPurchaseNotification(`Successfully unlocked "${item.title}"! It has been added to your Library.`);
    
    // Auto hide notification after 5 seconds
    setTimeout(() => {
      setPurchaseNotification("");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] text-[#1A1A2E] dark:text-[#f3f4f6]">
      
      {/* Hero Header Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white py-12 px-6 shadow-md">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200 border border-white/10">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Module 2: Content Marketplace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Discover Verified Learning Resources
          </h1>
          <p className="text-indigo-200 max-w-2xl text-sm sm:text-base leading-relaxed">
            Browse notes, code walkthroughs, cheat sheets, and course guides created by top tech creators.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Purchase Notification Banner */}
        {purchaseNotification && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
              <span>{purchaseNotification}</span>
            </div>
            {onNavigateToProfile && (
              <Button size="sm" onClick={onNavigateToProfile} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                View My Library
              </Button>
            )}
          </div>
        )}

        {/* Search Bar & Controls Row */}
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Real-time Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search Java, React, DSA, System Design..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50/50 dark:bg-black/20 border-gray-200 dark:border-gray-800 text-sm focus-visible:ring-indigo-500"
            />
          </div>

          {/* Sort Dropdown & Item Count */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
            <span className="text-xs text-gray-500 font-medium">
              Showing <strong className="text-gray-900 dark:text-white">{filteredContents.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills / Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="h-3.5 w-3.5" /> Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-white dark:bg-[#121124] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-indigo-400 hover:text-indigo-600"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Content Cards Grid */}
        {filteredContents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContents.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                onPreview={(selected) => setPreviewItem(selected)}
                isPurchased={purchasedContentIds.includes(item.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty State when search returns 0 results */
          <div className="text-center py-16 px-4 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-3">
            <div className="inline-flex p-3 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-500">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Content Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              We couldn't find any resources matching "{searchQuery}". Try searching for another topic or resetting filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(0);
              }}
              className="text-xs border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              Reset Filters
            </Button>
          </div>
        )}

      </main>

      {/* Content Preview Drawer / Modal */}
      <ContentPreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
        onBuy={handleBuyContent}
        isPurchased={previewItem ? purchasedContentIds.includes(previewItem.id) : false}
      />
    </div>
  );
}
