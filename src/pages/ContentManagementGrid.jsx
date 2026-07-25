import React, { useState, useEffect, useMemo } from "react";
import { Plus, Trash2, LayoutGrid, Search, Edit3, Eye, EyeOff, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContentManagementGrid({ onOpenUploadForm, contentsList, onDeleteContent }) {
  // Local state initialized from the parent uploads prop
  const [resources, setResources] = useState(() => contentsList || []);

  // Sync state if contentsList changes in parent
  useEffect(() => {
    if (contentsList) {
      setResources(contentsList);
    }
  }, [contentsList]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Edit Modal States
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState(0);

  // Derive unique categories dynamically for filter dropdown
  const categories = useMemo(() => {
    const list = resources.map((r) => r.category_name || "General");
    return ["All", ...new Set(list)];
  }, [resources]);



  // Toggle status handler (Published vs Draft)
  const handleToggleStatus = (id) => {
    setResources(prev =>
      prev.map(r => {
        if (r.id === id) {
          const nextStatus = (r.status || "Published") === "Published" ? "Draft" : "Published";
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  // Delete handler
  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setResources(prev => prev.filter(r => r.id !== id));
      if (onDeleteContent) {
        onDeleteContent(id);
      }
    }
  };

  // Edit Modal triggers
  const openEditModal = (item) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditPrice(item.price);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setResources(prev =>
      prev.map(r => {
        if (r.id === editingItem.id) {
          return { ...r, title: editTitle, price: Number(editPrice) };
        }
        return r;
      })
    );
    setEditingItem(null);
  };

  // Filter and Sort resource items
  const processedResources = useMemo(() => {
    return resources
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const catMatch = categoryFilter === "All" || (item.category_name || "General") === categoryFilter;
        
        const itemStatus = item.status || "Published";
        const statusMatch = statusFilter === "All" || itemStatus === statusFilter;

        return titleMatch && catMatch && statusMatch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return (b.id || 0) - (a.id || 0); // Newest
      });
  }, [resources, searchQuery, categoryFilter, statusFilter, sortBy]);

  // Reset page number on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, statusFilter, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(processedResources.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResources = processedResources.slice(startIndex, startIndex + itemsPerPage);

  // Recalculate summary metrics dynamically
  const stats = useMemo(() => {
    const totalPublished = resources.filter(r => (r.status || "Published") === "Published").length;
    const totalDrafts = resources.filter(r => r.status === "Draft").length;
    const totalRevenue = resources.reduce((sum, r) => sum + (r.revenue || 0), 0);
    return { totalPublished, totalDrafts, totalRevenue };
  }, [resources]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-indigo-600" /> Advanced Content Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage status, sort uploads, and track metrics from your creator dashboard.
          </p>
        </div>

        <Button
          onClick={onOpenUploadForm}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs gap-2 shadow-xs cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Upload New Content
        </Button>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Published Items</p>
          <p className="text-2xl font-black text-gray-900 mt-1">{stats.totalPublished}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Draft Items</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">{stats.totalDrafts}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Sales Revenue</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Toolbar Filters Section */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
        
        {/* Search */}
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

        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Category</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-slate-50 border border-gray-200 rounded-lg text-gray-600 font-medium focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-slate-50 border border-gray-200 rounded-lg text-gray-600 font-medium focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Sort Order</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-3 text-xs bg-slate-50 border border-gray-200 rounded-lg text-gray-600 font-medium focus:outline-none"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Grid Tabular Layout */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200 text-xs font-bold text-gray-500">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-600">
            {paginatedResources.length > 0 ? (
              paginatedResources.map((item) => {
                const itemStatus = item.status || "Published";
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Title */}
                    <td className="p-4 font-bold text-gray-900">
                      {item.title}
                    </td>

                    {/* Category tag */}
                    <td className="p-4">
                      <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase">
                        {item.category_name || "General"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-extrabold text-gray-900">
                      {item.price === 0 ? "FREE" : `₹${item.price}`}
                    </td>

                    {/* Status Pill */}
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        itemStatus === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                      }`}>
                        {itemStatus}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Toggle Status Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item.id)}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                          title={itemStatus === "Published" ? "Unpublish Content" : "Publish Content"}
                        >
                          {itemStatus === "Published" ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>



                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                          title="Edit Details"
                        >
                          <Edit3 size={16} />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded hover:bg-rose-50 text-rose-500 transition-colors cursor-pointer"
                          title="Delete Content"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                  No resources match the selected search filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {processedResources.length > itemsPerPage && (
        <div className="flex items-center justify-between pt-4">
          <span className="text-xs text-gray-500">
            Showing Page <strong className="font-semibold text-gray-900">{currentPage}</strong> of <strong className="font-semibold text-gray-900">{totalPages}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-slate-50 disabled:hover:bg-white cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-slate-50 disabled:hover:bg-white cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Simple self-contained edit modal overlay */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-slate-100 space-y-4 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900">Edit Resource Details</h3>
              <p className="text-xs text-gray-400">Update title and pricing metadata.</p>
            </div>

            <form onSubmit={saveEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Resource Title</label>
                <Input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-xs border-gray-200 bg-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Pricing (₹)</label>
                <Input
                  type="number"
                  min="0"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="text-xs border-gray-200 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-500 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
