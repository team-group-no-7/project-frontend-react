import React, { useState, useEffect, useMemo } from "react";
import { Plus, Trash2, LayoutGrid, Eye, EyeOff, ChevronLeft, ChevronRight, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import GridToolbar from "@/components/contentStudio/GridToolbar";
import EditModal from "@/components/contentStudio/EditModal";
import api from "@/utils/api";

/**
 * ContentManagementGrid (Module: Creator Content Studio)
 * Displays, filters, sorts and paginates the creator's uploaded resources.
 * Status toggling, editing, and deleting are fully persisted via live Spring Boot APIs.
 */
export default function ContentManagementGrid({ onOpenUploadForm, contentsList, onDeleteContent, onOpenReader, onRefreshResources }) {
  // Local resource state — synced from parent prop
  const [resources, setResources] = useState(() => contentsList || []);
  useEffect(() => { if (contentsList) setResources(contentsList); }, [contentsList]);

  // Loading & Action State
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Toolbar filter states
  const [searchQuery, setSearchQuery]     = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter]   = useState("All");
  const [sortBy, setSortBy]               = useState("newest");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Edit modal state
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    price: 0,
    level: "Beginner",
    tags: "",
    status: "PUBLISHED"
  });
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Unique category list for filter dropdown
  const categories = useMemo(() => {
    const names = resources.map(r => r.category_name || "General");
    return ["All", ...new Set(names)];
  }, [resources]);

  // Helper to re-fetch resources from backend
  const fetchMyResources = () => {
    api.get("/api/creator/content/my-resources")
      .then((res) => {
        const list = res.data?.data || res.data || [];
        setResources(list);
        onRefreshResources?.(list);
      })
      .catch((err) => {
        console.error("Failed to refresh resources", err);
      });
  };

  // Toggle Published / Draft status with live backend persistence
  const handleToggleStatus = (item) => {
    const newStatus = (item.status || "PUBLISHED").toUpperCase() === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setActionLoadingId(item.id);

    api.patch(`/api/creator/content/${item.id}/status`, { status: newStatus })
      .then(() => {
        setActionLoadingId(null);
        fetchMyResources();
      })
      .catch((err) => {
        setActionLoadingId(null);
        alert(err.response?.data?.message || "Failed to update resource status.");
      });
  };

  // Confirm and delete a resource with live backend persistence
  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      setActionLoadingId(id);
      api.delete(`/api/creator/content/${id}`)
        .then(() => {
          setActionLoadingId(null);
          onDeleteContent?.(id);
          fetchMyResources();
        })
        .catch((err) => {
          setActionLoadingId(null);
          alert(err.response?.data?.message || "Failed to delete resource.");
        });
    }
  };

  // Open edit modal with selected item's full values
  const openEditModal = (item) => {
    setEditingItem(item);
    setEditFormData({
      title: item.title || "",
      description: item.description || "",
      price: item.price !== undefined ? item.price : 0,
      level: item.level || "Beginner",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : (item.tags || ""),
      status: (item.status || "PUBLISHED").toUpperCase(),
      categoryName: item.category_name || item.category || "General"
    });
  };

  // Save edited details to live backend API
  const saveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSavingEdit(true);

    const payload = {
      title: editFormData.title,
      description: editFormData.description,
      price: Number(editFormData.price),
      level: editFormData.level,
      tags: editFormData.tags,
      status: editFormData.status,
      categoryName: editFormData.categoryName
    };

    api.put(`/api/creator/content/${editingItem.id}`, payload)
      .then(() => {
        setIsSavingEdit(false);
        setEditingItem(null);
        fetchMyResources();
      })
      .catch((err) => {
        setIsSavingEdit(false);
        alert(err.response?.data?.message || "Failed to update resource details.");
      });
  };

  // Apply search, category, status filters then sort
  const processedResources = useMemo(() => {
    return resources
      .filter(item => {
        const title = item?.title || "";
        const status = item?.status || "Published";
        return (
          title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (categoryFilter === "All" || (item?.category_name || "General") === categoryFilter) &&
          (statusFilter  === "All" || status === statusFilter)
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-low")  return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return (b.id || 0) - (a.id || 0); // Default: Newest first
      });
  }, [resources, searchQuery, categoryFilter, statusFilter, sortBy]);

  // Reset to page 1 whenever filters change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, categoryFilter, statusFilter, sortBy]);

  // Pagination
  const totalPages        = Math.max(1, Math.ceil(processedResources.length / ITEMS_PER_PAGE));
  const paginatedResources = processedResources.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Summary stats
  const stats = useMemo(() => ({
    totalPublished: resources.filter(r => (r.status || "Published") === "Published").length,
    totalDrafts:    resources.filter(r => r.status === "Draft").length,
    totalRevenue:   resources.reduce((sum, r) => sum + (r.revenue || 0), 0),
  }), [resources]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-indigo-600" /> Advanced Content Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">Manage status, sort uploads, and track metrics.</p>
        </div>
        <Button onClick={onOpenUploadForm} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs gap-2 shadow-xs">
          <Plus className="h-4 w-4" /> Upload New Content
        </Button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Published Items",    value: stats.totalPublished,                  color: "text-gray-900" },
          { label: "Draft Items",        value: stats.totalDrafts,                     color: "text-indigo-600" },
          { label: "Total Sales Revenue",value: `₹${stats.totalRevenue.toLocaleString()}`, color: "text-emerald-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
            <p className={`text-2xl font-black mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar — search + filters (extracted sub-component) */}
      <GridToolbar
        searchQuery={searchQuery}       setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} categories={categories}
        statusFilter={statusFilter}     setStatusFilter={setStatusFilter}
        sortBy={sortBy}                 setSortBy={setSortBy}
      />

      {/* Resources Table */}
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
            {paginatedResources.length > 0 ? paginatedResources.map((item) => {
              const isPublished = (item?.status || "PUBLISHED").toUpperCase() === "PUBLISHED";
              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-900 line-clamp-1">{item.title}</td>
                  <td className="p-4">
                    <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase">
                      {item.category_name || "General"}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-gray-900">
                    {item.price === 0 ? "FREE" : `₹${item.price}`}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isPublished ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-slate-100 text-slate-500"
                    }`}>
                      {isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => onOpenReader && onOpenReader(item)} title="Open Q&A Discussions"
                        className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 transition-colors cursor-pointer flex items-center gap-1 font-bold text-[10px]">
                        <MessageSquare size={15} /> Q&A
                      </button>
                      <button onClick={() => handleToggleStatus(item)} disabled={actionLoadingId === item.id} title={isPublished ? "Unpublish to Draft" : "Publish to Marketplace"}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer disabled:opacity-50">
                        {actionLoadingId === item.id ? <Loader2 size={16} className="animate-spin text-indigo-600" /> : (isPublished ? <EyeOff size={16} /> : <Eye size={16} />)}
                      </button>
                      <button onClick={() => openEditModal(item)} disabled={actionLoadingId === item.id} title="Edit Details"
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer disabled:opacity-50">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(item.id, item.title)} disabled={actionLoadingId === item.id} title="Delete Resource"
                        className="p-1.5 rounded hover:bg-rose-50 text-rose-500 transition-colors cursor-pointer disabled:opacity-50">
                        {actionLoadingId === item.id ? <Loader2 size={16} className="animate-spin text-rose-600" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                  No resources match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {processedResources.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Showing <strong>{paginatedResources.length}</strong> of <strong>{processedResources.length}</strong> resources (Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 disabled:opacity-40 hover:bg-slate-50 cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 disabled:opacity-40 hover:bg-slate-50 cursor-pointer flex items-center gap-1"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal (extracted sub-component) */}
      {editingItem && (
        <EditModal
          formData={editFormData}
          setFormData={setEditFormData}
          onSave={saveEdit}
          onClose={() => setEditingItem(null)}
          isLoading={isSavingEdit}
        />
      )}

    </div>
  );
}
