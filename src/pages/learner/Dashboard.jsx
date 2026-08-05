import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, Clock, Star, Play, ChevronRight, GraduationCap, IndianRupee } from "lucide-react";
import api from "@/utils/api";
import MarketplaceCard from "@/components/MarketplaceCard";

export default function LearnerDashboard({ 
  profile, 
  purchasedContents = [], 
  marketplaceContents = [], 
  doubtSessions = [],
  onChangePage, 
  onResumeReading, 
  onViewRecommendation 
}) {
  const navigate = useNavigate();
  const userName = profile?.name || "Learner";

  // Live database state for purchases and booked doubt sessions
  const [dbPurchases, setDbPurchases] = useState([]);
  const [dbSessions, setDbSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live purchases and doubt sessions directly from PostgreSQL DB
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    // 1. Fetch user's purchased resources from database
    api.get('/api/payment/my-purchases')
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          setDbPurchases(data);
        }
      })
      .catch((err) => {
        console.warn("Using props fallback for purchased contents:", err);
      });

    // 2. Fetch user's booked mentorship / doubt sessions from database
    api.get('/api/mentorship/my-sessions')
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          setDbSessions(data);
        }
      })
      .catch((err) => {
        console.warn("Using props fallback for doubt sessions:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  // Effective list of purchases (prefers DB data if available)
  const purchasesList = useMemo(() => {
    return dbPurchases.length > 0 ? dbPurchases : purchasedContents;
  }, [dbPurchases, purchasedContents]);

  // Effective list of booked doubt sessions
  const sessionsList = useMemo(() => {
    return dbSessions.length > 0 ? dbSessions : doubtSessions;
  }, [dbSessions, doubtSessions]);

  // Total Investment Formula: Sum of all transactions & purchase history of the learner
  const totalInvestment = useMemo(() => {
    let total = 0;

    // 1. Sum of all content purchase transactions
    for (let p of purchasesList) {
      const price = Number(p.amount_paid || p.amountPaid || p.content?.price || p.price || 0);
      total += price;
    }

    // 2. Sum of all mentorship / doubt session booking transactions
    for (let s of sessionsList) {
      if (s.payment_status === 'PAID' || s.paymentStatus === 'PAID' || s.payment_status === 'SUCCESS' || !s.payment_status) {
        const sessionPrice = Number(s.session_price || s.price || s.amount || 0);
        total += sessionPrice;
      }
    }

    return total;
  }, [purchasesList, sessionsList]);

  // Derive recommended resources from marketplace
  const recommendations = useMemo(() => {
    const purchasedIds = purchasesList.map(p => p.content_id || p.content?.id || p.id);
    return marketplaceContents
      .filter(item => !purchasedIds.includes(item.id))
      .slice(0, 3);
  }, [purchasesList, marketplaceContents]);

  // Get reading progress from localStorage
  const getProgress = (contentId) => {
    if (!contentId) return 0;
    const key = `learnhub_progress_${contentId}`;
    return parseInt(localStorage.getItem(key) || "0", 10);
  };

  // Pagination state for My Library
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(purchasesList.length / itemsPerPage) || 1;

  const paginatedPurchases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return purchasesList.slice(start, start + itemsPerPage);
  }, [purchasesList, currentPage, itemsPerPage]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 font-sans">
      
      {/* 1. Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-md">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-6 -translate-y-6">
          <GraduationCap className="h-64 w-64" />
        </div>
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black">Welcome back, {userName}!</h1>
          <p className="text-sm text-indigo-100 max-w-md leading-relaxed">
            Ready to learn something new today? Keep track of your active guides and explore top-rated technical resources.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/marketplace')}
              className="px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
            >
              Explore Marketplace Catalog →
            </button>
          </div>
        </div>
      </div>

      {/* 2. Stats Section Card Grid (Static Display Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Total Resources Purchased */}
        <div className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Resources Purchased</p>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-0.5">{purchasesList.length}</p>
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Total contents buyed</p>
          </div>
        </div>

        {/* Total Investment Formula */}
        <div className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <IndianRupee className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Investment</p>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-0.5">₹{totalInvestment.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Sum of all transaction history</p>
          </div>
        </div>

        {/* Mentorship Sessions Booked (Replaces Completed) */}
        <div className="bg-white dark:bg-[#121124] border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mentorship Sessions Booked</p>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-0.5">{sessionsList.length}</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">1:1 Doubt sessions</p>
          </div>
        </div>

      </div>

      {/* 3. Continue Learning / My Library Section */}
      <div className="bg-white dark:bg-[#121124] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Continue Learning (My Library)</h2>
            {purchasesList.length > 0 && (
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                Showing <strong>{paginatedPurchases.length}</strong> of <strong>{purchasesList.length}</strong> resources
              </span>
            )}
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-900 transition"
          >
            View All <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {purchasesList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedPurchases.map((purchase) => {
                const res = purchase.content || purchase;
                if (!res || (!res.title && !res.id)) return null;

                const targetContentId = res.id || purchase.content_id || purchase.contentId;
                const matchedCatalogItem = marketplaceContents.find(c => c.id === targetContentId);

                const typeStr = (res.type || res.content_type || matchedCatalogItem?.type || matchedCatalogItem?.content_type || "").toUpperCase();
                const fileUrl = res.fileUrl || res.file_url || matchedCatalogItem?.fileUrl || matchedCatalogItem?.file_url;
                const titleStr = (res.title || purchase.title || matchedCatalogItem?.title || "").toLowerCase();

                const isPdfType = typeStr.includes("PDF") || typeStr.includes("SHEET") || !!fileUrl || titleStr.includes(".pdf") || titleStr.includes("cheatsheet") || titleStr.includes("handbook") || titleStr.includes("guide");
                const displayType = isPdfType ? "PDF" : "Article";

                const creatorName = res.creator_name || res.creatorName || res.creator?.name || matchedCatalogItem?.creator_name || matchedCatalogItem?.creatorName || "Rohan Verma";

                const handleOpen = () => {
                  if (onResumeReading) {
                    onResumeReading(purchase);
                  } else {
                    const targetId = res.id || purchase.content_id || purchase.contentId;
                    navigate(`/reader/${targetId}`);
                  }
                };

                return (
                  <div
                    key={purchase.id || res.id}
                    className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between gap-3 transition"
                  >
                    <div>
                      <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                        {displayType}
                      </span>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm mt-1.5 line-clamp-1">{res.title}</h3>
                    </div>

                    <button
                      onClick={handleOpen}
                      className="w-full mt-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                    >
                      <BookOpen className="h-3.5 w-3.5" /> Open Content
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls for My Library */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-indigo-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <p className="text-xs text-gray-500 font-medium">You haven't purchased any learning resources yet.</p>
            <button
              onClick={() => navigate('/marketplace')}
              className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Browse Marketplace Catalog →
            </button>
          </div>
        )}
      </div>

      {/* 4. Recommended for You Section */}
      <div className="bg-white dark:bg-[#121124] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recommended for You</h2>
          <button
            onClick={() => navigate('/marketplace')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            View Catalog <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendations.map((item) => {
              const isPurchased = purchasesList.some((p) => (p.content?.id || p.content_id || p.id) === item.id);
              return (
                <MarketplaceCard
                  key={item.id}
                  item={item}
                  isPurchased={isPurchased}
                  onPreview={(res) => {
                    if (onViewRecommendation) {
                      onViewRecommendation(res);
                    } else {
                      navigate(`/resources/${res.id}`);
                    }
                  }}
                  onOpenCreatorProfile={(creatorId) => {
                    navigate(`/creator/${creatorId || item.creator_id || 202}`);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">No recommendations available at this time.</p>
        )}
      </div>

    </div>
  );
}
