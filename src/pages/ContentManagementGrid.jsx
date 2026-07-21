import React, { useState } from "react";
import { Plus, Trash2, Edit3, Eye, FileText, CheckCircle, Search, TrendingUp, BookOpen, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Initial uploaded contents list
import { UPLOADED_CONTENTS, MARKETPLACE_CONTENTS } from "@/data/mockData";

/**
 * ContentManagementGrid Component (Module 2 - Part 3: Content Management Grid Dashboard)
 * Tabular management layout exclusive to Creators to view, edit, and delete published content.
 * 
 * Props:
 *  - onOpenUploadForm: Callback function to open the upload workspace page
 */
export default function ContentManagementGrid({ onOpenUploadForm }) {
  // Creator's content list state (combining uploaded mock records)
  const [contentsList, setContentsList] = useState([
    ...UPLOADED_CONTENTS.map(item => ({
      ...item,
      category_name: item.category_id === 1 ? "Java" : item.category_id === 2 ? "DSA" : item.category_id === 3 ? "Web Dev" : "System Design",
      status: "PUBLISHED",
      downloads: 420,
      revenue: item.price * 420
    })),
    {
      id: 31,
      title: "Mastering SQL & Database Indexing",
      description: "Comprehensive guide to complex joins, subqueries, and B-Tree indexes.",
      price: 349.00,
      category_id: 5,
      category_name: "SQL & DB",
      status: "PUBLISHED",
      downloads: 112,
      revenue: 349 * 112
    }
  ]);

  // Search query state inside management table
  const [searchQuery, setSearchQuery] = useState("");

  // Notification state for deleted or updated item
  const [notification, setNotification] = useState("");

  // Delete item handler
  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setContentsList(prev => prev.filter(item => item.id !== id));
      setNotification(`"${title}" has been deleted from your catalog.`);
      setTimeout(() => setNotification(""), 4000);
    }
  };

  // Filter creator contents by search query
  const filteredContents = contentsList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.category_name.toLowerCase().includes(query)
    );
  });

  // Calculate high-level creator statistics
  const totalUploads = contentsList.length;
  const totalRevenue = contentsList.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const totalDownloads = contentsList.reduce((sum, item) => sum + (item.downloads || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-6 sm:px-10 lg:px-14 w-full">
      <div className="w-full space-y-6">

        {/* Header & Main Upload CTA Banner */}
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
              <Layers className="h-3.5 w-3.5" /> Creator Content Management
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
              Content Management Workspace
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
              Manage your published technical notes, status tracking, pricing metadata, and active catalog items.
            </p>
          </div>

          <Button
            onClick={onOpenUploadForm}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-2 px-6 py-3 shadow-md rounded-xl shrink-0"
          >
            <Plus className="h-4 w-4" /> Upload New Content
          </Button>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-medium flex items-center justify-between animate-fadeIn">
            <span>{notification}</span>
          </div>
        )}

        {/* Creator Metrics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Uploads</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalUploads}</h3>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 rounded-xl">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Downloads</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalDownloads.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-xl">
                <Layers className="h-5 w-5" />
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Earnings</p>
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  ₹{totalRevenue.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-xl">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </Card>

        </div>

        {/* Content Management Table Card */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl overflow-hidden">

          {/* Table Search Header */}
          <CardHeader className="border-b border-gray-100 dark:border-gray-800 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-bold">Uploaded Resources</CardTitle>
              <CardDescription className="text-xs">
                List of all your active items mapping to the CONTENTS table.
              </CardDescription>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <Input
                placeholder="Filter uploaded items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-gray-50/50 dark:bg-black/20 text-xs border-gray-200 dark:border-gray-800"
              />
            </div>
          </CardHeader>

          {/* Table Body */}
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs">

              {/* Table Head */}
              <thead className="bg-gray-50/80 dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800 text-gray-500 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-5">Resource Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Downloads</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>

              {/* Table Rows */}
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {filteredContents.length > 0 ? (
                  filteredContents.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-black/20 transition-colors">

                      {/* Title & Description */}
                      <td className="py-4 px-5">
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs mt-0.5">
                          {item.description}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 text-[11px]">
                          {item.category_name}
                        </Badge>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">
                        {item.price === 0 ? (
                          <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                        ) : (
                          `₹${item.price}`
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                          <CheckCircle className="h-3 w-3" /> Live
                        </span>
                      </td>

                      {/* Downloads */}
                      <td className="py-4 px-4 font-medium text-gray-600 dark:text-gray-400">
                        {item.downloads ? item.downloads.toLocaleString() : "150"}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => alert(`Editing metadata for "${item.title}"`)}
                            className="h-8 px-2 text-xs border-gray-200 dark:border-gray-700"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300" />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(item.id, item.title)}
                            className="h-8 px-2 text-xs border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400 text-xs">
                      No matching contents found in your management grid.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </CardContent>

        </Card>

      </div>
    </div>
  );
}
