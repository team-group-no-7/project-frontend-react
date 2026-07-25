import { useState, useMemo } from "react";
import { Search, ShoppingBag, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";


// Import components & mock database catalog
import MarketplaceCard from "@/components/MarketplaceCard";
import ContentPreviewModal from "@/components/ContentPreviewModal";
import { MARKETPLACE_CONTENTS, CATEGORIES, PURCHASED_CONTENTS } from "@/data/mockData";

/**
 * MarketplacePage Component (Module 2 - Item 5: Marketplace Catalog / Browse Page)
 * Developed by: Team Member (CDAC PGCP-AC Project)
 * 
 * Simple beginner-friendly catalog featuring:
 *  - Search bar for filtering resources
 *  - Category filter buttons (Java, DSA, Web Dev, etc.)
 *  - Price/Rating sorting selector
 *  - Grid of Marketplace items
 *  - Resource details preview modal
 */
export default function MarketplacePage({ onNavigateToProfile, onOpenCreatorProfile, onBuyContent, purchasedContents = PURCHASED_CONTENTS, marketplaceContents = MARKETPLACE_CONTENTS }) {
  // State for search query and selected category ID
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0); // 0 = All Categories
  const [sortBy, setSortBy] = useState("popular"); // "popular" | "price-low" | "price-high" | "rating"

  // State for preview modal
  const [previewItem, setPreviewItem] = useState(null);

  // Array of purchased content IDs for current user
  const purchasedContentIds = purchasedContents.map((p) => p.content_id);

  // Filter and sort items based on user selection
  const filteredContents = useMemo(() => {
    return marketplaceContents.filter((item) => {
      // Search matching title or description
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      const matchesCategory =
        selectedCategoryId === 0 || item.category_id === selectedCategoryId;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.learners_count - a.learners_count; // Popular (default)
    });
  }, [searchQuery, selectedCategoryId, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-indigo-600" /> Marketplace Catalog
          </h1>
        </div>

        {/* Search Bar & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs h-9 bg-white dark:bg-gray-900 border-gray-200"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-3 text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-700 dark:text-gray-300 font-medium focus:outline-none"
          >
            <option value="popular">Sort by: Popularity</option>
            <option value="rating">Sort by: Highest Rating</option>
            <option value="price-low">Sort by: Price (Low to High)</option>
            <option value="price-high">Sort by: Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${selectedCategoryId === cat.id
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Resource Count Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Showing <strong>{filteredContents.length}</strong> resources</span>
      </div>

      {/* Content Grid */}
      {filteredContents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((item) => (
            <MarketplaceCard
              key={item.id}
              item={item}
              onPreview={(selected) => onBuyContent && onBuyContent(selected)}
              onOpenCreatorProfile={onOpenCreatorProfile}
              isPurchased={purchasedContentIds.includes(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-10 text-center space-y-3">
          <BookOpen className="h-10 w-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-700 dark:text-gray-300">No resources found</h3>
          <p className="text-xs text-gray-500">Try changing your search term or category filter.</p>
        </div>
      )}

      {/* Resource Preview Modal */}
      {previewItem && (
        <ContentPreviewModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
          isPurchased={purchasedContentIds.includes(previewItem.id)}
          onBuyNow={() => {
            setPreviewItem(null);
            onBuyContent && onBuyContent(previewItem);
          }}
        />
      )}

    </div>
  );
}
