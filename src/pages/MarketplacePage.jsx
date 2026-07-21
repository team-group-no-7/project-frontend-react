import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  BookOpen,
  Sparkles,
  Filter,
  AlertCircle,
  CheckCircle,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Heart,
  TrendingUp,
  Award,
  X,
  RotateCcw,
  Star,
  Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import components & mock database catalog
import MarketplaceCard from "@/components/MarketplaceCard";
import ContentPreviewModal from "@/components/ContentPreviewModal";
import { MARKETPLACE_CONTENTS, CATEGORIES, PURCHASED_CONTENTS } from "@/data/mockData";

/**
 * MarketplacePage Component (Module 2 - Item 4: Marketplace / Explore)
 * High-complexity central discovery page featuring search, multi-filter, pagination, 
 * sorting, featured hero, view toggles, wishlists, and personalized recommendations.
 */
export default function MarketplacePage({ onNavigateToProfile }) {
  // --- Search & Main Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sortBy, setSortBy] = useState("popular"); // "popular" | "rating" | "price-low" | "price-high" | "newest"
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // --- Advanced Multi-Filter Drawer States ---
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [priceFilter, setPriceFilter] = useState("all"); // "all" | "free" | "under300" | "300to600" | "above600"
  const [typeFilter, setTypeFilter] = useState("all"); // "all" | "Notes & Code" | "Cheat Sheet PDF" | "Interactive Guide" | "Free Handbook" | "Video & Notes"
  const [minRatingFilter, setMinRatingFilter] = useState(0); // 0 | 4.5 | 4.8
  const [levelFilter, setLevelFilter] = useState("all"); // "all" | "Beginner" | "Intermediate" | "Advanced"

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // --- Wishlist & Modal States ---
  const [bookmarkedIds, setBookmarkedIds] = useState([12, 51]); // Default saved items
  const [previewItem, setPreviewItem] = useState(null);
  const [notification, setNotification] = useState(null);

  // Helper: Get array of content IDs already purchased by current user
  const purchasedContentIds = PURCHASED_CONTENTS.map(p => p.content_id);

  // Helper: Toggle wishlist item
  const handleToggleBookmark = (id) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(item => item !== id));
      showBanner("Removed from your saved wishlist.");
    } else {
      setBookmarkedIds(prev => [...prev, id]);
      showBanner("Saved resource to your wishlist!");
    }
  };

  const showBanner = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Helper: Check if any advanced filters are active
  const hasActiveFilters = 
    selectedCategory !== 0 ||
    searchQuery.trim() !== "" ||
    priceFilter !== "all" ||
    typeFilter !== "all" ||
    minRatingFilter > 0 ||
    levelFilter !== "all";

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory(0);
    setPriceFilter("all");
    setTypeFilter("all");
    setMinRatingFilter(0);
    setLevelFilter("all");
    setCurrentPage(1);
  };

  // --- Filtering & Sorting Pipeline ---
  const filteredContents = useMemo(() => {
    return MARKETPLACE_CONTENTS
      .filter((item) => {
        // 1. Category Filter
        if (selectedCategory !== 0 && item.category_id !== selectedCategory) return false;

        // 2. Keyword Search
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchCreator = item.creator_name.toLowerCase().includes(query);
          const matchCategory = item.category_name.toLowerCase().includes(query);
          const matchTag = item.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchCreator && !matchCategory && !matchTag) return false;
        }

        // 3. Price Filter
        if (priceFilter === "free" && item.price !== 0) return false;
        if (priceFilter === "under300" && (item.price === 0 || item.price > 300)) return false;
        if (priceFilter === "300to600" && (item.price < 300 || item.price > 600)) return false;
        if (priceFilter === "above600" && item.price <= 600) return false;

        // 4. Type / Format Filter
        if (typeFilter !== "all" && item.type !== typeFilter) return false;

        // 5. Rating Filter
        if (minRatingFilter > 0 && item.rating < minRatingFilter) return false;

        // 6. Level Filter
        if (levelFilter !== "all" && item.level !== levelFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return new Date(b.created_at || "2026-01-01") - new Date(a.created_at || "2026-01-01");
        return b.learners_count - a.learners_count; // "popular" default
      });
  }, [searchQuery, selectedCategory, priceFilter, typeFilter, minRatingFilter, levelFilter, sortBy]);

  // --- Featured Content Subset ---
  const featuredResources = useMemo(() => {
    return MARKETPLACE_CONTENTS.filter(item => item.featured);
  }, []);

  // --- Recommendations Subset ---
  const recommendedResources = useMemo(() => {
    return MARKETPLACE_CONTENTS.filter(item => item.rating >= 4.85 || item.is_trending).slice(0, 3);
  }, []);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredContents.length / itemsPerPage) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * itemsPerPage;
  const paginatedContents = filteredContents.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  // Simulated purchase action
  const handleBuyContent = (item) => {
    setPreviewItem(null);
    showBanner(`Successfully unlocked "${item.title}"! Added to your Library.`);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] text-[#1A1A2E] dark:text-[#f3f4f6]">

      {/* Hero Header Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white py-12 px-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Central Resource Marketplace & Discovery
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Explore Verified Educational Content
          </h1>
          <p className="text-indigo-200 max-w-2xl text-sm sm:text-base leading-relaxed">
            Discover curated notes, interactive code guides, cheat sheets, and system design handbooks crafted by expert technical creators.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Notification Banner */}
        {notification && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between gap-3 animate-fadeIn shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
              <span>{notification}</span>
            </div>
            {onNavigateToProfile && (
              <Button size="sm" onClick={onNavigateToProfile} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                View My Library
              </Button>
            )}
          </div>
        )}

        {/* Featured Content Showcase Row */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Featured Spotlight Resources</h2>
            </div>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">Handpicked by LearnHub Editors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredResources.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setPreviewItem(item)}
                className="bg-white dark:bg-[#121124] border border-indigo-100 dark:border-indigo-950/80 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Award className="h-3 w-3" /> Featured
                </div>

                <div className="space-y-2.5 pt-2">
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900 font-semibold text-[10px]">
                    {item.category_name}
                  </Badge>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-500" />
                    <span>{item.rating}</span>
                    <span className="text-gray-400 text-[11px] font-normal">({item.learners_count} enrolled)</span>
                  </div>
                  <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                    {item.price === 0 ? "FREE" : `₹${item.price}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search Bar & Controls Bar */}
        <section className="space-y-4">
          <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Real-time Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search Java, DSA, React, System Design, tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 bg-gray-50/60 dark:bg-black/30 border-gray-200 dark:border-gray-800 text-sm focus-visible:ring-indigo-500 rounded-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Controls: Filter Drawer Toggle, View Layout Toggle, Sort Selector */}
            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3">
              
              {/* Filter Drawer Toggle Button */}
              <Button
                size="sm"
                variant={showFilterDrawer ? "default" : "outline"}
                onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                className={`gap-1.5 text-xs font-semibold rounded-xl transition-all ${
                  showFilterDrawer
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="ml-1 w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                )}
              </Button>

              {/* Grid / List View Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg text-xs transition ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                  title="Grid View"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg text-xs transition ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs rounded-xl px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Released</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

            </div>
          </div>

          {/* Category Chips Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
              <Filter className="h-3.5 w-3.5" /> Category:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-white dark:bg-[#121124] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-indigo-400 hover:text-indigo-600"
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.id !== 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-indigo-700 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                      {cat.count || 0}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Expandable Filter Drawer Panel */}
          {showFilterDrawer && (
            <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-indigo-600" /> Multi-Filter Specification
                </h3>
                <Button variant="ghost" size="sm" onClick={resetAllFilters} className="text-xs text-gray-500 hover:text-indigo-600 gap-1">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* 1. Price Range */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price Range</label>
                  <select
                    value={priceFilter}
                    onChange={(e) => { setPriceFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs rounded-xl p-2.5 text-gray-700 dark:text-gray-200 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="free">Free Resources Only</option>
                    <option value="under300">Under ₹300</option>
                    <option value="300to600">₹300 - ₹600</option>
                    <option value="above600">Above ₹600</option>
                  </select>
                </div>

                {/* 2. Format / Content Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Resource Format</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs rounded-xl p-2.5 text-gray-700 dark:text-gray-200 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Formats</option>
                    <option value="Notes & Code">Notes & Code</option>
                    <option value="Cheat Sheet PDF">Cheat Sheet PDF</option>
                    <option value="Interactive Guide">Interactive Guide</option>
                    <option value="Free Handbook">Free Handbook</option>
                    <option value="Video & Notes">Video & Notes</option>
                  </select>
                </div>

                {/* 3. Learner Rating */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Minimum Rating</label>
                  <select
                    value={minRatingFilter}
                    onChange={(e) => { setMinRatingFilter(Number(e.target.value)); setCurrentPage(1); }}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs rounded-xl p-2.5 text-gray-700 dark:text-gray-200 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={4.8}>⭐ 4.8 & Above</option>
                    <option value={4.5}>⭐ 4.5 & Above</option>
                  </select>
                </div>

                {/* 4. Target Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target Level</label>
                  <select
                    value={levelFilter}
                    onChange={(e) => { setLevelFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs rounded-xl p-2.5 text-gray-700 dark:text-gray-200 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Difficulty Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filter Chips Row */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="text-gray-400 font-medium">Active filters:</span>
              {selectedCategory !== 0 && (
                <Badge variant="secondary" className="gap-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Category: {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory(0)} />
                </Badge>
              )}
              {priceFilter !== "all" && (
                <Badge variant="secondary" className="gap-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Price: {priceFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceFilter("all")} />
                </Badge>
              )}
              {typeFilter !== "all" && (
                <Badge variant="secondary" className="gap-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Format: {typeFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setTypeFilter("all")} />
                </Badge>
              )}
              {minRatingFilter > 0 && (
                <Badge variant="secondary" className="gap-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Rating: ≥ {minRatingFilter}★
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setMinRatingFilter(0)} />
                </Badge>
              )}
              {levelFilter !== "all" && (
                <Badge variant="secondary" className="gap-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Level: {levelFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setLevelFilter("all")} />
                </Badge>
              )}
              <Button variant="ghost" size="xs" onClick={resetAllFilters} className="text-xs text-indigo-600 underline p-0 h-auto">
                Clear all
              </Button>
            </div>
          )}
        </section>

        {/* Catalog Header Info */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500 font-medium">
            Showing <strong className="text-gray-900 dark:text-white font-bold">{filteredContents.length > 0 ? startIndex + 1 : 0}</strong> - <strong className="text-gray-900 dark:text-white font-bold">{Math.min(startIndex + itemsPerPage, filteredContents.length)}</strong> of <strong className="text-gray-900 dark:text-white font-bold">{filteredContents.length}</strong> resources
          </span>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Per Page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-300 font-semibold focus:outline-none"
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>

        {/* Content Cards Grid / List Container */}
        {paginatedContents.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {paginatedContents.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                viewMode={viewMode}
                onPreview={(selected) => setPreviewItem(selected)}
                isPurchased={purchasedContentIds.includes(item.id)}
                isBookmarked={bookmarkedIds.includes(item.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        ) : (
          /* Empty State when zero items match search/filters */
          <div className="text-center py-16 px-4 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-3">
            <div className="inline-flex p-3 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-500">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Matching Resources Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              We couldn't find any resources matching your search query or selected filters. Try broadening your keywords or clearing active filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={resetAllFilters}
              className="text-xs border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl mt-2"
            >
              Reset All Filters
            </Button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm">
            <span className="text-xs text-gray-500">
              Page <strong className="text-gray-900 dark:text-white font-bold">{validPage}</strong> of <strong className="text-gray-900 dark:text-white font-bold">{totalPages}</strong>
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant="outline"
                disabled={validPage <= 1}
                onClick={() => handlePageChange(validPage - 1)}
                className="gap-1 text-xs h-8 rounded-lg border-gray-300 dark:border-gray-700"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                    validPage === pageNum
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <Button
                size="sm"
                variant="outline"
                disabled={validPage >= totalPages}
                onClick={() => handlePageChange(validPage + 1)}
                className="gap-1 text-xs h-8 rounded-lg border-gray-300 dark:border-gray-700"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        <section className="bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-[#121124] border border-indigo-100 dark:border-indigo-950/60 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recommended For You</h3>
              <p className="text-xs text-gray-500">Based on trending topics & top learner satisfaction ratings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedResources.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setPreviewItem(rec)}
                className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex justify-between items-center text-xs">
                  <Badge variant="outline" className="text-[10px] bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40">
                    {rec.category_name}
                  </Badge>
                  <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 stroke-amber-500" /> {rec.rating}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {rec.title}
                </h4>
                <div className="flex justify-between items-center text-xs pt-1 text-gray-500">
                  <span>{rec.type}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{rec.price === 0 ? "FREE" : `₹${rec.price}`}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Content Preview Drawer / Modal */}
      <ContentPreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
        onBuy={handleBuyContent}
        isPurchased={previewItem ? purchasedContentIds.includes(previewItem.id) : false}
        isBookmarked={previewItem ? bookmarkedIds.includes(previewItem.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}

