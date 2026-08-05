import { useState, useMemo } from "react";
import { Search, ShoppingBag, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import MarketplaceCard from "@/components/MarketplaceCard";
import ContentPreviewModal from "@/components/ContentPreviewModal";

/**
 * MarketplacePage Component — Catalog with fixed filtering and pagination
 */
export default function MarketplacePage({
  onNavigateToProfile,
  onOpenCreatorProfile,
  onBuyContent,
  purchasedContents = [],
  marketplaceContents = []
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL"); // "ALL" or Category Name / ID
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [previewItem, setPreviewItem] = useState(null);
  const purchasedContentIds = purchasedContents.map((p) => p.content_id);

  // Dynamically calculate category list with real item counts
  const categoriesList = useMemo(() => {
    const map = new Map();
    map.set("ALL", { id: "ALL", name: "All Categories", count: marketplaceContents.length });

    marketplaceContents.forEach((item) => {
      const catName = item.category_name || item.categoryName || item.category || "General";
      const catKey = String(item.category_id || item.categoryId || catName).toUpperCase();
      
      if (!map.has(catKey)) {
        map.set(catKey, { id: catKey, name: catName, count: 0 });
      }
      map.get(catKey).count += 1;
    });

    return Array.from(map.values());
  }, [marketplaceContents]);

  // Robust Filtering and Sorting logic
  const filteredContents = useMemo(() => {
    return marketplaceContents
      .filter((item) => {
        // Search filter matching title, description, or tags
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          (item.category_name && item.category_name.toLowerCase().includes(q)) ||
          (Array.isArray(item.tags) && item.tags.some(t => String(t).toLowerCase().includes(q)));

        // Category filter matching ID or Name
        const itemCatName = (item.category_name || item.categoryName || item.category || "General").toUpperCase();
        const itemCatId = String(item.category_id || item.categoryId || "").toUpperCase();

        const matchesCategory =
          selectedCategory === "ALL" ||
          selectedCategory === itemCatId ||
          selectedCategory === itemCatName;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const priceA = Number(a.price || 0);
        const priceB = Number(b.price || 0);
        const ratingA = Number(a.rating || 0);
        const ratingB = Number(b.rating || 0);
        const learnersA = Number(a.learners_count || a.learnersCount || 0);
        const learnersB = Number(b.learners_count || b.learnersCount || 0);

        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return ratingB - ratingA;
        return learnersB - learnersA; // Popular (default)
      });
  }, [marketplaceContents, searchQuery, selectedCategory, sortBy]);

  // Reset to Page 1 whenever search, category, or sort changes
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Pagination Math
  const totalPages = Math.ceil(filteredContents.length / itemsPerPage) || 1;
  const paginatedContents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredContents.slice(start, start + itemsPerPage);
  }, [filteredContents, currentPage, itemsPerPage]);

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
              placeholder="Search notes, topics, tags..."
              aria-label="Search catalog resources"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9 text-xs h-9 bg-white dark:bg-gray-900 border-gray-200"
            />
          </div>

          <select
            value={sortBy}
            onChange={handleSortChange}
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
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoriesList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
            }`}
          >
            {cat.name}
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                selectedCategory === cat.id
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500"
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Resource Count Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          Showing <strong>{paginatedContents.length}</strong> of <strong>{filteredContents.length}</strong> resources
        </span>
        {totalPages > 1 && (
          <span>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></span>
        )}
      </div>

      {/* Content Grid */}
      {paginatedContents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedContents.map((item) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
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
