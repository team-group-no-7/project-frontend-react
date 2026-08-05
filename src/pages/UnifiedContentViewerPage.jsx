import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, MessageSquare, ArrowLeft, Star, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QAThreadSection from '@/components/QAThreadSection';
import ReviewModal from '@/components/ReviewModal';
import api from '@/utils/api';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure pdf.js worker URL from CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function UnifiedContentViewerPage({ contentItem: initialItem, profile }) {
  const navigate = useNavigate();
  const { id: routeId } = useParams();

  // Restore cached item from localStorage on page refresh if props are absent
  const cachedItem = React.useMemo(() => {
    if (initialItem) return initialItem;
    try {
      const stored = localStorage.getItem("learnhub_last_reader_item");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }, [initialItem]);

  const [dbItem, setDbItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const targetId = routeId || initialItem?.id || cachedItem?.id;

  const contentItem = dbItem || initialItem || cachedItem || {
    id: targetId || 1,
    title: "Learning Resource",
    creator_name: "LearnHub Creator",
    type: "PDF",
    description: "Resource details"
  };

  useEffect(() => {
    if (!targetId) return;

    let isMounted = true;
    setIsLoading(true);

    api.get(`/api/public/resource/${targetId}`)
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || res.data;
        if (data && data.id) {
          const merged = {
            ...initialItem,
            ...cachedItem,
            ...data,
            id: data.id,
            title: data.title || initialItem?.title || cachedItem?.title,
            type: data.type || initialItem?.type || cachedItem?.type,
            contentBody: data.contentBody || data.content_body || initialItem?.contentBody || cachedItem?.contentBody,
            fileUrl: data.fileUrl || data.file_url || initialItem?.fileUrl || cachedItem?.fileUrl,
            creator_name: data.creatorName || initialItem?.creator_name || cachedItem?.creator_name || "LearnHub Creator",
            category_name: data.categoryName || data.category || initialItem?.category_name || cachedItem?.category_name || "General"
          };
          setDbItem(merged);
          try { localStorage.setItem("learnhub_last_reader_item", JSON.stringify(merged)); } catch (e) {}
        }
      })
      .catch((err) => {
        api.get(`/api/contents/${targetId}`)
          .then((res) => {
            if (!isMounted) return;
            const data = res.data?.data || res.data;
            if (data && data.id) {
              const merged = {
                ...initialItem,
                ...cachedItem,
                ...data,
                id: data.id,
                title: data.title || initialItem?.title || cachedItem?.title,
                type: data.type || initialItem?.type || cachedItem?.type,
                contentBody: data.contentBody || data.content_body || initialItem?.contentBody || cachedItem?.contentBody,
                fileUrl: data.fileUrl || data.file_url || initialItem?.fileUrl || cachedItem?.fileUrl,
                creator_name: data.creatorName || initialItem?.creator_name || cachedItem?.creator_name || "LearnHub Creator",
                category_name: data.categoryName || data.category || initialItem?.category_name || cachedItem?.category_name || "General"
              };
              setDbItem(merged);
              try { localStorage.setItem("learnhub_last_reader_item", JSON.stringify(merged)); } catch (e) {}
            }
          })
          .catch((err2) => {
            console.warn("Failed to fetch content from database:", err2);
          });
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [targetId, initialItem?.id]);

  const [showQADrawer, setShowQADrawer] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const typeLower = contentItem?.type?.toLowerCase() || "";
  const isPdf = typeLower.includes("pdf") || typeLower.includes("sheet") || !!(contentItem?.fileUrl || contentItem?.file_url);

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0b0a14] flex flex-col font-sans">
      
      {/* Top Sticky Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#121124]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" /> Back
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

          {/* Header Actions: Rate Resource & Q&A */}
          <div className="flex items-center gap-3">
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

      {/* Main Content View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Reader Canvas */}
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
                  <ReactPdfViewerCanvas
                    fileUrl={contentItem?.fileUrl || contentItem?.file_url}
                    title={contentItem?.title}
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

function MarkdownDocumentCanvas({ body }) {
  if (body && body.trim().length > 0) {
    return (
      <div className="space-y-6">
        <div
          className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 font-bold">
          <span>Article Reader Mode</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-12 text-center">
      <p className="text-sm text-slate-500">No article text content body available for this resource in the database.</p>
    </div>
  );
}

function ReactPdfViewerCanvas({ fileUrl, title }) {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [pdfError, setPdfError] = useState(false);

  const pdfSrc = fileUrl
    ? (fileUrl.startsWith('http') || fileUrl.startsWith('blob:') ? fileUrl : `http://localhost:8080${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`)
    : "";

  if (!pdfSrc) {
    return (
      <div className="py-16 text-center space-y-2">
        <BookOpen className="h-10 w-10 text-slate-400 mx-auto" />
        <p className="text-sm font-semibold text-slate-500">No PDF document attached to this resource in the database.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {/* Control Header Bar */}
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
          <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>{numPages ? `Total Pages: ${numPages}` : 'Loading PDF...'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setScale(s => Math.max(0.6, s - 0.15))} className="h-7 w-7 p-0" title="Zoom Out">
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-[11px] font-mono font-bold w-10 text-center text-slate-600 dark:text-slate-300">{Math.round(scale * 100)}%</span>
          <Button size="sm" variant="outline" onClick={() => setScale(s => Math.min(2.0, s + 0.15))} className="h-7 w-7 p-0" title="Zoom In">
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          {scale !== 1.0 && (
            <Button size="sm" variant="ghost" onClick={() => setScale(1.0)} className="h-7 px-2 text-[11px] text-indigo-600 gap-1">
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>
          )}
        </div>
      </div>

      {/* Canvas View */}
      <div 
        className="w-full h-[80vh] min-h-[600px] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-4 flex flex-col items-center select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        {!pdfError ? (
          <Document
            file={pdfSrc}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={() => setPdfError(true)}
            loading={
              <div className="flex flex-col items-center justify-center py-20 space-y-2 text-slate-300">
                <div className="w-7 h-7 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs">Loading PDF document...</p>
              </div>
            }
          >
            {numPages && Array.from(new Array(numPages), (_, i) => (
              <div key={i + 1} className="mb-6 flex flex-col items-center bg-white shadow-xl rounded-lg overflow-hidden border border-slate-700">
                <Page pageNumber={i + 1} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} />
                <div className="w-full bg-slate-100 text-center py-1 text-[11px] font-bold text-slate-600 border-t border-slate-200">
                  Page {i + 1} of {numPages}
                </div>
              </div>
            ))}
          </Document>
        ) : (
          <iframe
            src={`${pdfSrc}#toolbar=0&navpanes=0`}
            title={title || "PDF Document"}
            className="w-full h-full border-0 rounded-xl"
          />
        )}
      </div>
    </div>
  );
}
