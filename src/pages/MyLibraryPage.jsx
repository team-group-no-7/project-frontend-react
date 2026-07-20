import React, { useState } from "react";
import { BookOpen, Search, Download, ExternalLink, Calendar, CheckCircle2, FileText, Lock, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock database purchased items
import { PURCHASED_CONTENTS } from "@/data/mockData";

/**
 * MyLibraryPage Component (Module 3 - Item 11: "My Library" Learner Page)
 * Custom private learner dashboard listing unlocked, verified purchases.
 */
export default function MyLibraryPage() {
  const [libraryList, setLibraryList] = useState(PURCHASED_CONTENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReadingItem, setActiveReadingItem] = useState(null);
  const [downloadNotification, setDownloadNotification] = useState("");

  // Helper to map category_id to tag name
  const getCategoryName = (categoryId) => {
    const categories = { 1: "Java", 2: "DSA", 3: "Web Dev", 4: "System Design", 5: "SQL & DB" };
    return categories[categoryId] || "General";
  };

  // Filter purchased items by search query
  const filteredItems = libraryList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.content.title.toLowerCase().includes(query) ||
      getCategoryName(item.content.category_id).toLowerCase().includes(query)
    );
  });

  // Handle PDF Download action
  const handleDownloadPDF = (title) => {
    setDownloadNotification(`Downloading PDF document for "${title}"...`);
    setTimeout(() => {
      setDownloadNotification("");
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] py-8 px-6 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" /> My Digital Library
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Access and study all verified learning materials purchased via LearnHub.
            </p>
          </div>

          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-300 dark:bg-emerald-950/40 text-xs px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> {libraryList.length} Verified Purchases
          </Badge>
        </div>

        {/* Download Alert Notification */}
        {downloadNotification && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center justify-between animate-fadeIn">
            <span>{downloadNotification}</span>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search in your purchased library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50/50 dark:bg-black/20 text-xs"
            />
          </div>

          <span className="text-xs text-gray-500">
            Showing <strong className="text-gray-900 dark:text-white">{filteredItems.length}</strong> unlocked resources
          </span>
        </div>

        {/* Library Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((purchase) => (
            <Card key={purchase.id} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] shadow-sm hover:shadow-md transition rounded-2xl overflow-hidden flex flex-col justify-between">
              
              <CardHeader className="p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200 text-xs">
                    {getCategoryName(purchase.content.category_id)}
                  </Badge>
                  <span className="text-[11px] text-gray-400 font-mono">
                    TXN: {purchase.transaction_id}
                  </span>
                </div>

                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                  {purchase.content.title}
                </CardTitle>
                
                <CardDescription className="text-xs text-gray-500 line-clamp-2">
                  {purchase.content.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-5 py-2 text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Purchased Date:</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {new Date(purchase.purchased_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Paid:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ₹{purchase.amount_paid}
                  </span>
                </div>
              </CardContent>

              {/* Card Footer Actions */}
              <div className="p-4 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 mt-3">
                <Button
                  size="sm"
                  onClick={() => setActiveReadingItem(purchase.content)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs gap-1.5"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Read Online
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownloadPDF(purchase.content.title)}
                  className="gap-1.5 text-xs border-gray-300 dark:border-gray-700"
                >
                  <Download className="h-3.5 w-3.5" /> Download PDF
                </Button>
              </div>

            </Card>
          ))}
        </div>

      </div>

      {/* Online Document Reader Reader Modal */}
      {activeReadingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-3xl bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="p-4 bg-indigo-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-300" />
                <h3 className="font-bold text-sm truncate max-w-md">{activeReadingItem.title}</h3>
              </div>
              <button onClick={() => setActiveReadingItem(null)} className="text-gray-300 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 font-mono text-xs text-gray-800 dark:text-gray-200 leading-relaxed bg-gray-50 dark:bg-black/30">
              <div className="p-4 bg-white dark:bg-[#1c1b30] rounded-xl border border-gray-200 dark:border-gray-800 space-y-3">
                <h4 className="font-sans font-bold text-base text-indigo-600 dark:text-indigo-400">
                  {activeReadingItem.title} — Full Unlocked Document
                </h4>
                <p className="font-sans text-xs text-gray-600 dark:text-gray-300">
                  {activeReadingItem.description}
                </p>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-3 text-[11px] space-y-2">
                  <p>🔹 <strong>Chapter 1: Architecture Overview</strong></p>
                  <p>In this section, we cover the core concepts, component lifecycle methods, and dependency injection mechanics. All configurations adhere to clean backend architecture principles.</p>
                  <p>🔹 <strong>Chapter 2: Code Snippets & Implementation</strong></p>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-[11px] overflow-x-auto text-emerald-600 dark:text-emerald-400">
                    {`@RestController\n@RequestMapping("/api/v1/content")\npublic class ContentController {\n    @GetMapping\n    public ResponseEntity<List<Content>> getAllContent() {\n        return ResponseEntity.ok(contentService.findAll());\n    }\n}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124] flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => setActiveReadingItem(null)}>
                Close Reader
              </Button>
              <Button size="sm" onClick={() => handleDownloadPDF(activeReadingItem.title)} className="bg-indigo-600 text-white text-xs gap-1.5">
                <Download className="h-3.5 w-3.5" /> Download Offline PDF
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
