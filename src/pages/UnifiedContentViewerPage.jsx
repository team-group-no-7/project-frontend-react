import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Bookmark, MessageSquare, ArrowLeft, ChevronRight, ChevronLeft, CheckCircle2, Share2, ZoomIn, ZoomOut, Download, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QAThreadSection from '@/components/QAThreadSection';
import ReviewModal from '@/components/ReviewModal';
import api from '@/utils/api';

export default function UnifiedContentViewerPage({ contentItem: initialItem, profile }) {
  const navigate = useNavigate();

  const [dbItem, setDbItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const contentItem = dbItem || initialItem || {
    id: 1,
    title: "Learning Resource",
    creator_name: "LearnHub Creator",
    type: "PDF",
    description: "Resource details"
  };

  useEffect(() => {
    const targetId = initialItem?.id;
    if (!targetId) return;

    let isMounted = true;
    setIsLoading(true);
    setFetchError(null);

    api.get(`/api/contents/${targetId}`)
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || res.data;
        if (data) {
          setDbItem({
            ...initialItem,
            ...data,
            title: data.title || initialItem?.title,
            type: data.type || initialItem?.type,
            contentBody: data.contentBody || data.content_body || initialItem?.contentBody,
            fileUrl: data.fileUrl || data.file_url || initialItem?.fileUrl,
            creator_name: data.creatorName || initialItem?.creator_name || "LearnHub Creator",
            category_name: data.categoryName || data.category || initialItem?.category_name || "General"
          });
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn("Failed to fetch full content reader payload from database:", err);
        setFetchError("Unable to load full content details from database.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [initialItem?.id]);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const totalPages = 14;
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [showQADrawer, setShowQADrawer] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [viewedPages, setViewedPages] = useState(() => new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  const typeLower = contentItem?.type?.toLowerCase() || "";
  const isPdf = typeLower.includes("pdf") || typeLower.includes("sheet") || !!(contentItem?.fileUrl || contentItem?.file_url);

  const progressPercent = isPdf
    ? Math.round(Math.max(0, (viewedPages.size - 1) / (totalPages - 1)) * 100)
    : scrollProgress;

  useEffect(() => {
    if (isPdf) {
      setViewedPages((prev) => {
        const next = new Set(prev);
        next.add(currentPageNum);
        return next;
      });
    }
  }, [currentPageNum, isPdf]);

  useEffect(() => {
    if (contentItem?.id && progressPercent > 0) {
      localStorage.setItem(`learnhub_progress_${contentItem.id}`, String(progressPercent));
    }
  }, [progressPercent, contentItem?.id]);

  useEffect(() => {
    if (isPdf) return;
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTotal = doc.scrollHeight - doc.clientHeight;
      if (scrollTotal <= 0) {
        setScrollProgress(0);
      } else {
        const percent = Math.round((doc.scrollTop / scrollTotal) * 100);
        setScrollProgress(percent);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPdf]);

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#121124]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/learner/dashboard')}
              className="gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" /> Library
            </Button>
            <div className="h-5 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-1">
                {contentItem?.title || "Resource Reader"}
              </h1>
              <p className="text-[11px] text-gray-500">
                Author: {contentItem?.creator_name || "Creator"}
              </p>
            </div>
          </div>

          {/* Reading Controls & Progress Bar */}
          <div className="flex items-center gap-3">
            
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

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowReviewModal(true)}
              className="gap-1 text-xs rounded-xl font-semibold border-indigo-200 text-indigo-600 dark:border-indigo-800 dark:text-indigo-400"
            >
              <Star className="h-3.5 w-3.5" /> Rate Resource
            </Button>

            <Button
              size="sm"
              onClick={() => setShowQADrawer(!showQADrawer)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 text-xs rounded-xl font-bold shadow-xs"
            >
              <MessageSquare className="h-3.5 w-3.5" /> Doubts & Q&A
            </Button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Central Reader Canvas */}
        <main className={`${showQADrawer ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6 transition-all duration-300`}>
          <div className="bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm min-h-[600px] flex flex-col justify-between">

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-semibold text-slate-500">Loading resource content from database...</p>
              </div>
            ) : (
              <div>
                {isPdf ? (
                  <RealPDFCanvas
                    fileUrl={contentItem?.fileUrl || contentItem?.file_url}
                    title={contentItem?.title}
                    progressPercent={progressPercent}
                    onProgressUpdate={setScrollProgress}
                  />
                ) : (
                  <MarkdownDocumentCanvas
                    title={contentItem?.title}
                    body={contentItem?.contentBody || contentItem?.content_body}
                  />
                )}
              </div>
            )}

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
              <QAThreadSection contentId={contentItem?.id} title={contentItem?.title} profile={profile} />
            </div>
          </aside>
        )}

      </div>

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        contentItem={contentItem}
        profile={profile}
      />
    </div>
  );
}

function MarkdownDocumentCanvas({ title, body }) {
  if (body && body.trim().length > 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">{title || 'Article'}</h2>
        <div
          className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 font-bold">
          <span>Article Reader Mode</span>
          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Fully Loaded from Database
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-12 text-center">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title || "Article Resource"}</h2>
        <p className="text-sm text-slate-500">No article text content body available for this resource in the database.</p>
      </div>
    </div>
  );
}

function RealPDFCanvas({ fileUrl, title, progressPercent, onProgressUpdate }) {
  const url = fileUrl || "";
  const hasValidFile = !!url.trim();
  const pdfSrc = (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:'))
    ? url
    : `http://localhost:8080${url.startsWith('/') ? url : '/' + url}`;

  if (!hasValidFile) {
    return (
      <div className="py-16 text-center space-y-3">
        <BookOpen className="h-12 w-12 text-slate-400 mx-auto" />
        <h2 className="text-base font-bold text-slate-700 dark:text-slate-300">{title || "PDF Learning Resource"}</h2>
        <p className="text-sm text-slate-500">No PDF document file attached to this resource in the database.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{title || "PDF Document"}</h2>
        <a
          href={pdfSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900"
        >
          <Download className="h-3.5 w-3.5" /> Open / Download PDF
        </a>
      </div>
      <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md bg-gray-900">
        <iframe
          src={pdfSrc}
          title={title || "PDF Document"}
          className="w-full"
          style={{ height: '75vh', minHeight: '500px' }}
          onLoad={() => onProgressUpdate && onProgressUpdate(10)}
        />
      </div>
      <p className="text-[11px] text-gray-400 text-center">
        Embedded PDF Reader • Click "Open / Download PDF" if your browser restricts iframe previews.
      </p>
    </div>
  );
}
