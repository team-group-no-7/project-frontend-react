import React, { useState } from "react";
import { Plus, Trash2, LayoutGrid, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UPLOADED_CONTENTS } from "@/data/mockData";

/**
 * ContentManagementGrid Component (Module 2 - Item 7: Content Management Grid Dashboard)
 * Developed by: Team Member (CDAC PGCP-AC Project)
 * 
 * Simple tabular layout exclusive to creators to manage uploaded content.
 */
export default function ContentManagementGrid({ onOpenUploadForm, contentsList = UPLOADED_CONTENTS, onDeleteContent }) {
  // Search Query State
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryName = (categoryId) => {
    const categories = { 1: "Java", 2: "DSA", 3: "Web Dev", 4: "System Design" };
    return categories[categoryId] || "General";
  };

  // Delete Content Item
  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDeleteContent && onDeleteContent(id);
    }
  };

  // Filter List by Search Query
  const filteredList = contentsList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.category_name || getCategoryName(item.category_id)).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-indigo-600" /> Content Management Grid
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            View, track, and manage all your uploaded learning resources.
          </p>
        </div>

        <Button
          onClick={onOpenUploadForm}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs gap-2 shadow-sm"
        >
          <Plus className="h-4 w-4" /> Upload New Content
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 font-medium">Total Published</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{contentsList.length}</p>
        </div>
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 font-medium">Total Downloads</p>
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            {contentsList.reduce((sum, item) => sum + (item.downloads || 0), 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 font-medium">Total Revenue</p>
          <p className="text-lg font-bold text-emerald-600 mt-1">
            ₹{contentsList.reduce((sum, item) => sum + (item.revenue || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search your uploads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 text-xs h-9 bg-white dark:bg-gray-900 border-gray-200"
        />
      </div>

      {/* Table Grid */}
      <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-500">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Downloads</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs text-gray-700 dark:text-gray-300">
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50">
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </td>
                  <td className="p-3">
                    <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 px-2 py-0.5 rounded text-[11px] font-semibold">
                      {item.category_name || getCategoryName(item.category_id)}
                    </span>
                  </td>
                  <td className="p-3 font-bold">
                    {item.price === 0 ? "FREE" : `₹${item.price}`}
                  </td>
                  <td className="p-3 text-gray-500">{item.downloads || 0}</td>
                  <td className="p-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item.id, item.title)}
                      className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 h-8 px-2"
                      title="Delete Content"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No uploads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
