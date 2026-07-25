import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * GridToolbar — Search, filter dropdowns and sort controls for ContentManagementGrid.
 * Extracted to keep the parent file readable.
 *
 * Props:
 *  - searchQuery, setSearchQuery
 *  - categoryFilter, setCategoryFilter, categories (string[])
 *  - statusFilter, setStatusFilter
 *  - sortBy, setSortBy
 */
export default function GridToolbar({
  searchQuery, setSearchQuery,
  categoryFilter, setCategoryFilter, categories,
  statusFilter, setStatusFilter,
  sortBy, setSortBy
}) {
  const selectClass = "h-9 px-3 text-xs bg-slate-50 border border-gray-200 rounded-lg text-gray-600 font-medium focus:outline-none";

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">

      {/* Search input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by resource name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 text-xs h-9 bg-slate-50 border-gray-200"
        />
      </div>

      {/* Category filter */}
      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={selectClass}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      {/* Status filter */}
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
        <option value="All">All Status</option>
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
      </select>

      {/* Sort */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass}>
        <option value="newest">Sort by: Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>

    </div>
  );
}
