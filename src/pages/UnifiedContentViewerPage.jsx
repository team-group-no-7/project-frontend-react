import React, { useState } from 'react';
import { BookOpen, Bookmark, MessageSquare, ArrowLeft, ChevronRight, ChevronLeft, CheckCircle2, Share2, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QAThreadSection from '@/components/QAThreadSection';

/**
 * UnifiedContentViewerPage Component (Module 4: Unified Reader Experience)
 * Immersive reader for PDFs & Articles with Reading Progress, Table of Contents, Bookmarks, and in-reader Discussion Drawer.
 */
export default function UnifiedContentViewerPage({ contentItem, onBack }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const totalPages = 14;
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [showQADrawer, setShowQADrawer] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Dynamic media check
  const typeLower = contentItem?.type?.toLowerCase() || "";
  const isPdf = typeLower.includes("pdf") || typeLower.includes("sheet");

  // Table of Contents — use chapters from the content item if provided by backend,
  // otherwise show a generic numbered fallback so any resource type works
  const chapters = contentItem?.chapters || [
    { title: "Chapter 1: Introduction & Overview",        startPage: 1  },
    { title: "Chapter 2: Core Concepts & Theory",         startPage: 3  },
    { title: "Chapter 3: Hands-on Examples & Exercises",  startPage: 6  },
    { title: "Chapter 4: Advanced Topics & Edge Cases",   startPage: 9  },
    { title: "Chapter 5: Summary, Practice & Next Steps", startPage: 12 },
  ];

  // Calculate reading progress percentage
  const progressPercent = Math.round((currentPageNum / totalPages) * 100);

  const handleNextPage = () => {
    if (currentPageNum < totalPages) {
      setCurrentPageNum((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum((prev) => prev - 1);
    }
  };

  const handleChapterClick = (index, startPage) => {
    setActiveChapterIndex(index);
    setCurrentPageNum(startPage);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#121124]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300"
              >
                <ArrowLeft className="h-4 w-4" /> Library
              </Button>
            )}
            <div className="h-5 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-1">
                {contentItem?.title || "Complete Java Spring Boot Guide"}
              </h1>
              <p className="text-[11px] text-gray-500">
                Author: {contentItem?.creator_name || "Rohan Verma"}
              </p>
            </div>
          </div>

          {/* Reading Controls & Progress Bar */}
          <div className="flex items-center gap-3">
            
            {/* Reading Progress Indicator */}
            <div className="hidden md:flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-xl border border-indigo-100 dark:border-indigo-900">
              <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
                {progressPercent}% Read
              </span>
              <div className="w-16 h-1.5 bg-indigo-200 dark:bg-indigo-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Bookmark Toggle Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`gap-1 text-xs rounded-xl font-semibold ${
                isBookmarked ? 'bg-amber-50 text-amber-600 border-amber-300' : ''
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>

            {/* In-reader Q&A Drawer Toggle */}
            <Button
              size="sm"
              onClick={() => setShowQADrawer(!showQADrawer)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs gap-1.5 rounded-xl"
            >
              <MessageSquare className="h-3.5 w-3.5" /> Doubts & Q&A
            </Button>
          </div>

        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-6">
        
        {/* Left Sidebar: Table of Contents */}
        <aside className="md:col-span-4 lg:col-span-3 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 space-y-4 shadow-xs self-start">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="font-extrabold text-xs uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-indigo-600" /> Table of Contents
            </h3>
            <span className="text-[10px] bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded-full font-bold text-gray-500">
              5 Chapters
            </span>
          </div>

          <div className="space-y-1">
            {chapters.map((chap, idx) => (
              <button
                key={idx}
                onClick={() => handleChapterClick(idx, chap.startPage)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between gap-2 ${
                  activeChapterIndex === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                <span className="line-clamp-1">{chap.title}</span>
                <span className={`text-[10px] shrink-0 font-mono px-1.5 py-0.5 rounded ${
                  activeChapterIndex === idx ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                }`}>
                  p.{chap.startPage}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Center Reader Workspace */}
        <main className={`${showQADrawer ? 'md:col-span-8 lg:col-span-5' : 'md:col-span-8 lg:col-span-9'} flex flex-col space-y-4`}>
          
          {/* Reader Document Canvas Card */}
          <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-md flex-1 space-y-6">
            
            {/* Page Header Bar inside document */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {chapters[activeChapterIndex]?.title}
              </span>
              <span className="text-xs text-gray-400 font-semibold bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded">
                {isPdf ? `PDF Simulation • Page ${currentPageNum} of ${totalPages}` : "MD / Article View"}
              </span>
            </div>

            {/* Document Text / Code Content Renderer */}
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
              {isPdf ? (
                <PDFDocumentCanvas
                  title={chapters[activeChapterIndex]?.title}
                  currentPageNum={currentPageNum}
                  zoomLevel={zoomLevel}
                  totalPages={totalPages}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  setZoomLevel={setZoomLevel}
                />
              ) : (
                <MarkdownDocumentCanvas
                  title={contentItem?.title}
                />
              )}
            </div>

          </div>
        </main>

        {/* Right Drawer: Embedded In-Reader Q&A Discussion */}
        {showQADrawer && (
          <aside className="lg:col-span-4 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 space-y-4 shadow-lg self-start">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-extrabold text-xs uppercase text-gray-900 dark:text-white flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-indigo-600" /> In-Reader Doubts & Q&A
              </h3>
              <button
                onClick={() => setShowQADrawer(false)}
                className="text-xs text-gray-400 hover:text-gray-600 font-bold"
              >
                Close ✕
              </button>
            </div>

            <div className="max-h-[500px] overflow-y-auto pr-1">
              <QAThreadSection />
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}

// ==========================================
// 📄 Local PDF Content Canvas Component
// ==========================================
function PDFDocumentCanvas({ title, currentPageNum, zoomLevel, totalPages, handlePrevPage, handleNextPage, setZoomLevel }) {
  return (
    <div className="space-y-6">
      <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top left" }} className="space-y-4">
        <h2 className="text-lg font-black text-gray-900 dark:text-white">
          {title || "PDF Guide"} (Page {currentPageNum})
        </h2>
        <p>
          [Simulated PDF Document Stream] This page presents the formatted documentation, vector figures, and cheat sheet highlights of Rohan's study material. Spring Boot Actuator features are demonstrated in detail below.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
          <span className="text-indigo-400">// page {currentPageNum} code payload</span>
          <br />
          <span className="text-purple-400">GET</span> <span className="text-emerald-300">/actuator/health</span>
          <br />
          <span className="text-blue-400">Response:</span> &#123; "status": "UP", "details": &#123; "db": &#123; "status": "UP" &#125; &#125; &#125;
        </div>
        <p className="text-xs text-gray-400">
          Use pagination buttons below to navigate pages 1 to {totalPages} in this PDF deck.
        </p>
      </div>

      {/* PDF Page Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPageNum === 1}
          onClick={handlePrevPage}
          className="gap-1 text-xs font-semibold"
        >
          <ChevronLeft className="h-4 w-4" /> Previous Page
        </Button>

        <div className="flex items-center gap-2">
          <Button size="xs" variant="ghost" onClick={() => setZoomLevel(z => Math.max(50, z - 10))}><ZoomOut className="h-3 w-3" /></Button>
          <span className="text-xs text-gray-500 font-bold">
            Page {currentPageNum} / {totalPages} ({zoomLevel}%)
          </span>
          <Button size="xs" variant="ghost" onClick={() => setZoomLevel(z => Math.min(150, z + 10))}><ZoomIn className="h-3 w-3" /></Button>
        </div>

        <Button
          size="sm"
          disabled={currentPageNum === totalPages}
          onClick={handleNextPage}
          className="bg-indigo-600 text-white font-bold text-xs gap-1"
        >
          Next Page <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ==========================================
// 📝 Local MD Content Canvas Component
// ==========================================
function MarkdownDocumentCanvas({ title }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-black text-gray-900 dark:text-white">
          {title || "Markdown Article Reader"}
        </h2>
        <p className="text-xs font-semibold text-slate-500">
          Format: Scrollable Markdown (MD) Article
        </p>
        <p>
          Spring Boot provides a rapid application development framework built on top of the core Spring Framework. It eliminates boilerplate XML configurations by leveraging <strong>Convention over Configuration</strong> principles and auto-configuration dependencies.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-1 shadow-inner">
          <span className="text-indigo-400">// Sample Spring Boot RestController Setup</span>
          <br />
          <span className="text-purple-400">@RestController</span>
          <br />
          <span className="text-purple-400">@RequestMapping</span>(<span className="text-emerald-300">"/api/contents"</span>)
          <br />
          <span className="text-blue-400">public class</span> <span className="text-amber-300">ContentController</span> &#123;
          <br />
          &nbsp;&nbsp;<span className="text-purple-400">@GetMapping</span>
          <br />
          &nbsp;&nbsp;<span className="text-blue-400">public</span> ResponseEntity&lt;List&lt;Content&gt;&gt; getAll() &#123;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> ResponseEntity.ok(service.findAll());
          <br />
          &nbsp;&nbsp;&#125;
          <br />
          &#125;
        </div>
        <p>
          Key architectural benefits include embedded Tomcat/Jetty web servers, production-ready metrics endpoints via Spring Boot Actuator, and seamless JPA relational database mapping with Hibernate.
        </p>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 rounded-xl text-blue-700 dark:text-blue-300 text-xs">
          <strong>Note:</strong> You can read the entire article in this scrollable layout. Feel free to use the Doubts drawer on the right to post questions.
        </div>
      </div>

      {/* MD Page Info Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 font-bold">
        <span>Article Reader Mode</span>
        <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Fully Loaded
        </span>
      </div>
    </div>
  );
}
