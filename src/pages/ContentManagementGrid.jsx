import React, { useState } from "react";
import { Plus, Trash2, Edit3, Eye, FileText, CheckCircle, Search, TrendingUp, BookOpen, Layers, Copy, Archive, Power } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Initial uploaded contents list
import { UPLOADED_CONTENTS } from "@/data/mockData";

/**
 * ContentManagementGrid Component (Module 3: Resource Management)
 * Tabular management workspace with status filter tabs (Published, Draft, Archived), Duplicate, and Unpublish toggles.
 */
export default function ContentManagementGrid({ onOpenUploadForm }) {
  const [activeTab, setActiveTab] = useState("ALL"); // 'ALL' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'
  
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
      status: "DRAFT",
      downloads: 0,
      revenue: 0
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");

  // Delete item handler
  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setContentsList(prev => prev.filter(item => item.id !== id));
      setNotification(`"${title}" has been deleted from your catalog.`);
      setTimeout(() => setNotification(""), 4000);
    }
  };

  // Toggle Publish / Unpublish status
  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setContentsList(prev => prev.map(item => item.id === id ? { ...item, status: nextStatus } : item));
    setNotification(`Content status changed to ${nextStatus}.`);
    setTimeout(() => setNotification(""), 3000);
  };

  // Duplicate Content handler
  const handleDuplicate = (item) => {
    const copy = {
      ...item,
      id: Date.now(),
      title: `${item.title} (Copy)`,
      status: "DRAFT",
      downloads: 0,
      revenue: 0
    };
    setContentsList(prev => [copy, ...prev]);
    setNotification(`Duplicated "${item.title}" as Draft.`);
    setTimeout(() => setNotification(""), 3000);
  };

  // Filter contents by search query and active tab
  const filteredContents = contentsList.filter((item) => {
    const matchesSearch = !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "ALL" || item.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalUploads = contentsList.length;
  const totalRevenue = contentsList.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const totalDownloads = contentsList.reduce((sum, item) => sum + (item.downloads || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-6 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header & Main Upload CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Resource Management Workspace
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage your published notes, drafts, price metadata, and duplicated copies.
            </p>
          </div>

          <Button
            onClick={onOpenUploadForm}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs gap-2 px-5 py-2.5 shadow-sm"
          >
            <Plus className="h-4 w-4" /> Publish New Content
          </Button>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center justify-between">
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

        {/* Management Table Card */}
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm rounded-2xl overflow-hidden">
          
          {/* Table Header & Status Filter Tabs */}
          <CardHeader className="border-b border-gray-100 dark:border-gray-800 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <CardTitle className="text-base font-bold">Uploaded Resources</CardTitle>
              {/* Status Tabs */}
              <div className="flex bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800 w-fit">
                {["ALL", "PUBLISHED", "DRAFT"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                      activeTab === tab
                        ? "bg-white dark:bg-[#121124] text-indigo-600 dark:text-indigo-400 shadow-xs"
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab} ({contentsList.filter(c => tab === "ALL" || c.status === tab).length})
                  </button>
                ))}
              </div>
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

              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {filteredContents.length > 0 ? (
                  filteredContents.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-black/20 transition-colors">
                      
                      <td className="py-4 px-5">
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs mt-0.5">
                          {item.description}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 text-[11px]">
                          {item.category_name}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">
                        {item.price === 0 ? (
                          <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                        ) : (
                          `₹${item.price}`
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStatus(item.id, item.status)}
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full cursor-pointer hover:opacity-80 transition ${
                            item.status === "PUBLISHED"
                              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                              : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
                          }`}
                        >
                          <Power className="h-3 w-3" /> {item.status}
                        </button>
                      </td>

                      <td className="py-4 px-4 font-medium text-gray-600 dark:text-gray-400">
                        {item.downloads ? item.downloads.toLocaleString() : "0"}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDuplicate(item)}
                            title="Duplicate Content"
                            className="h-8 px-2 text-xs border-gray-200 dark:border-gray-700"
                          >
                            <Copy className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300" />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(item.id, item.title)}
                            title="Delete Content"
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
                      No contents found matching tab filter.
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
